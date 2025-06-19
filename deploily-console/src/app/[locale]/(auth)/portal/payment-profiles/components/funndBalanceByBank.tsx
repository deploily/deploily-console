"use client";

import { Button, Card, Input, message, Radio, RadioChangeEvent, Typography } from "antd";
import { useScopedI18n } from "../../../../../../../locales/client";
import { theme } from "@/styles/theme";
import bankPaymentInfo from "../../api-services/[id]/components/subscriptionDrawer/components/bankPaymentData";
import { useEffect, useState } from "react";
import Upload, { RcFile } from "antd/es/upload";
import { useAppDispatch } from "@/lib/hook";
import { DeleteOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';
import { uploadPaymentReceipt } from "@/lib/features/payments/paymentThunks";
import { postFundBalance } from "@/lib/features/payment-profiles/paymentProfilesThunks";
import { InterRegular16 } from "@/styles/components/typographyStyle";
import { usePaymentProfiles } from "@/lib/features/payment-profiles/paymentProfilesSelectors";
import { getBankCredEnvVars } from "@/actions/getBankCredEnvVars";



export default function FundBalanceByBank({ selectedProfile }: { selectedProfile: string }) {
    const tBankPayment = useScopedI18n("bankPayment");
    const tPayments = useScopedI18n("payments");
    const t = useScopedI18n("profilePayment");

    const dispatch = useAppDispatch();

    const [file, setFile] = useState<RcFile | null>(null);

    const [showUploadSection, setShowUploadSection] = useState(false);

    const { newFundBalanceResponse } = usePaymentProfiles();


    const handleUpload = async () => {
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('receipt', file);
        dispatch(uploadPaymentReceipt({
            'fileData': formData,
            'paymentId': newFundBalanceResponse?.payment_id,
        }));
    }
    const [selectBalance, setSelectBalance] = useState<number | null>(null);

    const [customBalance, setCustomBalance] = useState<number>(0);


    const onChangeSelectBalance = (e: RadioChangeEvent) => {
        const selected = e.target.value;
        setSelectBalance(selected);
    };

    const onChangeCustomBalance = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value) || 0;
        setCustomBalance(val);
      
    };

    const handleBalanceRecharge = async () => {
        const newFundBalanceObject = {
            payment_method: "bank_transfer",
            total_amount: selectBalance === 4 ? customBalance : selectBalance,
            profile_id: selectedProfile,
        };
        dispatch(postFundBalance(newFundBalanceObject));
        console.log(newFundBalanceObject);
        setShowUploadSection(true);
    };

       const [bankTransfertInformation, setBankTransfertInformation] = useState<any>(undefined)
        useEffect(() => {
         const fetchBankTransfertInfo = async () => {
               const vars  =await getBankCredEnvVars()
               setBankTransfertInformation(vars);
             };
             fetchBankTransfertInfo();
        }, []);

    return (
        <>
            <Card
                title={tBankPayment('title')}
                style={{
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "column",
                    borderColor: theme.token.gray50,
                    boxShadow: "none",
                    textAlign: "center", borderRadius: 0
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
                            <Radio key={'1000'} value={1000}>1 000</Radio>
                            <Radio key={'2000'}  value={2000}>2 000</Radio>
                            <Radio key={'3000'} value={3000}>3 000</Radio>
                            <Radio key={'5000'} value={5000}>5 000</Radio>
                            <Radio key={'10000'} value={10000}>10 000</Radio>
                            <Radio key={'4'} value={4}>
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
                        }}
                    >
                        {bankTransfertInformation&&bankPaymentInfo(tBankPayment, bankTransfertInformation).map((info, index) => (
                            <Typography key={index} style={{ fontWeight: 600 }}>
                                {info.title} :
                                <Typography.Text style={{ fontWeight: 400, marginLeft: 5 }}>
                                    {info.value}
                                </Typography.Text>
                            </Typography>
                        ))}
                    </div>

                    {/* Pay Button */}
                    {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            style={{
                                color: '#fff',
                                backgroundColor: theme.token.blue300,
                                border: 'none',
                                padding: '10px 30px',
                                fontWeight: 600,
                                fontSize: 16,
                            }}
                            onClick={() => handleBalanceRecharge()}
                        >
                            {tPayments('confirm')}
                        </Button>
                    </div>
 */}

                        {!showUploadSection ? (
                            <Button
                                style={{
                                    color: '#fff',
                                    backgroundColor: theme.token.blue300,
                                    border: 'none',
                                    padding: '10px 30px',
                                    fontWeight: 600,
                                    fontSize: 16,
                                }}
                                onClick={handleBalanceRecharge}
                            >
                                {tPayments('confirm')}
                            </Button>
                        ) : (
                            <>

                                {/* <div style={{ display: 'flex', alignItems: 'start', gap: 10 }}> */}
                                    {!showUploadSection ? (
                                        <Button
                                            style={{
                                                color: '#fff',
                                                backgroundColor: theme.token.blue300,
                                                border: 'none',
                                                padding: '10px 30px',
                                                fontWeight: 600,
                                                fontSize: 16,
                                            }}
                                            onClick={handleBalanceRecharge}
                                        >
                                            {tPayments('confirm')}
                                        </Button>
                                    ) :


                                        (
                                            <>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>

                                                    <Upload
                                                        beforeUpload={(file) => {
                                                            if (!file.type.startsWith("image/")) {
                                                                message.error("Only image files are allowed");
                                                                return false;
                                                            }
                                                            setFile(file);
                                                            return false; // prevent auto upload
                                                        }}
                                                        showUploadList={false}
                                                        accept="image/*"
                                                    >
                                                        <Button
                                                            icon={<UploadOutlined />}
                                                            style={{
                                                                borderColor: theme.token.orange300,
                                                                color: theme.token.orange300,
                                                                backgroundColor: 'transparent',
                                                            }}
                                                        >
                                                            {tPayments("uploadReceived")}
                                                        </Button>
                                                    </Upload>
</div>
                                                    {file && (
                                                        <>
                                                    <div style={{ display: 'flex', alignItems: 'start', gap: 10 }}>
                                                        <Typography.Text style={{ color: '#ccc', display: 'flex', alignItems: 'start', gap: 6 }}>
                                                            📎 {file.name}
                                                        </Typography.Text>

                                                        <Button
                                                            type="text"
                                                            danger
                                                            icon={<DeleteOutlined style={{ color: 'red', fontSize: 16 }} />}
                                                            onClick={() => setFile(null)}
                                                        />
                                                    </div>

                                                    

                                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                                                                <Button
                                                                    type="primary"
                                                                    icon={<SendOutlined />}
                                                                    style={{
                                                                        backgroundColor: theme.token.orange300,
                                                                        border: 'none',
                                                                        fontWeight: 600,
                                                                        boxShadow: "none",
                                                                    }}
                                                                    onClick={handleUpload}
                                                                >
                                                                    {tPayments("confirm")}
                                                                </Button>
                                                            </div>
                                                        </>
                                                    )}
                                            </>
                                        )
                                    }
                                {/* </div> */}

                            </>
                        )}


                </div>
            </Card>
        </>
    )
}

