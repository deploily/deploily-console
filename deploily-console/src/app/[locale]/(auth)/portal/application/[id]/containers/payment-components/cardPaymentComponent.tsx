"use client";
import { getCaptchaSiteKey } from "@/actions/getCaptchaSiteKey";
import { useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";
import { theme } from "@/styles/theme";
import { Card, Checkbox, CheckboxChangeEvent, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import EpayButton from "./epayButton";

export default function CardPaymentComponent({ handleSubscribe }: { handleSubscribe: (captcha_token: string) => Promise<void> }) {
    const t = useI18n();


    const [value, setValue] = useState(false);
    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        setValue(e.target.checked);
    };
    const { totalAmount } = useNewApplicationSubscription()
    const tPayments = useScopedI18n("payments");

    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const handleCaptchaChange = (value: string | null) => {
        setCaptchaToken(value);
    };




    const [captchaSiteKey, setCaptchaSiteKey] = useState<any>(undefined)
    useEffect(() => {
        const fetchCaptchaSiteKey = async () => {
            const siteKey = await getCaptchaSiteKey()
            setCaptchaSiteKey(siteKey);
        };
        fetchCaptchaSiteKey();
    }, []);

    return (
        <>
            <Card
                title={t('cibEdahabia')}
                style={{
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
                        sitekey={captchaSiteKey}
                        ref={recaptchaRef}
                        onChange={handleCaptchaChange}
                    />

                    <Checkbox style={{ padding: 15 }} onChange={onChangeCheckbox} checked={value}>
                        {t('acceptGeneralConditions')}
                    </Checkbox>
                    <EpayButton handleSubscribe={async () => await handleSubscribe(captchaToken ?? "")} />
                </div>
            </Card >
        </>
    )
}

