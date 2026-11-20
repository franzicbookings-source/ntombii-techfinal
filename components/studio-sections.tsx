"use client";

const whatsapp = (message: string) => `https://wa.me/27812360230?text=${encodeURIComponent(message)}`;

export function SocialLinks() {
  const links = [
    { name: "instagram", label: "Instagram", href: "https://www.instagram.com/ntombii_tech" },
    { name: "facebook", label: "Facebook", href: "https://www.facebook.com/ntombiitech" },
    { name: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/sabelo-ndlovu-052a033ab?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  ];

  return <div className="social-links" role="group" aria-label="Find Ntombii Tech">
    {links.map(({ name, label, href }) => <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={`Open Ntombii Tech on ${label}`} title={label}><img src={`/social/${name}.svg`} alt={label} width="23" height="23" /></a>)}
    <a href="mailto:hello@ntombii.tech" aria-label="Email Ntombii Tech"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="m3 6 9 7 9-7" stroke="currentColor" strokeWidth="1.7" /></svg></a>
  </div>;
}

export function NewsletterSection() {
  return <section className="newsletter-section section" id="tips">
    <div className="newsletter-layout wrap">
      <div className="newsletter-copy" data-reveal><h2>Have a website question?</h2><p>Not sure which pages you need or what to change on your current site? Ask us on WhatsApp.</p>
        <div className="newsletter-form"><a className="button button-blue" href={whatsapp("Hi Ntombii Tech, I have a question about my website.")} target="_blank" rel="noreferrer">Ask on WhatsApp <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="newsletter-art" role="img" aria-label="A layered view of websites designed and built by Ntombii Tech">
        <div className="newsletter-screen newsletter-screen-left"><span className="newsletter-screen-bar"><i /><i /><i /><b>ntombii.tech / design</b></span><img src="/images/web-demo-shop.jpg" alt="" loading="lazy" /></div>
        <div className="newsletter-screen newsletter-screen-middle"><span className="newsletter-screen-bar"><i /><i /><i /><b>ntombii.tech / work</b></span><img src="/images/web-demo-home.jpg" alt="" loading="lazy" /></div>
        <div className="newsletter-screen newsletter-screen-right"><span className="newsletter-screen-bar"><i /><i /><i /><b>ntombii.tech / product</b></span><img src="/images/web-demo-product.jpg" alt="" loading="lazy" /></div>

      </div>
    </div>
  </section>;
}
