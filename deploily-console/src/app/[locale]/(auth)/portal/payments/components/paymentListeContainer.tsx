"use client";

import { usePayment } from "@/lib/features/payments/paymentSelector";
import { deletePaymentById, deletePayments, fetchPayments, } from "@/lib/features/payments/paymentThunks";
import { SubscribeInterface } from "@/lib/features/subscribe/subscribeInterface";
import { useAppDispatch } from "@/lib/hook";
import { Button, Skeleton, Table, Modal, message, Result } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import { PaymentInterface } from "@/lib/features/payments/paymentInterface";
import { Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { theme } from "@/styles/theme";
import { ProfileServiceInterface } from "@/lib/features/profileService/profileServiceInterface";

export default function PaymentListeContainer() {

    const router = useRouter();
    const t = useScopedI18n('payments');
    const translate = useI18n();

    const dispatch = useAppDispatch();
    const { paymentsList, isLoadingPayments, paymentsLoadingError } = usePayment();
    const [data, setData] = useState<PaymentInterface[]>([]);

    useEffect(() => {
        dispatch(fetchPayments());
    }, [dispatch]);

    useEffect(() => {
        if (paymentsList?.result) {
            setData(paymentsList.result);
        }
    }, [paymentsList]);

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: t("areYouSure"),
            content: t("deleteConfirmation"),
            okText: t("yes"),
            cancelText: t("no"),
            onOk: async () => {
                try {
                    await dispatch(deletePaymentById(id)).unwrap();
                    setData((prevData) => prevData.filter((item) => item.id !== id));
                    message.success(t("deleteSuccess"));
                } catch (error) {
                    message.error(t("deleteError"));
                }
            },
        });
    };


    const columns = useMemo(() => {
        return [
            {
                title: t("nOrder"),
                dataIndex: "id",
                key: "id",
            },
            {
                title: t("profile"),
                dataIndex: "profile",
                key: "profile",
                render: (profile: ProfileServiceInterface) => profile?.name || "-",
            },
            {
                title: t("serviceName"),
                dataIndex: "subscription",
                key: "subscription",
                render: (myService: SubscribeInterface) => myService?.name || "-",
            },
            {
                title: t("amount"),
                dataIndex: "amount",
                key: "amount",
                render: (amount: number) =>
                    amount ? amount.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " DZD " : "-",
            },
            {
                title: t("status"),
                dataIndex: "status",
                key: "status",
                render: (status: string) => {
                    const getStatusStyle = () => {
                        switch (status) {
                            case "completed":
                                return { backgroundColor: theme.token.green, color: theme.token.colorWhite, label: t("done") };
                            case "pending":
                                return { backgroundColor: theme.token.orange300, color: theme.token.colorWhite, label: t("pending") };
                            case "failed":
                                return { backgroundColor: theme.token.Error100, color: theme.token.colorWhite, label: t("failed") };
                            default:
                                return { backgroundColor: theme.token.gray200, color: theme.token.colorWhite, label: status };
                        }
                    };

                    const { backgroundColor, color, label } = getStatusStyle();

                    return (
                        <Button
                            type="primary"
                            style={{
                                width: "80px",
                                backgroundColor,
                                color,
                                borderColor: "transparent",
                                cursor: "default",
                                pointerEvents: "none",
                                boxShadow: "none"
                            }}
                        >
                            {label}
                        </Button>
                    );
                },
            },
            {
                title: t("paymentMethod"),
                dataIndex: "payment_method",
                key: "payment_method",
                render: (payment_method: string) => {
                    switch (payment_method) {
                        case "bank_transfer":
                            return t("bank");
                        case "card":
                            return t("card");
                        default:
                            return "-";
                    }
                },
            },
            {
                title: t("startDate"),
                dataIndex: "start_date",
                key: "start_date",
                render: (date: Date) =>
                    date ? new Date(date).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    }) : "-",
            },

            {
                key: "actions",
                render: (_: any, record: PaymentInterface) => (
                    <Button type="link" icon={<Trash size={24} color={theme.token.red500} />} onClick={() => handleDelete(record.id)} />
                ),
            },
        ];
    }, [t]);

    const skeletonColumns = useMemo(() => (
        isLoadingPayments
            ? columns.map((col) => ({
                ...col,
                render: () => <Skeleton.Input active />,
            }))
            : columns
    ), [isLoadingPayments, columns]);

    return (
        <>
            {!paymentsLoadingError &&
                <Table<PaymentInterface>
                    columns={skeletonColumns}
                    dataSource={isLoadingPayments ? Array(3).fill({ key: Math.random() }) : data}
                    size="middle"
                    className="custom-table"
                    style={{ marginTop: 40, borderRadius: 0 }}
                    rowKey={(record) => record.id || `row-${Math.random()}`}
                    onRow={(record) => ({
                        onClick: () => router.push(`/portal/payments/${record.id}`),
                        style: { cursor: "pointer" },
                    })}
                />}

            {!isLoadingPayments && paymentsLoadingError &&
                <Result
                    status="500"
                    title={translate('error')}
                    subTitle={translate('subTitleError')}
                />}
        </>
    );
}
