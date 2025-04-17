"use client";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import { useI18n } from "../../../../locales/client";

export default function LandingPageContent({ loginLogoutButton }: { loginLogoutButton: React.ReactNode }) {
  const t = useI18n();

  return (
    <Row justify="center" align="middle" style={{ padding: 20, height: "60vh" }}>
      <Col xs={{ flex: '100%' }} sm={{ flex: '80%' }} md={{ flex: '50%' }} lg={{ flex: '35%' }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Image
          src="/images/logo_name.png"
          width={441}
          height={109}
          alt="logo-deploily"
          layout="responsive"
          style={{
            marginBottom: "40px",
          }}
        />
        <>
          {loginLogoutButton}
        </>
        <Button
          style={{
            width: "100%",
            color: "#fff",
            height: "40px",
            backgroundColor: "#5394CC",
            border: "none",

          }}
          href="https://deploily.cloud/en"
        >
          <span
            style={{
              color: "rgba(220, 233, 245, 0.88)",

              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {t("gotoSite")}
          </span>
        </Button>
      </Col>
    </Row>
  );
}
