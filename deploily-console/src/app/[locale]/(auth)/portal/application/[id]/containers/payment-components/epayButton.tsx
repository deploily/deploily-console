"use client";
import { getEpaymentPermission } from "@/actions/getEpaymentPermission";
import { theme } from "@/styles/theme";
import { Button, Image } from "antd";
import { useEffect, useState } from "react";

export default function EpayButton({ handleSubscribe }: { handleSubscribe: () => void }) {

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
                    <Button
                        disabled={!isPaymentEnabled}
                        style={{
                            color: "#fff",
                            backgroundColor:
                                (!isPaymentEnabled)
                                    ? "#d9d9d9" 
                                    : theme.token.blue300,
                            border: "none",
                            padding: "25px 10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                        icon={
                            <Image
                                src="/images/paymentIcon.png"
                                alt="PAY"
                                style={{ width: 60, height: 35 }}
                                preview={false}
                            />
                        }
                        onClick={handleSubscribe}
                    >
                      
                        <span style={{ fontSize: "16px", fontWeight: 600 }}> 
                            {/* //TODO TRANSLATE */}
                            PAY
                        </span>
                    </Button>
        </>
    )
}

