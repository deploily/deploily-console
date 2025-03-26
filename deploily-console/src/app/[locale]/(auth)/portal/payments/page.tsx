"use client";
import {Row} from "antd";
import { useScopedI18n } from "../../../../../../locales/client";
import PaymentListeContainer from "./components/paymentListeContainer";

export default function Page() {
  const t = useScopedI18n('payments')
  return (
    <>
      <Row style={{padding: 20}}>
        <span
          style={{
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontSize: "24px",
            fontWeight: 800,
          }}
        >
                  {t("paymentList")}
        </span>
      </Row>
      <PaymentListeContainer/>
    </>
  );
}
