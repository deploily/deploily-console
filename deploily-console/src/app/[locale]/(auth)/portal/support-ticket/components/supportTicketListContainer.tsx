import {SubscriptionInterface} from "@/lib/features/subscriptions/subscriptionInterface";
import {SupportTicket} from "@/lib/features/support-ticket/supportTicketInterface";
import {useSupportTicket} from "@/lib/features/support-ticket/supportTicketSelector";
import {fetchSupportTicket} from "@/lib/features/support-ticket/supportTicketThunks";
import {useAppDispatch} from "@/lib/hook";
import {CustomBlueRoundedButton} from "@/styles/components/buttonStyle";
import {ArrowRight, Plus} from "@phosphor-icons/react";
import {Button, Col, Result, Row, Skeleton, Table} from "antd";
import Title from "antd/es/typography/Title";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useI18n, useScopedI18n} from "../../../../../../../locales/client";
import {supportTicketStatus} from "../utils/supportTicketConst";

export default function SupportTicketListContainer() {
  const dispatch = useAppDispatch();
  const tSupportTicket = useScopedI18n("supportTicket");
  const translate = useScopedI18n("createSupportTicket");
  const [columns] = useState([]);
  const {supportTicketList, isLoading, getSupportTicketError} = useSupportTicket();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchSupportTicket());
  }, []);

  const keysToColumn = () => {
    const list = ["title", "subscription", "status", "created_on"];

    let columns = list.map((element: any) => {
      if (element === "created_on") {
        return {
          title: tSupportTicket(element),
          dataIndex: element,
          key: element,
          render: (date: Date) => (date ? new Date(date).toLocaleDateString("fr-FR") : "-"),
        };
      } else if (element === "status")
        return {
          title: tSupportTicket(element),
          dataIndex: element,
          key: element,
          render: (status: any) => (
            <span style={{color: supportTicketStatus[status as "open" | "closed"]}}>
              {tSupportTicket(status as "open" | "closed")}
            </span>
          ),
        };
      else if (element === "subscription")
        return {
          title: tSupportTicket("service"),
          dataIndex: element,
          key: element,
          render: (subscription: SubscriptionInterface | undefined | null) =>
            subscription && subscription.name ? subscription.name : "__",
        };
      else
        return {
          title: tSupportTicket(element),
          dataIndex: element,
          key: element,
        };
    });

    columns = [
      ...columns,
      {
        title: "",
        dataIndex: "",
        key: "actions",
        render: () =>
          supportTicketList && supportTicketList?.result?.length >= 1 ? (
            <div style={{display: "flex", justifyContent: "end", paddingInline: 5}}>
              <Button
                style={{
                  color: "#fff",
                  backgroundColor: "#D85912",
                  border: "none",
                  padding: "4px",
                }}
              >
                <ArrowRight size={16} style={{color: "rgba(220, 233, 245, 0.88)"}} />
                <span
                  style={{
                    color: "rgba(220, 233, 245, 0.88)",

                    fontSize: "14px",
                    fontWeight: 600,
                    paddingRight: 3,
                  }}
                >
                  {tSupportTicket("details")}
                </span>
              </Button>
            </div>
          ) : (
            <></>
          ),
      },
    ];

    return columns;
  };
  const skeletonColumns = columns.length
    ? columns.map((col: any, index) => ({
        ...col,
        render: () => <Skeleton.Input active={true} key={index} />,
      }))
    : Array(3)
        .fill({})
        .map((_, index) => ({
          title: <Skeleton.Input active={true} size="small" />,
          dataIndex: `col${index}`,
          key: `col${index}`,
          render: () => <Skeleton.Input active={true} />,
        }));
  const t = useI18n();
  return (
    <>
      {!isLoading && getSupportTicketError && (
        <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
          <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
        </div>
      )}
      <Row gutter={16} style={{marginTop: 20}}>
        <Col span={14}>
          <Title level={3} style={{fontWeight: 700, color: "#ffff"}}>
            {tSupportTicket("supportTicket")}
          </Title>
        </Col>
        <Col span={10} style={{display: "flex", justifyContent: "end"}}>
          <CustomBlueRoundedButton onClick={() => router.push(`/portal/support-ticket/add`)}>
            <Plus size={20} style={{color: "rgba(220, 233, 245, 0.88)"}} />
            {translate("createTicket")}
          </CustomBlueRoundedButton>
        </Col>
      </Row>

      <Table<SupportTicket>
        columns={isLoading ? skeletonColumns : supportTicketList && keysToColumn()}
        dataSource={isLoading ? Array(1).fill({key: Math.random()}) : supportTicketList?.result}
        size="middle"
        className="custom-table"
        style={{marginTop: 40, borderRadius: 0}}
        scroll={{y: 55 * 5}}
        onRow={(record) => ({
          onClick: () => router.push(`/portal/support-ticket/${record.id}`),
          style: {cursor: "pointer"},
        })}
      />
    </>
  );
}
