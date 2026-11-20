# About page and team update

24 October 2026. The owner requested a less empty desktop About page, a team section and a profile for Sthembile Ndlovu, who leads web and graphic design and works closely with Sabelo.

The existing /about URL, navigation, logo, Satoshi, slate palette, founder story, reviews and WhatsApp routes are retained. The hero now uses a compact heading/introduction grid. Two team profiles sit side by side on desktop, with image and biography grouped together; smaller screens reflow without clipping. Founder-story heading now identifies Sabelo as the narrator. About-only CSS is scoped to the page and does not restyle the homepage or other service pages.

Profiles are maintained in components/team-members.ts, rendered by components/about-team.tsx. Sthembile's role is Web & Graphic Design Lead, without a manager title. Her biography describes page layouts and business graphics, working closely with Sabelo. No qualifications, clients, personal contacts, age, grade or school were invented or added. Person references and AboutPage metadata use the same public names and roles. Existing public founder identity is preserved.

Her supplied photo received an AI-assisted photographic cleanup for colour, exposure and background distractions. The edited full-length source is retained in marketing/sthembile-exams/assets/sthembile-polished.png. The website uses a WebP version with responsive CSS portrait crops; dimensions match the actual encoded image. The exam-wishes poster is a separate marketing deliverable, not an extra portfolio/gallery entry.

Validation: TypeScript, production Worker build and all14 rendered tests, including an About-page team/schema regression test, pass. Browser checks cover320,390,768,1024 and1440px, both profiles, image loading, the team anchor, WhatsApp URL, mobile navigation and runtime errors. Axe WCAG A/AA checks pass at390 and1440px. Desktop and phone crops reviewed. The desktop baseline was3639px high; the revised page is approximately3065px at the same1440px viewport despite the added team profiles. QA scripts, reports and screenshots are in /workspace/ntombii-site-qa/about-team/.

## Story correction and expansion, 24 October 2026

The owner clarified that Sabelo worked in the music industry as an artist manager and bookings manager, rather than making music. The About story and short homepage bio now state that background accurately. Sthembile's story explains how her uncle Sabelo introduced her to computers, AI and technology, followed by her own interest in structuring websites and creating graphics. Her short profile and its schema description were refined together. Public copy uses the background selectively without adding age, school details, credentials or invented accomplishments. Two attributed stories share a balanced desktop band and stack on phones. Portraits, role titles, services, contacts and the exam poster remain as previously approved.

## Shared family story, 24 October 2026

The owner supplied and approved a new direction: one uncle-and-niece story, headed “An uncle, his niece, and a laptop in Newcastle.” This supersedes the separate biographies above. The team cards now use Founder & Developer and Design Lead. The owner explicitly included Sthembile’s age (15) and Grade 9 in the public copy; that direction supersedes the earlier omission. No school name, birth date, invented client anecdote or unverified career duration is added. The music background remains artist management and bookings. The homepage About introduction now reflects both collaborators.

The narrative flows through two text columns on desktop and one on phones. Existing portraits, brand, contacts, services and reviews remain intact. TypeScript, production build and all 14 tests pass. Browser checks at 320, 390, 768, 1024 and 1440px pass for overflow, images, navigation, WhatsApp and team anchor; axe checks pass at 390 and 1440px. The changed React components remain static with no extra client dependencies or effects. Evidence: /workspace/ntombii-site-qa/family-story/.
