import { useApiServiceSubscriptionStates } from "@/lib/features/api-service-subscription-states/apiServiceSubscriptionSelectors";
import { postApiServiceSubscription } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionThunks";
import { fetchPaymentProfiles } from "@/lib/features/payment-profiles/paymentProfilesThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Button, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useScopedI18n } from "../../../../../../../../../../locales/client";

export default function IsBalanceSufficientComponent({ onClose, planSelected }: { onClose: any, planSelected: any }) {
    const { selectedProfile, duration, totalAmount, promoCode } = useApiServiceSubscriptionStates()
    const translate = useScopedI18n('apiServiceSubscription');
    const dispatch = useAppDispatch();
    const router = useRouter()
    const handleApiServiceSubscription = async () => {
        const newApiServiceSubscriptionObject = {
            duration: duration,
            total_amount: totalAmount,
            promo_code: promoCode,
            payment_method: "cloud_credit",
            service_plan_selected_id: planSelected.id,
            profile_id: selectedProfile != null ? selectedProfile.id : 1
        };

        dispatch(postApiServiceSubscription(newApiServiceSubscriptionObject)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
                dispatch(fetchPaymentProfiles());
                router.push(`/portal/my-api/`);
                //TODO replace with my api service

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
                    onClick={() => handleApiServiceSubscription()}
                >
                    {translate("confirm")}
                </Button>
            </div>
        </>);
}