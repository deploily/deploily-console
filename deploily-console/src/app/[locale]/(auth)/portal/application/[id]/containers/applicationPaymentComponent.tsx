"use client";
import { useApplicationServiceById, useNewApplicationSubscription, useNewApplicationSubscriptionResponse } from "@/lib/features/application/applicationServiceSelectors";
import { applicationSubscribe } from "@/lib/features/application/applicationServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Flex, Radio, RadioChangeEvent, Typography, } from "antd";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useScopedI18n } from "../../../../../../../../locales/client";
import BankTransfertComponent from "./payment-components/bankTransfertComponent";
import CardPaymentComponent from "./payment-components/cardPaymentComponent";

export default function ApplicationPaymentComponent() {
  const translate = useScopedI18n('subscription');
  const dispatch = useAppDispatch();
  const translateProfile = useScopedI18n('profilePayment');
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer")
  const onChange = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };
  const t = useScopedI18n("payments");
  const newApplicationSubscription = useNewApplicationSubscription()
  const { applicationServiceById } = useApplicationServiceById()
  const router = useRouter()
  const { newSubscriptionResponse } = useNewApplicationSubscriptionResponse();

  const handleApplicationSubscription = async (captchaToken?: string) => {
    if (newApplicationSubscription.app_service_plan != undefined && newApplicationSubscription.resource_service_plan != undefined && newApplicationSubscription.selectedProfile != undefined) {
      let newSubscriptionObject = {
        duration: Number.parseInt(`${newApplicationSubscription.duration}`),
        // promo_code: subscriptionStates.promoCode,
        payment_method: paymentMethod,
        service_plan_selected_id: newApplicationSubscription.app_service_plan.id,
        ressource_service_plan_selected_id: newApplicationSubscription.resource_service_plan.id,
        profile_id: newApplicationSubscription.selectedProfile.id
      };
      if (paymentMethod == "card") {
        newSubscriptionObject = { ...newSubscriptionObject, ...{ captcha_token: captchaToken }, }
      }
      dispatch(applicationSubscribe({ service_slug: applicationServiceById?.service_slug, data: newSubscriptionObject })).then((response: any) => {
        if (response.meta.requestStatus === "fulfilled") {
          if (newSubscriptionResponse && newSubscriptionResponse.form_url !== null && newSubscriptionResponse.form_url !== ""){
            redirect(newSubscriptionResponse.form_url);
          } else {
            router.push(`/portal/my-applications/`); 
          }
        }
      }
      );
    }
  };

  return (
    <>
      <>
        <Typography.Text style={{
          color: theme.token.red500, paddingTop: 30, display: "flex",
          justifyContent: "center",
        }}>{translate("insufficientBalance")}
        </Typography.Text>
      </>
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
        <CardPaymentComponent handleSubscribe={(captcha_token: string) => handleApplicationSubscription(captcha_token)} />
        : <BankTransfertComponent handleSubscribe={() => handleApplicationSubscription(undefined)} />}
    </>
  )
}

