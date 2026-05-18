import { MyResource } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { ServiceDetails } from "@/lib/features/my-applications/myApplicationInterface";
import { useMyDeploymentList } from "@/lib/features/my-deployments/myDeploymentSelector";
import { theme } from "@/styles/theme";
import { Skeleton, Table, Tag } from "antd";
import { useMemo } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import getStatusStyle from "../../utils/getStatusStyle";
import styles from "./TableStyles.module.css";

export default function RecentDeploymentsSubscriptions() {
    const t = useScopedI18n("deployment");
    const tApplications = useScopedI18n("applications");
    const { isLoading, MyDeploymentList, loadingError } = useMyDeploymentList();

    const columns = useMemo(() => {
        return [
            {
                title: t("svc"),
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
            {!loadingError && MyDeploymentList && (
                <div className={styles.tableContainer}>
                    <Table<MyResource>
                        columns={skeletonColumns}
                        dataSource={isLoading ? Array(3).fill({ key: Math.random() }) : MyDeploymentList.slice(0, 3)}
                        size="small"
                        loading={isLoading}
                        className={styles.customTable}
                        rowKey={(record) => record.id || `row-${Math.random()}`}
                        pagination={false}
                        scroll={{ x: 'max-content' }}
                    />
                </div>
            )}
        </>
    );
}