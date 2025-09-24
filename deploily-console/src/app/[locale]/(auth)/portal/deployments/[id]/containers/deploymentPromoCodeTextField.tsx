"use client";
import {useNewApplicationSubscription} from "@/lib/features/application/applicationServiceSelectors";
import {usePromoCode} from "@/lib/features/promo-code/promoCodeSelectors";
import {checkPromoCode} from "@/lib/features/promo-code/promoCodeThunks";
import {useAppDispatch} from "@/lib/hook";
import {Input} from "antd";
import {useEffect, useState} from "react";
import {updateNewAppSubscriptionState} from "@/lib/features/application/applicationServiceSlice";
import {useScopedI18n} from "../../../../../../../../locales/client";

export default function DeploymentPromoCodeTextField() {
  const tdeployment = useScopedI18n("deployment");
  const {promoColor} = useNewApplicationSubscription();
  const [promoCode, setPromoCode] = useState("");

  const dispatch = useAppDispatch();
  const {promoCodeResponse, promoCodeLoadingError} = usePromoCode();

  useEffect(() => {
    if (promoCodeLoadingError) {
      dispatch(
        updateNewAppSubscriptionState({
          promoCodeRate: undefined,
          promoCode: "",
          promoColor: undefined,
        }),
      );
    }
    if (promoCodeResponse?.rate !== undefined) {
      dispatch(
        updateNewAppSubscriptionState({
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
      updateNewAppSubscriptionState({
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
