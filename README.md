# Mithrak

Perfume e-commerce storefront built with Next.js (App Router) and TypeScript.
Layout, type scale and interactions follow lore.world; brand, fonts, copy and products are Mithrak's.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | File |
| --- | --- |
| Products, prices, notes, colours, hero/featured lists | `lib/products.ts` |
| Currency, announcement bar, nav, editorial line, footer links | `lib/site.ts` |
| Colours, fonts, all styling | `app/globals.css` (tokens at the top) |
| Logo components (generated from `logos/`) | `components/Logo.tsx`, `lib/logo-paths.ts` |
| Placeholder policy pages | `app/info/[slug]/page.tsx` |

## Fonts

- **Athelas** (primary — headings, product names, editorial text). Commercial font: add licensed
  `.woff2` files to `public/fonts/` (see the README there).
- **Funnel Display** (secondary — navigation, buttons, labels, prices). Loaded from Google Fonts via `next/font`.

## Images

Products show an SVG bottle until real photos are added. Put photos in `public/products/` and set
`images: [...]` on the product: image 1 is the card / product-page bottle shot, images 2–4 are the
editorial stills in the product page's centre column (use transparent PNGs for image 1).

## Hero videos

The homepage hero fills the screen and plays the videos listed in `heroSlides` (`lib/products.ts`),
one per slide; when a video ends, the next slide starts. Put files in `public/videos/` (`.webm` or `.mp4`).
`zoom` scales a video up to crop black bars baked into the footage (`1` = no zoom).

The campaign block uses `campaign.video` (same file / `zoom` rules) and only plays while on screen.
The end of each product page shows a moving colour field until you set `video` on that product.

## Instagram ("The stories we share")

The homepage shows the account's 6 most-liked posts (images only; each opens the post on Instagram).
Posts are fetched on the server and refreshed every 6 hours. Without a token (or if the API fails), the
grid shows the first 6 images in `public/images/` (sorted by file name), each linking to the profile.

1. The Instagram account must be a **Business** or **Creator** account (Instagram → Settings → Account type).
2. At developers.facebook.com create an app → use case *Manage messaging & content on Instagram* →
   *API setup with Instagram login* → add the account → **Generate token** (`instagram_business_basic`).
3. Put the token in `.env.local` (copy `.env.example`) and in your hosting provider's environment variables:
   `INSTAGRAM_ACCESS_TOKEN=IGAA...`
4. The token lasts 60 days. Refresh it before then and update the env var:
   `curl "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=$INSTAGRAM_ACCESS_TOKEN"`

## Not wired up yet

- Checkout / payments (`/checkout` is a placeholder — Razorpay, Stripe or Shopify)
- Account sign-in (`/account` is UI only)
- Newsletter signup (`components/Footer.tsx`, marked TODO)
- The cart is stored in the browser (localStorage)
