"use client";
import { ConfigProvider, Divider, Select, Typography } from "antd";
import { theme } from "@/styles/theme";
import { useEffect } from "react";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import { Coins } from "@phosphor-icons/react";
import { useAppDispatch } from "@/lib/hook";
import { useSubscriptionStates } from "@/lib/features/subscription-states/subscriptionSelectors";
import { usePaymentProfiles } from "@/lib/features/payment-profiles/paymentProfilesSelectors";

export default function SelectProfileComponent() {
  const { selectedProfile ,isBalanceSufficient} = useSubscriptionStates()
  const translate = useScopedI18n('subscription');
  const { Option } = Select;
  const dispatch = useAppDispatch();
  const { isLoading, paymentProfilesList } = usePaymentProfiles();
  const handleSelectedProfile = (value: any) => {
    const newSelectedProfile = paymentProfilesList?.result.find(
      (profile) => profile.id === value
    );
    dispatch({ type: "SubscriptionStates/updateSelectedProfile", payload: newSelectedProfile })
  };

  useEffect(() => {
    if (paymentProfilesList?.result && paymentProfilesList?.result?.length > 0) {
      dispatch({ type: "SubscriptionStates/updateSelectedProfile", payload: paymentProfilesList.result[0] })
    }
  }, [paymentProfilesList?.result]);

  return (
    <>
{ (selectedProfile&& selectedProfile.is_default_profile==true&&  isBalanceSufficient!==true)? <>

      <Typography.Title level={4} style={{ paddingTop: 30, paddingBottom: 20 }}>{translate("selectProfile")}</Typography.Title>
      <ConfigProvider theme={{
        components: {
          Select: {
            borderRadius: 0,
            controlHeight: 50,
            optionSelectedBg: "#7D7D7D33",
            optionActiveBg: "#DD8859",
          }
        }
      }}>
        {selectedProfile !== undefined && <Select
          defaultValue={selectedProfile?.id}
          style={{ width: "100%" }}
          dropdownRender={(menu) => (
            <>
              <style>
                {`
                      .ant-select-item-option-selected {
                      border: 1px solid ${theme.token.orange600} !important;
                      border-radius: 4px;
                      }
                    `}
              </style>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: 20,
              }}>
                <span style={{ fontWeight: "bold" }}>{translate("profile")}</span>
                <span style={{ fontWeight: "bold" }}>{translate("balance")}</span>
                <span />
              </div>
              <Divider style={{ margin: 0, borderColor: theme.token.gray50 }} />
              {menu}
            </>
          )}
          onChange={handleSelectedProfile}
        >
          {!isLoading && paymentProfilesList !== undefined && (
            <>
              {(paymentProfilesList?.result).map((profile, index) => (
                <Option key={index} value={profile.id}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    paddingLeft: 10, paddingRight: 10
                  }}>
                    <span >{profile.name} </span>
                    <span style={{ color: theme.token.orange600 }}>{profile.balance}</span>

                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ color: theme.token.orange600 }}>DZD</span>
                      <Coins size={24} color={theme.token.orange600} />
                    </div>
                  </div>
                </Option>
              ))}</>)}
        </Select>}
      </ConfigProvider>
    </>:
    <>
    
    </>
    }
    </>
  )
}
