import works from "./graphic-works.json";

export const graphicCollections = [
  { id: "all", label: "All work" },
  { id: "clients", label: "Client campaigns" },
  { id: "websites", label: "Websites" },
  { id: "products", label: "Products" },
  { id: "print", label: "Print & branding" },
] as const;
export type GraphicCollection = typeof graphicCollections[number]["id"];
export type GraphicWork = typeof works[number];
export const graphicPageSize = 9;

const selected = [
  "business-browsable", "snesenzo-team", "toner-code",
  "a-good-introduction", "four-colours", "let-them-choose",
  "look-up", "snesenzo-vip", "counter-to-browser",
];
const rank = new Map(selected.map((slug, index) => [slug, index]));
export const orderedGraphicWorks = [...works].sort((a, b) => (rank.get(a.slug) ?? selected.length) - (rank.get(b.slug) ?? selected.length));

export function graphicCollectionFor(work: GraphicWork): Exclude<GraphicCollection, "all"> {
  if (work.brand !== "Ntombii Tech") return "clients";
  if (work.category === "Website campaign") return "websites";
  if (work.category.startsWith("Product") || work.category === "Print advice campaign") return "products";
  return "print";
}
