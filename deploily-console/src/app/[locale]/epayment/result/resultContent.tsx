"use client";

import { checkEpaymentStatus } from "@/lib/features/epayment/epaymentThunks";
import { useEpayment } from "@/lib/features/epayment/paymentSelector";
import { useAppDispatch } from "@/lib/hook";
import { Result } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useI18n } from "../../../../../locales/client";
import ConfirmContentPage from "../components/confirmContent";
import FailContentPage from "../components/failContent";

export default function ResultPageContent() {
    const t = useI18n();

    const { paymentStatus, isLoading, isError } = useEpayment();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (paymentStatus) {
        }
        if (orderId !== null) {

            dispatch(checkEpaymentStatus(orderId));
        }
    }, [orderId]);

    return (
        <>
            {paymentStatus !== undefined ?
                ((paymentStatus?.RESPONSE_CODE === "00" && paymentStatus.ERROR_CODE === "0" && paymentStatus.ORDER_STATUS === 2) ?
                    <ConfirmContentPage paymentResult={paymentStatus} />
                    :
                    <FailContentPage />
                ) : (
                    (isLoading === false &&
                        isError !== null) &&
                    <Result status="500"
                        title={t('error')}
                        subTitle={t('subTitleError')} />
                )
            }</>
    );
}