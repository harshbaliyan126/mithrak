import Link from "next/link";

/** Shown on every page except the homepage while the rest of the site is being built. */
export function WorkInProgress() {
  return (
    <div className="text-page wip">
      <p className="label">Coming soon</p>
      <h1 className="serif-heading">Work in progress</h1>
      <p>We are still putting this page together. Please check back soon.</p>
      <Link href="/" className="btn btn-dark">
        Return home
      </Link>
    </div>
  );
}
