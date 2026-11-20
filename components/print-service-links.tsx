import Link from "next/link";
import { printServices } from "./print-services";

export function PrintServiceLinks() {
  return <section className="print-service-overview wrap" aria-labelledby="print-options-title"><div><h2 id="print-options-title">Signage. Print. Printer supplies.</h2><p>Based in Newcastle, KZN. Send your town, quantities and order details for a quote.</p></div><div className="print-link-grid">{printServices.map(service => <Link href={`/services/${service.slug}`} key={service.slug}><h3>{service.name}</h3><p>{service.intro}</p><span>Explore the service <span aria-hidden="true">↗</span></span></Link>)}</div><Link className="text-link" href="/printing-signage-toner-kzn">Enquire from your KZN town <span aria-hidden="true">↗</span></Link></section>;
}
