"use client";
import { PayButton } from "@/styles/components/buttonStyle";
import { InterBold18 } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import {  Image } from "antd";
import { useEffect, useState } from "react";

export default function EpayButton({ handleBalanceRecharge }: { handleBalanceRecharge: () => void }) {

    const [isPaymentEnabled, setIsPaymentEnabled] = useState<any>(undefined)
        useEffect(() => {
            const fetchBankTransfertInfo = async () => {
                try {
                    const res = await fetch(`/api/e-payment/check`);
                    const data = await res.json();
                    if (data.paymentEnabled === undefined) {
                        setIsPaymentEnabled(false);
                        console.error("Payment is not configured");
                        return;
                    } else {
                        setIsPaymentEnabled(data.paymentEnabled);
                    }
                  
                } catch (err) {
                    console.error("Failed to fetch BankTransfertInfo", err);
                }
            };
    
            fetchBankTransfertInfo();
        }, []);
    return (
        <>
         <PayButton
                disabled={!isPaymentEnabled}
                style={{
                    backgroundColor:
                        (!isPaymentEnabled)
                            ? "#d9d9d9"
                            : theme.token.blue300,}}
                              icon={<Image src="/images/paymentIcon.png" alt="Recharge" preview={false} style={{ width: 60, height: 35 }} />}
                              onClick={handleBalanceRecharge}
                          >
                              <InterBold18>Recharge</InterBold18>
        </PayButton>
        </>
    )
}

