
"use client";
import { useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";
import { usePromoCode } from "@/lib/features/promo-code/promoCodeSelectors";
import { checkPromoCode } from "@/lib/features/promo-code/promoCodeThunks";
import { useAppDispatch } from "@/lib/hook";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import { updateNewAppSubscriptionState } from "@/lib/features/application/applicationServiceSlice";

export default function AppPromoCodeTextField() {
    const tApplications = useScopedI18n("applications")
    const { promoColor } = useNewApplicationSubscription()
    const [promoCode, setPromoCode] = useState('');

    console.log(promoColor);


    const dispatch = useAppDispatch();
    const { promoCodeResponse, promoCodeLoadingError } = usePromoCode();

    useEffect(() => {
        if (promoCodeLoadingError) {
            dispatch(updateNewAppSubscriptionState({ promoCodeRate: undefined, promoCode: "", promoColor: undefined }));
        }
        if (promoCodeResponse?.rate !== undefined) {
            dispatch(updateNewAppSubscriptionState({ promoCodeRate: promoCodeResponse.rate, promoCode: promoCode }));
        }
    }, [promoCodeResponse, promoCodeLoadingError]);


    const handleSubmitPromoCode = () => {
        if (promoCode.trim() !== "") {
            dispatch(checkPromoCode(promoCode));
        }
    }
    const handleChangePromoCode = (value: string) => {
        setPromoCode(value);
        dispatch(updateNewAppSubscriptionState({ promoCodeRate: undefined, promoCode: "", promoColor: undefined }));
    }

    return (
        <>
                <Input
                    placeholder={tApplications("promoCodePlaceHolder")}
                    value={promoCode}
                    onChange={(e) => handleChangePromoCode(e.target.value)}
                    onPressEnter={handleSubmitPromoCode}
                    onBlur={handleSubmitPromoCode}
                    style={{
                        boxShadow: "none",
                        textIndent: 0,
                        color: promoColor
                    }}
                />
        </>
    )
}
