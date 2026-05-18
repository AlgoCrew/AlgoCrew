import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'
import './global.scss'

import classNames from "classnames";

import { Background, Column, Flex, Meta, opacity, SpacingToken } from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers } from '@/components';
import { baseURL, effects, fonts, style, dataStyle, home } from '@/resources';


export async function generateMetadata() {
  return {
    title: home.title,
    description: home.description,
    metadataBase: new URL(baseURL),
    alternates: {
      canonical: `${baseURL}${home.path}`,
    },

    openGraph: {
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
    icons: {
      icon: '/icon.png',
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
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
        'body-overflow-overlay'
      )}
    >
      <head>
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

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WPN816FH63"
        />
        <script id="ga">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WPN816FH63');
          `}
        </script>

        <link rel="icon" href="/images/icon.png" sizes="any" />
        <meta name="keywords" content="software company, software agency, custom software development, web development, custom software, cloud solution, mobile app development, Next.js, React, Node.js, AWS, software solutions, IT consulting, Algocrew" />
      </head>

      <Providers>
        <Column as="body" background="page" style={{
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
          </Column>
        </Providers>
      </Flex>
  );
}
