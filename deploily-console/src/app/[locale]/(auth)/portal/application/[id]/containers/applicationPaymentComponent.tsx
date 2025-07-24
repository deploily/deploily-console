"use client";
import { useApplicationServiceById, useNewApplicationSubscription, useNewApplicationSubscriptionResponse } from "@/lib/features/application/applicationServiceSelectors";
import { applicationSubscribe } from "@/lib/features/application/applicationServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Flex, Radio, RadioChangeEvent, Typography, } from "antd";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../../locales/client";
import BankTransfertComponent from "./payment-components/bankTransfertComponent";
import CardPaymentComponent from "./payment-components/cardPaymentComponent";
import { getEpaymentPermission } from "@/actions/getEpaymentPermission";
import { renewTtkEpay, upgradeTtkEpay } from "@/lib/features/ttk-epay/ttkEpayThunks";

export default function ApplicationPaymentComponent({ isSubscribed, subscriptionOldId, drawerType }: { isSubscribed?: boolean, subscriptionOldId?: any, drawerType?:any }) {
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
    const {
      app_service_plan,
      resource_service_plan,
      selectedProfile,
      selected_version,
      duration,
      promoCode,
    } = newApplicationSubscription;

    if (app_service_plan && resource_service_plan && selectedProfile) {
      const baseSubscriptionObject = {
        duration: Number.parseInt(`${duration}`),
        promo_code: promoCode,
        payment_method: paymentMethod,
        service_plan_selected_id: app_service_plan.id,
        ressource_service_plan_selected_id: resource_service_plan.id,
        profile_id: selectedProfile.id,
        version_selected_id: selected_version?.id,
      };

      const renewTtkEpayObject = {
        duration: Number.parseInt(`${duration}`),
        promo_code: promoCode,
        payment_method: "bank_transfer",
        profile_id: selectedProfile.id,
        old_subscription_id: subscriptionOldId,
      };

      const subscriptionPayload =
        paymentMethod === "card"
          ? { ...baseSubscriptionObject, captcha_token: captchaToken }
          : baseSubscriptionObject;

      // check drawerType conditions
      if (isSubscribed) {
        if (drawerType === "renew") {
          dispatch(renewTtkEpay({
            service_slug: applicationServiceById?.service_slug,
            data: renewTtkEpayObject
          })).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              router.push(`/portal/my-applications`);
            }
          });
        }

        if (drawerType === "upgrade") {
          const upgradeTtkEpayObject = {
            ...baseSubscriptionObject,
            payment_method: "cloud_credit", // hardcoded for upgrade case
            old_subscription_id: subscriptionOldId,
          };

          dispatch(upgradeTtkEpay({
            service_slug: applicationServiceById?.service_slug,
            data: upgradeTtkEpayObject
          })).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              router.push(`/portal/my-applications`);
            }
          });
        }

      } else {
        // otherwise, it's a new subscription
        dispatch(applicationSubscribe({
          service_slug: applicationServiceById?.service_slug,
          data: subscriptionPayload
        })).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            if (newSubscriptionResponse?.form_url) {
              redirect(newSubscriptionResponse.form_url);
            } else {
              router.push(`/portal/my-applications/`);
            }
          }
        });
      }
    }
  };
  


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
          <Radio value="card" disabled={!isPaymentEnabled}>{t("card")}</Radio>
        </Radio.Group>

      </Flex>
      {paymentMethod === "card" ?
        <CardPaymentComponent handleSubscribe={(captcha_token: string) => handleApplicationSubscription(captcha_token)} />
        : <BankTransfertComponent handleSubscribe={() => handleApplicationSubscription(undefined)} />}
    </>
  )
}

