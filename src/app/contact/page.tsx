import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections";
import { ContactForm } from "@/components/sections/ContactForm";
import sec from "@/components/sections/sections.module.scss";
import { Eyebrow, Page, Section, TextLink } from "@/components/ui";
import { site } from "@/resources/site";

/**
 * /contact (docs/website-transformation/07 §6.12; prototype: contact.html).
 * One form for every enquiry. Direct contact details, booking link and any response-time
 * promise appear only once verified in site.ts (V-10).
 */
const PATH = "/contact";
const TITLE = "Contact | Discuss Your Cloud Strategy";
const DESCRIPTION =
  "Tell us which clouds you run, what you need to secure and which frameworks apply. One form for cloud, DevSecOps, security and compliance enquiries.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: canonical(PATH) },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonical(PATH), type: "website" },
};

export default function ContactPage() {
  const direct = site.email || site.phone || site.city;
  return (
    <Page>
      <PageHero
        trail={[{ label: "Contact", href: PATH }]}
        title="Discuss your cloud strategy."
        lead="Tell us what you run and what needs to change. The more specific you are, the more useful our first reply will be."
      />
      <Section tight>
        <div className={sec.contactSplit}>
          <ContactForm />
          <aside aria-label="About contacting us">
            <div>
              <Eyebrow>What happens next</Eyebrow>
              <ol className={sec.next}>
                <li>
                  <strong>We read it.</strong>Your message goes to the practice that matches your topic.
                </li>
                <li>
                  <strong>We reply by email.</strong>With questions, or a time to talk.
                </li>
                <li>
                  <strong>We agree a scope.</strong>Before any work starts.
                </li>
              </ol>
              {site.responseTime && <p>{site.responseTime}</p>}
            </div>
            {(direct || site.bookingUrl) && (
              <div>
                <Eyebrow>Other ways to reach us</Eyebrow>
                {site.bookingUrl && (
                  <p>
                    <TextLink href={site.bookingUrl}>Book a 30-minute call</TextLink>
                  </p>
                )}
                {site.email && (
                  <p>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </p>
                )}
                {site.phone && <p>{site.phone}</p>}
                {site.city && <p>{site.city}</p>}
              </div>
            )}
            <p>
              Looking for a job? See <Link href="/careers">Careers</Link>.
            </p>
          </aside>
        </div>
      </Section>
    </Page>
  );
}
