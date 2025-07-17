"use client";
import { Col, Row } from "antd";
import Image from "next/image";
import { useI18n } from "../../../../locales/client";

export default function LandingPageContent({ loginLogoutButton }: { loginLogoutButton: React.ReactNode }) {
  const t = useI18n();

  return (
    <Row justify="center" align="middle" style={{ padding: 20, height: "60vh" }}>
      <Col xs={{ flex: '100%' }} sm={{ flex: '80%' }} md={{ flex: '50%' }} lg={{ flex: '35%' }}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center"


        }}
      >

        {/* Row 1: Full width item */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24} style={{ marginBottom: "10%" }}>
            <div >
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
              </></div>
          </Col>
        </Row>




        <Col style={{
          textAlign: "center", flex: "0 0 auto"
        }}>
          <a
            href="https://deploily.cloud/en"
            style={{
              color: "#5394CC",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "underline",
            }}
          >
            {t("gotoSite")}
          </a>
        </Col>
      </Col>
    </Row>
  );
}
