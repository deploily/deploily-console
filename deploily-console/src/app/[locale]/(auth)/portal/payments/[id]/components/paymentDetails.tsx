"use client";

import { Button, Row, Spin, Modal, message, Table, Upload, UploadFile, UploadProps, Result, Tag } from "antd";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { usePayment } from "@/lib/features/payments/paymentSelector";
import { useEffect, useState } from "react";
import { fetchPaymentById, deletePaymentById } from "@/lib/features/payments/paymentThunks";
import { useRouter } from "next/navigation";
import { CustomUploadButton } from "@/styles/components/buttonStyle";
import { Trash } from "@phosphor-icons/react";
import { UploadOutlined } from '@ant-design/icons';
import { theme } from "@/styles/theme";

export default function PaymentDetailsPage({ paymentId }: { paymentId: string }) {
  const t = useScopedI18n("payments");
  const translate = useI18n();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentPayment, currentPaymentLoading, currentPaymentLoadingError } = usePayment();

  useEffect(() => {
    if (paymentId) {
      dispatch(fetchPaymentById(paymentId));
    }
  }, [paymentId, dispatch]);

  const getStatusStyle = (status: string) => {
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

  const paymentDetailsData = currentPayment
    ? [
      { key: "1", label: t("nOrder"), value: currentPayment.id },
      {
        key: "2",
        label: t("status"),
        value: (() => {
          const { backgroundColor, color, label } = getStatusStyle(currentPayment.status);
          return (
            <Tag style={{
              backgroundColor,
              color,
              border: "none",
              padding: "4px 0",
              fontWeight: 600,
              fontSize: 13,
              borderRadius: "18px",
              width: "100px",
              textAlign: "center",
              display: "inline-block",}}>
              {label}
            </Tag>
          );
        })()
      },      { key: "3", label: t("profile"), value: currentPayment.profile?.name || "-" },
      { key: "4", label: t("serviceName"), value: currentPayment.subscription?.name || "-" },
      { key: "5", label: t("amount"), value: currentPayment.amount?.toLocaleString("fr-FR", { minimumFractionDigits: 0 }) + " DZD " || "-" },
      { key: "6", label: t("startDate"), value: new Date(currentPayment.start_date).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }) },
      { key: "7", label: t("hour"), value: new Date(currentPayment.start_date).toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" }) },
      { key: "8", label: t("paymentMethod"), value: currentPayment.payment_method === "bank_transfer" ? t("bank") : t("card") },
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
            <CustomUploadButton
              style={{
               
                paddingInline: 10,
              }}
            >
              <UploadOutlined />
              {t("uploadReceived")}
            </CustomUploadButton>
          </Upload>

        </div>
        }

      </div>
      {!currentPaymentLoading && currentPaymentLoadingError &&
        <Result
          status="500"
          title={translate('error')}
          subTitle={translate('subTitleError')}
        />}
    </div>
  );
}
