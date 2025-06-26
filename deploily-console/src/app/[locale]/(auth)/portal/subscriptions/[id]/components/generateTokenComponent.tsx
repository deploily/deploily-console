import {useSubscription} from "@/lib/features/subscriptions/subscriptionSelectors";
import {
  fetchSubscriptionById,
  generateTokenThunk,
} from "@/lib/features/subscriptions/subscriptionThunks";
import {useAppDispatch} from "@/lib/hook";
import {CustomBlueButton} from "@/styles/components/buttonStyle";
import {theme} from "@/styles/theme";
import {Copy, Eye, EyeSlash} from "@phosphor-icons/react";
import {Button, Input, Row, Typography} from "antd";
import {useEffect} from "react";
import {useI18n, useScopedI18n} from "../../../../../../../../locales/client";

import {handleCopy} from "@/lib/utils/handleCopy";
import React from "react";

export default function GenerateTokenComponent({subscription_id}: {subscription_id: string}) {
  const t = useI18n();
  const tSubscription = useScopedI18n("subscription");
  const dispatch = useAppDispatch();
  const {currentSubscription, generateTokenSuccess} = useSubscription();
  useEffect(() => {
    if (generateTokenSuccess) {
      dispatch(fetchSubscriptionById(subscription_id));
    }
  }, [generateTokenSuccess]);

  const generateApiKey = () => {
    dispatch(generateTokenThunk(subscription_id));
  };
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <div>
      {currentSubscription !== undefined && (
        <>
          <Typography.Title
            level={4}
            style={{fontWeight: 700, fontSize: 24, color: theme.token.orange600}}
          >
            {tSubscription("apiKey")}
          </Typography.Title>

          <Row
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                flexGrow: 1,
                flexWrap: "nowrap",
                alignItems: "center",
                gap: "8px",
                minWidth: "250px",
                marginTop: "8px",
              }}
            >
              <Input
                disabled
                style={{flexGrow: 1}}
                value={currentSubscription.api_key}
                type={passwordVisible ? "text" : "password"}
              />
              {currentSubscription.api_key && (
                <>
                  <Button
                    type="primary"
                    style={{boxShadow: "none"}}
                    icon={passwordVisible ? <EyeSlash /> : <Eye />}
                    onClick={() => setPasswordVisible((prev) => !prev)}
                  />
                  <Button
                    type="primary"
                    style={{boxShadow: "none"}}
                    icon={<Copy />}
                    onClick={() => handleCopy(currentSubscription.api_key ?? "")}
                  />
                </>
              )}
            </div>

            <div
              style={{
                marginTop: "8px",
                flexBasis: "auto",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <CustomBlueButton
                onClick={generateApiKey}
                style={{
                  backgroundColor: theme.token.blue100,
                  width: "10rem",
                }}
              >
                {currentSubscription.api_key ? t("reGanerateKey") : t("ganerateKey")}
              </CustomBlueButton>
            </div>
          </Row>
        </>
      )}
    </div>
  );
}
