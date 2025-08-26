"use client";

import { EpaymentResult } from "@/lib/features/epayment/epaymentInterface";
import { Card, Image, Typography } from "antd";


export default function FailContentPage({ paymentResult }: { paymentResult: EpaymentResult }) {
  const { Title, Text } = Typography;

  return (
    <>
      <div style={{
        maxWidth: 650,
        margin: '50px auto',
        padding: 24,
        color: '#fff',
        borderRadius: 8,
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      }}>
        <Text strong style={{ fontSize: 16, color: '#fff' }}>CIB/ E-Dahabia</Text>

        <Title
          level={5}
          style={{
            textAlign: 'center',
            margin: '12px 0',
            color: '#ff4d4f',
          }}
        >

          {paymentResult.ERROR_CODE === "3"
            ? (paymentResult.ACTION_CODE_DESCRIPTION)
            : (paymentResult.ERROR_MESSAGE)}


        </Title>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          {paymentResult.ORDER_NUMBER && (
            <Text style={{ display: "block", color: "#fff" }}>
              Order Number : <strong>{paymentResult.ORDER_NUMBER}</strong>
            </Text>
          )}
          {paymentResult.AMOUNT && (
            <Text style={{ display: "block", color: "#fff" }}>
              Amount : <strong>{paymentResult.AMOUNT} DA</strong>
            </Text>
          )}
        </div>
        <Card
          style={{
            backgroundColor: '#e6fffb',
            textAlign: 'center',
            border: '1px solid #b5f5ec',
          }}
        >
          <Text strong style={{ color: 'black' }}>Contact SATIM : 3020</Text><br />
          <Image src="/images/satim-logo.png" alt="SATIM Logo" height={'110px'} width={'132px'} style={{ marginTop: 8 }} />
        </Card>
      </div>

    </>
  );
}