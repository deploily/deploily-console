"use client";

import {Dropdown, Button, Space, Typography, Row, Col} from "antd";
import {locales} from "@/config";
import {useChangeLocale, useCurrentLocale} from "../../../locales/client";
import {useState} from "react";
import {Globe} from "@phosphor-icons/react";

export default function LocaleSwitcher({color}: any) {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();
  const [theme] = useState("dark");

  const handleChange = (value: any) => {
    changeLocale(value);
  };


  const menuItems = locales.map((loc) => ({
    key: loc,
    label: (
      <div onClick={() => handleChange(loc)}>
        {loc.toUpperCase()}
      </div>
    ),
  }));

  return (
    <Space wrap>
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <Button
          style={{
            border: "none",
            backgroundColor: theme === "dark" ? "#0c0d0f" : "#FFFFFF",
            color: theme === "dark" ? "#FFFFFF" : "#0c0d0f",
          }}
        >
          <Row
            align="middle"
            justify="space-between"
            style={{display: "flex", alignItems: "center", paddingLeft: "0px"}}
          >
            <Col>
              <Typography style={{color}}>{locale.toUpperCase()}</Typography>
            </Col>
            <Col style={{display: "flex"}}>
              <Globe color={color} size={20} />
            </Col>
          </Row>
        </Button>
      </Dropdown>
    </Space>
  );
}
