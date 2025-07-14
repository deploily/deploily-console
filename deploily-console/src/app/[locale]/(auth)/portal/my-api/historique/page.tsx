"use client";
import { Row } from "antd";
import { useScopedI18n } from "../../../../../../../locales/client";
import MyApiHistoriqueContainer from "./container/myApiHistoriqueContainer";

export default function Page() {
  const t = useScopedI18n('sidebar');

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
          {t("myApis")}
        </span>
          </Row>
          <MyApiHistoriqueContainer/>
    </>
  );
}
