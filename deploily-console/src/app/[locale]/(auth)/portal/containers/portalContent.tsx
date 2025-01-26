"use client";
import React from "react";
import {Layout} from "antd";
import AppAppBar from "../components/appbar";
import MainSideBar from "../components/sidebar";
const { Content } = Layout;

export default function PortalContent({children}: any) {
  return (
    <Layout
      style={{
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <AppAppBar />
      <Layout>
        <MainSideBar />

        {/* <Content style={{
                  textAlign: 'center',
                  minHeight: 120,
                  lineHeight: '120px',
                  color: '#fff',
                  backgroundColor: '#0958d9',
                }}>Content</Content> */}
              

              <Content
                  style={{
                      padding: 0,
                      width: "100%",
                      backgroundImage:
                          "url(/images/bottomBack.png), url(/images/topBack.png)",
                      backgroundRepeat: "no-repeat, no-repeat",
                      backgroundPosition: "bottom left, top right",
                      backgroundAttachment: "fixed",
                  }}
              >
                  {children}
              </Content>
      </Layout>
      {/* <Footer style={footerStyle}>Footer</Footer> */}
    </Layout>
  );
}
