"use client";
import { theme } from "@/styles/theme";
import { Button, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import { useNotDefaultPaymentProfiles } from "@/lib/features/payment-profiles/paymentProfilesSelectors";
import { useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";

export default function CreateProfileButton({ planSelected }: { openDrawer: any, onClose: any, planSelected: any }) { 
  const translate = useScopedI18n('subscription');
  const router = useRouter();

  const tPayments = useScopedI18n('payments');
  const tProfilePayment = useScopedI18n('profilePayment');
  const { paymentProfilesList } = useNotDefaultPaymentProfiles();
  const {  selectedProfile, isBalanceSufficient } = useNewApplicationSubscription();

  return (
    <>
          {
              <div>
          {paymentProfilesList?.count != undefined  &&(paymentProfilesList?.count > 0) && 
          isBalanceSufficient==false && selectedProfile!==undefined &&<Typography.Text style={{
                padding: '20px 0px',
                  color: theme.token.red500, display: "flex",
                  justifyContent: "center",
                }}>{translate("insufficientBalance")}
                </Typography.Text>}
                <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", gap: "10px", alignItems: 'center' }}>
            <span style={{ fontWeight: "bold" }}>{tPayments("noOtherProfile")}</span>
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
                    onClick={() => router.push(`/portal/payment-profiles/add`)} 
                  >
                    {tProfilePayment("createProfile")}
                  </Button>
                </div>
            </div> 
    }
    </>
  )
}
