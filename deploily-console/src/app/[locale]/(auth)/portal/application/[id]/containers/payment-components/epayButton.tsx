"use client";
import { theme } from "@/styles/theme";
import { Button, Image } from "antd";

export default function EpayButton({ handleSubscribe }: { handleSubscribe: () => void }) {
    return (
        <>
                    <Button
                        style={{
                            color: "#fff",
                            backgroundColor: theme.token.blue300,
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

