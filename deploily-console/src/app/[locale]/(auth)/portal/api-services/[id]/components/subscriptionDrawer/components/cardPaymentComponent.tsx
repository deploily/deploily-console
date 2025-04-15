"use client";
import { Button, Card, Checkbox, CheckboxChangeEvent, Image, Typography } from "antd";
import { useState } from "react";
import { theme } from "@/styles/theme";
import { useSubscriptionStates } from "@/lib/features/subscription-states/subscriptionSelectors";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import { postSubscription } from "@/lib/features/subscriptions/subscriptionThunks";
import { useAppDispatch } from "@/lib/hook";

export default function CardPaymentComponent({ selectedPlan }: { selectedPlan: any }) {
    const [value, setValue] = useState(false);
    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        setValue(e.target.checked);
    };
    const { totalAmount } = useSubscriptionStates()
    const tPayments = useScopedI18n("payments");
    const subscriptionStates = useSubscriptionStates();
    const dispatch = useAppDispatch();


    const handleSubscribe = async () => {
        const newSubscriptionObject = {
            duration: subscriptionStates.duration,
            total_amount: subscriptionStates.totalAmount,
            promo_code: subscriptionStates.promoCode,
            payment_method: "card",
            service_plan_selected_id: selectedPlan.id,
            profile_id: subscriptionStates.selectedProfile != null ? subscriptionStates.selectedProfile.id : 1
        };
        dispatch(postSubscription(newSubscriptionObject));
    };

    return (
        <>
            <Card title="CIB/ E-Dahabia" style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderColor: theme.token.gray50,
                boxShadow: "none",
                textAlign: "center"
            }}
                styles={{ header: { borderColor: theme.token.gray50, textAlign: "start" } }}
            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <Typography.Title level={5} style={{ fontWeight: 500 }}>
                        {tPayments("totalToPay")}
                        <Typography.Text strong>
                            {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(totalAmount)}
                        </Typography.Text>
                        DZD
                    </Typography.Title>
                    <Button
                        onClick={() => console.log("captcha")}
                        style={{
                            color: "#fff",
                            backgroundColor: "#D85912",
                            border: "none",
                            padding: "4px 8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }} >
                        captcha
                    </Button>
                    <Checkbox style={{ padding: 15 }} onChange={onChangeCheckbox} checked={value}>
                        I accept the general conditions of use
                    </Checkbox>
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
                        icon={<Image src="/images/paymentIcon.png" alt="PAY" style={{ width: 60, height: 35 }} preview={false} />}
                        onClick={handleSubscribe}
                    >
                        <span style={{  fontSize: "16px", fontWeight: 600 }}>
                            PAY
                        </span>
                    </Button>
                </div>
            </Card>
        </>
    )
}

