import { theme } from "@/styles/theme";
import { Button, Card, Checkbox, Drawer, Flex, Radio, RadioChangeEvent, Image, Typography } from "antd";
import { useScopedI18n } from "../../../../../../../../locales/client";
import { InterRegular16 } from "@/styles/components/typographyStyle";

import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from "react";



export default function FundBalanceDrawer({ openDrawer, onClose }: { openDrawer: any, onClose: any }) {
    const t = useScopedI18n("profilePayment");
    const [value, setValue] = useState(false);
    const [values, setValues] = useState({
        payment_method: "card",
        balanceRechage: 0,
    });

    const onChange = (e: RadioChangeEvent) => {

        setValues({ ...values, payment_method: e.target.value });

    };

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        setValue(e.target.value);

    };

    return (
        <Drawer
            title={t('fundBalance')}
            placement="right"
            onClose={onClose}
            open={openDrawer}
            getContainer={false}
            width={600}
            styles={{
                header: { fontSize: 20, backgroundColor: theme.token.darkGray, borderBottom: `1px solid ${theme.token.gray200}` },
                body: { padding: 20, backgroundColor: theme.token.darkGray },
            }}
        >
           
            <>
                <Typography.Title level={4} style={{ paddingTop: 20, paddingBottom: 20 }}>{t('choosePaymentMethod')}</Typography.Title>
                <Flex vertical gap="start" style={{ padding: 10, backgroundColor: theme.token.colorBgBase, borderRadius: 5 }}>
                    <Radio.Group block defaultValue="card"
                        onChange={onChange}
                        value={values.payment_method}>
                        <Radio value="card"  >Card</Radio>
                        <Radio value="bank_transfer">Bank transfer</Radio>
                    </Radio.Group>

                </Flex>
                <Card
                    title="CIB/ E-Dahabia" style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "column",
                        // height: "100%",
                        borderColor: theme.token.gray50,
                        boxShadow: "none",
                        textAlign: "center", borderRadius: 0
                    }}
                    styles={{ header: { borderColor: theme.token.gray50, textAlign: "start" } }}

                >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: 10 }}>
                        <InterRegular16> {t('balanceRecharge')} : </InterRegular16>
                    </div>
                   
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                       

                        <Button
                            onClick={() => console.log(values)}
                            style={{
                                color: "#fff",
                                backgroundColor: "#D85912",
                                border: "none",
                                padding: "4px 8px",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                            }} > captcha</Button>
                        <Checkbox style={{ padding: 15 }} onChange={onChangeCheckbox} value={value}>I accept the general conditions of use</Checkbox>

                        <Button
                            style={{
                                color: "#fff",
                                backgroundColor: theme.token.blue300,
                                border: "none",
                                padding: "25px 10px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                            icon={<Image src="/images/paymentIcon.png" alt="PAY" style={{ width: 60, height: 35 }} />}
                        // onClick={handleSubscribe}
                        >

                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 600 }}>
                                PAY
                            </span>
                        </Button>
                    </div>
                </Card>
            </>
        </Drawer>
    )
}