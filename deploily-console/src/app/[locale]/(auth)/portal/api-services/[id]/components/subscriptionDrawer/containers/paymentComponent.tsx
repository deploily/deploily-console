"use client";
import { Flex, Radio, RadioChangeEvent, Typography, } from "antd";
import { theme } from "@/styles/theme";
import BankTransfertComponent from "../components/bankTransfertComponent";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import CardPaymentComponent from "../components/cardPaymentComponent";
import { useState } from "react";

export default function PaymentComponent({ selectedPlan }: { selectedPlan: any }) {
  const translate = useScopedI18n('subscription');
  const [paymentMethod, setPaymentMethod] = useState("card")
  const onChange = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value );
  };
  const t = useScopedI18n("payments");
  
  return (
    <>
      <Typography.Text style={{
        color: theme.token.red500, paddingTop: 30, display: "flex",
        justifyContent: "center",
      }}>{translate("insufficientBalance")}
      </Typography.Text>
      <Typography.Title level={4} style={{ paddingTop: 20, paddingBottom: 20 }}>Choose the payment method</Typography.Title>
      <Flex vertical gap="start" style={{ padding: 10, backgroundColor: theme.token.colorBgBase, }}>
        <Radio.Group block defaultValue={paymentMethod}
          onChange={onChange}
          value={paymentMethod}>
          <Radio value="card"  >{t("card")}</Radio>
          <Radio value="bank_transfer">{t("bank")}</Radio>
        </Radio.Group>

      </Flex>
      {paymentMethod === "card" ?
        <CardPaymentComponent selectedPlan={selectedPlan}/>
        : <BankTransfertComponent selectedPlan={selectedPlan} />}
    </>
  )
}

