"use client";
import { Layout } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { AppAppBarDesktop, AppAppBarMobile } from "../components/appBar";
import { MainSideBar } from "../components/sideBar";

const { Content } = Layout;

export default function PortalContent({
  children,
}: {
  children: ReactNode;
}) {
  const [shouldShowDesktop, setShouldShowDeskttop] = useState(true);
  const updateDesktopVisibility = () => {
    if (window != undefined) {
      setShouldShowDeskttop(window.innerWidth > 880);
    }
  };
  useEffect(() => {
    if (window != undefined) {
      updateDesktopVisibility();
      window.addEventListener("resize", updateDesktopVisibility);
      return () => {
        window.removeEventListener("resize", updateDesktopVisibility);
      };
    }
  }, []);

  return (
    <Layout style={{ overflow: "hidden", height: "100vh" }}>
      {shouldShowDesktop && <AppAppBarDesktop />}
      {!shouldShowDesktop && <AppAppBarMobile />}
      <Layout>
        {shouldShowDesktop && <MainSideBar />}

        <Content
          style={{
            overflow: "auto",
            padding: 0,
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "bottom left, top right",
            backgroundAttachment: "fixed",
            // backgroundColor:'#16181F'
            // backgroundColor: '#25262C'
            backgroundColor: '#2A2A2A'
          }}
        >
          <Content style={{ padding: "0px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            {children}
          </Content>
        </Content>
      </Layout>
    </Layout>
  );
}
