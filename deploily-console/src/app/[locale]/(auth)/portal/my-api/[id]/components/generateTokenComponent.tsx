import { useSubscription } from "@/lib/features/subscriptions/subscriptionSelectors";
import { fetchSubscriptionById, generateTokenThunk } from "@/lib/features/subscriptions/subscriptionThunks";
import { useAppDispatch } from "@/lib/hook";
import { CustomBlueButton } from "@/styles/components/buttonStyle";
import { theme } from "@/styles/theme";
import { Copy, Eye, EyeSlash } from "@phosphor-icons/react";
import { Button, Input, Typography } from "antd";
import { useEffect } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";

import { handleCopy } from "@/lib/utils/handleCopy";
import React from "react";

export default function GenerateTokenComponent({ subscription_id }: { subscription_id: string }) {
    const t = useI18n();
    const tSubscription = useScopedI18n('subscription');
    const dispatch = useAppDispatch();
    const { currentSubscription, generateTokenSuccess } = useSubscription()
    useEffect(() => {
        if (generateTokenSuccess) {
            dispatch(fetchSubscriptionById(subscription_id));
        }
    }, [generateTokenSuccess]);

    const generateApiKey = () => { dispatch(generateTokenThunk(subscription_id)) }
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    return (<div>
        {currentSubscription !== undefined && <>
            <Typography.Title level={4} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                {tSubscription('apiKey')}
            </Typography.Title>
            <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={currentSubscription.api_key}
                    type={passwordVisible ? "text" : "password"}
                />  {currentSubscription.api_key !== null && currentSubscription.api_key !== "" ?
                    <>
                <Button type="primary" style={{ boxShadow: "none"}} icon={passwordVisible ? <EyeSlash /> : <Eye />} onClick={() => setPasswordVisible(prev => !prev)} />
                <Button type="primary" style={{ boxShadow: "none", margin: '0px 5px' }} icon={<Copy />} onClick={() => handleCopy(currentSubscription.api_key ?? "")} />
          </>: <CustomBlueButton
                            onClick={generateApiKey}
                            style={{ backgroundColor: theme.token.blue100, width: "10rem", margin: '0px 5px'  }}
                        >
                            {t('ganerateKey')}
                        </CustomBlueButton>
                         }
                        </div></>
        }
    </div>
    )
}