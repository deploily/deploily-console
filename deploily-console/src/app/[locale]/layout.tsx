import SessionGuard from "@/components/sessionGuard";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import { ReactElement } from "react";
import { I18nProviderClient } from "../../../locales/client";
import { theme } from "../../styles/theme";
import { Providers } from "../provider";
import { StoreProvider } from "../storeProvider";

const mdSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
  style: ['normal', 'italic'],
});
const jetBrains_Mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  style: ['normal', 'italic'],
});


export const generateViewport = () => ({
  width: "device-width",
  initialScale: 1,
});

export const metadata: Metadata = {
  title: "Deploily - Deploy to Sovereign Infrastructure ",
  description: "Deploily helps you deploy and manage your web applications easily in the cloud with just a few clicks.",
  keywords: "Deploily, Cloud Deployment, App Hosting, CI/CD, Web App Management, Cloud Proxy Solution, Application Deployment, Open Source Platform, Algerian Data Protection, Local Cloud Hosting, Local API Alternatives",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    url: "https://console.deploily.cloud/en",
    title: "Deploily - Deploy to Sovereign Infrastructure ",
    siteName: "Deploily",
    description: "Launch your apps in the cloud effortlessly with Deploily. Streamlined tools for developers to deploy, scale, and monitor web applications.",
    images: [{
      url: "https://console.deploily.cloud/images/Logo.jpg",
      alt: "Deploily Logo"
    }],
    locale: "en_US"
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactElement;
  params: Promise<{ locale: string }>;
}) {
  // Resolve the params Promise to access the locale
  const { locale } = await params;

  return (
    <html lang={locale} className={`${mdSans.className} ${jetBrains_Mono.variable}`}>
      <body suppressHydrationWarning={true} style={{ margin: "0px", backgroundColor: theme.token.darkGray, fontFamily: "DM Sans" }}>
        <Providers>
          <SessionGuard>
            <StoreProvider>
              <I18nProviderClient locale={locale}>
                <AntdRegistry>
                  <ConfigProvider theme={theme}>{children}</ConfigProvider>
                </AntdRegistry>
              </I18nProviderClient>
            </StoreProvider>
          </SessionGuard>
        </Providers>
      </body>
    </html >
  );
}
