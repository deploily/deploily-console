"use client";

import {EpaymentResult} from "@/lib/features/epayment/epaymentInterface";
import {Card, Col, Image, Row, Typography} from "antd";
import {useScopedI18n} from "../../../../../locales/client";

export default function FailContentPage({paymentResult}: {paymentResult: EpaymentResult}) {
  const {Title, Text} = Typography;
  const t = useScopedI18n("epayment");

  return (
    <>
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
            color: "#ff4d4f",
          }}
        >
          {paymentResult.ERROR_CODE === "3"
            ? paymentResult.ACTION_CODE_DESCRIPTION
            : paymentResult.ERROR_MESSAGE}
        </Title>
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
            preview={false}
          />
        </Card>
      </div>
    </>
  );
}
