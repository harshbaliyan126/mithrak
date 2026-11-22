import type { Metadata } from "next";
import { WorkInProgress } from "@/components/WorkInProgress";

export const metadata: Metadata = { title: "Work in progress" };

// Work in progress: every page except the homepage shows a placeholder for now.
// The original page is kept below, commented out. To restore it, delete everything
// above the comment block and remove the comment markers.
export default function Checkout() {
  return <WorkInProgress />;
}

/* ---- Original page (disabled) ----
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Checkout" };

// Placeholder. Connect a payment provider here (Razorpay, Stripe, or Shopify checkout).
export default function Checkout() {
  return (
    <div className="text-page">
      <h1 className="serif-heading">Checkout</h1>
      <p>Payments are not connected yet. This is where the payment step will go.</p>
      <Link href="/shop" className="btn btn-dark">
        Back to shop
      </Link>
    </div>
  );
}
---- end original page ---- */
