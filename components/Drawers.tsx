"use client";

import Link from "next/link";
import { getProduct, getProducts, menuSlugs } from "@/lib/products";
import { formatPrice, mainNav } from "@/lib/site";
import { CloseIcon } from "./Icons";
import { ProductMedia } from "./ProductMedia";
import { useStore } from "./StoreProvider";

function Panel({
  open,
  side,
  label,
  onClose,
  children,
}: {
  open: boolean;
  side: "right" | "left";
  label: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={`drawer-root ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer-scrim" onClick={onClose} />
      <aside className={`drawer drawer-${side}`} role="dialog" aria-modal="true" aria-label={label}>
        <button className="drawer-close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </aside>
    </div>
  );
}

function CartDrawer() {
  const { drawer, openDrawer, lines, subtotal, setQty, remove } = useStore();
  const close = () => openDrawer(null);

  return (
    <Panel open={drawer === "cart"} side="right" label="Cart" onClose={close}>
      {lines.length === 0 ? (
        <div className="cart-empty">
          <p className="label">Your cart is empty</p>
          <p className="cart-login">
            Have an account?{" "}
            <Link href="/account" onClick={close}>
              Log in
            </Link>{" "}
            to check out faster.
          </p>
          <Link href="/shop" className="btn btn-dark" onClick={close}>
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <p className="label cart-title">Cart</p>
          <ul className="cart-lines">
            {lines.map((l) => {
              const p = getProduct(l.slug);
              if (!p) return null;
              const price = p.sizes.find((s) => s.label === l.size)?.price ?? 0;
              return (
                <li key={l.slug + l.size} className="cart-line">
                  <Link href={`/products/${p.slug}`} className="cart-thumb" onClick={close}>
                    <ProductMedia product={p} sizes="96px" />
                  </Link>
                  <div className="cart-info">
                    <Link href={`/products/${p.slug}`} className="serif-name" onClick={close}>
                      {p.name}
                    </Link>
                    <span className="label">
                      {p.kind} · {l.size}
                    </span>
                    <div className="qty">
                      <button aria-label="Decrease quantity" onClick={() => setQty(l.slug, l.size, l.qty - 1)}>
                        −
                      </button>
                      <span>{l.qty}</span>
                      <button aria-label="Increase quantity" onClick={() => setQty(l.slug, l.size, l.qty + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-right">
                    <span className="label">{formatPrice(price * l.qty)}</span>
                    <button className="label underline" onClick={() => remove(l.slug, l.size)}>
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart-foot">
            <div className="cart-total label">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link href="/checkout" className="btn btn-dark btn-block" onClick={close}>
              Checkout
            </Link>
          </div>
        </>
      )}
    </Panel>
  );
}

function MenuDrawer() {
  const { drawer, openDrawer } = useStore();
  const close = () => openDrawer(null);
  return (
    <Panel open={drawer === "menu"} side="left" label="Menu" onClose={close}>
      <nav className="menu-list">
        {[...mainNav, { label: "Account", href: "/account" }].map((n) => (
          <Link key={n.href} href={n.href} onClick={close}>
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="menu-products">
        {getProducts(menuSlugs).map((p) => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="menu-product" onClick={close}>
            <div className="menu-product-media">
              <ProductMedia product={p} sizes="160px" />
            </div>
            <span className="serif-name">{p.name}</span>
            <span className="label">{formatPrice(p.sizes[0].price)}</span>
          </Link>
        ))}
      </div>
    </Panel>
  );
}

export function Drawers() {
  return (
    <>
      <CartDrawer />
      <MenuDrawer />
    </>
  );
}
