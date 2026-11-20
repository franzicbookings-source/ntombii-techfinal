import { pageMetadata } from "@/components/site-seo";
import { AboutPage } from "@/components/inner-pages";
import "./about.css";
export const metadata = pageMetadata({ title: "About Our Team", description: "Meet Sabelo Ndlovu and Sthembile Ndlovu, the web development and design team at Ntombii Tech, working from Newcastle, KZN, and Pretoria, Gauteng.", path: "/about" });
export default function Page() { return <AboutPage />; }
