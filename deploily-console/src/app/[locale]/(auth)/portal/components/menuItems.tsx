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
import type {MenuProps} from "antd";
import Link from "next/link";

const labelStyle = {
  fontFamily: "Inter, sans-serif",
  fontSize: "16px",
  fontWeight: 600,
};

export const menuItems = (scopedSidebar: any): MenuProps["items"] => [
  {
    key: "sub1",
    label: (
      <Link href="/portal/home">
        <span style={labelStyle}>{scopedSidebar("home")}</span>
      </Link>
    ),
    icon: <HouseLine size={24} />,
  },
  {
    key: "sub2",
    label: (
      <Link href="/portal/cart">
        <span style={labelStyle}>{scopedSidebar("cart")}</span>
      </Link>
    ),
    icon: <ShoppingCart size={24} />,
  },
  {
    key: "sub3",
    label: <span style={labelStyle}>{scopedSidebar("myServices")}</span>,
    icon: <HardDrives size={24} />,
    children: [
      {
        key: "1",
        label: (
          <Link href="/portal/myServices">
            <span style={labelStyle}>{scopedSidebar("api")}</span>
          </Link>
        ),
      },
      {
        key: "2",
        label: (
          <Link href="/portal/myServices">
            <span style={labelStyle}>{scopedSidebar("ci/cd")}</span>
          </Link>
        ),
      },
      {
        key: "3",
        label: (
          <Link href="/portal/myServices">
            <span style={labelStyle}>{scopedSidebar("databases")}</span>
          </Link>
        ),
      },
      {
        key: "4",
        label: (
          <Link href="/portal/myServices">
            <span style={labelStyle}>{scopedSidebar("erp/crm")}</span>
          </Link>
        ),
      },
    ],
  },
  {
    key: "sub4",
    label: (
      <Link href="/portal/myFavorites">
        <span style={labelStyle}>{scopedSidebar("myFavorites")}</span>
      </Link>
    ),
    icon: <CalendarStar size={24} />,
  },
  {
    key: "sub5",
    label: (
      <Link href="/portal/supportTicket">
        <span style={labelStyle}>{scopedSidebar("supportTicket")} </span>
      </Link>
    ),
    icon: <Question size={24} />,
  },
  {
    key: "sub6",
    label: (
      <Link href="/portal/documentation">
        <span style={labelStyle}>{scopedSidebar("documentation")}</span>
      </Link>
    ),
    icon: <Books size={24} />,
  },
  {
    key: "sub7",
    label: <span style={labelStyle}>{scopedSidebar("billing")}</span>,
    icon: <Invoice size={24} />,
    children: [
      {key: "10", label: <span style={labelStyle}>{scopedSidebar("invoice")}</span>},
      {key: "11", label: <span style={labelStyle}>{scopedSidebar("payments")}</span>},
    ],
  },
  {
    key: "sub8",
    label: (
      <Link href="/portal/members">
        <span style={labelStyle}>{scopedSidebar("members")}</span>
      </Link>
    ),
    icon: <UserList size={24} />,
  },
  {
    key: "sub9",
    label: (
      <Link href="/portal/sponsoring">
        <span style={labelStyle}>{scopedSidebar("sponsoring")}</span>
      </Link>
    ),
    icon: <Handshake size={24} />,
  },
];
