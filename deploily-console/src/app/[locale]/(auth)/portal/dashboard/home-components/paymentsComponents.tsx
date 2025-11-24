"use client";

import {ApiServiceSubscriptionInterface} from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionInterface";
import {PaymentProfileInterface} from "@/lib/features/payment-profiles/paymentProfilesInterface";
import {PaymentInterface} from "@/lib/features/payments/paymentInterface";
import {usePayment} from "@/lib/features/payments/paymentSelector";
import {fetchPayments} from "@/lib/features/payments/paymentThunks";
import {useAppDispatch} from "@/lib/hook";
import {CustomStyledTable} from "@/styles/components/tableStyle";
import {theme} from "@/styles/theme";
import {Result, Skeleton, Tag} from "antd";
import {useRouter} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {useI18n, useScopedI18n} from "../../../../../../../locales/client";
import getStatusStyle from "../../utils/getStatusStyle";

export default function PaymentsListContainer() {
  const router = useRouter();
  const t = useScopedI18n("payments");
  const translate = useI18n();

  const dispatch = useAppDispatch();
  const {paymentsList, isLoadingPayments, paymentsLoadingError} = usePayment();
  const [data, setData] = useState<PaymentInterface[]>([]);

  useEffect(() => {
    dispatch(fetchPayments(4));
  }, [dispatch]);

  useEffect(() => {
    if (paymentsList?.result) {
      setData(paymentsList.result);
    }
  }, [paymentsList]);

  const columns = useMemo(() => {
    return [
      {
        title: t("nOrder"),
        dataIndex: "id",
        key: "id",
      },
      // {
      //     title: t("serviceName"),
      //     dataIndex: "apiServiceSubscription",
      //     key: "apiServiceSubscription",
      //     render: (subscribe: ApiServiceSubscriptionInterface) => subscribe?.name || "-",
      // }, //TODO: Uncomment when subscription is available
      {
        title: t("amount"),
        dataIndex: "amount",
        key: "amount",
        render: (amount: number) =>
          amount
            ? amount.toLocaleString("fr-FR", {minimumFractionDigits: 0, maximumFractionDigits: 0}) +
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
      },
      {
        title: t("status"),
        dataIndex: "status",
        key: "status",
        fixed: "right",
        render: (status: string) => {
          const {backgroundColor, color, label} = getStatusStyle(status, theme, t);

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
      isLoadingPayments
        ? columns.map((col) => ({
            ...col,
            render: () => <Skeleton.Input active />,
          }))
        : columns,
    [isLoadingPayments, columns],
  );

  return (
    <>
      {!paymentsLoadingError && (
        <CustomStyledTable<any>
          columns={skeletonColumns}
          dataSource={isLoadingPayments ? Array(3).fill({key: Math.random()}) : data}
          size="middle"
          className="custom-table"
          style={{marginTop: 5, borderRadius: 0}}
          scroll={{x: 730, y: 400}}
          pagination={false}
          rowKey={(record: PaymentInterface | {key: number}) =>
            "id" in record ? record.id : `row-${Math.random()}`
          }
          onRow={(record: PaymentInterface) => ({
            onClick: () => router.push(`/portal/payments/${record.id}`),
            style: {cursor: "pointer"},
          })}
        />
      )}

      {!isLoadingPayments && paymentsLoadingError && (
        <Result status="500" title={translate("error")} subTitle={translate("subTitleError")} />
      )}
    </>
  );
}
