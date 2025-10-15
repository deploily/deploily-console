"use client";
import { getEpaymentPermission } from "@/actions/getEpaymentPermission";
import { useApplicationServiceById, useNewApplicationSubscription, useNewApplicationSubscriptionResponse } from "@/lib/features/application/applicationServiceSelectors";
import { applicationSubscribe } from "@/lib/features/application/applicationServiceThunks";
import { renewMyApplication, upgradeMyApplication } from "@/lib/features/my-applications/myApplicationThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Flex, Radio, RadioChangeEvent, Typography, } from "antd";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../../locales/client";
import BankTransfertComponent from "./payment-components/bankTransfertComponent";
import CardPaymentComponent from "./payment-components/cardPaymentComponent";

export default function ApplicationPaymentComponent({ isSubscribed, subscriptionOldId, drawerType }: { isSubscribed?: boolean, subscriptionOldId?: any, drawerType?: any }) {
  const translate = useScopedI18n('subscription');
  const dispatch = useAppDispatch();
  const translateProfile = useScopedI18n('profilePayment');
  const [paymentMethod, setPaymentMethod] = useState("card")
  const onChange = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };
  const t = useScopedI18n("payments");
  const newApplicationSubscription = useNewApplicationSubscription()
  const { applicationServiceById } = useApplicationServiceById()
  const router = useRouter()
  const { newSubscriptionResponse } = useNewApplicationSubscriptionResponse();
  useEffect(() => {
    if (newSubscriptionResponse) {
      if (newSubscriptionResponse?.form_url && newSubscriptionResponse.form_url.trim() !== '') {
        redirect(newSubscriptionResponse.form_url);
      } else {
        router.push(`/portal/my-applications`);
      }
    }
  }, [newSubscriptionResponse, router]);
  const handleApplicationSubscription = async (captchaToken?: string) => {
    const {
      app_service_plan,
      managed_ressource_details,
      selectedProfile,
      selected_version,
      duration,
      promoCode,
    } = newApplicationSubscription;

    if (app_service_plan && managed_ressource_details && selectedProfile) {
      const baseSubscriptionObject = {
        duration: Number.parseInt(`${duration}`),
        promo_code: promoCode,
        payment_method: paymentMethod,
        service_plan_selected_id: app_service_plan.id,
        managed_ressource_id: managed_ressource_details.id,
        ressource_service_plan_selected_id: managed_ressource_details.id,
        profile_id: selectedProfile.id,
        version_selected_id: selected_version?.id,
      };

      const subscriptionPayload =
        paymentMethod === "card"
          ? { ...baseSubscriptionObject, captcha_token: captchaToken }
          : baseSubscriptionObject;
      if (isSubscribed) {
        if (drawerType === "renew") {
          dispatch(renewMyApplication({
            service_slug: applicationServiceById?.service_slug,
            payment_method: "bank_transfer",
            subscriptionOldId: subscriptionOldId,
          })).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              router.push(`/portal/my-applications`);
            }
          });
        }

        if (drawerType === "upgrade") {

          dispatch(upgradeMyApplication({
            service_slug: applicationServiceById?.service_slug,
            payment_method: "bank_transfer",
            subscriptionOldId: subscriptionOldId,
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
        }));
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
          <Radio value="card" disabled={!isPaymentEnabled}>{t("card")}</Radio>
          <Radio value="bank_transfer">{t("bank")}</Radio>
        </Radio.Group>

      </Flex>
      {paymentMethod === "card" ?
        <CardPaymentComponent handleSubscribe={(captcha_token: string) => handleApplicationSubscription(captcha_token)} />
        : <BankTransfertComponent handleSubscribe={() => handleApplicationSubscription(undefined)} isSubscribed={isSubscribed} />}
    </>
  )
}

