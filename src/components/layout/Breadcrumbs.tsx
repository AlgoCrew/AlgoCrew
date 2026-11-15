import Link from "next/link";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import s from "./layout.module.scss";

/**
 * Breadcrumb trail with matching BreadcrumbList structured data.
 * Pass the full trail including the current page; "Home" is added automatically.
 */
export function Breadcrumbs({ trail }: { trail: readonly { label: string; href: string }[] }) {
  const full = [{ label: "Home", href: "/" }, ...trail];
  return (
    <nav aria-label="Breadcrumb">
      <ol className={s.crumbs}>
        {full.map((item, i) =>
          i === full.length - 1 ? (
            <li key={item.href} aria-current="page">
              {item.label}
            </li>
          ) : (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ),
        )}
      </ol>
      <JsonLd data={breadcrumbSchema(full)} />
    </nav>
  );
}
