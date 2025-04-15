"use client";
import { Card, Row, theme } from "antd";
import Image from "next/image";
import { useI18n } from "../../../../../../locales/client";

export default function ComingSoonPage() {
  const { useToken } = theme;
  const { token } = useToken();
  const t = useI18n();

  return (
    <Row justify="center" align="middle" style={{ height: "80vh", padding: 20 }}>
      <Card
        hoverable
        style={{ backgroundColor: token.colorPrimary, justifyItems: "center" }}
        cover={<Image alt="coming soon" src="/images/coming_soon.jpg" width={800} height={400} />}
      >
        <p
          style={{

            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {t("comingSoon")}
        </p>
      </Card>
    </Row>
  );
}
