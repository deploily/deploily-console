"use client";

import { PayButton } from "@/styles/components/buttonStyle";
import { InterBold18, InterRegular16 } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import { Button, Card, Checkbox, Radio, Image, Input } from "antd";
import type { RadioChangeEvent } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useRef, useState } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import { postFundBalance } from "@/lib/features/payment-profiles/paymentProfilesThunks";
import { useAppDispatch } from "@/lib/hook";
import { usePaymentProfiles } from "@/lib/features/payment-profiles/paymentProfilesSelectors";
import { redirect } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

export default function FundBalanceByCard({ selectedProfile }: { selectedProfile: any }) {
    const t = useScopedI18n("profilePayment");
   const  NEXT_PUBLIC_SITE_KEY = "6Ldb_i8rAAAAAAbj8Z8zS9cx23EX_wVX7D30FdSM"

    const [selectBalance, setSelectBalance] = useState<number | null>(null);
    const [customBalance, setCustomBalance] = useState<number>(0);
    const [value, setValue] = useState(false);
    const { newFundBalanceResponse } = usePaymentProfiles();
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);


    const [values, setValues] = useState({
        payment_method: "card",
        balanceRechage: 0,
    });

    const onChangeSelectBalance = (e: RadioChangeEvent) => {
        const selected = e.target.value;
        setSelectBalance(selected);
        const recharge = selected === 4 ? customBalance : selected;
        setValues(prev => ({ ...prev, balanceRechage: recharge }));
    };

    const onChangeCustomBalance = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value) || 0;
        setCustomBalance(val);
        if (selectBalance === 4) {
            setValues(prev => ({ ...prev, balanceRechage: val }));
        }
    };

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        setValue(e.target.checked);
    };
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (newFundBalanceResponse) {
            if (newFundBalanceResponse.form_url !== null) {
                redirect(newFundBalanceResponse.form_url);
            } else {
                // TODO display error in a toast
                console.log("Error in payment registration");
            }
        }
    }, [newFundBalanceResponse]);

 
    const handleCaptchaChange = (value: string | null) => {
        setCaptchaToken(value);
    };

    const handleBalanceRecharge = async () => {
        const newFundBalanceObject = {
            payment_method: "card",
            total_amount: selectBalance === 4 ? customBalance : selectBalance,
            profile_id: selectedProfile,
            captcha_token: captchaToken,
        };
        dispatch(postFundBalance(newFundBalanceObject));
        console.log(newFundBalanceObject);

    };
    return (
        <Card
            title="CIB/ E-Dahabia"
            style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                borderColor: theme.token.gray50,
                boxShadow: "none",
                textAlign: "center",
                borderRadius: 0
            }}
            styles={{ header: { borderColor: theme.token.gray50, textAlign: "start" } }}
        >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: 10 }}>
                <InterRegular16>{t('balanceRecharge')}:</InterRegular16>
                <Radio.Group
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 8,
                        flexWrap: "wrap"
                    }}
                    onChange={onChangeSelectBalance}
                    value={selectBalance}
                >
                    <Radio value={1000}>1 000</Radio>
                    <Radio value={2000}>2 000</Radio>
                    <Radio value={3000}>3 000</Radio>
                    <Radio value={5000}>5 000</Radio>
                    <Radio value={10000}>10 000</Radio>
                    <Radio value={4}>
                        Others...
                        {selectBalance === 4 && (
                            <Input
                                type="number"
                                placeholder="please input"
                                style={{ width: 120, marginLeft: 12 }}
                                onChange={onChangeCustomBalance}
                                value={customBalance}
                            />
                        )}
                    </Radio>
                </Radio.Group>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 20 }}>

                <ReCAPTCHA
                   sitekey={NEXT_PUBLIC_SITE_KEY} 
                    ref={recaptchaRef}
                    onChange={handleCaptchaChange}
                />
                <Checkbox style={{ padding: 15 }} onChange={onChangeCheckbox} checked={value}>
                    I accept the general conditions of use
                </Checkbox>

                <PayButton
                    icon={<Image src="/images/paymentIcon.png" alt="Recharge" preview={false} style={{ width: 60, height: 35 }} />}
                    onClick={handleBalanceRecharge}

                >
                    <InterBold18>Recharge</InterBold18>
                </PayButton>
            </div>
        </Card>
    );
}
