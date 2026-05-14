import { MyResource } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { useCloudResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { theme } from "@/styles/theme";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Skeleton, Table, Tag, notification } from "antd";
import { useEffect, useMemo } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import getStatusStyle from "../../utils/getStatusStyle";
import { useMyApplicationList } from "@/lib/features/my-applications/myApplicationSelector";

export default function RecentAppSubscriptions() {
    const t = useScopedI18n("applications");
    const { isLoading, MyApplicationList , loadingError} = useMyApplicationList();

    const { isAffiliationCreatedSuccess } = useCloudResource();
    const toastTranslate = useScopedI18n("toast");

    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 20 }} />
                    <span style={{ color: "#000", fontWeight: 600 }}> {toastTranslate("titleSuccess")}</span>
                </div>
            ),
            description: <div style={{ color: "#888", fontSize: 14 }}>{toastTranslate("success")}</div>,
            duration: 5,
            style: {
                backgroundColor: "#ffffff",
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
        });
    };

    useEffect(() => {
        if (isAffiliationCreatedSuccess) {
            openNotification();
        }
    }, []);

    const columns = useMemo(() => {
        return [
            {
                title: t("svc"),
                dataIndex: "service_details",
                key: "service_details",
                width: 120,
                render: (service_details: any | null | undefined) =>
                    service_details ? service_details.name.charAt(0).toUpperCase() + service_details.name.slice(1) : "-",
            },
            {
                title: t('plan'),
                dataIndex: "plan",
                key: "plan",
                width: 120,
                render: (provider: any) =>
                    provider.name.charAt(0).toUpperCase() + provider.name.slice(1) || "-",
            },
            {
                title: t("total"),
                dataIndex: "total_price",
                key: "total_price",
                width: 100,
                render: (total_price: number) =>
                    total_price
                        ? total_price.toLocaleString("fr-FR", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }) + " DZD "
                        : "-",
            },
            {
                title: t("status"),
                dataIndex: "affiliation_state",
                key: "affiliation_state",
                width: 120,
                render: (affiliation_state: string) => {
                    const { backgroundColor, color, label } = getStatusStyle(affiliation_state, theme, t);

                    return (
                        <Tag
                            style={{
                                backgroundColor,
                                color,
                                border: "none",
                                padding: "4px 0",
                                fontWeight: 600,
                                fontSize: 13,
                                borderRadius: "18px",
                                width: "100px",
                                textAlign: "center",
                                display: "inline-block",
                            }}
                        >
                            {label}
                        </Tag>
                    );
                },
            },
            // {
            //     title: t("created_on"),
            //     dataIndex: "created_on",
            //     key: "created_on",
            //     width: 150,
            //     render: (created_on: Date) =>
            //         created_on
            //             ? new Date(created_on).toLocaleString("fr-FR", {
            //                 day: "2-digit",
            //                 month: "2-digit",
            //                 year: "numeric",
            //                 hour: "2-digit",
            //                 minute: "2-digit",
            //             })
            //             : "-",
            // },
        ];
    }, [t]);

    const skeletonColumns = useMemo(
        () =>
            isLoading
                ? columns.map((col) => ({
                    ...col,
                    render: () => <Skeleton.Input active />,
                }))
                : columns,
        [isLoading, columns],
    );


    return (
        <>
            {contextHolder}
            {!loadingError && MyApplicationList && (
                <div style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    overflowX: 'auto'
                }}>
                    <Table<MyResource>
                        columns={skeletonColumns}
                        dataSource={isLoading ? Array(3).fill({ key: Math.random() }) : MyApplicationList}
                        size="small"
                        loading={isLoading}
                        className="custom-table"
                        style={{ margin: 0, padding: "0px", borderRadius: 0 }}
                        rowKey={(record) => record.id || `row-${Math.random()}`}
                        pagination={false}
                        scroll={{ x: 'max-content' }}
                    />
                </div>
            )}

            <style jsx global>{`
                .custom-table .ant-table {
                    background: transparent;
                }
                
                .custom-table .ant-table-thead > tr > th {
                    background: ${theme.token.darkGray};
                    color: rgba(255, 255, 255, 0.7);
                    border-bottom: 1px solid ${theme.token.orange600}20;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    padding: 12px 8px;
                }
                
                .custom-table .ant-table-tbody > tr > td {
                    background: transparent;
                    color: rgba(255, 255, 255, 0.9);
                    border-bottom: 1px solid ${theme.token.orange600}10;
                    font-size: 13px;
                    padding: 12px 8px;
                }
                
                .custom-table .ant-table-tbody > tr:hover > td {
                    background: ${theme.token.orange600}10;
                }
                
                .custom-table .ant-table-container {
                    border-radius: 0;
                }
                
                /* Custom scrollbar styling */
                .custom-table::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                
                .custom-table::-webkit-scrollbar-track {
                    background: ${theme.token.darkGray};
                }
                
                .custom-table::-webkit-scrollbar-thumb {
                    background: ${theme.token.orange600}40;
                    border-radius: 3px;
                }
                
                .custom-table::-webkit-scrollbar-thumb:hover {
                    background: ${theme.token.orange600}60;
                }
            `}</style>
        </>
    );
}