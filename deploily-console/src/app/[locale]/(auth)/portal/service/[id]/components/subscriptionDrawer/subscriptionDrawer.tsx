"use client";
import { Button, Col, Drawer, Typography } from "antd";
import { theme } from "@/styles/theme";
import { useEffect } from "react";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { fetchProfilesServices } from "@/lib/features/profile/profileServiceThunks";
import PaymentComponent from "./containers/paymentComponent";
import { redirect, useRouter } from "next/navigation";
import { useSubscribe } from "@/lib/features/subscribe/subscribeSelectors";
import { useSubscriptionStates } from "@/lib/features/subscribtionStates/subscriptionSelectors";
import NewSubscriptionInfo from "./containers/newSubscriptionInfo";
import SelectProfileComponent from "./containers/selectProfileComponent";
import { postSubscribe } from "@/lib/features/subscribe/subscribeThunks";

export default function SubscribeDrawer({ openDrawer, onClose, planSelected }: { openDrawer: any, onClose: any, planSelected: any }) {

  const { isBalanceSufficient, selectedProfile, payment_method, duration, totalAmount, promoCode } = useSubscriptionStates()
  const translate = useScopedI18n('subscription');
  const router = useRouter();
  const { newSubscribeResponse } = useSubscribe();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const redirectedFlag = sessionStorage.getItem("redirectedFlag");
    if (!redirectedFlag) {
      sessionStorage.setItem("redirectedFlag", "true");
      router.replace("/portal/home");
    }
  }, []);

  useEffect(() => {
    if (newSubscribeResponse) {
      if (newSubscribeResponse.form_url !== null) {
        redirect(newSubscribeResponse.form_url);
      } else {
        // TODO display error in a toast
        console.log("Error in payment registration");
      }
    }
    dispatch(fetchProfilesServices());
  }, [newSubscribeResponse]);


  const handleSubscribe = async () => {
    const newSubscriptionObject = {
      duration: duration,
      total_amount: totalAmount,
      promo_code: promoCode,
      payment_method: payment_method,
      service_plan_selected_id: planSelected.id,
      profile_id: selectedProfile != null ? selectedProfile.id : 1
    };
    dispatch(postSubscribe(newSubscriptionObject));
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
          {(isBalanceSufficient !== null && selectedProfile && selectedProfile.id !== 0) ? (isBalanceSufficient === true) ?
            (<><Typography.Text style={{
              color: theme.token.green, paddingTop: 30, display: "flex",
              justifyContent: "center",
            }}>{translate("sufficientBalance")}
            </Typography.Text>
              {
                <div
                  style={{
                    paddingTop: 50,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
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
                    }}
                    onClick={() => handleSubscribe()}
                  >
                    {translate("confirm")}
                  </Button></div>
              }
            </>)
            :
            (
              <Typography.Text style={{
                color: theme.token.red500, paddingTop: 30, display: "flex",
                justifyContent: "center",
              }}>{translate("insufficientBalance")}
              </Typography.Text>
            )
            :
            null
          }
          {(isBalanceSufficient === false) &&
            <PaymentComponent selectedPlan={planSelected} />
          }
        </Col>
      </Drawer>
    </>
  )
}
