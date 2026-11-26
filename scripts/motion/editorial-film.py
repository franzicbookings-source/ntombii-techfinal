"""Render the portfolio loops from case-study screenshots and the client's own artwork."""
import argparse
import json
from pathlib import Path
import subprocess
import tempfile

from PIL import Image, ImageDraw, ImageFilter, ImageOps

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
WIDTH, HEIGHT = 1200, 960
FPS, SECONDS = 30, 12
RESAMPLE = Image.Resampling.LANCZOS
CONFIG = json.loads((HERE / "film-crops.json").read_text())


def projects():
    script = """import {portfolioProjects} from './components/portfolio-projects.ts';
    process.stdout.write(JSON.stringify(portfolioProjects));"""
    output = subprocess.check_output(
        ["node", "--no-warnings", "--experimental-strip-types", "--input-type=module", "-e", script], cwd=ROOT)
    return {project["id"]: project for project in json.loads(output)}


def smooth(t):
    t = max(0, min(1, t))
    return t * t * (3 - 2 * t)


def camera(image, center, width, size=(WIDTH, HEIGHT)):
    """Sample a floating-point camera aperture with anti-aliasing and no integer pan jitter."""
    height = width * size[1] / size[0]
    x = min(max(center[0] - width / 2, 0), max(0, image.width - width))
    y = min(max(center[1] - height / 2, 0), max(0, image.height - height))
    return image.transform(size, Image.Transform.EXTENT, (x, y, x + width, y + height),
                           Image.Resampling.BICUBIC)


def handset(screen, angle):
    screen = screen.convert("RGBA")
    rim = 8
    w, h = screen.width + 2 * rim, screen.height + 2 * rim
    pad = 86
    device = Image.new("RGBA", (w + 2 * pad, h + 2 * pad))
    d = ImageDraw.Draw(device)
    d.rounded_rectangle((pad, pad, pad + w - 1, pad + h - 1), 38, fill="#12191e",
                        outline="#a8b2b6", width=2)
    d.rounded_rectangle((pad + 3, pad + 3, pad + w - 4, pad + h - 4), 35, outline="#404a50", width=2)
    mask = Image.new("L", screen.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, screen.width - 1, screen.height - 1), 29, fill=255)
    device.paste(screen, (pad + rim, pad + rim), mask)
    return device.rotate(angle, Image.Resampling.BICUBIC, expand=True)


def tint(image, colour, opacity):
    return Image.blend(image, Image.new("RGB", image.size, colour), opacity)


