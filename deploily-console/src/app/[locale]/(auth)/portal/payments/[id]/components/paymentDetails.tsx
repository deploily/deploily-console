"use client";

import { usePayment } from "@/lib/features/payments/paymentSelector";
import { fetchPaymentById, uploadPaymentReceipt } from "@/lib/features/payments/paymentThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { SendOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Image, Result, Row, Spin, Table, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import paymentDetailsData from "../../utils/paymentDetailsData";
import { IMAGES_BASE_URL } from "@/app/api/axios-instance";

export default function PaymentDetailsPage({ paymentId }: { paymentId: string }) {
  const t = useScopedI18n("payments");
  const translate = useI18n();

  const dispatch = useAppDispatch();
  const { currentPayment, currentPaymentLoading, currentPaymentLoadingError, uploadSuccess } = usePayment();

  useEffect(() => {
    if (paymentId || uploadSuccess=== true) {
      dispatch(fetchPaymentById(paymentId));
    }

  }, [paymentId, uploadSuccess]);

  const [file, setFile] = useState<RcFile | null>(null);
  console.log("file upload", file);

  const handleFileChange = (info: any) => {
    const selectedFile = info as RcFile;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('receipt', file);
    dispatch(uploadPaymentReceipt({
      'fileData': formData,
      'paymentId': paymentId,
    }));
  }

  const imageUrl = (payment_receipt: string) => payment_receipt.startsWith("http")
    ? payment_receipt
    : `${IMAGES_BASE_URL}${payment_receipt}`;

  return (
    <div style={{ padding: 20, margin: "0 auto" }}>
      <Row style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ color: "white", fontSize: "24px", fontWeight: 800 }}>
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
            dataSource={paymentDetailsData(t, currentPayment, theme)}
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
        {currentPayment !== undefined &&
          <>
            {currentPayment?.payment_method == "bank_transfer" &&
              <div style={{
                flexDirection: "row", display: "flex", justifyContent: "space-between", gap: "10px", alignItems: 'center',
                paddingTop: 20,
                width: "70%",
              }}>
                {file ?
                <span>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Selected receipt"
                    width={250}
                    style={{ borderRadius: 8 }}
                  /></span>
                :
                  currentPayment.payment_receipt !== undefined && currentPayment.payment_receipt !== null ?
                    <Image
                      alt="Logo"
                      src={imageUrl(currentPayment?.payment_receipt)}
                    width={250}
                    style={{ borderRadius: 8 }}
                    />
                :
                  <div>
                  </div>
                }

                {!file ? <Upload
                  beforeUpload={handleFileChange}
                  showUploadList={false}
                  accept="image/*"
                >
                <Button
                  type="primary" icon={<UploadOutlined />}>{t("uploadReceived")}</Button>
                </Upload> : <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleUpload}
                  disabled={!file}
                >
                  {t("confirm")}
                </Button>}
              </div>
            }
          </>}
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
