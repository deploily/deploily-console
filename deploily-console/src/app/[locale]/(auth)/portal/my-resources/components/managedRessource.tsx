"use client";
import { useCloudResource, useManagedResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { getManagedResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Skeleton, Table, Tag, notification } from "antd";
import { useEffect, useMemo } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import getStatusStyle from "./status";
import { ManagedResourceList } from "@/lib/features/cloud-resource/cloudResourceInterface";

export default function ManagedRessourcesComponent() {
    const dispatch = useAppDispatch();
    const t = useScopedI18n('affiliation');
    useEffect(() => {
        dispatch(getManagedResources());
    }, [t]);

    const { managedResourceResponse, isLoading, managedResourceFailed } = useManagedResource();
    const { isAffiliationCreatedSuccess } = useCloudResource();
    const toastTranslate = useScopedI18n('toast');

    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 20 }} />
                    <span style={{ color: '#000', fontWeight: 600 }}> {toastTranslate("titleSuccess")}</span>
                </div>
            ),
            description: (
                <div style={{ color: '#888', fontSize: 14 }}>

                    {toastTranslate("success")}
                </div>
            ),
            duration: 5,
            style: {
                backgroundColor: '#ffffff',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
                title: t("name"),
                dataIndex: "service_name",
                key: "service_name",
                render: (service_name: string | null | undefined) =>
                    service_name ? service_name.charAt(0).toUpperCase() + service_name.slice(1) : "-",
            },
            {
                title: t("providerName"),
                dataIndex: ["provider_info", "name"],
                key: "provider_name",
                render: (_: any, record: ManagedResourceList) =>
                    record.provider_info?.name ? record.provider_info.name.charAt(0).toUpperCase() + record.provider_info.name.slice(1) : "-",
            },
            {
                title: t("amount"),
                dataIndex: "price",
                key: "price",
                render: (price: number) =>
                    price ? price.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " DZD" : "-",
            },
            {
                title: t("status"),
                key: "status",
                render: () => {
                    const { backgroundColor, color, label } = getStatusStyle("pending", theme, t); // fallback or fake status
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
                }
            },
            {
                title: t("created_on"),
                key: "created_on",
                render: () => {
                    const fakeDate = new Date(); // Replace with real date if available
                    return fakeDate.toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                },
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
            {contextHolder}
            {!managedResourceFailed && managedResourceResponse &&
                <Table<ManagedResourceList>
                    columns={skeletonColumns}
                    dataSource={isLoading ? Array(3).fill({ key: Math.random() }) : managedResourceResponse}
                    size="middle"
                    className="custom-table"
                    style={{ marginTop: 40, borderRadius: 0 }}
                    rowKey={(record) => String(record.id)}
                />}
        </>

    )
}