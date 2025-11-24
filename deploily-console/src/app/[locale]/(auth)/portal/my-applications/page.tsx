"use client";
import {Button, Col, Row} from "antd";
import {useI18n, useScopedI18n} from "../../../../../../locales/client";
import MyAppContainer from "./components/myAppContainer";
import {ClockCircleOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

export default function Page() {
  const tSidebar = useScopedI18n("sidebar");
  const router = useRouter();
  const t = useI18n();

  return (
    <>
      <Row style={{padding: 20}} justify="space-between" align="middle">
        <Col>
          <span
            style={{
              color: "white",
              fontFamily: "Inter, sans-serif",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            {tSidebar("myApplications")}
          </span>
        </Col>
        <Col>
          <Button
            type="default"
            icon={<ClockCircleOutlined />}
            style={{
              fontWeight: 500,
              color: "#D85912",
              borderColor: "#D85912",
              backgroundColor: "transparent",
            }}
            onClick={() => router.push("/portal/my-applications/history")}
          >
            {t("history")}
          </Button>
        </Col>
      </Row>
      <MyAppContainer />
    </>
  );
}
