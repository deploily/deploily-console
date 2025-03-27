"use client";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { MainSideBar } from "../components/sideBar";
import { AppAppBarDesktop, AppAppBarMobile } from "../components/appBar";

const { Content } = Layout;

export default function PortalContent({ children }: any) {
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
