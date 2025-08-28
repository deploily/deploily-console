"use client";
import { getEpaymentPermission } from "@/actions/getEpaymentPermission";
import { theme } from "@/styles/theme";
import { Flex, Radio, RadioChangeEvent, Typography, } from "antd";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import BankTransfertComponent from "../components/bankTransfertComponent";
import CardPaymentComponent from "../components/cardPaymentComponent";

export default function PaymentComponent({ selectedPlan, subscriptionOldId, IsSubscribed, drawerType }: { selectedPlan: any, subscriptionOldId?: any, IsSubscribed?: any, drawerType?: any }) {
  const translate = useScopedI18n('apiServiceSubscription');
  const translateProfile = useScopedI18n('profilePayment');
  const [paymentMethod, setPaymentMethod] = useState("card")
  const onChange = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };
  const t = useScopedI18n("payments");

  const [isPaymentEnabled, setIsPaymentEnabled] = useState<any>(undefined)
  useEffect(() => {
    const checkEpaymentPermission = async () => {
      const paymentEnabled = await getEpaymentPermission()
      setIsPaymentEnabled(paymentEnabled);
    };
    checkEpaymentPermission();

  }, []);

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
          <Radio value="card" disabled={!isPaymentEnabled}>{t("card")}</Radio>
          <Radio value="bank_transfer">{t("bank")}</Radio>
        </Radio.Group>

      </Flex>
      {paymentMethod === "card" ?
        <CardPaymentComponent selectedPlan={selectedPlan} subscriptionOldId={subscriptionOldId} IsSubscribed={IsSubscribed} />
        : <BankTransfertComponent selectedPlan={selectedPlan} subscriptionOldId={subscriptionOldId} IsSubscribed={IsSubscribed} drawerType={drawerType} />}
    </>
  )
}

