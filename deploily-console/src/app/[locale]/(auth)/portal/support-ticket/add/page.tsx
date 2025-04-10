"use client";

import { Content } from "antd/es/layout/layout";
import CreateSupportTecket from "./components/createSupportTicket";

export default function Page() {
  
  return (
    <Content style={{padding: 20, color: "#27292E", marginInline:20}}>
      <CreateSupportTecket/>

    </Content>
  );
}
