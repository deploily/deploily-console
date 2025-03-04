import React, { ReactElement } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { theme } from "../../styles/theme";
import { I18nProviderClient } from "../../../locales/client";
import "antd/dist/reset.css";
import { StoreProvider } from "../storeProvider";
import { Providers } from "../provider";
import SessionGuard from "@/components/sessionGuard";

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
    <html lang={locale}>
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
