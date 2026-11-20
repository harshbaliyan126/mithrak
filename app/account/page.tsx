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
