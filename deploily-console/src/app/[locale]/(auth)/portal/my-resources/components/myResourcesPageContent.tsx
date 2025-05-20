import { MyResourcesList } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { useCloudResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { getMyResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Skeleton, Table, Tag } from "antd";
import { useEffect, useMemo } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import getStatusStyle from "./status";




export default function MyResourcesContainer() {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('affiliation');
    const { myResourcesResponse, isLoading, cloudResourceLoadingError } = useCloudResource();
    useEffect(() => {
        dispatch(getMyResources());
    }, [dispatch]);
    const columns = useMemo(() => {
        return [
            {
                title: t("name"),
                dataIndex: "service_name",
                key: "service_name",
                render: (service_name: string) => service_name.charAt(0).toUpperCase() + service_name.slice(1) || "-",
            },
            {
                title: t("providerName"),
                dataIndex: "provider_name",
                key: "provider_name",
                render: (provider_name: string) => provider_name.charAt(0).toUpperCase() + provider_name.slice(1) || "-",
            },
            {
                title: t("amount"),
                dataIndex: "total_price",
                key: "total_price",
                render: (total_price: number) =>
                    total_price ? total_price.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " DZD " : "-",
            },
            {
                title: t("status"),
                dataIndex: "affiliation_state",
                key: "affiliation_state",
                render: (affiliation_state: string) => {

                    const { backgroundColor, color, label } = getStatusStyle(affiliation_state, theme, t);

                    return (
                        <Tag style={{
                            backgroundColor, color, border: "none",
                            padding: "4px 0",
                            fontWeight: 600,
                            fontSize: 13,
                            borderRadius: "18px",
                            width: "100px",
                            textAlign: "center",
                            display: "inline-block"
                        }}>
                            {label}
                        </Tag>
                    );
                },
            },
            {
                title: t("created_on"),
                dataIndex: "created_on",
                key: "created_on",
                render: (created_on: Date) =>
                    created_on ? new Date(created_on).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    }) : "-",
            },

        ];
    }, [t]);

    const skeletonColumns = useMemo(() => (
        isLoading
            ? columns.map((col) => ({
                ...col,
                render: () => <Skeleton.Input active />,
            }))
            : columns
    ), [isLoading, columns]);


    return (
        <>
            {!cloudResourceLoadingError && myResourcesResponse &&
                <Table<MyResourcesList>
                    columns={skeletonColumns}
                    dataSource={isLoading ? Array(3).fill({ key: Math.random() }) : myResourcesResponse}
                    size="middle"
                    className="custom-table"
                    style={{ marginTop: 40, borderRadius: 0 }}
                    rowKey={(record) => record.id || `row-${Math.random()}`}

                />}

        </>

    )
}