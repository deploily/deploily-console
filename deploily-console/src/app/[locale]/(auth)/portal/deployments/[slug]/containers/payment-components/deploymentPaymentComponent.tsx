"use client";
import {
  useDeploymentServiceBySlug,
  useNewDeploymentSubscription,
  useNewDeploymentSubscriptionResponse,
} from "@/lib/features/deployment/deploymentServiceSelectors";
import {deploymentSubscribe} from "@/lib/features/deployment/deploymentsServiceThunks";
import {useAppDispatch} from "@/lib/hook";
import {theme} from "@/styles/theme";
import {Flex, Radio, RadioChangeEvent, Typography} from "antd";
import {redirect, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useScopedI18n} from "../../../../../../../../../locales/client";
import BankTransfertComponent from "./bankTransfertComponent";
import CardPaymentComponent from "./cardPaymentComponent";
import { MOBILE_APPLICATION_SLUG } from "@/deploilyWebsiteUrls";

export default function DeploymentPaymentComponent({
  isSubscribed,
  drawerType,
}: {
  isSubscribed?: boolean;
  subscriptionOldId?: any;
  drawerType?: any;
}) {
  const translate = useScopedI18n("subscription");
  const dispatch = useAppDispatch();
  const translateProfile = useScopedI18n("profilePayment");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const onChange = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };
  const t = useScopedI18n("payments");
  const newDeploymentSubscription = useNewDeploymentSubscription();
  const {deploymentServiceBySlug} = useDeploymentServiceBySlug();
  const router = useRouter();
  const {newSubscriptionResponse} = useNewDeploymentSubscriptionResponse();
  useEffect(() => {
    if (newSubscriptionResponse) {
      if (newSubscriptionResponse?.form_url && newSubscriptionResponse.form_url.trim() !== "") {
        redirect(newSubscriptionResponse.form_url);
      } else {
        router.push(`/portal/my-deployments`);
      }
    }
  }, [newSubscriptionResponse, router]);
  const handleDeploymentSubscription = async (captchaToken?: string) => {
    const {
      deployment_service_plan,
      managed_ressource_details,
      selectedProfile,
      // selected_version,
      duration,
      phone,
      byor,
      provider_name,
    } = newDeploymentSubscription;

    if (deployment_service_plan && (managed_ressource_details != undefined || byor || deploymentServiceBySlug?.service_slug == MOBILE_APPLICATION_SLUG ) &&
      selectedProfile != undefined) {
      // if (deployment_service_plan && selectedProfile) {
      const baseSubscriptionObject = {
        duration: Number.parseInt(`${duration}`),
        payment_method: paymentMethod,
        service_plan_selected_id: deployment_service_plan.id,
        profile_id: selectedProfile.id,
        phone:phone,
        ...!byor && managed_ressource_details != undefined && !(deploymentServiceBySlug?.service_slug == MOBILE_APPLICATION_SLUG) && (managed_ressource_details.isManaged
          ? { managed_ressource_id: managed_ressource_details.managed_ressource_id }
          : { ressource_service_plan_selected_id: managed_ressource_details.id }),
        byor: byor,
        provider_name: byor ? provider_name : undefined

      };

      const subscriptionPayload =
        paymentMethod === "card"
          ? {...baseSubscriptionObject, captcha_token: captchaToken}
          : baseSubscriptionObject;
      if (isSubscribed) {
      } else {
        // otherwise, it's a new subscription
        dispatch(
          deploymentSubscribe({
            service_slug: deploymentServiceBySlug?.service_slug,
            data: subscriptionPayload,
          }),
        );
      }
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
          handleSubscribe={(captcha_token: string) => handleDeploymentSubscription(captcha_token)}
        />
      ) : (
        <BankTransfertComponent
          handleSubscribe={() => handleDeploymentSubscription(undefined)}
          isSubscribed={isSubscribed}
        />
      )}
    </>
  );
}
