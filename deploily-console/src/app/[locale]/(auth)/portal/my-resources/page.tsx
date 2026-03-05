"use client";
import { Row } from "antd";
import { useI18n } from "../../../../../../locales/client";
import ManagedRessourceSection from "./containers/managedRessourceSection";
import MyResourcesSection from "./containers/myResourcesSection";
import MyWebHostingsContainer from "./containers/myWebHostingsSection";

export default function Page() {
  const t = useI18n();
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
          {t("vps")}
        </span>
      </Row>
      <ManagedRessourceSection />
      <Row style={{ padding: 20 }}>
        <span
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          {t("myWebHostings")}
        </span>
      </Row>
      <MyWebHostingsContainer />
      <Row style={{ padding: 20 }}>
        <span
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          {t("myResources")}
        </span>
      </Row>
      <MyResourcesSection />
    </>
  );
}
