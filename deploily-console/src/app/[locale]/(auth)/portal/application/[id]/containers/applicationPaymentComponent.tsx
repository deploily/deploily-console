"use client";
import {
  useApplicationServiceById,
  useNewApplicationSubscription,
  useNewApplicationSubscriptionResponse,
} from "@/lib/features/application/applicationServiceSelectors";
import {applicationSubscribe} from "@/lib/features/application/applicationServiceThunks";
import {useAppDispatch} from "@/lib/hook";
import {theme} from "@/styles/theme";
import {Flex, Radio, RadioChangeEvent, Typography} from "antd";
import {redirect, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useScopedI18n} from "../../../../../../../../locales/client";
import BankTransfertComponent from "./payment-components/bankTransfertComponent";
import CardPaymentComponent from "./payment-components/cardPaymentComponent";

export default function ApplicationPaymentComponent({
  isSubscribed,
}: {
  isSubscribed?: boolean;
}) {
  const translate = useScopedI18n("subscription");
  const dispatch = useAppDispatch();
  const translateProfile = useScopedI18n("profilePayment");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const onChange = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };
  const t = useScopedI18n("payments");
  const newApplicationSubscription = useNewApplicationSubscription();
  const {applicationServiceById} = useApplicationServiceById();
  const router = useRouter();
  const {newSubscriptionResponse} = useNewApplicationSubscriptionResponse();
  useEffect(() => {
    if (newSubscriptionResponse) {
      if (newSubscriptionResponse?.form_url && newSubscriptionResponse.form_url.trim() !== "") {
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
      phone,
      byor,
      provider_name
    } = newApplicationSubscription;

    if (
      app_service_plan != undefined &&
      (managed_ressource_details != undefined || byor) &&
      selectedProfile != undefined
    ) {
        const baseSubscriptionObject = {
          duration: Number.parseInt(`${duration}`),
          payment_method: paymentMethod,
          service_plan_selected_id: app_service_plan.id,
          ...!byor && managed_ressource_details != undefined && (managed_ressource_details.isManaged
            ? { managed_ressource_id: managed_ressource_details.managed_ressource_id }
            : { ressource_service_plan_selected_id: managed_ressource_details.id }),
          profile_id: selectedProfile.id,
          version_selected_id: selected_version?.id,
          phone:phone,
          byor:byor,
          provider_name: byor ? provider_name : undefined
        };

      const subscriptionPayload =
        paymentMethod === "card"
          ? {...baseSubscriptionObject, captcha_token: captchaToken}
          : baseSubscriptionObject;
   
        dispatch(
          applicationSubscribe({
            service_slug: applicationServiceById?.service_slug,
            data: subscriptionPayload,
          }),
        );
    }
  };

  const isPaymentEnabled = process.env.NEXT_PUBLIC_PAYMENT_ENABLED === "true" ? true : false;


  return (
    <>
      <>
        <Typography.Text
          style={{
            color: theme.token.red500,
            paddingTop: 30,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {translate("insufficientBalance")}
        </Typography.Text>
      </>
      <Typography.Title level={4} style={{paddingTop: 20, paddingBottom: 20}}>
        {translateProfile("choosePaymentMethod")}
      </Typography.Title>
      <Flex vertical gap="start" style={{padding: 10, backgroundColor: theme.token.colorBgBase}}>
        <Radio.Group block defaultValue={paymentMethod} onChange={onChange} value={paymentMethod}>
          <Radio value="card" disabled={!isPaymentEnabled}>
            {t("card")}
          </Radio>
          <Radio value="bank_transfer">{t("bank")}</Radio>
        </Radio.Group>
      </Flex>
      {paymentMethod === "card" ? (
        <CardPaymentComponent
          handleSubscribe={(captcha_token: string) => handleApplicationSubscription(captcha_token)}
        />
      ) : (
        <BankTransfertComponent
          handleSubscribe={() => handleApplicationSubscription(undefined)}
          isSubscribed={isSubscribed}
        />
      )}
    </>
  );
}
