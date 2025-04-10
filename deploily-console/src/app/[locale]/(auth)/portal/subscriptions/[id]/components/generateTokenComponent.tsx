import { useSubscription } from "@/lib/features/subscriptions/subscriptionSelectors";
import { fetchSubscriptionById, generateTokenThunk } from "@/lib/features/subscriptions/subscriptionThunks";
import { useAppDispatch } from "@/lib/hook";
import { Copy } from "@phosphor-icons/react";
import { Button, Col, Row, Typography } from "antd";
import { useEffect } from "react";
import { theme } from "@/styles/theme";
import { useI18n } from "../../../../../../../../locales/client";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { CustomBlueButton } from "@/styles/components/buttonStyle";

import { handleCopy } from "@/lib/utils/handleCopy";

export default function GenerateTokenComponent({ subscription_id }: { subscription_id: string }) {
    const t = useI18n();
    const dispatch = useAppDispatch();
    const { currentSubscription, generateTokenSuccess } = useSubscription()
    useEffect(() => {
        if(generateTokenSuccess) {
        dispatch(fetchSubscriptionById(subscription_id));
    }
    }, [generateTokenSuccess]);

    const generateApiKey = () => { dispatch(generateTokenThunk(subscription_id)) }
    //TODO SIMPLIFY FILE CONTENT 

    return (<div>
        {currentSubscription !== undefined && <>
            <Typography.Title level={4} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                {'API Key'}
            </Typography.Title>
            <Row>
                <Col span={20} style={{ display: "flex", justifyContent: "start" }} >
                    <CustomTypography> {currentSubscription.api_key} </CustomTypography>
                </Col>
                <Col span={4} style={{ display: "flex", alignItems: "start", justifyContent: "end" }} >

                    {currentSubscription.api_key !== null ?
                        <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(currentSubscription.api_key ?? "")} />
                        : <CustomBlueButton
                            onClick={generateApiKey}
                            style={{ backgroundColor: theme.token.blue100, width: "20rem" }}
                        >
                            {t('ganerateKey')}
                        </CustomBlueButton>
                    }        </Col>
            </Row></>
        }
    </div>
    )
}