/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { validHtmlResponse } from "./document-stream";

// Old-site URLs seen in Search Console. Keep only routes with a relevant
// replacement; retired services and broad town pages can return a real 404.
const legacyRedirects: Record<string, string> = {
  "/index.html": "/",
  "/services/web-design": "/services/websites",
  "/services/web-apps": "/services/websites",
  "/services/web-development": "/services/websites",
  "/services/ecommerce": "/services/websites",
  "/services/school-websites": "/services/websites",
  "/services/local-seo": "/services/websites",
  "/web-design-newcastle-kzn": "/website-design-kzn",
  "/web-design-osizweni": "/website-design-kzn",
  "/web-design-madadeni": "/website-design-kzn",
  "/web-design-dundee-kzn": "/website-design-kzn",
  "/web-development-umhlanga": "/website-design-kzn",
  "/web-development-phoenix": "/website-design-kzn",
  "/services/branding": "/services/branding-print",
  "/services/logo-design": "/services/branding-print",
  "/services/graphic-design": "/services/branding-print",
  "/services/corporate-gifts": "/services/branding-print",
  "/printing-services-newcastle": "/services/printing",
  "/printing-services-ladysmith": "/services/printing",
  "/printing-services-madadeni": "/services/printing",
  "/printing-services-glencoe": "/services/printing",
  "/printing-services-osizweni": "/services/printing",
  "/printing-services-dundee": "/services/printing",
  "/printing-services-bergville": "/services/printing",
  "/printing-services-utrecht": "/services/printing",
  "/printing-services-dannhauser": "/services/printing",
  "/printing-services-estcourt": "/services/printing",
  "/graphic-design-osizweni": "/services/branding-print",
  "/graphic-design-ladysmith": "/services/branding-print",
  "/graphic-design-newcastle": "/services/branding-print",
  "/graphic-design-estcourt": "/services/branding-print",
  "/graphic-design-dannhauser": "/services/branding-print",
  "/graphic-design-madadeni": "/services/branding-print",
  "/graphic-design-dundee": "/services/branding-print",
  "/branding-newcastle": "/services/branding-print",
  "/branding-ladysmith": "/services/branding-print",
  "/branding-estcourt": "/services/branding-print",
  "/branding-osizweni": "/services/branding-print",
  "/branding-utrecht": "/services/branding-print",
  "/branding-bergville": "/services/branding-print",
  "/branding-madadeni": "/services/branding-print",
  "/signage-newcastle": "/services/signage",
  "/signage-dundee": "/services/signage",
  "/signage-osizweni": "/services/signage",
  "/signage-estcourt": "/services/signage",
  "/signage-bergville": "/services/signage",
  "/signage-ladysmith": "/services/signage",
  "/signage-madadeni": "/services/signage",
  "/signage-glencoe": "/services/signage",
  "/signage-dannhauser": "/services/signage",
  "/ink-toner-ladysmith": "/services/ink-toner",
  "/ink-toner-madadeni": "/services/ink-toner",
  "/ink-toner-newcastle": "/services/ink-toner",
  "/ink-toner-estcourt": "/services/ink-toner",
  "/ink-toner-dundee": "/services/ink-toner",
  "/ink-toner-utrecht": "/services/ink-toner",
  "/ink-toner-dannhauser": "/services/ink-toner",
  "/ink-toner-bergville": "/services/ink-toner",
  "/ink-toner-glencoe": "/services/ink-toner",
  "/corporate-gifts-newcastle": "/services/branding-print",
  "/corporate-gifts-madadeni": "/services/branding-print",
  "/corporate-gifts-osizweni": "/services/branding-print",
  "/corporate-gifts-ladysmith": "/services/branding-print",
  "/corporate-gifts-bergville": "/services/branding-print",
  "/corporate-gifts-dundee": "/services/branding-print",
  "/corporate-gifts-estcourt": "/services/branding-print",
  "/capabilities": "/services",
  "/services.html": "/services",
  "/pricing.html": "/pricing",
  "/work.html": "/work",
};

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    const legacyPath = url.pathname.replace(/\/$/, "") || "/";
    const destination = legacyRedirects[legacyPath];
    if (destination) {
      return Response.redirect(new URL(`${destination}${url.search}`, url.origin), 301);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return validHtmlResponse(await handler.fetch(request, env, ctx));
  },
};

export default worker;
