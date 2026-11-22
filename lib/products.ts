// Catalogue data. Replace with a CMS / Shopify / database later —
// every page reads products only through the helpers at the bottom of this file.

export type Size = { label: string; price: number };

export type Product = {
  slug: string;
  name: string;
  kind: "Eau de Parfum" | "Eau de Parfum Set";
  family: "Floral" | "Woody" | "Amber" | "Fresh" | "Set";
  /** Short line under the name on the product page, e.g. "Golden saffron amber". */
  subtitle: string;
  /** Three words shown on the left of the product page. */
  descriptor: string;
  /** Campaign-style line used on the homepage. */
  tagline: string;
  description: string;
  /** "Wearing it" accordion on the product page. */
  wearing: string;
  ingredients: string;
  /** Listed large on the product page, one per line. */
  notes: string[];
  sizes: Size[];
  badge?: "New" | "Top Seller" | "Limited";
  /** Liquid colour used by the placeholder bottle illustration. */
  liquid: string;
  /** Card background colour (Lore uses a light grey for most products). */
  tint: string;
  /** Product page background gradient, top → bottom. Mid-tones so white text stays readable. */
  gradient: [string, string];
  /** Card background on hover, top → bottom, taken from the product photo's colours. */
  hoverGradient?: [string, string];
  /** Optional texture image (file in /public/textures): the product page background and the
   *  homepage card's hover background, in place of the gradients. */
  texture?: string;
  /** Whether the texture is mostly dark (white text on it, the default) or light (dark text). */
  textureTone?: "dark" | "light";
  /** Optional real product photos (put files in /public/products). */
  images?: string[];
  /** Optional video for the homepage hero / product page (put files in /public/video). */
  video?: string;
};

const CARD = "#f4f4f4";
const INGREDIENTS =
  "Alcohol denat., parfum (fragrance), aqua (water), limonene, linalool, citronellol, geraniol. Vegan and cruelty-free.";

