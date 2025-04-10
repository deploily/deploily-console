"use client";
import { Button, Card, Typography, } from "antd";
import { theme } from "@/styles/theme";
import { useSubscriptionStates } from "@/lib/features/subscription-states/subscriptionSelectors";
import bankPaymentInfo from "./bankPaymentData";
import { useScopedI18n } from "../../../../../../../../../../locales/client";

export default function BankTransfertComponent() {
    const { totalAmount } = useSubscriptionStates()
    const tBankPayment = useScopedI18n("bankPayment");
    const tPayments = useScopedI18n("payments");

    return (
        <>
            <Card title={tBankPayment('title')} style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderColor: theme.token.gray50,
                boxShadow: "none",
                textAlign: "center",
            }}
                styles={{ header: { borderColor: theme.token.gray50, textAlign: "start" }, body: { paddingLeft: "0px", paddingRight: '0px' } }}

            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <Typography.Title level={5} style={{ fontWeight: 500 }}>
                        {tPayments("totalToPay")}
                        <Typography.Text strong>  {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(totalAmount)}  </Typography.Text>
                        DZD
                    </Typography.Title>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: '100%', paddingLeft: '30px', paddingRight: '30px' }}>


                        <Typography.Title level={5} style={{ fontWeight: 500, color: theme.token.blue400 }}>
                            {tBankPayment("message")}
                        </Typography.Title>

                        {bankPaymentInfo(tBankPayment).map((info, index) => <Typography.Title key={index} level={5} style={{ fontWeight: 600 }} >
                            {info.title} :
                            <Typography.Text style={{ fontWeight: 400 }}>  {info.value} </Typography.Text>
                        </Typography.Title>)}

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "end", gap: 10, width: '100%' }}>
                            <Button
                                style={{
                                    color: "#fff",
                                    backgroundColor: theme.token.blue300,
                                    border: "none",
                                    padding: "25px 10px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    minWidth: '163px'
                                }}
                            // onClick={handleSubscribe}//TODO COMPLETE LOGIC 
                            >

                                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 600 }}>
                                    PAY
                                </span>
                            </Button>

                        </div></div>
                </div>
            </Card>
        </>
    )
}

