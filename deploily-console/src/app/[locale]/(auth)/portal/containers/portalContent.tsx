"use client";
import React, { useEffect, useState } from "react";
import { Layout, Space } from "antd";
import { MainSideBar } from "../components/sideBar";
import { AppAppBarDesktop, AppAppBarMobile } from "../components/appBar";

const { Content } = Layout;

export default function PortalContent({ children }: any) {
  const [shouldShowDesktop, setShouldShowDeskttop] = useState(true);

  useEffect(() => {
    const updateDesktopVisibility = () => {
      setShouldShowDeskttop(window.innerWidth > 880);
    };

    updateDesktopVisibility();
    window.addEventListener("resize", updateDesktopVisibility);

    return () => {
      window.removeEventListener("resize", updateDesktopVisibility);
    };
  }, []);

  return (
    <Layout style={{ overflow: "hidden" }}>
      {shouldShowDesktop && <AppAppBarDesktop />}
      {!shouldShowDesktop && <AppAppBarMobile />}
      <Layout>
        {shouldShowDesktop && <MainSideBar />}
        <Content
          style={{
            padding: 0,
            width: "100%",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "bottom left, top right",
            backgroundAttachment: "fixed",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Space direction="vertical" align="center" style={{ padding: "20px", maxWidth: "1600px" }}>
            {children}
          </Space>

        </Content>
      </Layout>
    </Layout>
  );
}
