import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import styles from "./legal.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: "Privacy Policy — AlgoCrew",
    description: "How AlgoCrew collects, uses, and protects your personal data.",
    baseURL,
    path: "/privacy-policy",
  });
}

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>LEGAL</span>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.meta}>Last updated: January 2025 · AlgoCrew Ltd.</p>
        </div>

        <div className={styles.body}>
          <Section title="1. Who We Are">
            AlgoCrew Ltd. (&ldquo;AlgoCrew&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a software engineering and consulting agency. Our website is algocrew.io. For privacy enquiries contact us at <a href="mailto:query@algocrew.io">query@algocrew.io</a>.
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect information you provide directly:</p>
            <ul>
              <li><strong>Contact forms</strong> — name, email address, company name, and your message.</li>
              <li><strong>Calendar bookings</strong> — name, email, and any details you add when booking a call via Cal.com.</li>
              <li><strong>Email correspondence</strong> — any information included in emails you send to us.</li>
            </ul>
            <p>We also collect information automatically when you visit our site:</p>
            <ul>
              <li><strong>Log data</strong> — IP address, browser type, pages visited, time spent.</li>
              <li><strong>Analytics</strong> — via privacy-respecting, cookie-free analytics (Plausible). No personal data is stored.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul>
              <li>To respond to enquiries and provide the services you requested.</li>
              <li>To schedule and conduct calls or meetings.</li>
              <li>To send project updates, invoices, and contractual documents.</li>
              <li>To improve our website and services.</li>
              <li>To comply with legal obligations.</li>
            </ul>
            <p>We do <strong>not</strong> sell, rent, or share your data with third parties for marketing.</p>
          </Section>

          <Section title="4. Legal Basis for Processing (GDPR)">
            <p>If you are in the EEA or UK, we process your data under these lawful bases:</p>
            <ul>
              <li><strong>Contract</strong> — to fulfil our obligations to you as a client.</li>
              <li><strong>Legitimate interest</strong> — to respond to enquiries and improve our services.</li>
              <li><strong>Consent</strong> — where you have explicitly opted in (e.g. marketing emails).</li>
            </ul>
          </Section>

          <Section title="5. Data Retention">
            We retain contact and project data for 5 years after the end of a client relationship, or as long as required by law. Analytics data is aggregated and never stored at the individual level.
          </Section>

          <Section title="6. Third-Party Services">
            <p>We use the following sub-processors:</p>
            <ul>
              <li><strong>Vercel</strong> — website hosting (US/EU)</li>
              <li><strong>Cal.com</strong> — meeting scheduling</li>
              <li><strong>Plausible Analytics</strong> — privacy-first analytics (EU-hosted)</li>
              <li><strong>Slack</strong> — internal communication</li>
            </ul>
            <p>Each is bound by their own privacy policies and GDPR-compliant data processing agreements.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you.</li>
              <li>Correct inaccurate data.</li>
              <li>Request deletion (&ldquo;right to be forgotten&rdquo;).</li>
              <li>Restrict or object to processing.</li>
              <li>Data portability.</li>
              <li>Withdraw consent at any time (where consent is the basis).</li>
            </ul>
            <p>To exercise any of these rights, email <a href="mailto:query@algocrew.io">query@algocrew.io</a>. We will respond within 30 days.</p>
          </Section>

          <Section title="8. Cookies">
            Our website uses no tracking or advertising cookies. We use a single session cookie required for the website to function. You can disable cookies in your browser settings — this will not affect your ability to browse the site.
          </Section>

          <Section title="9. Security">
            We use industry-standard security measures including TLS encryption, access controls, and secure cloud infrastructure. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security.
          </Section>

          <Section title="10. Changes to This Policy">
            We may update this policy from time to time. Material changes will be communicated by updating the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of our site after changes constitutes acceptance of the updated policy.
          </Section>

          <Section title="11. Contact">
            For privacy-related questions: <a href="mailto:query@algocrew.io">query@algocrew.io</a>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}
