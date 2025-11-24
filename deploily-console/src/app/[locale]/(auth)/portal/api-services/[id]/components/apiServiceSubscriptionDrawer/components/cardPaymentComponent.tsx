"use client";
import {getCaptchaSiteKey} from "@/actions/getCaptchaSiteKey";
import {useApiServiceSubscriptionStates} from "@/lib/features/api-service-subscription-states/apiServiceSubscriptionSelectors";
import {useApiServiceSubscription} from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionSelectors";
import {
  postApiServiceSubscription,
  postUpgradeApiServiceSubscription,
} from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionThunks";
import {useAppDispatch} from "@/lib/hook";
import {theme} from "@/styles/theme";
import {Card, Checkbox, CheckboxChangeEvent, Spin, Typography} from "antd";
import Link from "next/link";
import {redirect} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {useI18n, useScopedI18n} from "../../../../../../../../../../locales/client";
import EpayButton from "./epayButton";

export default function CardPaymentComponent({
  selectedPlan,
  subscriptionOldId,
  IsSubscribed,
}: {
  selectedPlan: any;
  subscriptionOldId?: any;
  IsSubscribed?: any;
}) {
  const translateEpayment = useScopedI18n("epayment");
  const t = useI18n();

  const [value, setValue] = useState(false);
  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    setValue(e.target.checked);
  };
  const {totalAmount} = useApiServiceSubscriptionStates();
  const tPayments = useScopedI18n("payments");
  const apiServiceSubscriptionStates = useApiServiceSubscriptionStates();
  const dispatch = useAppDispatch();
  const {newApiServiceSubscriptionResponse} = useApiServiceSubscription();
  useEffect(() => {
    if (newApiServiceSubscriptionResponse) {
      if (newApiServiceSubscriptionResponse.form_url !== null) {
        redirect(newApiServiceSubscriptionResponse.form_url);
      } else {
        // TODO display error in a toast
      }
    }
  }, [newApiServiceSubscriptionResponse]);

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaToken(value);
  };

  const [captchaSiteKey, setCaptchaSiteKey] = useState<string | null>(null);

  // Fetch captcha site key
  useEffect(() => {
    const fetchCaptchaSiteKey = async () => {
      try {
        const siteKey = await getCaptchaSiteKey();
        setCaptchaSiteKey(siteKey ?? null);
      } catch (error) {
        setCaptchaSiteKey(null);
      }
    };
    fetchCaptchaSiteKey();
  }, []);

  // const handleSubscribe = async () => {
  //     const newApiServiceSubscriptionObject = {
  //         captcha_token: captchaToken,
  //         duration: apiServiceSubscriptionStates.duration,
  //         total_amount: apiServiceSubscriptionStates.totalAmount,
  //         promo_code: apiServiceSubscriptionStates.promoCode,
  //         payment_method: "card",
  //         service_plan_selected_id: selectedPlan.id,
  //         profile_id: apiServiceSubscriptionStates.selectedProfile != null ? apiServiceSubscriptionStates.selectedProfile.id : 1
  //     };

  //     dispatch(postApiServiceSubscription(newApiServiceSubscriptionObject));
  // };

  const handleApiServiceSubscription = async () => {
    const newApiServiceSubscriptionObject = {
      captcha_token: captchaToken,
      duration: apiServiceSubscriptionStates.duration,
      total_amount: apiServiceSubscriptionStates.totalAmount,
      promo_code: apiServiceSubscriptionStates.promoCode,
      payment_method: "card",
      service_plan_selected_id: selectedPlan.id,
      profile_id:
        apiServiceSubscriptionStates.selectedProfile != null
          ? apiServiceSubscriptionStates.selectedProfile.id
          : 1,
    };

    const newUpgradeApiServiceSubscriptionObject = {
      ...newApiServiceSubscriptionObject,
      old_subscription_id: subscriptionOldId,
    };

    if (IsSubscribed) {
      dispatch(postUpgradeApiServiceSubscription(newUpgradeApiServiceSubscriptionObject));
    } else {
      dispatch(postApiServiceSubscription(newApiServiceSubscriptionObject));
    }
  };

  return (
    <>
      <Card
        title="CIB/ E-Dahabia"
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderColor: theme.token.gray50,
          boxShadow: "none",
          textAlign: "center",
        }}
        styles={{header: {borderColor: theme.token.gray50, textAlign: "start"}}}
      >
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 10}}>
          <Typography.Title level={5} style={{fontWeight: 500}}>
            {tPayments("totalToPay")}
            <Typography.Text strong>
              {Intl.NumberFormat("fr-FR", {useGrouping: true}).format(totalAmount)}
            </Typography.Text>
            DZD
          </Typography.Title>

          {!captchaSiteKey ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            <ReCAPTCHA sitekey={captchaSiteKey} ref={recaptchaRef} onChange={handleCaptchaChange} />
          )}

          <Checkbox style={{padding: 15}} onChange={onChangeCheckbox} checked={value}>
            {t("acceptGeneralConditions")}
            <Link href="/terms-conditions" style={{textDecoration: "underline"}} target="_blank">
              {translateEpayment("terms")}
            </Link>
          </Checkbox>
          <EpayButton handleSubscribe={handleApiServiceSubscription} />
        </div>
      </Card>
    </>
  );
}
