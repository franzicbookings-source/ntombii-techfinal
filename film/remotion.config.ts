import { Config } from "@remotion/cli/config";

// Uses Remotion's own Chrome by default. Set REMOTION_BROWSER_EXECUTABLE to reuse an installed headless Chrome.
Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE || null);
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setConcurrency(4);
