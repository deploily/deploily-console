"use client";
import { getEpaymentPermission } from "@/actions/getEpaymentPermission";
import { PayButton } from "@/styles/components/buttonStyle";
import { InterBold18 } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import {  Image } from "antd";
import { useEffect, useState } from "react";

export default function EpayButton({ handleBalanceRecharge }: { handleBalanceRecharge: () => void }) {

    const [isPaymentEnabled, setIsPaymentEnabled] = useState<any>(undefined)
       useEffect(() => {
              const checkEpaymentPermission = async () => {
                  const paymentEnabled  =await getEpaymentPermission() 
                  setIsPaymentEnabled(paymentEnabled);
          };
              checkEpaymentPermission();   
       
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

