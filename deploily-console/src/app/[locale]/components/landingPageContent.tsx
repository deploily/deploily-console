"use client";
import {Col, Row} from "antd";
import Link from "antd/es/typography/Link";
import {useI18n} from "../../../../locales/client";

export default function LandingPageContent({
  loginLogoutButton,
}: {
  loginLogoutButton: React.ReactNode;
}) {
  const t = useI18n();

  return (
    <Row justify="center" align="middle" style={{height: "100%"}}>
      <Col
        xs={{flex: "100%"}}
        sm={{flex: "80%"}}
        md={{flex: "50%"}}
        lg={{flex: "35%"}}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "80%",
        }}
      >
        <div></div>
    
          <>{loginLogoutButton}</>

        <div>
          <Link href="https://deploily.cloud/en">
            <span
              style={{
                // color: "rgba(220, 233, 245, 0.88)",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              {t("gotoSite")}
            </span>
          </Link>
        </div>
      </Col>
    </Row>
  );
}
