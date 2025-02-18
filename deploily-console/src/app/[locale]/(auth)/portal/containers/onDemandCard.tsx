import {Button, Card, Row, Typography} from "antd";
import Link from "next/link";
import {useI18n} from "../../../../../../locales/client";

export default function OnDemandCard() {
  const t = useI18n();
  return (
    <>
      <Row justify="center" align="middle" style={{height: "80vh", padding: 20}}>
        <Card style={{width: "50%", justifyContent: "center"}}>
          <Typography.Title level={3} style={{paddingBottom: 10, textAlign: "center"}}>
            {"onDemandService"}
          </Typography.Title>
          <Row justify="center" align="middle">
            <Button
              style={{
                color: "#fff",
                backgroundColor: "#D85912",
                border: "none",
                justifyContent: "center",
              }}
            >
              <Link href="/portal/home" data-testid="mocked-link">
                <span
                  style={{
                    color: "rgba(220, 233, 245, 0.88)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {t("ondemand")}
                </span>
              </Link>
            </Button>
          </Row>
        </Card>
      </Row>
    </>
  );
}
