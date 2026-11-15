import Link from "next/link";
import { type NavOptions, PRIMARY_CTA, PRIMARY_CTA_SHORT, headerNav } from "@/resources/navigation";
import { site } from "@/resources/site";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";
import s from "./layout.module.scss";

/**
 * Site header (docs/website-transformation/04 §8, 08 §7). Server component: the menu data is
 * resolved here from the gated navigation, so unpublished pages never reach the client.
 * `navOptions` is for the internal review page only.
 */
export function Header({ navOptions }: { navOptions?: NavOptions }) {
  const items = headerNav(navOptions);
  return (
    <header className={s.header}>
      <div className={s.bar}>
        <Link className={s.logo} href="/" aria-label={`${site.brand} home`}>
          {site.brand}
          <i aria-hidden="true" />
        </Link>
        <MegaMenu items={items} />
        <Link className={`${s.cta} ${s.ctaFull}`} href={PRIMARY_CTA.href}>
          {PRIMARY_CTA.label}
        </Link>
        <Link className={`${s.cta} ${s.ctaShort}`} href={PRIMARY_CTA_SHORT.href}>
          {PRIMARY_CTA_SHORT.label}
        </Link>
        <MobileDrawer items={items} cta={PRIMARY_CTA} />
      </div>
    </header>
  );
}
