"use client";

import { Button, Card, Typography } from "antd";
import { useScopedI18n } from "../../../../../../../locales/client";
import { theme } from "@/styles/theme";
import bankPaymentInfo from "../../api-services/[id]/components/subscriptionDrawer/components/bankPaymentData";
import { useState } from "react";
import Upload, { RcFile } from "antd/es/upload";
import { useAppDispatch } from "@/lib/hook";
import { SendOutlined, UploadOutlined } from '@ant-design/icons';
import { uploadPaymentReceipt } from "@/lib/features/payments/paymentThunks";



export default function FundBalanceByBank({ selectedProfile }: { selectedProfile: string }) {
    const tBankPayment = useScopedI18n("bankPayment");
    const tPayments = useScopedI18n("payments");
    const t = useScopedI18n("payments");

    const dispatch = useAppDispatch();

    const [file, setFile] = useState<RcFile | null>(null);
    console.log("file upload", file);

    const handleFileChange = (info: any) => {
        const selectedFile = info as RcFile;
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('receipt', file);
        dispatch(uploadPaymentReceipt({
            'fileData': formData,
            'profileId': selectedProfile,
        }));
    }


    return (
        <>
            <Card
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
                        {bankPaymentInfo(tBankPayment).map((info, index) => (
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
                        // onClick={() => handleSubscribe()}
                        >
                            {tPayments('confirm')}
                        </Button>
                    </div> */}
                    {!file ? <Upload
                        beforeUpload={handleFileChange}
                        showUploadList={false}
                        accept="image/*"
                    >
                        <Button style={{ boxShadow: "none" }}
                            type="primary" icon={<UploadOutlined />}>{t("uploadReceived")}</Button>
                    </Upload> : <Button
                        style={{ boxShadow: "none" }}
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleUpload}
                        disabled={!file}
                    >
                        {t("confirm")}
                    </Button>}
                </div>
            </Card>
        </>
    )
}

