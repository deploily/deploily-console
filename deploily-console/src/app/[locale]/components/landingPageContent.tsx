"use client";
import {Button, Col, Row} from "antd";
import Image from "next/image";
import {useI18n} from "../../../../locales/client";

export default function LandingPageContent() {
  const t = useI18n();
  return (
    <Row justify="center" align="middle" style={{padding: 20, height: "60vh"}}>
      <Col style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Image
          src="/images/logo_name.png"
          width={350}
          height={109}
          alt="logo-deploily"
          style={{marginBottom: "50px"}}
        />
        <Button
          style={{
            width: 350,
            color: "#fff",
            height: "40px",
            backgroundColor: "#D85912",
            border: "none",
            marginBottom: "20px",
          }}
          href="/portal"
        >
          <span
            style={{
              color: "rgba(220, 233, 245, 0.88)",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {t("login")}
          </span>
        </Button>
        <Button
          style={{
            width: 350,
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
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {t("cancel")}
          </span>
        </Button>
      </Col>
    </Row>
  );
}
