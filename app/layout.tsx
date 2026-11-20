import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import { AnnouncementBar, Header } from "@/components/Header";
import { Drawers } from "@/components/Drawers";
import { Footer } from "@/components/Footer";
import { StoreProvider } from "@/components/StoreProvider";
import "./globals.css";

// Secondary typeface (navigation, labels, buttons, body copy).
// Primary typeface Athelas (headings, product names) is loaded via @font-face in globals.css.
const funnel = Funnel_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-funnel",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Mithrak — Fragrances that tell stories", template: "%s — Mithrak" },
  description: "Mithrak makes eaux de parfum about memory and place, made in small batches in India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={funnel.variable}>
      <body>
        <StoreProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Drawers />
        </StoreProvider>
      </body>
    </html>
  );
}
