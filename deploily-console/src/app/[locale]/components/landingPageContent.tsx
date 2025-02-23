"use client";
import {Button, Col, Row} from "antd";
import Image from "next/image";
import {useI18n} from "../../../../locales/client";
import { signIn } from "next-auth/react";

export default function LandingPageContent({ loginLogoutButton }: { loginLogoutButton: React.ReactNode }) {
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
        <>
          { loginLogoutButton }
        </>
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
            {t("gotoSite")}
          </span>
        </Button>
      </Col>
    </Row>
  );
}
