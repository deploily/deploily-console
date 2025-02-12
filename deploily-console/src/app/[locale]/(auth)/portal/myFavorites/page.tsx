"use client";
import {Row} from "antd";
import {useI18n} from "../../../../../../locales/client";
import OnDemandCard from "../containers/onDemandCard";

export default function Page() {
  const t = useI18n();
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
          {t("myFavorites")}
        </span>
      </Row>
      <OnDemandCard/>

    </>
  );
}
