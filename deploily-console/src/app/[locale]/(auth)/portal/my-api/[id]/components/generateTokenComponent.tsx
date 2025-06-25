import { useAppDispatch } from "@/lib/hook";
import { CustomBlueButton } from "@/styles/components/buttonStyle";
import { theme } from "@/styles/theme";
import { Copy, Eye, EyeSlash } from "@phosphor-icons/react";
import { Button, Input, Typography } from "antd";
import { useEffect } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";

import { useApiServiceSubscription } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionSelectors";
import { fetchApiServiceSubscriptionById, generateTokenThunk } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionThunks";
import { handleCopy } from "@/lib/utils/handleCopy";
import React from "react";

export default function GenerateTokenComponent({ apiServiceSubscription_id }: { apiServiceSubscription_id: string }) {
    const t = useI18n();
    const tApiServiceSubscription = useScopedI18n('apiServiceSubscription');
    const dispatch = useAppDispatch();
    const { currentApiServiceSubscription, generateTokenSuccess } = useApiServiceSubscription()
    useEffect(() => {
        if (generateTokenSuccess) {
            dispatch(fetchApiServiceSubscriptionById(apiServiceSubscription_id));
        }
    }, [generateTokenSuccess]);

    const generateApiKey = () => { dispatch(generateTokenThunk(apiServiceSubscription_id)) }
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    return (<div>
        {currentApiServiceSubscription !== undefined && <>
            <Typography.Title level={4} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                {tApiServiceSubscription('apiKey')}
            </Typography.Title>
            <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={currentApiServiceSubscription.api_key}
                    type={passwordVisible ? "text" : "password"}
                />  {currentApiServiceSubscription.api_key !== null && currentApiServiceSubscription.api_key !== "" ?
                    <>
                        <Button type="primary" style={{ boxShadow: "none" }} icon={passwordVisible ? <EyeSlash /> : <Eye />} onClick={() => setPasswordVisible(prev => !prev)} />
                        <Button type="primary" style={{ boxShadow: "none", margin: '0px 5px' }} icon={<Copy />} onClick={() => handleCopy(currentApiServiceSubscription.api_key ?? "")} />
                        <CustomBlueButton
                            onClick={generateApiKey}
                            style={{ backgroundColor: theme.token.blue100, width: "10rem", margin: '0px 5px' }}
                        >
                            {t('reGanerateKey')}
                        </CustomBlueButton>
                    </> : <CustomBlueButton
                        onClick={generateApiKey}
                        style={{ backgroundColor: theme.token.blue100, width: "10rem", margin: '0px 5px' }}
                    >
                        {t('ganerateKey')}
                    </CustomBlueButton>
                }
            </div></>
        }
    </div>
    )
}