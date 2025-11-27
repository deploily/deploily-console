"use client";

import {EpaymentResult} from "@/lib/features/epayment/epaymentInterface";
import {generatePdfReceipt, sendPdfReceiptEmail} from "@/lib/features/epayment/epaymentThunks";
import {useAppDispatch} from "@/lib/hook";
import {Button, Card, Col, Image, Input, message, Modal, Row, Table, Typography} from "antd";
import {useState} from "react";
import {useScopedI18n} from "../../../../../locales/client";

const {Title, Text} = Typography;

export default function ConfirmContentPage({paymentResult}: {paymentResult: EpaymentResult}) {
  const data = [
    {label: "Transaction ID", value: paymentResult.ID},
    {label: "Order Number", value: paymentResult.ORDER_NUMBER},
    {label: "Approval Code", value: paymentResult.APPROVAL_CODE},
    {label: "Date", value: new Date(paymentResult.DATE).toLocaleDateString()},
    {label: "Hour", value: new Date(paymentResult.DATE).toLocaleTimeString()},
    {
      label: "Amount",
      value: `${Intl.NumberFormat("fr-FR", {useGrouping: true}).format(paymentResult.AMOUNT)} DZD`,
    },
    {label: "Card Holder", value: paymentResult.CARD_HOLDER_NAME},
    {label: "Payment Status", value: paymentResult.ACTION_CODE_DESCRIPTION},
    {label: "Authorization Code", value: paymentResult.AUTH_CODE},
    {label: "SATIM Order ID", value: paymentResult.SATIM_ORDER_ID},
  ];

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const t = useScopedI18n("epayment");

  const handleSendEmail = async () => {
    if (!email) {
      message.warning("Please enter an email address.");
      return;
    }

    try {
      setEmailLoading(true);
      await dispatch(sendPdfReceiptEmail({order_id: paymentResult.SATIM_ORDER_ID, email})).unwrap();
      message.success("Receipt sent to email!");
      setEmail("");
      setEmailModalOpen(false);
    } catch (error) {
      message.error("Failed to send email.");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response: any = await dispatch(
        generatePdfReceipt(paymentResult.SATIM_ORDER_ID),
      ).unwrap();
      const blob = new Blob([response], {type: "application/pdf"});
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-${paymentResult.ID}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      message.error("Failed to download receipt.");
    }
  };

  const handlePrint = () => window.print();

  return (
    <div
      style={{
        maxWidth: 650,
        margin: "50px auto",
        padding: 24,
        color: "#fff",
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(182, 151, 151, 0.3)",
      }}
    >
      <Text strong style={{fontSize: 16, color: "#fff", marginBottom: 8}}>
        CIB / E-Dahabia
      </Text>
      <Row justify="center" style={{marginBottom: 25, marginTop: 8}}>
        <Col>
          <Image
            src="/images/paymentIcon.png"
            alt="PAY"
            style={{width: 60, height: 35}}
            preview={false}
          />
        </Col>
      </Row>
      <Title
        level={5}
        style={{
          textAlign: "center",
          margin: "12px 0",
          color: "limegreen",
        }}
      >
        {paymentResult.ACTION_CODE_DESCRIPTION}
      </Title>

      <Card style={{backgroundColor: "#141414", color: "#fff", marginBottom: 20}}>
        <Table
          dataSource={data}
          pagination={false}
          bordered
          showHeader={false}
          rowKey="label"
          columns={[
            {
              dataIndex: "label",
              key: "label",
              render: (text) => <Text style={{color: "#fff"}}>{text}</Text>,
              width: "50%",
            },
            {
              dataIndex: "value",
              key: "value",
              render: (text) => <Text style={{color: "#fff"}}>{text}</Text>,
            },
          ]}
          style={{
            backgroundColor: "#141414",
            borderRadius: 4,
          }}
        />
      </Card>

      <Row gutter={16} justify="center" style={{marginBottom: 24}}>
        <Col>
          <Button
            type="primary"
            style={{backgroundColor: "#1677ff", boxShadow: "none"}}
            onClick={() => setEmailModalOpen(true)}
          >
            {t("sendByEmail")}
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            style={{backgroundColor: "#1677ff", boxShadow: "none"}}
            onClick={handleDownload}
          >
            {t("download")}
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            style={{backgroundColor: "#1677ff", boxShadow: "none"}}
            onClick={handlePrint}
          >
            {t("print")}
          </Button>
        </Col>
      </Row>

      <Card
        style={{
          backgroundColor: "#e6fffb",
          textAlign: "center",
          border: "1px solid #b5f5ec",
        }}
      >
        <Text strong style={{color: "black"}}>
          {t("contactSatim")}
        </Text>
        <br />
        <Image
          src="/images/satim-logo.png"
          alt="SATIM Logo"
          height={"110px"}
          width={"132px"}
          style={{marginTop: 8}}
        />
      </Card>

      <Modal
        title={t("sendReceiptByEmail")}
        open={emailModalOpen}
        onCancel={() => setEmailModalOpen(false)}
        onOk={handleSendEmail}
        confirmLoading={emailLoading}
        okText="Send"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            backgroundColor: "#1677ff",
            borderColor: "#1677ff",
            color: "#fff",
            boxShadow: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#f5f5f5",
            color: "#000",
            borderColor: "#d9d9d9",
          },
        }}
      >
        <Input
          placeholder={t("enterEmail")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Modal>
    </div>
  );
}
