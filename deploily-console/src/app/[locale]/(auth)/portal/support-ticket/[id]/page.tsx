
import {Content} from "antd/es/layout/layout";
import SupportTicketDetails from "./components/supportTicketDetails";
type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <Content style={{padding: 20, color: "#27292E", marginInline: 20}}>
      <SupportTicketDetails support_ticket_id={id} />
    </Content>
  );
}
