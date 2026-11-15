import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'
import '@/resources/tokens.css'
import '@/styles/motion.css'
import './global.scss'


import { Background, Column, Flex, Meta, opacity, SpacingToken } from "@once-ui-system/core";
import { Providers } from '@/components';
import { JsonLd, organizationSchema } from '@/components/seo/JsonLd';
// site-v2 shell (roadmap T3.11). The old Header/Footer stay in the repo until the cleanup release.
import { ConsentBanner, Footer, Header, MotionScope } from '@/components/layout';
import { baseURL, effects, fonts, style, dataStyle, home } from '@/resources';


// Site-wide defaults. Every page sets its own title and description; these apply only where one is missing.
const SITE_TITLE = "AlgoCrew | Cloud Engineering, DevSecOps & Compliance";
const SITE_DESCRIPTION =
  "Specialist cloud engineering partner: cloud consulting and migration, DevOps and DevSecOps, cloud security, compliance readiness and managed cloud services.";

export async function generateMetadata() {
  return {
    title: {
      default: SITE_TITLE,
      template: "%s | AlgoCrew",
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(baseURL),
    alternates: {
      canonical: `${baseURL}${home.path}`,
    },
    authors: [{ name: "AlgoCrew", url: baseURL }],
    creator: "AlgoCrew",
    publisher: "AlgoCrew",
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "AlgoCrew",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: `${baseURL}${home.path}`,
      images: [
        {
          url: `${baseURL}${home.image}`,
          width: 1200,
          height: 630,
          alt: SITE_TITLE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@algocrew",
      creator: "@algocrew",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [`${baseURL}${home.image}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      ],
      apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    },
    manifest: "/manifest.json",
    verification: {
      // Add your Google Search Console verification token here after verifying
      // google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
    },
  };
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      data-theme="light"
      data-brand="custom"
      data-accent="custom"
      data-neutral="slate"
      data-solid="contrast"
      data-solid-style="flat"
      data-border="playful"
      data-surface="translucent"
      data-transition="all"
      data-scaling="100"
      className={[
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
        'body-overflow-overlay'
      ].join(' ')}
    >
      <head>
        {/* Fonts are self-hosted via next/font/google — no Google Fonts CDN requests needed */}

        {/* Organization (verified facts only, src/resources/site.ts) and WebSite */}
        <JsonLd data={organizationSchema()} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": baseURL + "/#website",
            url: baseURL,
            name: "AlgoCrew",
            publisher: { "@id": baseURL + "/#organization" },
          }}
        />

        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                                    
                  // Set defaults from config
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    'solid-style': style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    'viz-style': dataStyle.variant,
                  })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Light only in release 1 (docs/website-transformation/08 §2, D-01).
                  // Drop any theme saved by the old toggle so nobody is stuck on dark.
                  localStorage.removeItem('data-theme');
                  root.setAttribute('data-theme', 'light');

                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />


        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>

      <Providers>
        <Column suppressHydrationWarning as="body" background="page" style={{
            minHeight: '100vh',
            margin: '0',
            padding: '0',
          }}
          className="body-overflow-overlay"
          fillWidth margin="0" padding="0" horizontal="center">
            {/* WCAG 2.4.1 (A) — skip repeated nav, jump to main content */}
            <a href="#main-content" className="skip-link">Skip to main content</a>

            <Header />

            <Flex
              as="main"
              id="main-content"
              tabIndex={-1}
              zIndex={0}
              fillWidth
              paddingTop="0"
              paddingBottom="0"
              horizontal="center"
              flex={1}
            >
              <Flex horizontal="center" fillWidth minHeight="0">
                {children}
              </Flex>
            </Flex>
            <Footer/>

            {/* Google Analytics and Tawk.to load only after consent (roadmap T3.08). */}
            <ConsentBanner />
            <MotionScope />

          </Column>
        </Providers>
      </Flex>
  );
}
