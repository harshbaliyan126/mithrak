import type { Metadata } from "next";
import { WorkInProgress } from "@/components/WorkInProgress";

export const metadata: Metadata = { title: "Work in progress" };

// Work in progress: every page except the homepage shows a placeholder for now.
// The original page is kept below, commented out. To restore it, delete everything
// above the comment block and remove the comment markers.
export default function Account() {
  return <WorkInProgress />;
}

/* ---- Original page (disabled) ----
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Account" };

// UI only — wire to your auth provider (Shopify customer accounts, NextAuth, etc.).
export default function Account() {
  return (
    <div className="text-page">
      <h1 className="serif-heading">Sign in</h1>
      <form className="form">
        <label>
          <span className="label">Email</span>
          <input type="email" required />
        </label>
        <label>
          <span className="label">Password</span>
          <input type="password" required />
        </label>
        <button type="submit" className="btn btn-dark btn-block">
          Sign in
        </button>
      </form>
    </div>
  );
}
---- end original page ---- */
