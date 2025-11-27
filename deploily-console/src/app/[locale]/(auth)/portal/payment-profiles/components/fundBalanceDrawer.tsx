import {theme} from "@/styles/theme";
import {Drawer, Flex, Radio, RadioChangeEvent, Typography} from "antd";
import {useScopedI18n} from "../../../../../../../locales/client";

import {useState} from "react";
import FundBalanceByCard from "./fundBalanceByCard";
import FundBalanceByBank from "./funndBalanceByBank";

export default function FundBalanceDrawer({
  openDrawer,
  onClose,
  selectedProfile,
}: {
  openDrawer: any;
  onClose: any;
  selectedProfile: any;
}) {
  const t = useScopedI18n("profilePayment");

  const [paymentMethod, setPaymentMethod] = useState("card");

  const onChange = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };

  const tPayments = useScopedI18n("payments");

  return (
    <Drawer
      title={t("fundBalance")}
      placement="right"
      onClose={onClose}
      open={openDrawer}
      getContainer={false}
      width={600}
      styles={{
        header: {
          fontSize: 20,
          backgroundColor: theme.token.darkGray,
          borderBottom: `1px solid ${theme.token.gray200}`,
        },
        body: {padding: 20, backgroundColor: theme.token.darkGray},
      }}
    >
      <>
        <Typography.Title level={4} style={{paddingTop: 20, paddingBottom: 20}}>
          {t("choosePaymentMethod")}
        </Typography.Title>
        <Flex
          vertical
          gap="start"
          style={{padding: 10, backgroundColor: theme.token.colorBgBase, borderRadius: 5}}
        >
          <Radio.Group block defaultValue={paymentMethod} onChange={onChange} value={paymentMethod}>
            <Radio value="card">{tPayments("card")}</Radio>
            <Radio value="bank_transfer">{tPayments("bank")}</Radio>
          </Radio.Group>
        </Flex>
        {paymentMethod === "card" ? (
          <FundBalanceByCard selectedProfile={selectedProfile} />
        ) : (
          <FundBalanceByBank selectedProfile={selectedProfile} />
        )}
      </>
    </Drawer>
  );
}
