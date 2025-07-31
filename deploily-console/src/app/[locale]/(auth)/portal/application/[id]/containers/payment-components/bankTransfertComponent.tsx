"use client";
import { theme } from "@/styles/theme";
import { Button, Card, Typography, } from "antd";
import { useEffect, useState } from "react";
import bankPaymentInfo from "./bankPaymentData";
import { getBankCredEnvVars } from "@/actions/getBankCredEnvVars";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import { useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";
import { useUpgradeRenewMyApplicationDataState } from "@/lib/features/my-applications/myApplicationSelector";

export default function BankTransfertComponent({ handleSubscribe, isSubscribed }: { isSubscribed :any, handleSubscribe:()=> Promise<void> }) {
    const { totalAmount } = useNewApplicationSubscription()
    const { totalamount } = useUpgradeRenewMyApplicationDataState()
    const tBankPayment = useScopedI18n("bankPayment");
    const tPayments = useScopedI18n("payments");

    const [bankTransfertInformation, setBankTransfertInformation] = useState<any>(undefined)
    useEffect(() => {
        const fetchBankTransfertInfo = async () => {
          const vars  =await getBankCredEnvVars()
          setBankTransfertInformation(vars);
        };
        fetchBankTransfertInfo();
    }, []);

    return (
        <Card
            style={{
                marginTop: 20,
                maxWidth: 500,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderColor: theme.token.gray50,
                boxShadow: 'none',
                textAlign: 'center',
            }}
            styles={{
                header: {
                    borderColor: theme.token.gray50,
                    textAlign: 'start',
                },
                body: {
                    padding: '20px',
                },
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Total Amount */}
                {isSubscribed ? (
                    <Typography.Title level={5} style={{ fontWeight: 500 }}>
                        {tPayments('totalToPay')}:{' '}
                        <Typography.Text strong style={{ fontSize: 18 }}>
                            {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(totalamount)} DZD
                        </Typography.Text>
                    </Typography.Title>
                ) : (
                    <Typography.Title level={5} style={{ fontWeight: 500 }}>
                        {tPayments('totalToPay')}:{' '}
                        <Typography.Text strong style={{ fontSize: 18 }}>
                            {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(totalAmount)} DZD
                        </Typography.Text>
                    </Typography.Title>
                )}
                {/* Message */}
                <Typography.Title
                    level={5}
                    style={{ fontWeight: 500, color: theme.token.blue400, textAlign: 'center' }}
                >
                    {tBankPayment('message')}
                </Typography.Title>

                {/* Bank Info */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        textAlign: 'left',
                        paddingLeft: 20,
                    }}
                >
                    {bankTransfertInformation && bankPaymentInfo(tBankPayment, bankTransfertInformation).map((info, index) => (
                        <Typography key={index} style={{ fontWeight: 600 }}>
                            {info.title} :
                            <Typography.Text style={{ fontWeight: 400, marginLeft: 5 }}>
                                {info.value}
                            </Typography.Text>
                        </Typography>
                    ))}
                </div>

                {/* Pay Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        style={{
                            color: '#fff',
                            backgroundColor: theme.token.blue300,
                            border: 'none',
                            padding: '10px 30px',
                            fontWeight: 600,
                            fontSize: 16,
                        }}
                        onClick={async () => await handleSubscribe()}
                    >
                        {tPayments('confirm')}
                    </Button>
                </div>
            </div>
        </Card>

    )
}

