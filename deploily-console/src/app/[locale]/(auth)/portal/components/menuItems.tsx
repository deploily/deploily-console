import { DOC_URL } from "@/deploilyWebsiteUrls";
import {
  Books,
  CalendarStar,
  Handshake,
  HardDrives,
  HouseLine,
  Invoice,
  Question,
  UserList,
} from "@phosphor-icons/react/dist/ssr";
import type { MenuProps } from "antd";
import Link from "next/link";

const labelStyle = {

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
    key: "subscriptions",
    label: (
      // <Link href="/portal/subscriptions">
      //   {" "}
      <span style={labelStyle}>{scopedSidebar("subscriptions")}</span>
      // {" "}
      // </Link>
    ),
    icon: <HardDrives size={24} />,
    children: [
      {
        key: "1",
        label: (
          <Link href="/portal/my-api">
            <span style={labelStyle}>{scopedSidebar("myApis")}</span>
          </Link>
        ),
      },
      {
        key: "2",
        label: (
          <Link href="/portal/my-resources">
            <span style={labelStyle}>{scopedSidebar("myResources")}</span>
          </Link>
        ),
      },
      {
        key: "3",
        label: (
          <Link href="/portal/my-applications">
            <span style={labelStyle}>{scopedSidebar("myApplications")}</span>
          </Link>
        ),
      },
      // {
      //   key: "4",
      //   label: (
      //     <Link href="/portal/subscriptions">
      //       <span style={labelStyle}>{scopedSidebar("erpcrm")}</span>
      //     </Link>
      //   ),
      // },
    ],
  },
  // {
  //   key: "my-resources",
  //   label: (
  //     <Link href="/portal/my-resources">
  //       <span style={labelStyle}>{scopedSidebar("myResources")}</span>
  //     </Link>
  //   ),
  //   icon: <CalendarStar size={24} />,
  // },
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
    key: "support-ticket",//TODO CHANGE THIS 
    label: (
      <Link href="/portal/support-ticket">
        <span style={labelStyle}>{scopedSidebar("supportTicket")} </span>
      </Link>
    ),
    icon: <Question size={24} />,
  },
  {
    key: "billing",
    label: <span style={labelStyle}>{scopedSidebar("billing")}</span>,
    icon: <Invoice size={24} />,
    children: [
      { key: "10", label: <Link href={"/portal/payment-profiles"}><span style={labelStyle}>{scopedSidebar("profilePayment")}</span></Link> },
      { key: "11", label: <Link href={"/portal/payments"}><span style={labelStyle}>{scopedSidebar("payments")}</span></Link> },
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
  {
    key: "documentation",
    label: (
      <a
        href={DOC_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={labelStyle}
      >
        {scopedSidebar("documentation")}
      </a>
    ),
    icon: <Books size={24} />,
  }
];
