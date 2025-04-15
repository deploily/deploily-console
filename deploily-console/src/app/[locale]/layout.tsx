import React, { ReactElement } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { theme } from "../../styles/theme";
import { I18nProviderClient } from "../../../locales/client";
import "antd/dist/reset.css";
import { StoreProvider } from "../storeProvider";
import { Providers } from "../provider";
import SessionGuard from "@/components/sessionGuard";
import { DM_Sans } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';

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
      <body suppressHydrationWarning={true} style={{ margin: "0px" }}>
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
