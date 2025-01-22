import React, {ReactElement} from "react";
import {GoogleAnalytics} from "@next/third-parties/google";
import type {Metadata} from "next";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {ConfigProvider} from "antd";
import {theme} from "../../styles/theme";
import {I18nProviderClient} from "../../../locales/client";
import "antd/dist/reset.css";

export const generateViewport = () => ({
  width: "device-width",
  initialScale: 1,
});
export const metadata: Metadata = {
  metadataBase: new URL("https://deploily.cloud"),
  title: "Deploily",
  description: `Open-source cloud proxy solution, 
                offers local alternatives to foreign APIs,
                and ensures compliance with Algerian data protection regulations.`,
  keywords:
    "Cloud Proxy Solution, Application Deployment, Open Source Platform, Algerian Data Protection, Local Cloud Hosting, Local API Alternatives",
  openGraph: {
    type: "website",
    url: "https://deploily.cloud",
    title: "Deploily",
    siteName: "Deploily",
    description: `Open-source cloud proxy solution,
                  offers local alternatives to foreign APIs,
                  and ensures compliance with Algerian data protection regulations.`,
    images: [
      {
        url: "https://deploily.cloud/_next/image?url=%2Fimages%2Flogo_name.png&w=256&q=75",
      },
    ],
    locale: "en_US",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactElement;
  params: Promise<{locale: string}>;
}) {
  // Resolve the params Promise to access the locale
  const {locale} = await params;

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true} style={{margin: "0px"}}>
        <GoogleAnalytics gaId="G-N5HBREFEE3" />
        <I18nProviderClient locale={locale}>
          <AntdRegistry>
            <ConfigProvider theme={theme}>{children}</ConfigProvider>
          </AntdRegistry>
        </I18nProviderClient>
      </body>
    </html>
  );
}
