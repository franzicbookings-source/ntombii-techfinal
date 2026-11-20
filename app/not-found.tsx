import Link from "next/link";
import { InnerPage } from "@/components/inner-pages";
import { ContentIllustration } from "@/components/content-illustration";

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return <InnerPage><section className="not-found-page wrap">
    <ContentIllustration kind="search" />
    <h1>We can’t find that page.</h1><p>The link may have changed. You can head home or explore our latest work.</p>
    <div className="not-found-actions"><Link className="button button-blue" href="/">Back to home <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/work">Explore our work <span aria-hidden="true">↗</span></Link></div>
  </section></InnerPage>;
}
