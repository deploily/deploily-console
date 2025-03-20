import { Button, Col, Row, Skeleton, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useScopedI18n } from "../../../../../../../locales/client";
import { ArrowRight, Plus } from "@phosphor-icons/react";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import { fetchSupportTicket } from "@/lib/features/support-ticket/supportTicketThanks";
import { SupportTicket } from "@/lib/features/support-ticket/supportTicketInterface";
import { useSupportTicket } from "@/lib/features/support-ticket/supportTicketSelector";
import { useRouter } from "next/navigation";
import { SubscribeInterface } from "@/lib/features/subscribe/subscribeInterface";

export default function GetSupportTecket() {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('supportTicket')
    const translate = useScopedI18n('createSupportTicket')
    const [columns] = useState([]);
    const { supportTicketList, isLoading } = useSupportTicket()
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchSupportTicket());

    }, []);

    const keysToColumn = () => {
        const list = ["title", "my_service", "status", "created_on"]

        let columns = list.map((element: any) => {
            if (element === "created_on") {
                return {
                    title: t(element),
                    dataIndex: element,
                    key: element,
                    render: (date: Date) => (date ? new Date(date).toLocaleDateString("fr-FR") : "-"),
                };
            }
            else if (element === "status")
                return {
                    title: t(element),
                    dataIndex: element,
                    key: element,
                    render: (status: any) => (status === "open" ? <span style={{ color: "#28B609" }} >{status}</span> : <span>{status}</span>),
                };
            else if (element == "my_service")
                return {
                    title: t("service"),
                    dataIndex: element,
                    key: element,
                    render: (myService: SubscribeInterface) => (myService !== undefined && myService.name),

                }
            else
                return {
                    title: t(element),
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
                        <div style={{ display: "flex", justifyContent: "end", paddingInline: 5 }}>
                            <Button
                                style={{
                                    color: "#fff",
                                    backgroundColor: "#D85912",
                                    border: "none",
                                    padding: "4px",
                                }}

                            >
                                <ArrowRight size={16} style={{ color: "rgba(220, 233, 245, 0.88)" }} />
                                <span
                                    style={{
                                        color: "rgba(220, 233, 245, 0.88)",
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        paddingRight: 3
                                    }}
                                >
                                    {t("details")}
                                </span>
                            </Button>
                        </div>
                    ) : <></>,
            },
        ];

        return columns;
    };
    const skeletonColumns = columns.length
        ? columns.map((col: any, index) => ({
            ...col,
            render: () => <Skeleton.Input active={true} key={index} />,
        }))
        : Array(3).fill({}).map((_, index) => ({
            title: <Skeleton.Input active={true} size="small" />,
            dataIndex: `col${index}`,
            key: `col${index}`,
            render: () => <Skeleton.Input active={true} />,
        }));
    return (
        <>
            <Row gutter={16}>
                <Col span={14}>
                    <Title level={3} style={{ fontWeight: 700, color: '#ffff' }}>
                        {t("supportTicket")}
                    </Title>
                </Col>
                <Col span={10} style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                        style={{
                            color: "#ffff",
                            backgroundColor: "#5394CC",
                            padding: 10,
                            borderRadius: 25,
                            fontSize: 15,
                            height: 45
                        }}
                        onClick={() => router.push(`/portal/supportTicket/add`)}
                    >
                        <Plus size={20} style={{ color: "rgba(220, 233, 245, 0.88)" }} />
                        {translate("createTicket")}
                    </Button>
                </Col>
            </Row>

            <Table<SupportTicket>
                columns={isLoading ? skeletonColumns : supportTicketList && keysToColumn()}
                dataSource={isLoading ? Array(1).fill({ key: Math.random() }) : supportTicketList?.result}
                size="middle"
                className="custom-table"
                style={{ marginTop: 40, borderRadius: 0 }}
                scroll={{ y: 55 * 5 }}
            />

        </>
    )
}