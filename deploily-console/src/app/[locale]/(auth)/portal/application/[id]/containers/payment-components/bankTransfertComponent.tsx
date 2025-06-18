"use client";
import { useSubscriptionStates } from "@/lib/features/subscription-states/subscriptionSelectors";
import { postSubscription } from "@/lib/features/subscriptions/subscriptionThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Button, Card, Typography, } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import bankPaymentInfo from "./bankPaymentData";
import { getBankCredEnvVars } from "@/actions/getBankCredEnvVars";
import { useScopedI18n } from "../../../../../../../../../locales/client";

export default function BankTransfertComponent() {
    const { totalAmount } = useSubscriptionStates()
    const tBankPayment = useScopedI18n("bankPayment");
    const tPayments = useScopedI18n("payments");
    const subscriptionStates = useSubscriptionStates()
    const dispatch = useAppDispatch();
    const router = useRouter()
    const handleSubscribe = async () => {
        // const newSubscriptionObject = {
        //     duration: subscriptionStates.duration,
        //     total_amount: subscriptionStates.totalAmount,
        //     promo_code: subscriptionStates.promoCode,
        //     payment_method: "bank_transfer",
        //     service_plan_selected_id: selectedPlan.id,
        //     profile_id: subscriptionStates.selectedProfile != null ? subscriptionStates.selectedProfile.id : 1
        // };
        // dispatch(postSubscription(newSubscriptionObject)).then((response: any) => {
        //     if (response.meta.requestStatus === "fulfilled") {
        //         router.push(`/portal/subscriptions/`);
        //     }
        // }
        // );
    };
    const [bankTransfertInformation, setBankTransfertInformation] = useState<any>(undefined)
    useEffect(() => {
        const fetchBankTransfertInfo = async () => {
          const vars  =await getBankCredEnvVars()
          setBankTransfertInformation(vars);
        };
        fetchBankTransfertInfo();
    }, []);



    return (
        <Card
            style={{
                marginTop: 20,
                maxWidth: 500,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderColor: theme.token.gray50,
                boxShadow: 'none',
                textAlign: 'center',
            }}
            styles={{
                header: {
                    borderColor: theme.token.gray50,
                    textAlign: 'start',
                },
                body: {
                    padding: '20px',
                },
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Total Amount */}
                <Typography.Title level={5} style={{ fontWeight: 500 }}>
                    {tPayments('totalToPay')} :{' '}
                    <Typography.Text strong style={{ fontSize: 18 }}>
                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(totalAmount)} DZD
                    </Typography.Text>
                </Typography.Title>

                {/* Message */}
                <Typography.Title
                    level={5}
                    style={{ fontWeight: 500, color: theme.token.blue400, textAlign: 'center' }}
                >
                    {tBankPayment('message')}
                </Typography.Title>

                {/* Bank Info */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        textAlign: 'left',
                        paddingLeft: 20,
                    }}
                >
                    {bankTransfertInformation && bankPaymentInfo(tBankPayment, bankTransfertInformation).map((info, index) => (
                        <Typography key={index} style={{ fontWeight: 600 }}>
                            {info.title} :
                            <Typography.Text style={{ fontWeight: 400, marginLeft: 5 }}>
                                {info.value}
                            </Typography.Text>
                        </Typography>
                    ))}
                </div>

                {/* Pay Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        style={{
                            color: '#fff',
                            backgroundColor: theme.token.blue300,
                            border: 'none',
                            padding: '10px 30px',
                            fontWeight: 600,
                            fontSize: 16,
                        }}
                        onClick={() => handleSubscribe()}
                    >
                        {tPayments('confirm')}
                    </Button>
                </div>
            </div>
        </Card>

    )
}

