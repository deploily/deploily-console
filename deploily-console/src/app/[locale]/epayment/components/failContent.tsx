"use client";

import { EpaymentStatusResult } from "@/lib/features/epayment/epaymentInterface";
import {  Button, Space, Typography } from "antd";
import { useRouter } from "next/navigation";


export default function FailContentPage({ paymentResult }: { paymentResult: EpaymentStatusResult }) {
  const router = useRouter();

  return (
    <>
       <Space
      direction="vertical"
      align="center"
      style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center" }}
    >
      <Typography.Title level={2} style={{color:"red"}}>{paymentResult.details.ACTIONCODEDESCRIPTION}</Typography.Title>
      <Typography.Title level={5} style={{color:"black"}}>{paymentResult.details.ERRORCODE}</Typography.Title>
      <Button type="primary" onClick={() => router.push("/portal/subscriptions")}>
        Return to Website
      </Button>
    </Space>

    </>
  );
}