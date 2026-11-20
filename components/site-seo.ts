import { pretoriaAreas } from "./locations";
import type { Metadata } from "next";
import { portfolioProjects, type PortfolioProject } from "./portfolio-projects";

export const siteUrl = "https://ntombii.tech";
export const businessId = `${siteUrl}/#business`;

export function pageMetadata({ title, description, path, image = "/images/ntombii-tech-preview.jpg", imageAlt = "Ntombii Tech — website design from Newcastle, KZN, and Pretoria, Gauteng" }: {
  title: string; description: string; path: string; image?: string; imageAlt?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Ntombii Tech`, description, url: `${siteUrl}${path}`,
      siteName: "Ntombii Tech", locale: "en_ZA", type: "website",
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title: `${title} | Ntombii Tech`, description, images: [image] },
  };
}

export const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService", "@id": businessId,
      name: "Ntombii Tech", url: siteUrl,
      logo: `${siteUrl}/brand/ntombii-icon.png`, image: `${siteUrl}/images/ntombii-tech-preview.jpg`,
      telephone: "+27812360230", email: "hello@ntombii.tech",
      description: "Website design and development, e-commerce development and local SEO from Newcastle, KwaZulu-Natal, and Pretoria, Gauteng. Serving businesses across KZN, Pretoria and Centurion, and online throughout South Africa. Printing, signage, printer supplies and business support are available on request in KZN.",
      address: { "@type": "PostalAddress", addressLocality: "Newcastle", addressRegion: "KwaZulu-Natal", addressCountry: "ZA" },
      areaServed: [
        { "@type": "City", name: "Newcastle", containedInPlace: { "@type": "AdministrativeArea", name: "KwaZulu-Natal" } },
        { "@type": "Place", name: "Osizweni", containedInPlace: { "@type": "City", name: "Newcastle" } },
        { "@type": "Place", name: "Madadeni", containedInPlace: { "@type": "City", name: "Newcastle" } },
        { "@type": "AdministrativeArea", name: "KwaZulu-Natal" },
        ...pretoriaAreas.map(name => ({ "@type": name === "Pretoria" || name === "Centurion" ? "City" : "Place", name, containedInPlace: { "@type": "AdministrativeArea", name: "Gauteng" } })),
        { "@type": "Country", name: "South Africa" },
      ],
      founder: { "@id": `${siteUrl}/about#sabelo-ndlovu` },
      sameAs: ["https://www.instagram.com/ntombii_tech", "https://www.facebook.com/ntombiitech"],
    },
    {
      "@type": "Person", "@id": `${siteUrl}/about#sabelo-ndlovu`, name: "Sabelo Ndlovu",
      url: `${siteUrl}/about`, jobTitle: "Founder and digital product developer",
      worksFor: { "@id": businessId },
      sameAs: ["https://www.linkedin.com/in/sabelo-ndlovu-052a033ab"],
    },
    {
      "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "Ntombii Tech", url: `${siteUrl}/`,
      inLanguage: "en-ZA", publisher: { "@id": businessId },
    },
  ],
};

export function projectSchema(project: PortfolioProject) {
  return {
    "@type": "WebSite", "@id": `${siteUrl}/work#${project.id}`,
    name: project.name, url: project.url, description: project.description,
    image: `${siteUrl}${project.desktop.src}`, creator: { "@id": businessId },
  };
}

export function portfolioSchema(path: "/" | "/work") {
  return {
    "@context": "https://schema.org", "@type": "ItemList", "@id": `${siteUrl}${path}#portfolio`,
    name: "Websites built by Ntombii Tech",
    itemListElement: portfolioProjects.map((project, index) => ({
      "@type": "ListItem", position: index + 1, item: projectSchema(project),
    })),
  };
}

export function serviceSchema(service: { slug: string; name: string; intro: string; offering: readonly string[] }) {
  const additional = service.slug !== "websites";
  return {
    "@context": "https://schema.org", "@type": "Service", "@id": `${siteUrl}/services/${service.slug}#service`,
    name: service.name, serviceType: service.offering,
    url: `${siteUrl}/services/${service.slug}`, provider: { "@id": businessId },
    description: `${service.intro}${additional ? " Additional service available on request. Availability and scope are confirmed before work is agreed." : ""}`,
    areaServed: { "@type": "Country", name: "South Africa" },
  };
}
