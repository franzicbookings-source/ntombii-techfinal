import { websitePackages, packageSetupNote, packageSupport, shopifyCosts } from "./website-packages";
import "./pricing-comparison.css";

export function PricingComparison({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return <>
    <p className="pricing-setup-note">{packageSetupNote}</p>
    <div className="pricing-comparison">
      {websitePackages.map(pkg => <article className={`pricing-comparison-row${pkg.featured ? " pricing-comparison-featured" : ""}`} key={pkg.name}>
        <div className="pricing-comparison-summary">
          <Heading>{pkg.name}</Heading>
          <p className="pricing-comparison-price"><span>From</span> <strong>{pkg.price}</strong></p>
          <p className="pricing-comparison-description">{pkg.note}</p>
          <p className="pricing-comparison-example">{pkg.example}</p>
        </div>
        <div className="pricing-comparison-details">
          <ul aria-label={`${pkg.name} features`}>{pkg.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          {pkg.shortName === "Shopify" && <p className="pricing-shopify-costs">{shopifyCosts} <a href="https://www.shopify.com/za/pricing" target="_blank" rel="noreferrer">View Shopify subscription prices <span aria-hidden="true">↗</span></a></p>}
        </div>
        <a className={`button ${pkg.featured ? "button-white" : "button-blue"}`} href={`https://wa.me/27812360230?text=${encodeURIComponent(`Hi Ntombii Tech, I'm interested in the ${pkg.name} package starting from ${pkg.price}. Could we discuss my business?`)}`} target="_blank" rel="noreferrer">Ask about {pkg.shortName} <span aria-hidden="true">↗</span></a>
      </article>)}
    </div>
    <div className="pricing-custom">
      <div><Heading>Custom development.</Heading><p>Bookings, client portals and operational dashboards, quoted for your project.</p></div>
      <a className="text-link" href={`https://wa.me/27812360230?text=${encodeURIComponent("Hi Ntombii Tech, I'd like a quote for custom website development. Could we discuss the functionality I need?")}`} target="_blank" rel="noreferrer">Request a quote <span aria-hidden="true">↗</span></a>
    </div>
    <div className="pricing-package-terms"><p>{packageSupport}</p><p>You supply your logo, text, photos and product information. Extra content work, pages, product uploads and ongoing changes are quoted separately. Domain and hosting costs for Portfolio and Business websites are confirmed in your quote.</p></div>
  </>;
}
