// Site-wide settings: currency, announcements, navigation, footer.

export const CURRENCY = { code: "INR", locale: "en-IN" };

export function formatPrice(amount: number) {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: "currency",
    currency: CURRENCY.code,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const announcements = [
  "Complimentary shipping & samples on orders ₹2,999+",
  "A free 2ml sample with every 50ml purchase",
];

export const mainNav = [
  { label: "Shop", href: "/shop" },
  { label: "Explore", href: "/about" },
];

export const collectionIntro = ["Scents that carry a memory—", "Warm, quiet and personal. Familiar but new."];

export const editorialLine = "Every bottle begins with a memory—";

export const footerColumns = [
  [
    { label: "About", href: "/about" },
    { label: "Ingredients", href: "/info/ingredients" },
    { label: "Explore", href: "/about" },
  ],
  [
    { label: "Store Locator", href: "/info/stockists" },
    { label: "Accessibility", href: "/info/accessibility" },
    { label: "FAQs", href: "/info/faqs" },
  ],
  [
    { label: "Shipping & Returns", href: "/info/shipping-returns" },
    { label: "Privacy Policy", href: "/info/privacy-policy" },
  ],
];

export const social = {
  instagram: "https://www.instagram.com/mithrak/",
  handle: "@mithrak",
};
