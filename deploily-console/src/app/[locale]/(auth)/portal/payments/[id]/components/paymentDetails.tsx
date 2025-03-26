"use client";

import { Button, Row, Spin, Modal, message, Table, Upload, UploadFile, UploadProps } from "antd";
import { useScopedI18n } from "../../../../../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { usePayment } from "@/lib/features/payments/paymentSelector";
import { useEffect, useState } from "react";
import { fetchPaymentById, deletePaymentById } from "@/lib/features/payments/paymentThunks";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/styles/components/buttonStyle";
import { Trash } from "@phosphor-icons/react";
import { UploadOutlined } from '@ant-design/icons';

export default function PaymentDetailsPage({ paymentId }: { paymentId: string }) {
  const t = useScopedI18n("payments");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentPayment, currentPaymentLoading } = usePayment();

  useEffect(() => {
    if (paymentId) {
      dispatch(fetchPaymentById(paymentId));
    }
  }, [paymentId, dispatch]);

  // Function to get the status button style
  const getStatusStyle = (status: string) => {
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

  // Delete payment function
  const handleDelete = () => {
    Modal.confirm({
      title: t("areYouSure"),
      content: t("delete_confirmation"),
      okText: t("yes"),
      cancelText: t("no"),
      onOk: async () => {
        try {
          await dispatch(deletePaymentById(paymentId)).unwrap();
          message.success(t("deleteSuccess"));
          router.push("/portal/payments"); 
        } catch (error) {
          message.error(t("deleteError"));
        }
      },
    });
  };

  const paymentDetailsData = currentPayment
    ? [
      { key: "1", label: t("nOrder"), value: currentPayment.id },
      { key: "2", label: t("profile"), value: currentPayment.profile?.name || "-" },
      { key: "3", label: t("serviceName"), value: currentPayment.subscription?.name || "-" },
      { key: "4", label: t("amount"), value: currentPayment.amount?.toLocaleString("fr-FR", { minimumFractionDigits: 0 }) + " DZD " || "-" },
      { key: "5", label: t("startDate"), value: new Date(currentPayment.start_date).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }) },
      { key: "6", label: t("hour"), value: new Date(currentPayment.start_date).toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" }) },
      { key: "7", label: t("payment_method"), value: currentPayment.payment_method === "bank_transfer" ? t("bank") : t("card") },
    ]
    : [];


  const [fileList, setFileList] = useState<UploadFile[]>()
  const handleChange: UploadProps['onChange'] = ({ fileList: newFile }) =>
    setFileList(newFile);
  return (
    <div style={{ padding: 20, margin: "0 auto" }}>
      <Row style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ color: "white", fontFamily: "Inter, sans-serif", fontSize: "24px", fontWeight: 800 }}>
          {t("paymentDetails")}
        </span>
        {currentPayment ? (
          <div style={{ display: "flex", gap: 10 }}>
            {currentPayment.status && (() => {
              const { backgroundColor, color, label } = getStatusStyle(currentPayment.status);
              return (
                <Button
                  type="primary"
                  style={{
                    width: "100px",
                    backgroundColor,
                    color,
                    borderColor: "transparent",
                    cursor: "default",
                    pointerEvents: "none",
                    boxShadow: "none",
                  }}
                >
                  {label}
                </Button>
              );
            })()}

            <DeleteButton danger icon={<Trash size={24} />} onClick={handleDelete}>
              {t("delete")}
            </DeleteButton>
          </div>
        ) : null}
      </Row>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 120,
          width: "100%",
        }}
      >
        {currentPaymentLoading ? (
          <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
        ) : (
          <Table
            dataSource={paymentDetailsData}
            pagination={false}
            showHeader={false}
            bordered
            style={{
              width: "80%",
              minWidth: "400px",
              maxWidth: "800px",
              textAlign: "center",
            }}
            columns={[
              {
                dataIndex: "label",
                key: "label",
                width: "50%",
                className: "field-column",
                align: "center",
              },
              {
                dataIndex: "value",
                key: "value",
                width: "50%",
                className: "value-column",
                align: "center",
              },
            ]}
          />
        )}

        {/* Upload Button Aligned with Table Start */}
        {currentPayment?.payment_method === "bank_transfer" && <div
          style={{
            paddingTop: 20,
            width: "80%",
            minWidth: "400px",
            maxWidth: "800px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Upload
            accept="image/png, image/jpeg"
            listType="picture"
            maxCount={1}
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleChange}
          >
            <Button
              style={{
                color: "#fff",
                backgroundColor: "#D85912",
                border: "none",
                paddingInline: 10,
              }}
            >
              <UploadOutlined />
              {t("uploadReceived")}
            </Button>
          </Upload>

        </div>
        }

      </div>
    </div>
  );
}
