import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'
import './global.scss'


import Script from "next/script";
import { Background, Column, Flex, Meta, opacity, SpacingToken } from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers } from '@/components';
import { baseURL, effects, fonts, style, dataStyle, home } from '@/resources';


export async function generateMetadata() {
  return {
    title: {
      default: home.title,
      template: "%s | AlgoCrew",
    },
    description: home.description,
    metadataBase: new URL(baseURL),
    alternates: {
      canonical: `${baseURL}${home.path}`,
    },
    keywords: [
      "software agency", "custom software development", "web development",
      "mobile app development", "Next.js", "React", "Node.js", "AWS",
      "cloud solutions", "IT consulting", "AlgoCrew",
    ],
    authors: [{ name: "AlgoCrew", url: baseURL }],
    creator: "AlgoCrew",
    publisher: "AlgoCrew",
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "AlgoCrew",
      title: home.title,
      description: home.description,
      url: `${baseURL}${home.path}`,
      images: [
        {
          url: `${baseURL}${home.image}`,
          width: 1200,
          height: 630,
          alt: home.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@algocrew",
      creator: "@algocrew",
      title: home.title,
      description: home.description,
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
      data-theme="dark"
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
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* -- Organization + WebSite schema -- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": baseURL + "/#organization",
                  name: "AlgoCrew",
                  url: baseURL,
                  logo: {
                    "@type": "ImageObject",
                    url: baseURL + "/images/LogoDark.png",
                    width: 200,
                    height: 60,
                  },
                  description: "Top-tier software agency delivering custom software development, cloud solutions, and mobile apps across North America.",
                  email: "info@algocrew.io",
                  foundingDate: "2020",
                  areaServed: ["CA", "US", "GB"],
                  sameAs: [
                    "https://www.linkedin.com/company/algocrew/",
                    "https://github.com/AlgoCrew",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    email: "info@algocrew.io",
                    availableLanguage: ["English"],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": baseURL + "/#website",
                  url: baseURL,
                  name: "AlgoCrew",
                  description: "Custom software development agency for web, mobile, cloud and AI.",
                  publisher: { "@id": baseURL + "/#organization" },
                },
              ],
            }),
          }}
        />

        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = 'dark';
                  
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
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue) return 'dark';
                    if (themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply saved theme
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
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
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WPN816FH63"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">{`
          window.dataLayer=window.dataLayer||[];
          function gtag(){dataLayer.push(arguments);}
          gtag('js',new Date());
          gtag('config','G-WPN816FH63');
        `}</Script>

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="keywords" content="software company, software agency, custom software development, web development, custom software, cloud solution, mobile app development, Next.js, React, Node.js, AWS, software solutions, IT consulting, Algocrew" />
      </head>

      <Providers>
        <Column suppressHydrationWarning as="body" background="page" style={{
            minHeight: '100vh',
            margin: '0',
            padding: '0',
          }}
          className="body-overflow-overlay"
          fillWidth margin="0" padding="0" horizontal="center">
            <Header />

            <Flex
              zIndex={0}
              fillWidth
              paddingTop="0"
              paddingBottom="0"
              horizontal="center"
              flex={1}
            >
              <Flex horizontal="center" fillWidth minHeight="0">
                <RouteGuard>
                  {children}
                </RouteGuard>
              </Flex>
            </Flex>
            <Footer/>

            {/* Tawk.to live chat widget */}
            <Script id="tawkto" strategy="lazyOnload">{`
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6a103fe562b0761c3d8d5803/1jp7nj6c4';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `}</Script>

          </Column>
        </Providers>
      </Flex>
  );
}
