"use client";
import * as React from "react";
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
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Row align="middle" justify="end" style={{width: "100%"}}>
              <Col
                style={{display: "flex", alignItems: "start", height: "50%", paddingTop: "20px"}}
              >
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
