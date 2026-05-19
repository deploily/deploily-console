import { ServiceDetails } from "@/lib/features/my-applications/myApplicationInterface";
import { useMyApplicationList } from "@/lib/features/my-applications/myApplicationSelector";
import { theme } from "@/styles/theme";
import { Skeleton, Table, Tag } from "antd";
import { useMemo } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import getStatusStyle from "../../utils/getStatusStyle";
import styles from "./TableStyles.module.css";

export default function RecentAppSubscriptions() {
    const t = useScopedI18n("applications");
    const { isLoading, MyApplicationList, loadingError } = useMyApplicationList();

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
                title: t("plan"),
                dataIndex: "name",
                key: "name",
                width: 120,
                render: (name: string | null | undefined) =>
                    name ?? "-",
            },
            {
                title: t("total"),
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
                title: t("status"),
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
            {!loadingError && MyApplicationList && (
                <div className={styles.tableContainer}>
                    <Table
                        columns={skeletonColumns}
                        dataSource={isLoading ? Array(3).fill({ key: Math.random() }) : MyApplicationList.slice(0, 3)}
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