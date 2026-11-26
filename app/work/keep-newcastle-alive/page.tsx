import { ProjectStory, projectStoryMetadata } from "@/components/project-story";

export const metadata = projectStoryMetadata("keep-newcastle-alive");

export default function Page() {
  return <ProjectStory id="keep-newcastle-alive" />;
}
