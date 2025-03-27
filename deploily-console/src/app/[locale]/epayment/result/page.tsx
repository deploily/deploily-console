"use client";

import { checkEpaymentStatus } from "@/lib/features/epayment/epaymentThunks";
import { useEpayment } from "@/lib/features/epayment/paymentSelector";
import { useAppDispatch } from "@/lib/hook";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ConfirmContentPage from "../components/confirmContent";
import FailContentPage from "../components/failContent";

export default function CheckPayment() {
  const { paymentStatus, isLoading } = useEpayment();
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

      {!isLoading && paymentStatus !== undefined && (

        (paymentStatus?.status === "success") ?
            <ConfirmContentPage paymentResult={paymentStatus} />
          :
            <FailContentPage paymentResult={paymentStatus} />

      )
      }
    </>
  );
}