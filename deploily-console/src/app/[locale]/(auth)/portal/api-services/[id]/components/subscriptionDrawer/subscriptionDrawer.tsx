"use client";
import { fetchPaymentProfiles } from "@/lib/features/payment-profiles/paymentProfilesThunks";
import { useSubscriptionStates } from "@/lib/features/subscription-states/subscriptionSelectors";
import { useSubscription } from "@/lib/features/subscriptions/subscriptionSelectors";
import { postSubscription } from "@/lib/features/subscriptions/subscriptionThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Button, Col, Drawer, Typography } from "antd";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import NewSubscriptionInfo from "./containers/newSubscriptionInfo";
import PaymentComponent from "./containers/paymentComponent";
import SelectProfileComponent from "./containers/selectProfileComponent";

export default function SubscriptionDrawer({ openDrawer, onClose, planSelected }: { openDrawer: any, onClose: any, planSelected: any }) {

  const { isBalanceSufficient, selectedProfile, payment_method, duration, totalAmount, promoCode } = useSubscriptionStates()
  const translate = useScopedI18n('subscription');
  const { newSubscriptionResponse } = useSubscription();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const tPayments = useScopedI18n('payments');
  const tProfilePayment = useScopedI18n('profilePayment');


  const handleSubscription = async () => {
    const newSubscriptionObject = {
      duration: duration,
      total_amount: totalAmount,
      promo_code: promoCode,
      payment_method: "cloud_credit",
      service_plan_selected_id: planSelected.id,
      profile_id: selectedProfile != null ? selectedProfile.id : 1
    };
    dispatch(postSubscription(newSubscriptionObject)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        router.push(`/portal/subscriptions/`);
      }}
      );
  };

  return (
    <>
      <Drawer
        placement="right"
        closable={true}
        onClose={onClose}
        open={openDrawer}
        getContainer={false}
        width={600}
        styles={{
          header: { borderBottom: "none", backgroundColor: theme.token.darkGray },
          body: { padding: 0, backgroundColor: theme.token.darkGray },
        }}
      >
        <Col style={{ padding: 20 }}>
          <NewSubscriptionInfo planSelected={planSelected} />
          <SelectProfileComponent></SelectProfileComponent>
          <div style={{ padding: '10px' }}></div>
          {(isBalanceSufficient !== null && selectedProfile && selectedProfile.id !== 0) ? (isBalanceSufficient === true) ?
            (<><Typography.Text style={{
              color: theme.token.green, paddingTop: 30, display: "flex",
              justifyContent: "center",
            }}>{translate("sufficientBalance")}
            </Typography.Text>
              {
                <div
                  style={{
                    paddingTop: "50px",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: '20px'
                  }}
                >
                  <Button
                    style={{
                      color: theme.token.colorWhite,
                      backgroundColor: theme.token.blue100,
                      border: "none",
                      paddingBlock: 15,
                      fontWeight: 600,
                      fontSize: 18,
                      display: "flex",
                      justifyContent: "flex-end",
                      borderRadius: '15px',
                      height: '40px'
                    }}
                    onClick={() => onClose()}
                  >
                    {translate("cancel")}
                  </Button>
                  <Button
                    style={{
                      color: theme.token.colorWhite,
                      backgroundColor: theme.token.orange600,
                      border: "none",
                      paddingBlock: 15,
                      fontWeight: 600,
                      fontSize: 18,
                      display: "flex",
                      justifyContent: "flex-end",
                      borderRadius: '15px',
                      height: '40px'
                    }}
                    onClick={() => handleSubscription()}
                  >
                    {translate("confirm")}
                  </Button>
                </div>
              }
            </>)
            :
            (
              selectedProfile.is_default_profile !== true ?
                <Typography.Text style={{
                  color: theme.token.red500, paddingTop: 30, display: "flex",
                  justifyContent: "center",
                }}>{translate("insufficientBalance")}
                </Typography.Text> :
                <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", gap: "10px", alignItems: 'center' }}>
                  <span style={{ fontWeight: "bold" }}>{tPayments("noProfile")}</span>
                  <Button
                    style={{
                      color: theme.token.colorWhite,
                      backgroundColor: theme.token.orange600,
                      border: "none",
                      paddingBlock: 15,
                      fontWeight: 600,
                      fontSize: 18,
                      display: "flex",
                      justifyContent: "flex-end",
                      borderRadius: '15px',
                      height: '40px'
                    }}
                    onClick={() => router.push(`/portal/payment-profiles/add?selectedPlan=${planSelected.id}`)}//TODO push new profile page 
                  >
                    {tProfilePayment("createProfile")}
                  </Button>
                </div>
            )
            :
            null
          }
          {(isBalanceSufficient === false && selectedProfile?.is_default_profile !== true) &&
            <PaymentComponent selectedPlan={planSelected} />
          }
        </Col>
      </Drawer>
    </>
  )
}
