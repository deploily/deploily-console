"use client";
import { ManagedResourceList, service_details } from "@/lib/features/cloud-resource/cloudResourceInterface";
import {
  useCloudResource,
  useManagedResource,
  useManagedResourceSearchParams,
} from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { updateManagedResourceFilterParams } from "@/lib/features/cloud-resource/cloudResourceSlice";
import { getManagedResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useAppDispatch } from "@/lib/hook";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Skeleton, Table, Tag, notification } from "antd";
import { useEffect, useMemo } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";

export default function ManagedRessourcesComponent() {
  const dispatch = useAppDispatch();
  const t = useScopedI18n("affiliation");
  const tResources = useScopedI18n("resources");
  const { page, page_size, count } = useManagedResourceSearchParams();

  useEffect(() => {
    dispatch(getManagedResources());
  }, [dispatch, page, page_size]);

  const { managedResourceResponse, isLoading, managedResourceFailed } = useManagedResource();
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
        title: t("name"),
        dataIndex: "service_details",
        key: "service_details",
        render: (service_details: service_details) =>
          service_details ? service_details.service_name.charAt(0).toUpperCase() + service_details.service_name.slice(1) : "-",
      },
      {
        title: t('providerName'),
        dataIndex: "provider",
        key: "provider",
        render: (service_details: service_details) =>
          service_details && service_details.provider ? service_details.provider.name?.charAt(0).toUpperCase() + service_details.provider.name?.slice(1) : "-",
      },
      {
        title: t('type'),
        dataIndex: "ressource_type",
        key: "ressource_type",
        render: (ressource_type: string) =>
          <Tag
            color="green"
            style={{
              height: "fit-content",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: 20,
              padding: "2px 10px",
              textTransform: "capitalize",
            }}
          >
            {tResources(ressource_type as 'vps' | 'web_hosting' | 'dns' | 's3')}
          </Tag>
      },
      {
        title: t("startDate"),
        key: "start_date",
        dataIndex: "start_date",
        render: (start_date?: string) =>
          start_date ?? "-"
      },
      {
        title: t("endDate"),
        key: "end_date",
        dataIndex: "end_date",
        render: (end_date?: string) =>
          end_date ?? "-"
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

  // Handle pagination change
  const handleTableChange = (pagination: any) => {
    dispatch(updateManagedResourceFilterParams({
      page_size: pagination.pageSize,
      page: pagination.current - 1,
    }));
  };


  return (
    <>
      {contextHolder}
      {!managedResourceFailed && managedResourceResponse && (
        <Table<ManagedResourceList>
          columns={skeletonColumns}
          dataSource={isLoading ? Array(3).fill({ key: Math.random() }) : managedResourceResponse}
          size="middle"
          className="custom-table"
          style={{ marginTop: 10, borderRadius: 0 }}
          rowKey={(record) => String(record.id)}
          pagination={{
            current: page + 1,
            pageSize: page_size,
            total: count,
            showSizeChanger: false,
          }}
          onChange={handleTableChange}
          loading={isLoading}
        />
      )}
    </>
  );
}
