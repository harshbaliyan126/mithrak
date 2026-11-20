import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-page">
      <h1 className="serif-heading">This page has drifted away</h1>
      <Link href="/" className="btn btn-dark">
        Return home
      </Link>
    </div>
  );
}
