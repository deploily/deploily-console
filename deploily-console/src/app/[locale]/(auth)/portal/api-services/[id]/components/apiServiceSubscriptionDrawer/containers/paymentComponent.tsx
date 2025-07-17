"use client";
import { theme } from "@/styles/theme";
import { Flex, Radio, RadioChangeEvent, Typography, } from "antd";
import { useState } from "react";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import BankTransfertComponent from "../components/bankTransfertComponent";
import CardPaymentComponent from "../components/cardPaymentComponent";

export default function PaymentComponent({ selectedPlan, subscriptionOldId, IsSubscribed, drawerType }: { selectedPlan: any, subscriptionOldId?: any, IsSubscribed?: any, drawerType?: any }) {
  const translate = useScopedI18n('apiServiceSubscription');
  const translateProfile = useScopedI18n('profilePayment');
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer")
  const onChange = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };
  const t = useScopedI18n("payments");

  return (
    <>
      <Typography.Text style={{
        color: theme.token.red500, paddingTop: 30, display: "flex",
        justifyContent: "center",
      }}>{translate("insufficientBalance")}
      </Typography.Text>
      <Typography.Title level={4} style={{ paddingTop: 20, paddingBottom: 20 }}>{translateProfile("choosePaymentMethod")}</Typography.Title>
      <Flex vertical gap="start" style={{ padding: 10, backgroundColor: theme.token.colorBgBase, }}>
        <Radio.Group block defaultValue={paymentMethod}
          onChange={onChange}
          value={paymentMethod}>
          <Radio value="bank_transfer">{t("bank")}</Radio>
          <Radio value="card" disabled>{t("card")}</Radio>
        </Radio.Group>

      </Flex>
      {paymentMethod === "card" ?
        <CardPaymentComponent selectedPlan={selectedPlan} />
        : <BankTransfertComponent selectedPlan={selectedPlan} subscriptionOldId={subscriptionOldId} IsSubscribed={IsSubscribed} drawerType={drawerType} />}
    </>
  )
}

