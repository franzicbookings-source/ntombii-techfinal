import { teamMembers } from "./team-members";
import { StructuredData } from "./structured-data";
import { businessId, siteUrl } from "./site-seo";

export function AboutTeam() {
  return <>
    <StructuredData data={{
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${siteUrl}/about#page`,
      name: "The Ntombii Tech team",
      url: `${siteUrl}/about`,
      mainEntity: {
        "@type": "Organization",
        "@id": businessId,
        name: "Ntombii Tech",
        member: teamMembers.map(member => ({
          "@type": "Person",
          "@id": `${siteUrl}/about#${member.id}`,
          name: member.name,
          jobTitle: member.role,
          description: member.description,
          image: `${siteUrl}${member.image}`,
          url: `${siteUrl}/about#${member.id}`,
          worksFor: { "@id": businessId },
        })),
      },
    }} />
    <section id="team" className="about-team-members wrap" aria-labelledby="about-team-title">
      <h2 id="about-team-title">Meet the team.</h2>
      <div className="about-team-grid">
        {teamMembers.map((member, index) => <article key={member.id} id={member.id} className={`team-person team-person-${member.id}`} aria-labelledby={`${member.id}-name`}>
          <div className="team-portrait"><img src={member.image} alt={member.name} width={member.imageWidth} height={member.imageHeight} loading={index === 0 ? "eager" : "lazy"} decoding="async" /></div>
          <div className="team-person-copy">
            <h3 id={`${member.id}-name`}>{member.name}</h3>
            <p className="team-role">{member.role}</p>
            <p>{member.description}</p>
          </div>
        </article>)}
      </div>
    </section>
  </>;
}
