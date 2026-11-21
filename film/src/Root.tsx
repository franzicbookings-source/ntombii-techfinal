import React from "react";
import { Composition } from "remotion";
import { Film } from "./Film";
import timeline from "./timeline.json";

export const Root: React.FC = () => <>
  <Composition id="TwoLights" component={Film} durationInFrames={timeline.durationInFrames} fps={timeline.fps} width={1920} height={1080} />
</>;
