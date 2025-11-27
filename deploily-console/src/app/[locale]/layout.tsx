import SessionGuard from "@/components/sessionGuard";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {ConfigProvider} from "antd";
import "antd/dist/reset.css";
import {DM_Sans} from "next/font/google";
import {ReactElement} from "react";
import {I18nProviderClient} from "../../../locales/client";
import {theme} from "../../styles/theme";
import {Providers} from "../provider";
import {StoreProvider} from "../storeProvider";

const mdSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-dm-sans",
  style: ["normal", "italic"],
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
  params: Promise<{locale: string}>;
}) {
  // Resolve the params Promise to access the locale
  const {locale} = await params;

  return (
    <html lang={locale} className={`${mdSans.variable} `}>
      <body
        suppressHydrationWarning={true}
        style={{margin: "0px", backgroundColor: theme.token.darkGray, fontFamily: "DM Sans"}}
      >
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
    </html>
  );
}
