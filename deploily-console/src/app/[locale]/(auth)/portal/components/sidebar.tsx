import { Button, Col, Layout, Menu, MenuProps } from "antd";
import React, { useState } from "react";
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
  SignOut,
  ArrowLeft,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { User } from "@phosphor-icons/react";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
const labelStyle = {
  fontFamily: "Inter, sans-serif",
  fontSize: "16px",
  fontWeight: 600,
  // color:"#fff"
};

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: <span style={labelStyle}>Home</span>,
    icon: <HouseLine size={24} />,
  },
  {
    key: 'sub2',
    label: <span style={labelStyle}>Cart</span>,
    icon: <ShoppingCart size={24}  />,
  },
  {
    key: 'sub3',
    label: <span style={labelStyle}>My services</span>,
    icon: <HardDrives size={24}  />,
    children: [
      { key: '1', label: <span style={labelStyle}>API</span> },
      { key: '2', label: <span style={labelStyle}>CI/CD</span> },
      { key: '3', label: <span style={labelStyle}>Databases</span> },
      { key: '4', label: <span style={labelStyle}>ERP/CRM </span> },
    ],
  },
  {
    key: 'sub4',
    label: <span style={labelStyle}>My favorites</span>,
    icon: <CalendarStar size={24} />
  },
  {
    key: 'sub5',
    label: <span style={labelStyle}>Support Ticket</span>,
    icon: <Question size={24} />
  },
  {
    key: 'sub6',
    label: <span style={labelStyle}>Documentation</span>,
    icon: <Books size={24} />
  },
  {
    key: 'sub7',
    label: <span style={labelStyle}>Billing</span>,
    icon: <Invoice size={24} />,
    children: [
      { key: '10', label: <span style={labelStyle}>Invoice</span> },
      { key: '11', label: <span style={labelStyle}>Payments</span> },
    ],
  },
  {
    key: 'sub8',
    label: <span style={labelStyle}>Members</span>,
    icon: <UserList size={24} />
  },
  {
    key: 'sub9',
    label: <span style={labelStyle}>Sponsoring</span>,
    icon: <Handshake size={24}  />
  },
];

export default function MainSideBar() {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null} // Disable default collapse trigger
      width="225px"
      style={{
        lineHeight: "120px",
        color: "#fff",
        background: "rgba(12, 13, 15, 0.85)",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <Menu
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        
        items={items}
        style={{ flexGrow: 1 }}
      /><div
        style={{
          textAlign: "center",
          cursor: "pointer",
          color: "#fff",
          background: "rgba(12, 13, 15, 0.9)",
        }}
        onClick={toggleCollapsed}
      >
        {collapsed ? (
          <ArrowRight size={24} color="#fff" />
        ) : (
          <ArrowLeft size={24} color="#fff" />
        )}
      </div>
      <Button
        style={{
          width: "100%",
          borderColor: "#D85912",
          marginBottom: "30px",
          position: "absolute",
          bottom: "8px",
        }}
        icon={<SignOut size={24} color="#D85912" />}
        onClick={() => console.log("Logging out...")}
      >
        {!collapsed && (
          <span
            style={{
              color: "#D85912",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Log out
          </span>
        )}
      </Button>
      <Button
        style={{
          width: "100%",
          border: "none",
          position: "absolute",
          bottom: "0px",
        }}
        icon={<User size={24} color="rgba(220, 233, 245, 0.88)" />}
        onClick={() => console.log("Account...")}
      >
        {!collapsed && (
          <span
            style={{
              color: "rgba(220, 233, 245, 0.88)",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Account
          </span>
        )}
      </Button>
    </Sider>
  );
}
