"use client";
import { ArrowRight, Star } from "@phosphor-icons/react";
import { Card, Col, Row, Image, Button } from "antd";
import Meta from "antd/es/card/Meta";
import { useI18n } from "../../../../../../../locales/client";
import Link from "next/link";

export default function ApiServiceCard({ data }: any) {
  const t = useI18n();
  const baseURL = `https://console.deploily.cloud/static/uploads/`;
  const imageUrl = data.image_service
    ? data.image_service.startsWith("http")
      ? data.image_service
      : `${baseURL}${data.image_service}`
    : "/images/logo_service.png";

  return (
    <>
      <Card hoverable style={{ width: 500, minWidth: 300 }}>
        <Row align="middle" gutter={16}>
          <Col style={{ paddingBottom: 10 }}>
            <Image
              alt="Logo"
              src={imageUrl}
              width={80}
              height={80}
              fallback="/images/logo_service.png"
            />
          </Col>
          <Col style={{ padding: 10 }}>
            <Meta
              title={
                <p
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: "regular", fontSize: "20px" }}
                >
                  {data.name}
                </p>
              }
              description={
                <p
                  style={{
                    color: "#DD8859",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {data.unit_price}
                </p>
              }
            />
          </Col>
          <Col style={{ display: "flex", justifyContent: "flex-end" }}>
            <Star size={20} color="#7D7D7D" />
          </Col>{" "}
        </Row>
        <p>{data.description}</p>
        <Row justify="end">
          <Col>
            {" "}
            <Link href={`/portal/service/${data.id}`}>
              <Button
                style={{
                  justifyContent: "end",
                  color: "#fff",
                  backgroundColor: "#D85912",
                  border: "none",
                  padding: "4px",
                }}
              >
                {" "}
                <ArrowRight size={20} style={{ color: "rgba(220, 233, 245, 0.88)" }} />
                <span
                  style={{
                    color: "rgba(220, 233, 245, 0.88)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {t("details")}
                </span>
              </Button>
            </Link>{" "}
          </Col>
        </Row>
      </Card>
    </>
  );
}
