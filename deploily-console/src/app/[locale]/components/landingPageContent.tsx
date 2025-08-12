"use client";
import { Col, Row } from "antd";
import Image from "next/image";
import { useI18n } from "../../../../locales/client";
import Link from "antd/es/typography/Link";

export default function LandingPageContent({ loginLogoutButton }: { loginLogoutButton: React.ReactNode }) {
  const t = useI18n();

  return (
    <Row justify="center" align="middle" style={{ padding: 20, height: "60vh" }}>
      <Col xs={{ flex: '100%' }} sm={{ flex: '80%' }} md={{ flex: '50%' }} lg={{ flex: '35%' }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <div style={{width: "80%",
              height: "auto",}}>
          <Image
            src="/images/logo_name.png"
            width={200}
            height={49}
            alt="logo-deploily"
            layout="responsive"
            style={{
              marginBottom: 50,
              
            }}
          />
        </div>
        <>
          {loginLogoutButton}
        </>

        <Link href="https://deploily.cloud/en" >
          <span
            style={{
              color: "rgba(220, 233, 245, 0.88)",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {t("gotoSite")}
          </span>
        </Link>
      </Col>
    </Row>
  );
}
