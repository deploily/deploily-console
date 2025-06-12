"use client";
import federatedLogout from "@/lib/utils/federatedLogout";
import { CaretUp, User } from "@phosphor-icons/react";
import { ArrowLeft, ArrowRight, SignOut } from "@phosphor-icons/react/dist/ssr";
import { Button, Dropdown, Layout, Menu, Space } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useScopedI18n } from "../../../../../../locales/client";
import FeedbackAlert from "../feed-back/feedBackAlert";
import { menuItems } from "./menuItems";

const { Sider } = Layout;

export function MainSideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const scopedSidebar = useScopedI18n("sidebar");
  const pathName = usePathname();

  const parentKey = menuItems(scopedSidebar)?.find(item => {
    return pathName.includes(`/${item?.key}`)
  }
  )?.key;

  const items = [
    {
      key: "profile",
      label:
        < Link href="/portal/profile" >
          <span >{scopedSidebar("profile")}</span>
        </Link >,
      icon: <User size={24} />,
    },
    {

      key: "logout",
      label: (
        <div
          onClick={() => federatedLogout()}
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
        >
          <SignOut size={24} />
          <span>{scopedSidebar("logout")}</span>
        </div>
      ),
    },
  ]

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
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={menuItems(scopedSidebar)}
        style={{ flexGrow: 1 }}
        selectable
        selectedKeys={[`${parentKey}`]}
      />
      <div
        style={{

          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          color: "#fff",
          background: "rgba(12, 13, 15, 0.9)",
          padding: "10px",
          marginTop: "auto",
          position: "absolute",
          bottom: "8px",
          display: "inline-grid"
        }}

      >

        <Space onClick={toggleCollapsed}>
          {collapsed ? (
            <ArrowRight size={24} color="#7D7D7D" />
          ) : (
            <>
              <ArrowLeft size={24} color="#7D7D7D" />
              <span style={{ paddingLeft: 10, fontSize: 16, color: "#7D7D7D" }}>
                {scopedSidebar("collapse")}
              </span>
            </>
          )}
        </Space>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button
            style={{
              width: "100%",
              border: "none",
              position: "absolute",
              bottom: "10px",
              padding: "5px",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <User size={24} color="rgba(220, 233, 245, 0.88)" />
            {!collapsed && (
              <span
                style={{
                  color: "rgba(220, 233, 245, 0.88)",

                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {scopedSidebar("account")}
              </span>
            )}
            <CaretUp size={20} color="rgba(220, 233, 245, 0.88)" />
          </Button>
        </Dropdown>
      </div>
    </Sider>
  );
}

export function MainSideBarMobile() {
  const scopedSidebar = useScopedI18n("sidebar");
  const items = [
    {
      key: "profile",
      label:
        <Link href="/portal/profile" >
          <span >{scopedSidebar("profile")}</span>
        </Link >,
      icon: <User size={24} />,
    },
    {
      key: "logout",
      label: (
        <div
          onClick={() => federatedLogout()}
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
        >
          <SignOut size={24} />
          <span>{scopedSidebar("logout")}</span>
        </div>
      ),
    },
  ]

  return (
    <>

      <div style={{ textAlign: "center" }}>
        <FeedbackAlert />
      </div>

      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={menuItems(scopedSidebar)}
        style={{ flexGrow: 1 }}
      />

      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button
          style={{
            width: "100%",
            border: "none",
            position: "absolute",
            bottom: "5px",
          }}
        >
          <User size={24} color="rgba(220, 233, 245, 0.88)" />

          <span
            style={{
              color: "rgba(220, 233, 245, 0.88)",

              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {scopedSidebar("account")}
          </span>
          <CaretUp size={20} color="rgba(220, 233, 245, 0.88)" />
        </Button>
      </Dropdown>
    </>
  );
}
