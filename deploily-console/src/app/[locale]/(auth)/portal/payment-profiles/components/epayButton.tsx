"use client";
import {PayButton} from "@/styles/components/buttonStyle";
import {InterBold18} from "@/styles/components/typographyStyle";
import {theme} from "@/styles/theme";
import {Image} from "antd";

export default function EpayButton({handleBalanceRecharge}: {handleBalanceRecharge: () => void}) {
  const isPaymentEnabled = process.env.NEXT_PUBLIC_PAYMENT_ENABLED === "true" ? true : false;

  return (
    <>
      <PayButton
        disabled={!isPaymentEnabled}
        style={{
          backgroundColor: !isPaymentEnabled ? "#d9d9d9" : theme.token.blue300,
        }}
        icon={
          <Image
            src="/images/paymentIcon.png"
            alt="Recharge"
            preview={false}
            style={{width: 60, height: 35}}
          />
        }
        onClick={handleBalanceRecharge}
      >
        <InterBold18>Recharge</InterBold18>
      </PayButton>
    </>
  );
}
