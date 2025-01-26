"use client";
import * as React from "react";
import Image from "next/image";
import {useState} from "react";
import {Button, Col, Form, Row, Select} from "antd";
import {Header} from "antd/es/layout/layout";
import LocaleSwitcher from "@/components/locale/localeSwitcher";
import {ShoppingCart} from "@phosphor-icons/react";

function AppAppBar() {
  const [theme] = useState("dark");
  const appBarColor = theme == "dark" ? "#2c82d4" : "#eda879";

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
                <Button
                  style={{
                    borderColor: "#D85912",
                  }}
                  icon={<ShoppingCart size={"28px"} style={{color: "#D85912"}} />}
                  target="_blank"
                />
                <Button
                  style={{
                    color: "#fff",
                    backgroundColor: "#D85912",
                    border: "none",
                  }}
                >
                  ON DEMAND
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

export default AppAppBar;
