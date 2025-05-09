"use client";
import { Row } from "antd";
import { useScopedI18n } from "../../../../../../locales/client";
import PaymentListContainer from "./components/paymentsListContainer";

export default function Page() {
  const t = useScopedI18n('payments')
  return (
    <>
      <Row style={{ padding: 20 }}>
        <span
          style={{
            color: "white",

            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          {t("paymentList")}
        </span>
      </Row>
      <PaymentListContainer />
    </>
  );
}
