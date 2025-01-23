"use client";
import React, { useState } from "react";
import { Layout, Grid } from "antd";
import { useRouter } from "next/router";
import AppAppBar from "../components/appbar";

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

export default function PortalContent({ children }: any) {
    const screens = useBreakpoint();

    return (
        <Layout style={{ display: "flex", width: "100%" }}>
            {screens.sm && screens.md && (
             
                    <AppAppBar />
               
            )}
           

            <Layout style={{ flex: 1, width: "100%", height: "100vh" }}>
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
        </Layout>
    );
}