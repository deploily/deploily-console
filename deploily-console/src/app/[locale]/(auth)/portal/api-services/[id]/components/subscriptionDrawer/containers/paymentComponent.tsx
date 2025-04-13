"use client";
import { Flex, Radio, RadioChangeEvent, Typography, } from "antd";
import { theme } from "@/styles/theme";
import BankTransfertComponent from "../components/bankTransfertComponent";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { postSubscription } from "@/lib/features/subscriptions/subscriptionThunks";
import CardPaymentComponent from "../components/cardPaymentComponent";
import { useSubscriptionStates } from "@/lib/features/subscription-states/subscriptionSelectors";

export default function PaymentComponent({ selectedPlan }: { selectedPlan: any }) {
  const dispatch = useAppDispatch();
  const { payment_method } = useSubscriptionStates()

  const onChange = (e: RadioChangeEvent) => {
    dispatch({ type: "SubscriptionStates/updateSubscriptionStates", payload: { "payment_method": e.target.value } })
  };
  const subscriptionStates = useSubscriptionStates()

  const handleSubscribe = async () => {
    const newSubscriptionObject = {
      duration: subscriptionStates.duration,
      total_amount: subscriptionStates.totalAmount,
      promo_code: subscriptionStates.promoCode,
      payment_method: subscriptionStates.payment_method,
      service_plan_selected_id: selectedPlan.id,
      profile_id: subscriptionStates.selectedProfile != null ? subscriptionStates.selectedProfile.id : 1
    };
    dispatch(postSubscription(newSubscriptionObject));
  };
  const t = useScopedI18n("payments");

  return (
    <>
      <Typography.Title level={4} style={{ paddingTop: 20, paddingBottom: 20 }}>Choose the payment method</Typography.Title>
      <Flex vertical gap="start" style={{ padding: 10, backgroundColor: theme.token.colorBgBase, }}>
        <Radio.Group block defaultValue={payment_method}
          onChange={onChange}
          value={payment_method}>
          <Radio value="card"  >{t("card")}</Radio>
          <Radio value="bank_transfer">{t("bank")}</Radio>
        </Radio.Group>

      </Flex>
      {payment_method === "card" ?
        <CardPaymentComponent handleSubscribe={handleSubscribe} />
        : <BankTransfertComponent selectedPlan={selectedPlan}/>}
    </>
  )
}

