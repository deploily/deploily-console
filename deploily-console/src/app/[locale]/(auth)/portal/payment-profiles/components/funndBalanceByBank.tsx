"use client";

import {getBankCredEnvVars} from "@/actions/getBankCredEnvVars";
import {
  fetchPaymentProfiles,
  postFundBalance,
} from "@/lib/features/payment-profiles/paymentProfilesThunks";
import {useAppDispatch} from "@/lib/hook";
import {InterRegular16} from "@/styles/components/typographyStyle";
import {theme} from "@/styles/theme";
import {Button, Card, Input, Radio, RadioChangeEvent, Typography} from "antd";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useScopedI18n} from "../../../../../../../locales/client";
import bankPaymentInfo from "../../api-services/[id]/components/apiServiceSubscriptionDrawer/components/bankPaymentData";

export default function FundBalanceByBank({selectedProfile}: {selectedProfile: string}) {
  const tBankPayment = useScopedI18n("bankPayment");
  const tPayments = useScopedI18n("payments");
  const t = useScopedI18n("profilePayment");

  const dispatch = useAppDispatch();

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
  const router = useRouter();

  const handleBalanceRecharge = async () => {
    const newFundBalanceObject = {
      payment_method: "bank_transfer",
      total_amount: selectBalance === 4 ? customBalance : selectBalance,
      profile_id: selectedProfile,
    };
    dispatch(postFundBalance(newFundBalanceObject)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(fetchPaymentProfiles());
        router.push(`/portal/payments/`);
      }
    });
  };

  const [bankTransfertInformation, setBankTransfertInformation] = useState<any>(undefined);
  useEffect(() => {
    const fetchBankTransfertInfo = async () => {
      const vars = await getBankCredEnvVars();
      setBankTransfertInformation(vars);
    };
    fetchBankTransfertInfo();
  }, []);

  // useEffect(() => {
  //     if (newFundBalanceResponse) {
  //         setShowUploadSection(true);
  //     }
  // }, [newFundBalanceResponse]);

  return (
    <>
      <Card
        title={tBankPayment("title")}
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          borderColor: theme.token.gray50,
          boxShadow: "none",
          textAlign: "center",
          borderRadius: 0,
        }}
        styles={{
          header: {
            borderColor: theme.token.gray50,
            textAlign: "start",
          },
          body: {
            padding: "20px",
          },
        }}
      >
        <div style={{display: "flex", flexDirection: "column", gap: 20}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "start", gap: 10}}>
            <InterRegular16>{t("balanceRecharge")}:</InterRegular16>
            <Radio.Group
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                flexWrap: "wrap",
              }}
              onChange={onChangeSelectBalance}
              value={selectBalance}
            >
              <Radio key={"1000"} value={1000}>
                1 000
              </Radio>
              <Radio key={"2000"} value={2000}>
                2 000
              </Radio>
              <Radio key={"3000"} value={3000}>
                3 000
              </Radio>
              <Radio key={"5000"} value={5000}>
                5 000
              </Radio>
              <Radio key={"10000"} value={10000}>
                10 000
              </Radio>
              <Radio key={"4"} value={4}>
                Others...
                {selectBalance === 4 && (
                  <Input
                    type="number"
                    placeholder="please input"
                    style={{width: 120, marginLeft: 12}}
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
            style={{fontWeight: 500, color: theme.token.blue400, textAlign: "center"}}
          >
            {tBankPayment("message")}
          </Typography.Title>

          {/* Bank Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              textAlign: "left",
            }}
          >
            {bankTransfertInformation &&
              bankPaymentInfo(tBankPayment, bankTransfertInformation).map((info, index) => (
                <Typography key={index} style={{fontWeight: 600}}>
                  {info.title} :
                  <Typography.Text style={{fontWeight: 400, marginLeft: 5}}>
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

          <Button
            style={{
              color: "#fff",
              backgroundColor: theme.token.blue300,
              border: "none",
              padding: "10px 30px",
              fontWeight: 600,
              fontSize: 16,
            }}
            onClick={handleBalanceRecharge}
          >
            {tPayments("confirm")}
          </Button>
        </div>
      </Card>
    </>
  );
}
