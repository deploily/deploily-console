import {Button, Layout, Menu, MenuProps} from "antd";
import React, {useState} from "react";
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
import {User} from "@phosphor-icons/react";
import Link from "next/link";

const {Sider} = Layout;

type MenuItem = Required<MenuProps>["items"][number];
const labelStyle = {
  fontFamily: "Inter, sans-serif",
  fontSize: "16px",
  fontWeight: 600,
};

const items: MenuItem[] = [
  {
    key: "sub1",
    label: (
      <Link href="/portal/home">
        <span style={labelStyle}>Home</span>
      </Link>
    ),
    icon: <HouseLine size={24} />,
  },
  {
    key: "sub2",
    label: (
      <Link href="/portal/cart">
        <span style={labelStyle}>Cart</span>
      </Link>
    ),
    icon: <ShoppingCart size={24} />,
  },
  {
    key: "sub3",
    label: <span style={labelStyle}>My services</span>,
    icon: <HardDrives size={24} />,
    children: [
      {
        key: "1",
        label: (
          <Link href="/portal/myServices">
            <span style={labelStyle}>API</span>
          </Link>
        ),
      },
      {
        key: "2",
        label: (
          <Link href="/portal/myServices">
            <span style={labelStyle}>CI/CD</span>
          </Link>
        ),
      },
      {
        key: "3",
        label: (
          <Link href="/portal/myServices">
            <span style={labelStyle}>Databases</span>
          </Link>
        ),
      },
      {
        key: "4",
        label: (
          <Link href="/portal/myServices">
            <span style={labelStyle}>ERP/CRM </span>
          </Link>
        ),
      },
    ],
  },
  {
    key: "sub4",
    label: (
      <Link href="/portal/myFavorites">
        <span style={labelStyle}>My favorites</span>
      </Link>
    ),
    icon: <CalendarStar size={24} />,
  },
  {
    key: "sub5",
    label: (
      <Link href="/portal/supportTicket">
        <span style={labelStyle}>Support Ticket</span>
      </Link>
    ),
    icon: <Question size={24} />,
  },
  {
    key: "sub6",
    label: (
      <Link href="/portal/documentation">
        <span style={labelStyle}>Documentation</span>
      </Link>
    ),
    icon: <Books size={24} />,
  },
  {
    key: "sub7",
    label: <span style={labelStyle}>Billing</span>,
    icon: <Invoice size={24} />,
    children: [
      {key: "10", label: <span style={labelStyle}>Invoice</span>},
      {key: "11", label: <span style={labelStyle}>Payments</span>},
    ],
  },
  {
    key: "sub8",
    label: (
      <Link href="/portal/members">
        <span style={labelStyle}>Members</span>
      </Link>
    ),
    icon: <UserList size={24} />,
  },
  {
    key: "sub9",
    label: (
      <Link href="/portal/sponsoring">
        <span style={labelStyle}>Sponsoring</span>
      </Link>
    ),
    icon: <Handshake size={24} />,
  },
];

export function MainSideBar() {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
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
        style={{flexGrow: 1}}
      />
      <div
        style={{
          textAlign: "center",
          cursor: "pointer",
          color: "#fff",
          background: "rgba(12, 13, 15, 0.9)",
        }}
        onClick={toggleCollapsed}
      >
        {collapsed ? <ArrowRight size={24} color="#fff" /> : <ArrowLeft size={24} color="#fff" />}
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

export function MainSideBarMobile() {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <>
      <Button
        style={{
          width: "100%",

          color: "#fff",
          backgroundColor: "#D85912",
          border: "none",
        }}
      >
        <Link href="/portal/home">
          <span
            style={{
              color: "rgba(220, 233, 245, 0.88)",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            ON DEMAND
          </span>
        </Link>
      </Button>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        style={{flexGrow: 1}}
      />
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
      </Button>
    </>
  );
}
