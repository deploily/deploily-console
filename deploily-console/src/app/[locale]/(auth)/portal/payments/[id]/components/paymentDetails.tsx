"use client";

import { Row, Spin, Table, Upload, UploadFile, UploadProps, Result } from "antd";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { usePayment } from "@/lib/features/payments/paymentSelector";
import { useEffect, useState } from "react";
import { fetchPaymentById, uploadPaymentReceipt } from "@/lib/features/payments/paymentThunks";
import { CustomUploadButton } from "@/styles/components/buttonStyle";
import { UploadOutlined } from '@ant-design/icons';
import { theme } from "@/styles/theme";
import paymentDetailsData from "../../utils/paymentDetailsData";

export default function PaymentDetailsPage({ paymentId }: { paymentId: string }) {
  const t = useScopedI18n("payments");
  const translate = useI18n();

  const dispatch = useAppDispatch();
  const { currentPayment, currentPaymentLoading, currentPaymentLoadingError } = usePayment();

  useEffect(() => {
    if (paymentId) {
      dispatch(fetchPaymentById(paymentId));
    }
  }, [paymentId, dispatch]);



  const [fileList, setFileList] = useState<UploadFile[]>()
  const handleChange: UploadProps['onChange'] = ({ fileList: newFile }) => {
    setFileList(newFile);
    if (newFile.length > 0) {
      const formData = new FormData();
      formData.append('fileData', newFile[0].originFileObj as any);
      formData.append('payment_id', paymentId);
      dispatch(uploadPaymentReceipt(formData));
    }
  }
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