class Film:
    def __init__(self, project, crop):
        self.crop = crop
        load = lambda key: Image.open(ROOT / "public" / project[key]["src"].lstrip("/")).convert("RGB")
        self.desk, self.detail, mobile = (load(key) for key in ("desktop", "detail", "mobile"))
        # Extend the canvas in the studio colour so a wide detail can keep both text columns.
        # Camera positions in the crop manifest are measured on the original case-study still.
        self.detail_gutter = 160
        self.detail = ImageOps.expand(self.detail, border=(0, self.detail_gutter), fill="#253947")
        photo = Image.open(HERE / "plates" / (project["id"] + ".webp")).convert("RGB")
        # An oversized plate leaves room for independent parallax behind the handset.
        self.photo = ImageOps.fit(photo, (1440, 1152), method=RESAMPLE,
                                  centering=(crop["focus"], 0.5))
        phone = handset(mobile, crop["angle"])
        target = crop.get("phone_scale", .90)
        self.phone = phone.resize((round(phone.width * target), round(phone.height * target)), RESAMPLE)
        shadow = self.phone.getchannel("A").filter(ImageFilter.GaussianBlur(18))
        self.shadow = shadow.point(lambda value: round(value * .53))

        # The studio's dark blue is a consistent cut between widely different client palettes.
        atmosphere = Image.open(ROOT / "public/images/hero-atmosphere.webp").convert("RGB")
        atmosphere = ImageOps.fit(atmosphere, (1440, 1152), method=RESAMPLE)
        self.stage = tint(atmosphere, "#263d4c", .79)
        self.make_desktop_master()

    def make_desktop_master(self):
        art = self.stage.convert("RGBA")
        image = self.desk
        h = self.crop["desktop_bottom"]
        screen = image.crop((0, 0, image.width, h))
        screen.thumbnail((1260, 924), RESAMPLE)
        w, h = screen.size
        frame = Image.new("RGBA", (w + 130, h + 130))
        shade = Image.new("L", frame.size)
        ImageDraw.Draw(shade).rounded_rectangle((62, 77, 74 + w, 89 + h), 19, fill=145)
        frame.paste((8, 19, 28, 255), (0, 0, *frame.size), shade.filter(ImageFilter.GaussianBlur(18)))
        drawing = ImageDraw.Draw(frame)
        drawing.rounded_rectangle((60, 50, 74 + w, 64 + h), 18, fill="#141d25", outline="#82939b", width=2)
        mask = Image.new("L", screen.size)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, w - 1, h - 1), 11, fill=255)
        frame.paste(screen, (67, 57), mask)
        frame = frame.rotate(self.crop.get("screen_angle", 2), Image.Resampling.BICUBIC, expand=True)
        art.alpha_composite(frame, ((art.width - frame.width) // 2, (art.height - frame.height) // 2))
        self.desktop = art.convert("RGB")

    def portrait(self, t):
        drift = smooth(t)
        side = 1 if self.crop["phone_x"] > .5 else -1
        bg = camera(self.photo, (720 - side * 19 * drift, 576 - 12 * drift), 1390 - 67 * drift)
        center = (WIDTH * self.crop["phone_x"] + side * 36 * drift, HEIGHT * self.crop.get("phone_y", .51) - 34 * drift)
        x = round(center[0] - self.phone.width / 2)
        y = round(center[1] - self.phone.height / 2)
        bg.paste((10, 19, 26), (x + 10, y + 22, x + 10 + self.phone.width, y + 22 + self.phone.height), self.shadow)
        bg.paste(self.phone, (x, y), self.phone)
        return bg

    def overview(self, t):
        drift = smooth(t)
        return camera(self.desktop, (715 + 11 * drift, 569 + 15 * drift), 1430 - 80 * drift)

    def closeup(self, t):
        crop = self.crop["detail"]
        drift = smooth(t)
        start, stop = crop[:3], crop[3:]
        x, y, width = [a + (b - a) * drift for a, b in zip(start, stop)]
        return camera(self.detail, (x, y + self.detail_gutter), width)

    def at(self, second):
        # Cuts are separated by short travelling mattes. Both images keep their own camera.
        # The final matte reveals frame zero before the loop boundary.
        if second < 3.85:
            return self.portrait(second / 4.17)
        if second < 4.17:
            a = self.portrait(second / 4.17)
            b = self.overview(0)
            return wipe(a, b, (second - 3.85) / .32)
        if second < 7.65:
            return self.overview((second - 4.17) / 3.48)
        if second < 11.53:
            return self.closeup((second - 7.65) / 3.88)
        return wipe(self.closeup(1), self.portrait(0), (second - 11.53) / .42)


def wipe(outgoing, incoming, progress):
    # A crisp travelling edge retains contrast and stops two interfaces reading as doubled type.
    cut = round(WIDTH * smooth(progress))
    if cut == WIDTH:
        return incoming
    if cut:
        outgoing.paste(incoming.crop((0, 0, cut, HEIGHT)), (0, 0))
    return outgoing


def render(film, dest, project_id):
    dest.mkdir(parents=True, exist_ok=True)
    # Stage the derived files until the encoder closes a complete, fast-start MP4.
    with tempfile.TemporaryDirectory(dir=dest) as scratch:
        temp = Path(scratch)
        args = ["ffmpeg", "-nostdin", "-hide_banner", "-loglevel", "error", "-y",
                "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{WIDTH}x{HEIGHT}",
                "-r", str(FPS), "-i", "pipe:0", "-an", "-c:v", "libx264", "-threads", "2",
                "-preset", "fast", "-crf", "25", "-pix_fmt", "yuv420p", "-profile:v", "high",
                "-movflags", "+faststart", str(temp / "film.mp4")]
        with subprocess.Popen(args, stdin=subprocess.PIPE) as encoder:
            for frame in range(SECONDS * FPS):
                image = film.at(frame / FPS)
                if frame == 0:
                    image.save(temp / "poster.webp", quality=87, method=6)
                encoder.stdin.write(image.tobytes())
            encoder.stdin.close()
            if encoder.wait():
                raise RuntimeError(f"Encoding failed for {project_id}")
        with Image.open(temp / "poster.webp") as poster:
            poster.resize((288, 230), RESAMPLE).save(temp / "thumb.webp", quality=80, method=6)
        (temp / "thumb.webp").replace(dest / f"{project_id}-thumb.webp")
        (temp / "film.mp4").replace(dest / f"{project_id}.mp4")
        (temp / "poster.webp").replace(dest / f"{project_id}-poster.webp")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("ids", nargs="*", help="project IDs (defaults to all)")
    parser.add_argument("--sheet", type=Path, help="write a storyboard JPEG instead of the films")
    args = parser.parse_args()
    data = projects()
    ids = args.ids or list(data)
    strip = Image.new("RGB", (900, len(ids) * 240)) if args.sheet else None
    for row, project_id in enumerate(ids):
        film = Film(data[project_id], CONFIG[project_id])
        if strip is None:
            render(film, ROOT / "public/videos/work", project_id)
            print(f"Rendered {project_id}", flush=True)
        else:
            for col, t in enumerate((0, 5.5, 8.9)):
                strip.paste(film.at(t).resize((300, 240), RESAMPLE), (300 * col, 240 * row))
    if strip:
        strip.save(args.sheet, quality=92)


if __name__ == "__main__":
    main()
