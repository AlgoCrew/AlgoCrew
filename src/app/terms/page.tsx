import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import styles from "../privacy-policy/legal.module.scss";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "Terms of Service",
      description: "Terms governing use of AlgoCrew's website and services.",
      baseURL,
      path: "/terms",
    }),
    alternates: { canonical: "/terms" },
  };
}

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>LEGAL</span>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.meta}>Last updated: January 2025 · AlgoCrew Ltd.</p>
        </div>

        <div className={styles.body}>
          <Section title="1. Acceptance of Terms">
            By accessing or using the AlgoCrew website (algocrew.io) or engaging our services, you agree to be bound by these Terms of Service. If you do not agree, do not use our site or services.
          </Section>

          <Section title="2. Services">
            AlgoCrew provides software engineering, cloud infrastructure, AI, and consulting services. The specific scope, deliverables, timeline, and fees for each engagement are agreed in a separate Statement of Work (&ldquo;SOW&rdquo;) or Service Agreement signed by both parties.
          </Section>

          <Section title="3. Client Obligations">
            <ul>
              <li>Provide timely feedback and approvals to keep delivery on schedule.</li>
              <li>Supply accurate requirements, credentials, and access needed for the project.</li>
              <li>Make payments according to the agreed milestone schedule.</li>
              <li>Ensure any third-party materials provided to AlgoCrew do not infringe intellectual property rights.</li>
            </ul>
          </Section>

          <Section title="4. Intellectual Property">
            <p>Upon receipt of full payment for a project:</p>
            <ul>
              <li>All custom code, designs, and deliverables become the sole property of the client.</li>
              <li>AlgoCrew retains no licence or right to use client-specific work.</li>
              <li>Open-source libraries used in the project remain under their respective licences.</li>
              <li>AlgoCrew retains ownership of pre-existing tools, frameworks, and methodologies.</li>
            </ul>
          </Section>

          <Section title="5. Confidentiality">
            Both parties agree to keep confidential any proprietary information shared during the engagement. NDAs are signed before any discovery call. This obligation survives the termination of any agreement for a period of 3 years.
          </Section>

          <Section title="6. Payment Terms">
            <ul>
              <li>Invoices are due within 14 days of issue unless otherwise stated in the SOW.</li>
              <li>Late payments accrue interest at 2% per month.</li>
              <li>AlgoCrew reserves the right to pause work on accounts with invoices overdue by more than 30 days.</li>
              <li>Deposits are non-refundable unless AlgoCrew fails to commence work within the agreed timeline.</li>
            </ul>
          </Section>

          <Section title="7. Termination">
            <p>Either party may terminate an ongoing engagement with 30 days&apos; written notice. On termination:</p>
            <ul>
              <li>All work completed to date will be invoiced and must be paid.</li>
              <li>Deliverables completed and paid for will be transferred to the client.</li>
              <li>Work in progress remains with AlgoCrew until payment is received.</li>
            </ul>
          </Section>

          <Section title="8. Limitation of Liability">
            AlgoCrew&apos;s total liability for any claim arising out of or related to our services shall not exceed the total fees paid by the client in the three months preceding the claim. AlgoCrew is not liable for indirect, incidental, consequential, or punitive damages.
          </Section>

          <Section title="9. Warranties">
            AlgoCrew warrants that work will be performed in a professional manner consistent with industry standards. We do not warrant that deliverables will be error-free or meet all business objectives, the client is responsible for validating that deliverables meet their requirements.
          </Section>

          <Section title="10. Governing Law">
            These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </Section>

          <Section title="11. Changes to These Terms">
            We may update these Terms from time to time. Material changes will be communicated to active clients. Continued engagement with AlgoCrew after changes constitutes acceptance.
          </Section>

          <Section title="12. Contact">
            For legal enquiries: <a href="mailto:legal@algocrew.io">legal@algocrew.io</a>
          </Section>
        </div>
      </div>
    </div>
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
