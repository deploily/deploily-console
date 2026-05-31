import { ServiceDetails } from "@/lib/features/my-applications/myApplicationInterface";
import { theme } from "@/styles/theme";
import { Skeleton, Table, Tag } from "antd";
import { useMemo } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import getStatusStyle from "../../utils/getStatusStyle";
import { useApiServiceSubscription } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionSelectors";
import styles from "./TableStyles.module.css";
import { useRouter } from "next/navigation";

export default function RecentApiSubscriptions() {
    const t = useScopedI18n("apiServiceSubscription");
    const tApplications = useScopedI18n("applications");
    const { apiServiceSubscriptionLoading, apiServiceSubscriptionResponse, apiServiceSubscriptionLoadingError } = useApiServiceSubscription();

    const columns = useMemo(() => {
        return [
            {
                title: t("api"),
                dataIndex: "service_details",
                key: "service_details",
                width: 120,
                render: (service_details: ServiceDetails | null | undefined) =>
                    service_details ? service_details.name.charAt(0).toUpperCase() + service_details.name.slice(1) : "-",
            },
            {
                title: tApplications("plan"),
                dataIndex: "name",
                key: "name",
                width: 120,
                render: (name: string | null | undefined) =>
                    name ?? "-",
            },
            {
                title: tApplications("total"),
                dataIndex: "total_amount",
                key: "total_amount",
                width: 100,
                render: (total_amount: number) =>
                    total_amount
                        ? total_amount.toLocaleString("fr-FR", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }) + " DZD "
                        : "-",
            },
            {
                title: tApplications("status"),
                dataIndex: "status",
                key: "status",
                width: 120,
                render: (status: string) => {
                    const { backgroundColor, color, label } = getStatusStyle(status, theme, t);

                    return (
                        <Tag
                            className={styles.statusTag}
                            style={{
                                backgroundColor,
                                color,
                            }}
                        >
                            {label}
                        </Tag>
                    );
                },
            },

        ];
    }, [t, tApplications]);

    const skeletonColumns = useMemo(
        () =>
            apiServiceSubscriptionLoading
                ? columns.map((col) => ({
                    ...col,
                    render: () => <Skeleton.Input active />,
                }))
                : columns,
        [apiServiceSubscriptionLoading, columns],
    );
    const router = useRouter();

    return (
        <>
            {!apiServiceSubscriptionLoadingError && apiServiceSubscriptionResponse && (
                <div className={styles.tableContainer}>
                    <Table
                        columns={skeletonColumns}
                        dataSource={apiServiceSubscriptionLoading ? Array(3).fill({ key: Math.random() }) : apiServiceSubscriptionResponse.slice(0, 3)}
                        size="small"
                        loading={apiServiceSubscriptionLoading}
                        className={styles.customTable}
                        rowKey={(record) => record.id || `row-${Math.random()}`}
                        pagination={false}
                        scroll={{ x: 'max-content' }}
                         onRow={(record) => ({
                                                onClick: () => {
                                                    if (!apiServiceSubscriptionLoading && record.id) {
                                                            router.push(`/portal/my-api/${record.id}`);
                                                    }
                                                },
                                                style: { cursor: apiServiceSubscriptionLoading ? "default" : "pointer" },
                                                })}
                    />
                </div>
            )}
        </>
    );
}