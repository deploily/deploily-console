import {
  HouseLine,
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
    key: "home",
    label: (
      <Link href="/portal/home">
        <span style={labelStyle}>{scopedSidebar("home")}</span>
      </Link>
    ),
    icon: <HouseLine size={24} />,
  },
  {
    key: "my-services",
    label: (
      <Link href="/portal/my-services">
        {" "}
        <span style={labelStyle}>{scopedSidebar("myServices")}</span>{" "}
      </Link>
    ),
    icon: <HardDrives size={24} />,
    // children: [
    //   {
    //     key: "1",
    //     label: (
    //       <Link href="/portal/myServices">
    //         <span style={labelStyle}>{scopedSidebar("api")}</span>
    //       </Link>
    //     ),
    //   },
    //   {
    //     key: "2",
    //     label: (
    //       <Link href="/portal/myServices">
    //         <span style={labelStyle}>{scopedSidebar("cicd")}</span>
    //       </Link>
    //     ),
    //   },
    //   {
    //     key: "3",
    //     label: (
    //       <Link href="/portal/myServices">
    //         <span style={labelStyle}>{scopedSidebar("databases")}</span>
    //       </Link>
    //     ),
    //   },
    //   {
    //     key: "4",
    //     label: (
    //       <Link href="/portal/myServices">
    //         <span style={labelStyle}>{scopedSidebar("erpcrm")}</span>
    //       </Link>
    //     ),
    //   },
    // ],
  },
  {
    key: "my-favorites",
    label: (
      <Link href="/portal/my-favorites">
        <span style={labelStyle}>{scopedSidebar("myFavorites")}</span>
      </Link>
    ),
    icon: <CalendarStar size={24} />,
  },
  {
    key: "supportTicket",//TODO CHANGE THIS 
    label: (
      <Link href="/portal/supportTicket">
        <span style={labelStyle}>{scopedSidebar("supportTicket")} </span>
      </Link>
    ),
    icon: <Question size={24} />,
  },
  {
    key: "documentation",
    label: (
      <Link href="/portal/documentation">
        <span style={labelStyle}>{scopedSidebar("documentation")}</span>
      </Link>
    ),
    icon: <Books size={24} />,
  },
  {
    key: "billing",
    label: <span style={labelStyle}>{scopedSidebar("billing")}</span>,
    icon: <Invoice size={24} />,
    children: [
      { key: "10", label: <span style={labelStyle}>{scopedSidebar("profilePayment")}</span> },
      { key: "11", label: <Link href={"/portal/payments"}><span style={labelStyle}>{scopedSidebar("payments")}</span></Link>},
    ],
  },
  {
    key: "members",
    label: (
      <Link href="/portal/members">
        <span style={labelStyle}>{scopedSidebar("members")}</span>
      </Link>
    ),
    icon: <UserList size={24} />,
  },
  {
    key: "sponsoring",
    label: (
      <Link href="/portal/sponsoring">
        <span style={labelStyle}>{scopedSidebar("sponsoring")}</span>
      </Link>
    ),
    icon: <Handshake size={24} />,
  },
];
