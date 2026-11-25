import Link from "next/link";
import { CookieSettingsLink } from "./cookie-consent";
import { regionalWebsiteLinks } from "./locations";
import { serviceNavigationLinks } from "./navigation-links";
import "./studio-footer.css";

export type FooterEnquiry = {
  title: string;
  whatsappHref?: string;
};

export function StudioFooter({ enquiry, showHours = false }: { enquiry?: FooterEnquiry; showHours?: boolean }) {
  return <footer className="studio-footer">
    <div className="wrap">
      {enquiry && <section id="contact" className="studio-footer-enquiry" aria-labelledby="footer-enquiry-title">
        <img className="studio-footer-portrait" src="/images/sabelo-portrait.webp" width="1536" height="1536" alt="Sabelo Ndlovu" loading="lazy" />
        <h2 id="footer-enquiry-title">{enquiry.title}</h2>
        {enquiry.whatsappHref
          ? <a className="studio-footer-action" href={enquiry.whatsappHref} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          : <Link className="studio-footer-action" href="/contact">Tell us about your project</Link>}
      </section>}
      <div className="studio-footer-directory">
        <div className="studio-footer-identity">
          <Link className="studio-footer-logo" href="/" aria-label="Ntombii Tech home">
            <img src="/brand/ntombii-logo-dark.svg" alt="Ntombii Tech" width="1200" height="200" loading="lazy" />
          </Link>
          <address>
            <a href="mailto:hello@ntombii.tech">hello@ntombii.tech</a>
            <a href="https://wa.me/27812360230" target="_blank" rel="noreferrer" aria-label="WhatsApp on 081 236 0230">081 236 0230</a>
          </address>
          {showHours && <p>Monday–Friday · 09:00–17:00 SAST<br />Meetings by appointment.</p>}
        </div>
        <nav className="studio-footer-nav" aria-label="Footer navigation">
          <div>
            <h2>Studio</h2>
            <Link href="/about">About us</Link>
            <Link href="/work">Our work</Link>
            <Link href="/articles">Articles</Link>
            <Link href="/contact">Contact</Link>
            <a href="/#faq">FAQs</a>
          </div>
          <div>
            <h2>Services</h2>
            <Link href="/services">All services</Link>
            {serviceNavigationLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            <Link href="/graphics">Graphic design</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div className="studio-footer-areas">
            <h2>Website design</h2>
            {regionalWebsiteLinks.map(link => <Link key={link.href} href={link.href} aria-label={`Website design in ${link.area}`}>{link.area}</Link>)}
          </div>
        </nav>
      </div>
      <div className="studio-footer-base">
        <small>© {new Date().getFullYear()} Ntombii Tech</small>
        <Link href="/privacy">Privacy</Link>
        <CookieSettingsLink />
        <a className="studio-footer-top" href="#top">Back to top</a>
      </div>
    </div>
  </footer>;
}
