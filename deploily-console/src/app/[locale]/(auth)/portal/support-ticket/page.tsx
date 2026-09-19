"use client";

import {Content} from "antd/es/layout/layout";
import SupportTicketListContainer from "./components/supportTicketListContainer";
export default function Page() {
  return (
    <Content style={{padding: 20, color: "#27292E", marginInline: 20, minHeight: "calc(100vh - 120px)", display: "flex", flexDirection: "column"}}>
      <SupportTicketListContainer />
    </Content>
  );
}
