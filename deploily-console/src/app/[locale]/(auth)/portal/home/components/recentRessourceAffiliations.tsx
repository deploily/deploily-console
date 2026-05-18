import { MyResource } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { useCloudResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { theme } from "@/styles/theme";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Skeleton, Table, Tag, notification } from "antd";
import { useEffect, useMemo } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import getStatusStyle from "../../utils/getStatusStyle";
import styles from "./TableStyles.module.css";

export default function RecentRessourceAffiliations() {
    const t = useScopedI18n("affiliation");
    const { myResourcesResponse, isLoading, cloudResourceLoadingError } = useCloudResource();
    const { isAffiliationCreatedSuccess } = useCloudResource();
    const toastTranslate = useScopedI18n("toast");

    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 20 }} />
                    <span style={{ color: "#000", fontWeight: 600 }}>{toastTranslate("titleSuccess")}</span>
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAffiliationCreatedSuccess]);

    const columns = useMemo(() => {
        return [
            {
                title: t("name"),
                dataIndex: "service_details",
                key: "service_details",
                width: 120,
                render: (service_details: any | null | undefined) => (
                    <span className={styles.cellPrimary}>
                        {service_details
                            ? service_details.name.charAt(0).toUpperCase() + service_details.name.slice(1)
                            : "—"}
                    </span>
                ),
            },
            {
                title: t("providerName"),
                dataIndex: "provider",
                key: "provider",
                width: 120,
                render: (provider: any) => (
                    <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>
                        {provider?.name
                            ? provider.name.charAt(0).toUpperCase() + provider.name.slice(1)
                            : "—"}
                    </span>
                ),
            },
            {
                title: t("amount"),
                dataIndex: "total_price",
                key: "total_price",
                width: 110,
                render: (total_price: number) => (
                    <span className={styles.cellAmount}>
                        {total_price
                            ? total_price.toLocaleString("fr-FR", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            }) + " DZD"
                            : "—"}
                    </span>
                ),
            },
            {
                title: t("status"),
                dataIndex: "affiliation_state",
                key: "affiliation_state",
                width: 110,
                render: (affiliation_state: string) => {
                    const { backgroundColor, color, label } = getStatusStyle(affiliation_state, theme, t);
                    return (
                        <Tag
                            className={styles.statusTag}
                            style={{ backgroundColor, color }}
                        >
                            {label}
                        </Tag>
                    );
                },
            },
            {
                title: t("created_on"),
                dataIndex: "created_on",
                key: "created_on",
                width: 140,
                render: (created_on: Date) => (
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11.5, fontFamily: "monospace" }}>
                        {created_on
                            ? new Date(created_on).toLocaleString("fr-FR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                            : "—"}
                    </span>
                ),
            },
        ];
    }, [t]);

    const skeletonColumns = useMemo(
        () =>
            isLoading
                ? columns.map((col) => ({
                    ...col,
                    render: () => <Skeleton.Input active size="small" style={{ height: 20, borderRadius: 4 }} />,
                }))
                : columns,
        [isLoading, columns],
    );

    return (
        <>
            {contextHolder}
            {!cloudResourceLoadingError && myResourcesResponse && (
                <div className={styles.tableContainer}>
                    <Table<MyResource>
                        columns={skeletonColumns}
                        dataSource={
                            isLoading
                                ? Array(3).fill({}).map((_, i) => ({ key: `skeleton-${i}` }))
                                : myResourcesResponse.result
                        }
                        size="small"
                        loading={false}
                        className={styles.customTable}
                        rowKey={(record) => record.id || `row-${Math.random()}`}
                        pagination={false}
                        scroll={{ x: "max-content" }}
                    />
                </div>
            )}
        </>
    );
}