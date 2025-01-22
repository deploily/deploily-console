"use client";
import * as React from "react";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {Col, Row} from "antd";
import Layout, {Header} from "antd/es/layout/layout";
import LocaleSwitcher from "@/components/locale/localeSwitcher";

function AppAppBar() {
  const [width, setWidth] = useState(0);

  const observedDiv = useRef(null);

  useEffect(() => {
    if (!observedDiv.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      if (observedDiv.current != null && observedDiv.current["offsetWidth"] !== width) {
        setWidth(observedDiv.current["offsetWidth"]);
      }
    });
    resizeObserver.observe(observedDiv.current);
    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [observedDiv.current]);
  const [theme] = useState("dark");

  const appBarColor = theme == "dark" ? "#2c82d4" : "#eda879";

  return (
    <>
      <Layout style={{}}>
        <Header
          ref={observedDiv}
          style={{
            backgroundColor: theme === "dark" ? "#0c0d0f" : "#FFFFFF",
            backgroundImage: "none",
            display: "flex",
            justifyContent: "center",
            lineHeight: "0px",
            height: "70px",
            boxShadow:
              theme === "dark" ? "0 4px 8px rgba(0, 0, 0, 0.5)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Row align="middle" justify="space-between" style={{width: "100%"}}>
              <Col>
                <Image
                  src="/images/logo_name.png"
                  width={180}
                  height={70}
                  alt="logo-deploily"
                  style={{
                    marginRight: "20px",
                  }}
                />
              </Col>
              <Col style={{display: "flex", alignItems: "start", height: "50%"}}>
                <LocaleSwitcher color={appBarColor} />
              </Col>
            </Row>
          </div>
        </Header>
      </Layout>
    </>
  );
}

export default AppAppBar;