export const products: Product[] = [
  {
    slug: "kos",
    name: "Kos",
    kind: "Eau de Parfum",
    family: "Amber",
    subtitle: "Golden saffron amber",
    descriptor: "Warm, golden, glowing",
    tagline: "Late light on old brass.",
    description:
      "The last hour before dusk, when everything turns gold. Kashmiri saffron is warmed by a slow amber that stays close to the skin, like sunlight held in the palm.",
    wearing: "For evenings that start early. Two sprays on the wrists and one at the collarbone.",
    ingredients: INGREDIENTS,
    notes: ["Saffron", "pink pepper", "osmanthus", "soft leather", "and amber"],
    sizes: [
      { label: "50ml", price: 2999 },
      { label: "10ml", price: 1450 },
    ],
    badge: "New",
    liquid: "#d9a441",
    tint: CARD,
    gradient: ["#c4b9a4", "#b5823a"],
    images: ["/productRailImages/m4.png"],
    hoverGradient: ["#f6e6d8", "#e0a170"],
    texture: "/textures/kos-flowers.webp",
    textureTone: "light",
  },
  {
    slug: "monsoon-letter",
    name: "Monsoon Letter",
    kind: "Eau de Parfum",
    family: "Fresh",
    subtitle: "Petrichor and green vetiver",
    descriptor: "Wet, green, mineral",
    tagline: "The first rain on red earth.",
    description:
      "Petrichor, wet stone and torn green leaves. A letter written at the window while the first monsoon rain falls, with vetiver keeping the ink from running.",
    wearing: "For grey mornings and long walks. Spray generously; it is quiet, not shy.",
    ingredients: INGREDIENTS,
    notes: ["Petrichor", "green mandarin", "violet leaf", "wet clay", "and vetiver"],
    sizes: [
      { label: "50ml", price: 4800 },
      { label: "10ml", price: 1450 },
    ],
    badge: "Top Seller",
    liquid: "#9fb08a",
    tint: CARD,
    gradient: ["#b9bbb2", "#6f8a72"],
  },
  {
    slug: "raat-rani",
    name: "Raat Rani",
    kind: "Eau de Parfum",
    family: "Floral",
    subtitle: "Night-blooming jasmine",
    descriptor: "Heady, creamy, nocturnal",
    tagline: "Night jasmine over a quiet courtyard.",
    description:
      "The queen of the night opens only after dark. Heady night-blooming jasmine and tuberose, softened by a cool breeze of green tea and a skin-like musk.",
    wearing: "For after dark. One spray behind each ear is enough to follow you around a room.",
    ingredients: INGREDIENTS,
    notes: ["Night jasmine", "tuberose", "green tea", "skin musk", "and sandalwood"],
    sizes: [
      { label: "50ml", price: 4800 },
      { label: "10ml", price: 1450 },
    ],
    badge: "New",
    liquid: "#ece4c9",
    tint: CARD,
    gradient: ["#bdbab3", "#7f8aa0"],
  },
  {
    slug: "eden",
    name: "Eden",
    kind: "Eau de Parfum",
    family: "Woody",
    subtitle: "Smoked oud and plum",
    descriptor: "Dark, plush, smoky",
    tagline: "A dark room, a red curtain.",
    description:
      "Smoky oud wrapped in plum and rose, as soft as velvet and as deep as the evening it belongs to. Made for long nights and slow conversations.",
    wearing: "For long nights. Spray on clothes as well as skin; it lasts into the next morning.",
    ingredients: INGREDIENTS,
    notes: ["Plum", "clove", "damask rose", "incense", "and oud"],
    sizes: [
      { label: "50ml", price: 2999 },
      { label: "10ml", price: 1650 },
    ],
    badge: "Top Seller",
    liquid: "#7a2f35",
    tint: CARD,
    gradient: ["#b3a4a2", "#6b3038"],
    images: ["/productRailImages/m2.png"],
    hoverGradient: ["#e8e8ea", "#9a9a9e"],
    texture: "/textures/eden-paper.webp",
    textureTone: "light",
  },
  {
    slug: "rusu",
    name: "Rusu",
    kind: "Eau de Parfum",
    family: "Fresh",
    subtitle: "Sea salt and dry vetiver",
    descriptor: "Salty, airy, clean",
    tagline: "Sea air in a linen shirt.",
    description:
      "A salt-washed breeze off the Konkan coast. Grapefruit and sea salt rest on a dry, earthy vetiver that feels clean without ever feeling cold.",
    wearing: "For warm days. Spray on the neck and chest; reapply after a swim.",
    ingredients: INGREDIENTS,
    notes: ["Sea salt", "grapefruit", "sage", "driftwood", "and vetiver"],
    sizes: [
      { label: "50ml", price: 2999 },
      { label: "10ml", price: 1450 },
    ],
    liquid: "#b9cdd0",
    tint: CARD,
    gradient: ["#b7b9b5", "#7d9db3"],
    images: ["/productRailImages/m3.png"],
    hoverGradient: ["#e5eef2", "#a9c1cb"],
    texture: "/textures/rusu-water.webp",
    textureTone: "light",
  },
  {
    slug: "sandal-smoke",
    name: "Sandal Smoke",
    kind: "Eau de Parfum",
    family: "Woody",
    subtitle: "Creamy sandalwood and incense",
    descriptor: "Milky, calm, sacred",
    tagline: "A temple at the end of the day.",
    description:
      "Creamy Mysore sandalwood and a curl of incense smoke drifting through cool stone. Calm, milky and quietly sacred.",
    wearing: "For slow days. Close to the skin; best worn where someone will lean in.",
    ingredients: INGREDIENTS,
    notes: ["Cardamom", "frankincense", "iris", "tonka", "and sandalwood"],
    sizes: [
      { label: "50ml", price: 5200 },
      { label: "10ml", price: 1550 },
    ],
    liquid: "#c9a98a",
    tint: CARD,
    gradient: ["#bfb5aa", "#8c6f58"],
  },
  {
    slug: "fig-courtyard",
    name: "Fig Courtyard",
    kind: "Eau de Parfum",
    family: "Fresh",
    subtitle: "Green fig and cedar",
    descriptor: "Green, milky, shaded",
    tagline: "Shade under a fig tree in May.",
    description:
      "Green fig leaves, milky fig flesh and sun-warmed walls. A shady, green scent for long afternoons that never quite end.",
    wearing: "For afternoons. Spray on the wrists and let it warm up in the sun.",
    ingredients: INGREDIENTS,
    notes: ["Fig leaf", "lemon", "fig milk", "coconut water", "and cedar"],
    sizes: [
      { label: "50ml", price: 4800 },
      { label: "10ml", price: 1450 },
    ],
    liquid: "#a9b67a",
    tint: CARD,
    gradient: ["#bbbcae", "#7b8752"],
  },
  {
    slug: "mare",
    name: "Mare",
    kind: "Eau de Parfum",
    family: "Floral",
    subtitle: "Dry rose and old paper",
    descriptor: "Powdery, dry, tender",
    tagline: "Pressed roses between old pages.",
    description:
      "A rose kept between the pages of a ledger for a hundred years. Dry, powdery and a little spiced, with paper and iris softening its edges.",
    wearing: "For every day. Two sprays at the base of the neck.",
    ingredients: INGREDIENTS,
    notes: ["Pink pepper", "lychee", "rose absolute", "iris", "and papyrus"],
    sizes: [
      { label: "50ml", price: 2999 },
      { label: "10ml", price: 1450 },
    ],
    badge: "New",
    liquid: "#e3a9a4",
    tint: CARD,
    gradient: ["#c2b6b3", "#a97573"],
    images: ["/productRailImages/m1.png"],
    hoverGradient: ["#efe9d6", "#c9b48c"],
    texture: "/textures/mare-forest.webp",
  },
  {
    slug: "discovery-set",
    name: "The Discovery Set",
    kind: "Eau de Parfum Set",
    family: "Set",
    subtitle: "Eight stories, 2ml each",
    descriptor: "Try, wear, choose",
    tagline: "Every Mithrak story in one box.",
    description:
      "All eight Mithrak fragrances in 2ml vials, so you can wear each one for a day before you choose. The cost of the set is credited toward your first 50ml.",
    wearing: "Wear one scent a day, for a full day, before you decide.",
    ingredients: INGREDIENTS,
    notes: ["Kos", "Monsoon Letter", "Raat Rani", "Eden", "and four more"],
    sizes: [{ label: "Set", price: 1200 }],
    badge: "New",
    liquid: "#c7b28f",
    tint: CARD,
    gradient: ["#bfbab0", "#8f8676"],
  },
  {
    slug: "ritual-set",
    name: "The Ritual Set",
    kind: "Eau de Parfum Set",
    family: "Set",
    subtitle: "Three travel sprays in linen",
    descriptor: "Morning, rain, night",
    tagline: "A wardrobe for the morning, the rain and the night.",
    description:
      "Kos, Monsoon Letter and Raat Rani in 10ml travel sprays, wrapped in a hand-stitched linen pouch.",
    wearing: "One for each part of the day. Small enough for any bag.",
    ingredients: INGREDIENTS,
    notes: ["Kos", "Monsoon Letter", "and Raat Rani"],
    sizes: [{ label: "Set", price: 3600 }],
    badge: "New",
    liquid: "#82915e",
    tint: CARD,
    gradient: ["#b9bcb0", "#6d7c4f"],
  },
];

