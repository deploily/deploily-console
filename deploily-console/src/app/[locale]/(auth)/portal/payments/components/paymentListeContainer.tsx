"use client";

import { usePayment } from "@/lib/features/payments/paymentSelector";
import { deletePaymentById, deletePayments, fetchPayments,  } from "@/lib/features/payments/paymentThunks";
import { ProfileInterface } from "@/lib/features/profilePayment/profilePaymentInterface";
import { SubscribeInterface } from "@/lib/features/subscribe/subscribeInterface";
import { useAppDispatch } from "@/lib/hook";
import { Button, Skeleton, Table, Modal, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import { PaymentInterface } from "@/lib/features/payments/paymentInterface";
import { Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/styles/components/buttonStyle";

export default function PaymentListeContainer() {
    const router = useRouter(); 
    const t = useScopedI18n('payments');
    const dispatch = useAppDispatch();
    const { paymentsList, isLoading } = usePayment();
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
            title: t("are_you_sure"),
            content: t("delete_confirmation"),
            okText: t("yes"),
            cancelText: t("no"),
            onOk: async () => {
                try {
                    await dispatch(deletePaymentById(id)).unwrap();
                    setData((prevData) => prevData.filter((item) => item.id !== id));
                    message.success(t("delete_success"));
                } catch (error) {
                    message.error(t("delete_error"));
                }
            },
        });
    };
    // const handleDeleteAll = () => {
    //     Modal.confirm({
    //         title: t("are_you_sure"),
    //         content: t("delete_confirmation"),
    //         okText: t("yes"),
    //         cancelText: t("no"),
    //         onOk: async () => {
    //             try {
    //                 await dispatch(deletePayments()).unwrap();
    //                 message.success(t("delete_success"));
    //             } catch (error) {
    //                 message.error(t("delete_error"));
    //             }
    //         },
    //     });
    // };

    const columns = useMemo(() => {
        return [
            {
                title: t("N_Order"),
                dataIndex: "id",
                key: "id",
            },
            {
                title: t("profile"),
                dataIndex: "profile",
                key: "profile",
                render: (profile: ProfileInterface) => profile?.name || "-",
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
                                return { backgroundColor: "#28B609", color: "#fff", label: t("done") }; 
                            case "pending":
                                return { backgroundColor: "#F77605", color: "#fff", label: t("pending") }; 
                            case "failed":
                                return { backgroundColor: "#EA1919", color: "#fff", label: t("failed") }; 
                            default:
                                return { backgroundColor: "#d9d9d9", color: "#000", label: status }; 
                        }
                    };

                    const { backgroundColor, color, label } = getStatusStyle();

                    return (
                        <Button
                            type="primary"
                            style={{ width:"80px",
                                backgroundColor,
                                color,
                                borderColor: "transparent",
                                cursor: "default",
                                pointerEvents: "none",
                                boxShadow:"none"
                            }}
                        >
                            {label}
                        </Button>
                    );
                },
            },
            {
                title: t("payment_method"),
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
                title: t("start_date"),
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
                    <Button type="link" danger icon={<Trash size={24} />} onClick={() => handleDelete(record.id)} />
                ),
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
            {/* <DeleteButton danger icon={<Trash size={24} />}
            onClick={handleDeleteAll}
        >
                      {t("delete")}
                    </DeleteButton>
         */}
        <Table<PaymentInterface>
            columns={skeletonColumns}
            dataSource={isLoading ? Array(3).fill({ key: Math.random() }) : data}
            size="middle"
            className="custom-table"
            style={{ marginTop: 40, borderRadius: 0 }}
            rowKey={(record) => record.id || `row-${Math.random()}`}
            onRow={(record) => ({
                onClick: () => router.push(`/portal/payments/${record.id}`), // Redirect on row click
            })}
        /></> 
    );
}
