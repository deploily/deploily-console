import { fetchPaymentProfiles } from "@/lib/features/payment-profiles/paymentProfilesThunks";
import { useSubscriptionStates } from "@/lib/features/subscription-states/subscriptionSelectors";
import { postSubscription } from "@/lib/features/subscriptions/subscriptionThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Button, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useScopedI18n } from "../../../../../../../../../../locales/client";

export default function IsBalanceSufficientComponent({ onClose, planSelected }: { onClose: any, planSelected: any }) {
    const { selectedProfile, duration, totalAmount, promoCode } = useSubscriptionStates()
    const translate = useScopedI18n('subscription');
    const dispatch = useAppDispatch();
    const router = useRouter()
    const handleSubscription = async () => {
        const newSubscriptionObject = {
            duration: duration,
            total_amount: totalAmount,
            promo_code: promoCode,
            payment_method: "cloud_credit",
            service_plan_selected_id: planSelected.id,
            profile_id: selectedProfile != null ? selectedProfile.id : 1
        };

        dispatch(postSubscription(newSubscriptionObject)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
                dispatch(fetchPaymentProfiles());
                router.push(`/portal/subscriptions/`);
            }
        }
        );;
    };

    return (
        <><Typography.Text style={{
            color: theme.token.green, paddingTop: 30, display: "flex",
            justifyContent: "center",
        }}>{translate("sufficientBalance")}
        </Typography.Text>
            <div
                style={{
                    paddingTop: "50px",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: '20px'
                }}
            >
                <Button
                    style={{
                        color: theme.token.colorWhite,
                        backgroundColor: theme.token.blue100,
                        border: "none",
                        paddingBlock: 15,
                        fontWeight: 600,
                        fontSize: 18,
                        display: "flex",
                        justifyContent: "flex-end",
                        borderRadius: '15px',
                        height: '40px'
                    }}
                    onClick={() => onClose()}
                >
                    {translate("cancel")}
                </Button>
                <Button
                    style={{
                        color: theme.token.colorWhite,
                        backgroundColor: theme.token.orange600,
                        border: "none",
                        paddingBlock: 15,
                        fontWeight: 600,
                        fontSize: 18,
                        display: "flex",
                        justifyContent: "flex-end",
                        borderRadius: '15px',
                        height: '40px'
                    }}
                    onClick={() => handleSubscription()}
                >
                    {translate("confirm")}
                </Button>
            </div>
        </>);
}