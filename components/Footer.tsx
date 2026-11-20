"use client";

import Link from "next/link";
import { useState } from "react";
import { footerColumns } from "@/lib/site";
import { Emblem } from "./Logo";

function Subscribe() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  if (done) return <p className="subscribe label">Thank you — you are on the list</p>;
  if (!open)
    return (
      <button className="subscribe label" onClick={() => setOpen(true)}>
        Subscribe to our letters
      </button>
    );
  return (
    <form
      className="subscribe subscribe-form"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: connect to your email provider (Klaviyo, Mailchimp, etc.)
        setDone(true);
      }}
    >
      <input type="email" required placeholder="EMAIL" aria-label="Email address" autoFocus />
      <button type="submit" className="label">
        Join
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <Emblem className="footer-emblem" />
      <Subscribe />
      <div className="footer-cols">
        {footerColumns.map((col, i) => (
          <div key={i} className="footer-col">
            {col.map((l) => (
              <Link key={l.label} href={l.href} className="label">
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bar">
        <span>® MITHRAK {new Date().getFullYear()}</span>
        <span>Crafted in India</span>
        <div>
          <Link href="/info/terms">Terms of Service</Link>
          <Link href="/info/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
