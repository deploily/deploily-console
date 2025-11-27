"use client";

import {Content} from "antd/es/layout/layout";
import SupportTicketDetails from "./components/supportTicketDetails";

type Props = {
  params: {id: string};
};
export default function Page({params: {id}}: Props) {
  return (
    <Content style={{padding: 20, color: "#27292E", marginInline: 20}}>
      <SupportTicketDetails support_ticket_id={id} />
    </Content>
  );
}
