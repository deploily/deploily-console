"use client";
import { useSubscriptionStates } from "@/lib/features/subscription-states/subscriptionSelectors";
import { useSubscription } from "@/lib/features/subscriptions/subscriptionSelectors";
import { postSubscription } from "@/lib/features/subscriptions/subscriptionThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Button, Card, Checkbox, CheckboxChangeEvent, Image, Typography } from "antd";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import ReCAPTCHA from "react-google-recaptcha";

export default function CardPaymentComponent({ selectedPlan }: { selectedPlan: any }) {
    const NEXT_PUBLIC_SITE_KEY = "6Ldb_i8rAAAAAAbj8Z8zS9cx23EX_wVX7D30FdSM"

    const [value, setValue] = useState(false);
    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        setValue(e.target.checked);
    };
    const { totalAmount } = useSubscriptionStates()
    const tPayments = useScopedI18n("payments");
    const subscriptionStates = useSubscriptionStates();
    const dispatch = useAppDispatch();
    const { newSubscriptionResponse } = useSubscription();
    useEffect(() => {
        console.log("newSubscriptionResponse");
        if (newSubscriptionResponse) {
            if (newSubscriptionResponse.form_url !== null) {
                redirect(newSubscriptionResponse.form_url);
            } else {
                // TODO display error in a toast
                console.log("Error in payment registration");
            }
        }
    }, [newSubscriptionResponse]);

    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const handleCaptchaChange = (value: string | null) => {
        setCaptchaToken(value);
    };
    const handleSubscribe = async () => {
        const newSubscriptionObject = {
            captcha_token: captchaToken,
            duration: subscriptionStates.duration,
            total_amount: subscriptionStates.totalAmount,
            promo_code: subscriptionStates.promoCode,
            payment_method: "card",
            service_plan_selected_id: selectedPlan.id,
            profile_id: subscriptionStates.selectedProfile != null ? subscriptionStates.selectedProfile.id : 1
        };
        console.log("newSubscriptionObject CardPaymentComponent", newSubscriptionObject);

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

                    <ReCAPTCHA
                        sitekey={NEXT_PUBLIC_SITE_KEY}
                        ref={recaptchaRef}
                        onChange={handleCaptchaChange}
                    />

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
                        <span style={{ fontSize: "16px", fontWeight: 600 }}>
                            PAY
                        </span>
                    </Button>
                </div>
            </Card>
        </>
    )
}

