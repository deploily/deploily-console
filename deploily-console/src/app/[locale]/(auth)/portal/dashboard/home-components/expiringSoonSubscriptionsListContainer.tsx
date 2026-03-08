"use client";

import { PaymentInterface } from "@/lib/features/payments/paymentInterface";
import { CustomStyledTable } from "@/styles/components/tableStyle";
import { theme } from "@/styles/theme";
import { Result, Skeleton, Tag } from "antd";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import getStatusStyle from "../../utils/getStatusStyle";
import { useDashboard } from "../features/dashboardSelector";

export default function ExpiringSoonSubscriptionsListContainer() {
  const router = useRouter();
  const t = useScopedI18n("dashboard.expiringSoonSubscriptions");
  const translate = useI18n();
  const { dashboardResponse, dashboardLoading, dashboardError } = useDashboard();

  const columns = useMemo(() => {
    return [
      {
        title: t("nOrder"),
        dataIndex: "id",
        key: "id",
      },
      {
        title: t("serviceName"),
        dataIndex: "service_plan",
        key: "service_plan",
        render: (name: string) => name || "-",
      },
      {
        title: t("planName"),
        dataIndex: "name",
        key: "name",
        render: (name: string) => name || "-",
      },
      {
        title: t("amount"),
        dataIndex: "total_amount",
        key: "total_amount",
        render: (amount: number) =>
          amount
            ? amount.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) +
            " DZD "
            : "-",
      },
      {
        title: t("startDate"),
        dataIndex: "start_date",
        key: "start_date",
        render: (date: Date) =>
          date
            ? new Date(date).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
            : "-",
      }, {
        title: t("expirayDate"),
        dataIndex: "expiry_date",
        key: "expiry_date",
        render: (date: Date) =>
          date
            ? new Date(date).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
            : "-",
      },
      {
        title: t("status"),
        dataIndex: "status",
        key: "status",
        fixed: "right",
        render: (status: string) => {
          const { backgroundColor, color, label } = getStatusStyle(status, theme, t);

          return (
            <Tag
              style={{
                backgroundColor,
                color,
                border: `1px solid ${theme.token.gray50}`,
                padding: "2px 0",
                fontWeight: 600,
                fontSize: 13,
                width: "100px",
                textAlign: "center",
                display: "inline-block",
                borderRadius: 5,
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

      dashboardLoading ? columns.map((col) => ({
        ...col,
        render: () => <Skeleton.Input active />,
      }))
        : columns,
    [dashboardLoading, columns],
  );

  return (
    <>
      {!dashboardError && (
        <CustomStyledTable<any>
          columns={skeletonColumns}
          dataSource={dashboardError ? Array(3).fill({ key: Math.random() }) : dashboardResponse?.expiring_soon || []}
          size="middle"
          className="custom-table"
          style={{ marginTop: 5, borderRadius: 0 }}
          scroll={{ x: 730, y: 400 }}
          pagination={false}
          rowKey={(record: PaymentInterface | { key: number }) =>
            "id" in record ? record.id : `row-${Math.random()}`
          }
          onRow={(record: PaymentInterface) => ({
            onClick: () => router.push(`/portal/payments/${record.id}`),
            style: { cursor: "pointer" },
          })}
        />
      )}

      {!dashboardLoading && dashboardError && (
        <Result status="500" title={translate("error")} subTitle={translate("subTitleError")} />
      )}
    </>
  );
}
