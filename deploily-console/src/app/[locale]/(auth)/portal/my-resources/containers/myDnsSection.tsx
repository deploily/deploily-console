import { MyDns } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { useDns } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { getMyDns } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useAppDispatch } from "@/lib/hook";
import { Skeleton, Table } from "antd";
import { useEffect, useMemo } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";

export default function MyDnsContainer() {
  const dispatch = useAppDispatch();
  const t = useScopedI18n("affiliation");
  const { dnsList, isDnsLoading, isDnsLoadingFailed } = useDns();


  useEffect(() => {
    dispatch(getMyDns());
  }, [dispatch]);

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
        render: (_: any, record: MyDns) =>
          record.provider_info?.name
            ? record.provider_info.name.charAt(0).toUpperCase() + record.provider_info.name.slice(1)
            : "-",
      },
      {
        title: t("amount"),
        dataIndex: "price",
        key: "price",
        render: (price: number) =>
          price
            ? price.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) +
            " DZD"
            : "-",
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

  const skeletonColumns = useMemo(
    () =>
      isDnsLoading
        ? columns.map((col) => ({
          ...col,
          render: () => <Skeleton.Input active />,
        }))
        : columns,
    [isDnsLoading, columns],
  );

  return (
    <>
      {!isDnsLoadingFailed && dnsList && (
        <Table<MyDns>
          columns={skeletonColumns}
          dataSource={isDnsLoading ? Array(3).fill({ key: Math.random() }) : dnsList}
          size="middle"
          className="custom-table"
          style={{ marginTop: 40, borderRadius: 0 }}
          rowKey={(record) => record.id || `row-${Math.random()}`}
        />
      )}
    </>
  );
}
