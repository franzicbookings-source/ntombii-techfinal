import Link from "next/link";
import "./work-categories.css";

export function WorkCategories({ active }: { active: "websites" | "graphics" }) {
  return <nav className="work-categories wrap" aria-label="Portfolio categories">
    <Link href="/work" aria-current={active === "websites" ? "page" : undefined}>Websites</Link>
    <Link href="/graphics" aria-current={active === "graphics" ? "page" : undefined}>Graphic design</Link>
  </nav>;
}
