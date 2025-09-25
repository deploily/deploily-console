"use client";
import { DeploymentsServiceInterface } from "@/lib/features/deployment/deploymentServiceInterface";
import { theme } from "@/styles/theme";
import { ArrowRight, HeartStraight } from "@phosphor-icons/react";
import { Badge, Button, Card, Col, Image, Row, Space } from "antd";
import Meta from "antd/es/card/Meta";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useI18n } from "../../../../../../../locales/client";

export default function DeploymentsServiceCard({ data }: { data: DeploymentsServiceInterface }) {
  const t = useI18n();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      hoverable
      style={{
        flex: "0 0 auto",
        width: 270,
        height: 350,
        position: "relative",
        marginRight: 16,
      }}
      bodyStyle={{ padding: 16, height: "100%" }}
      onClick={() => router.push(`/portal/deployments/${data.service_slug}`)}
    >
      <div style={{ height: "280px" }}>
        {/* Header */}
        <Row align="top" justify="space-between" gutter={16} style={{ height: "40%" }}>
          <Col span={12}>
            <Badge
              count={
                <Button
                  style={{
                    border: "none",
                    backgroundColor: "#fff",
                    boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                    borderRadius: "50%",
                    padding: 0,
                    width: 24,
                    height: 24,
                    minWidth: 24,
                  }}
                  icon={<HeartStraight size={20} weight="fill" color="#7D7D7D" />}
                />
              }
              offset={[-12, 12]}
            >
              <Image src={data.image} width={100} height={100} preview={false} />
            </Badge>
          </Col>

          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start", // aligns to the top within the Row
            }}
          >
            <p
              style={{
                color: "#DD8859",
                fontWeight: "bold",
                fontSize: 18,
                margin: 0,
                alignSelf: "flex-start", // ensures it's pinned to top within Col
              }}
            >
              {data.price} DZD / {data.price_category === "monthly" ? t("month") : t("year")}
            </p>
          </Col>
        </Row>

        {/* Title & Description */}
        <Row style={{ height: "40%" }}>
          <Col span={24}>
            <Meta
              title={
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    marginBottom: 4,
                    paddingTop: 12,
                  }}
                >
                  {data.name}
                </p>
              }
              description={
                <p
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    marginBottom: 0,
                  }}
                >
                  {data.description}
                </p>
              }
            />
          </Col>
        </Row>
      </div>

      {/* Details Button */}
      <Space style={{ position: "absolute", bottom: 16, right: 16 }}>
        <Button
          style={{
            color: "#fff",
            border: "none",
            padding: 4,
            boxShadow: "none",
            background: "transparent",
            display: "flex",
            alignItems: "center",
          }}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/portal/deployments/${data.service_slug}`);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span
            style={{
              color: hovered ? theme.token.colorPrimary : theme.token.gray200,
              fontSize: 16,
              fontWeight: 600,
              paddingRight: 4,
              transition: "color 0.3s ease",
            }}
          >
            {/* //TODO ADD TRANSLATION */}
            {t("details")}
          </span>
          <ArrowRight
            size={20}
            style={{
              color: hovered ? theme.token.colorPrimary : theme.token.gray200,
              transition: "color 0.3s ease",
            }}
          />
        </Button>
      </Space>
    </Card>
  );
}
