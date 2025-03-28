"use client";
import * as React from "react";
import Image from "next/image";
import {useState} from "react";
import {Button, Col, Drawer, Form, Row, Select} from "antd";
import {Header} from "antd/es/layout/layout";
import LocaleSwitcher from "@/components/locale/localeSwitcher";
import {List, Coins} from "@phosphor-icons/react";
import {MainSideBarMobile} from "./sideBar";
import Link from "next/link";
import {useI18n} from "../../../../../../locales/client";

export function AppAppBarDesktop() {
  const [theme] = useState("dark");
  const appBarColor = theme == "dark" ? "#2c82d4" : "#eda879";
  const t = useI18n();
  return (
    <>
      <Header
        style={{
          backgroundColor: theme === "dark" ? "rgba(12, 13, 15, 0.9)" : "#FFFFFF",
          backgroundImage: "none",
          display: "flex",
          justifyContent: "center",
          lineHeight: "0px",
          height: "70px",
          boxShadow:
            theme === "dark" ? "0 4px 8px rgba(0, 0, 0, 0.25)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row align="middle" justify="space-between" style={{width: "100%"}}>
          <Col style={{flexGrow: 1}}>
            <Link href="/portal">
              <Image
                src="/images/logo_name.png"
                width={202}
                height={50}
                alt="logo-deploily"
                style={{
                  marginRight: "20px",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Col>
          <Row
            style={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Col>
              <Row
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                {" "}
                <Form>
                  <Form.Item
                    name="Select"
                    rules={[{message: "Please input!"}]}
                    style={{
                      width: 300,
                      border: "1px solid ",
                      backgroundColor: "#202227",
                      color: "#fff",
                      borderColor: "#4E4E4E",
                      borderRadius: "6px",
                      marginBottom: "0px",
                    }}
                  >
                    <Select />
                  </Form.Item>
                </Form>
                <Link href="/portal/cart">
                  {" "}
                  <Button
                    style={{
                      borderColor: "#D85912",
                      color:"#D85912"
                    }}
                    icon={<Coins size={"28px"} style={{color: "#D85912"}} />}
                    iconPosition={"end"}
                    target="_blank"
                  >
                    0.00 DZD
                  </Button>
                </Link>
                <Button
                  style={{
                    color: "#fff",
                    backgroundColor: "#D85912",
                    border: "none",
                  }}
                >
                  <Link href="/portal/home" data-testid="mocked-link">
                    <span
                      style={{
                        color: "rgba(220, 233, 245, 0.88)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      {t("ondemand")}
                    </span>
                  </Link>
                </Button>
                <LocaleSwitcher color={appBarColor} />
              </Row>
            </Col>
          </Row>
        </Row>
      </Header>
    </>
  );
}

export function AppAppBarMobile() {
  const [theme] = useState("dark");
  const appBarColor = theme == "dark" ? "#2c82d4" : "#eda879";

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header
        style={{
          backgroundColor: theme === "dark" ? "rgba(12, 13, 15, 0.9)" : "#FFFFFF",
          backgroundImage: "none",
          display: "flex",
          justifyContent: "center",
          lineHeight: "0px",
          height: "70px",
          padding: "0px",
          boxShadow:
            theme === "dark" ? "0 4px 8px rgba(0, 0, 0, 0.25)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row align="middle" justify="space-between" style={{width: "100%"}}>
          <Col style={{flexGrow: 1}}>
            <Link href="/portal">
              <Image
                src="/images/logo_name.png"
                width={202}
                height={50}
                alt="logo-deploily"
                style={{
                  marginRight: "20px",
                }}
              />
            </Link>
          </Col>
          <Row
            style={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Col>
              <Row
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "10px",
                  alignItems: "center",
                }}
              >
                <LocaleSwitcher color={appBarColor} />
                <List size={28} style={{color: "#D85912"}} onClick={showDrawer} />
              </Row>
            </Col>
          </Row>
        </Row>
        <Drawer onClose={onClose} open={open} width={"50%"} styles={{body: {padding: "0px"}}}>
          <MainSideBarMobile />
        </Drawer>
      </Header>
    </>
  );
}
