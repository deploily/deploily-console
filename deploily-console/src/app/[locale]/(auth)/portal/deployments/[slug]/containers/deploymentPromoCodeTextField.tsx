"use client";
import {useNewDeploymentSubscription} from "@/lib/features/deployment/deploymentServiceSelectors";
import {updateNewDeploymentSubscriptionState} from "@/lib/features/deployment/deploymentServiceSlice";
import {usePromoCode} from "@/lib/features/promo-code/promoCodeSelectors";
import {checkPromoCode} from "@/lib/features/promo-code/promoCodeThunks";
import {useAppDispatch} from "@/lib/hook";
import {Input} from "antd";
import {useEffect, useState} from "react";
import {useScopedI18n} from "../../../../../../../../locales/client";

export default function DeploymentPromoCodeTextField() {
  const tdeployment = useScopedI18n("deployment");
  const {promoColor} = useNewDeploymentSubscription();
  const [promoCode, setPromoCode] = useState("");

  const dispatch = useAppDispatch();
  const {promoCodeResponse, promoCodeLoadingError} = usePromoCode();

  useEffect(() => {
    if (promoCodeLoadingError) {
      dispatch(
        updateNewDeploymentSubscriptionState({
          promoCodeRate: undefined,
          promoCode: "",
          promoColor: undefined,
        }),
      );
    }
    if (promoCodeResponse?.rate !== undefined) {
      dispatch(
        updateNewDeploymentSubscriptionState({
          promoCodeRate: promoCodeResponse.rate,
          promoCode: promoCode,
        }),
      );
    }
  }, [promoCodeResponse, promoCodeLoadingError]);

  const handleSubmitPromoCode = () => {
    if (promoCode.trim() !== "") {
      dispatch(checkPromoCode(promoCode));
    }
  };
  const handleChangePromoCode = (value: string) => {
    setPromoCode(value);
    dispatch(
      updateNewDeploymentSubscriptionState({
        promoCodeRate: undefined,
        promoCode: "",
        promoColor: undefined,
      }),
    );
  };

  return (
    <>
      <Input
        placeholder={tdeployment("promoCodePlaceHolder")}
        value={promoCode}
        onChange={(e) => handleChangePromoCode(e.target.value)}
        onPressEnter={handleSubmitPromoCode}
        onBlur={handleSubmitPromoCode}
        style={{
          boxShadow: "none",
          textIndent: 0,
          color: promoColor,
        }}
      />
    </>
  );
}
