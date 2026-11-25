import { InnerPage } from "@/components/inner-pages";
import { pageMetadata } from "@/components/site-seo";
import { testimonials } from "@/components/testimonials";

export const metadata = pageMetadata({ title: "Client Reviews", description: "Read client feedback about Ntombii Tech's business support, applications, AI tools and enquiry workflows.", path: "/reviews" });

export default function ReviewsPage() {
  return <InnerPage enquiry={{ title: "Talk to our studio.", whatsappHref: "https://wa.me/27812360230?text=Hi%20Ntombii%20Tech%2C%20I%27d%20like%20to%20discuss%20a%20project." }}>
    <section className="editorial-heading wrap"><h1>From our clients.</h1><p>Their experience of working with Ntombii Tech.</p></section>
    <section className="reviews-grid wrap" aria-label="All client reviews">{testimonials.map(story => <figure className="review-card" key={story.name}>
      <figcaption><img src={story.image} width="56" height="56" alt="" loading="lazy" /><div><h2>{story.name}</h2><p>{story.context}</p></div></figcaption>
      <blockquote><p>{story.quote}</p></blockquote>
    </figure>)}</section>
  </InnerPage>;
}