/**
 * Homepage hero carousel ("Now playing"). Each slide plays its video full screen, then
 * moves to the next slide when the video ends.
 * - video: file in /public/videos
 * - zoom:  scales the video up to crop black bars baked into the footage (1 = none)
 * - image: product photo in the "Now playing" card (file in /public/heroCarouselImages)
 */
export const heroSlides: { slug: string; video: string; zoom?: number; image?: string }[] = [
  { slug: "rusu", video: "/videos/hero-1.webm", zoom: 1.06, image: "/heroCarouselImages/v1.png" },
  { slug: "eden", video: "/videos/hero-2.webm", zoom: 1.36, image: "/heroCarouselImages/v2.png" },
];
/** Homepage product rail. */
export const featuredSlugs = ["mare", "eden", "rusu", "kos"];
/** Homepage full-bleed campaign block: product in the frosted card + background video. */
export const campaign: { slug: string; video?: string; zoom?: number; image?: string } = {
  slug: "ritual-set",
  image: "/heroCarouselImages/v2.png",
  video: "/videos/hero-2.webm",
  zoom: 1.36,
};
/** Product thumbnails in the mobile menu. */
export const menuSlugs = ["ritual-set", "discovery-set", "mare", "kos"];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProducts(slugs: string[]) {
  return slugs.map(getProduct).filter((p): p is Product => Boolean(p));
}
