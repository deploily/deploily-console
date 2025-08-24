"use client";
import { Col, Row } from "antd";
import Link from "antd/es/typography/Link";
import Image from "next/image";
import { useI18n } from "../../../../locales/client";

export default function LandingPageContent({ loginLogoutButton }: { loginLogoutButton: React.ReactNode }) {
  const t = useI18n();

  return (
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <Col xs={{ flex: '100%' }} sm={{ flex: '80%' }} md={{ flex: '50%' }} lg={{ flex: '35%' }}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "space-between", height: "80%"
        }}
      >
        <div></div>
        <div style={{ width: "80%", height: "auto", alignItems: "center", display: "flex", flexDirection: "column", marginBottom: "50px" }}>
          <div>
            <Image
              src="/images/logo_name.png"
              width={200}
              height={49}
              alt="logo-deploily"
              style={{
                marginBottom: 50,

              }}
            />
          </div>
          <>
            {loginLogoutButton}
          </>
        </div>

        <div>
          <Link href="https://deploily.cloud/en" >
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
    </Row >
  );
}
