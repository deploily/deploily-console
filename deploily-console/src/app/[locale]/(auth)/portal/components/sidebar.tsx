import {Layout, Menu, MenuProps} from "antd";
import React from "react";
import {
  HouseLine,
  ShoppingCart,
  HardDrives,
  CalendarStar,
  Question,
  Books,
  Invoice,
  UserList,
  Handshake,
} from "@phosphor-icons/react/dist/ssr";
const {Sider} = Layout;

const items: MenuProps["items"] = [
  HouseLine,
  ShoppingCart,
  HardDrives,
  CalendarStar,
  Question,
  Books,
  Invoice,
  UserList,
  Handshake,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

export default function MainSideBar() {
  return (
    <Sider
      width="225px"
      style={{
        textAlign: "center",
        lineHeight: "120px",
        color: "#fff",
        background: "rgba(12, 13, 15, 0.85)",
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu mode="inline" defaultSelectedKeys={["4"]} items={items} />
    </Sider>
  );
}
