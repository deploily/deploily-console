"use client";
import { Button, Row, Col } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useI18n, useScopedI18n } from "../../../../../../locales/client";
import MyApiContainer from "./components/myApiContainer";
import { useRouter } from "next/navigation";

export default function Page() {
  const tSidebar = useScopedI18n('sidebar');
  const t = useI18n();
  const router = useRouter();

  return (
    <>
      <Row style={{ padding: 20 }} justify="space-between" align="middle">
        <Col>
          <span
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            {tSidebar("myApis")}
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
            onClick={() => router.push("/portal/my-api/history")}
           
          >
            {t("history")}
          </Button>
        </Col>
      </Row>

      <MyApiContainer />
    </>
  );
}
