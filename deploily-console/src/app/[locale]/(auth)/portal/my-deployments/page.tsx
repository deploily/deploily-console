"use client";
import {Col, Row} from "antd";
import {useScopedI18n} from "../../../../../../locales/client";
import MyDeploymentContainer from "./components/myDeploymentContainer";

export default function Page() {
  const tSidebar = useScopedI18n("sidebar");

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
            {tSidebar("myDeployments")}
          </span>
        </Col>
        {/* <Col>
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
                </Col> */}
      </Row>
      <MyDeploymentContainer />
    </>
  );
}
