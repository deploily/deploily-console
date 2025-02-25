"use client";
import { ArrowRight, Star } from "@phosphor-icons/react";
import { Card, Col, Row, Image, Button, DatePicker, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { useI18n } from "../../../../../../../locales/client";
import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function MyServiceCard({ data }: any) {
  const t = useI18n();
  const dateFormat = "YYYY-MM-DD";
  const router = useRouter();
  const baseURL = `https://admin.deploily.cloud/static/uploads/`;
  const imageUrl = data.service?.image_service
    ? data.service?.image_service.startsWith("http")
      ? data.image_service
      : `${baseURL}${data.service?.image_service}`
    : "/images/logo_service.png";

  return (
    <Card style={{ width: "100%", maxWidth: 380, marginBottom: 16 }} >
      <Row justify={"space-between"} style={{ width: "100%", overflow: "hidden" }}>
        <Col><Image
          alt="Logo"
          src={imageUrl}
          preview={false}
          width={80}
          height={80}
          fallback="/images/logo_service.png"
        />
        </Col>
        <Col>
          <Typography.Text strong style={{ color: "#DD8859", fontSize: "20px" }}>
            {data.amount}
          </Typography.Text>
        </Col>
      </Row>
      <Col style={{ padding: 0 }}>

        <Row justify={"space-between"}><Typography.Title level={4} style={{ paddingTop: 10, fontWeight: 400 }}>
          {data.service?.name}
        </Typography.Title>
          <Col style={{ justifyItems: "center", paddingTop: 10 }}>
            <Star size={20} color="#7D7D7D" />
          </Col>
        </Row>


        <Row justify={"space-between"}>
          <Typography.Title level={5} style={{ marginTop: 8, marginRight: 8, fontWeight: 600 }}>
            {t('startDate')}
          </Typography.Title>
          <DatePicker
            style={{ marginTop: 10 }}
            defaultValue={dayjs(data.start_date, dateFormat)}
            disabled
          />
        </Row>
        <Row>
          <Typography.Title level={5} style={{ marginTop: 8, fontWeight: 600, marginRight: 8 }}>
            {t('duration')}
          </Typography.Title>
          <Typography.Title level={5} style={{ marginTop: 8, fontWeight: 300 }}>
            {data.duration_month} {t('month')}
          </Typography.Title>
        </Row>
      </Col>

      <Row gutter={8} justify="end" style={{ marginTop: 12 }}>
        <Col>
          <Link href={`/portal/service/${data.service_id}`}>
            <Button
              style={{
                color: "#fff",
                backgroundColor: "#D85912",
                border: "none",
                padding: "4px 8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
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
          </Link>
        </Col>
        <Col>
          <Button
            style={{
              color: "#fff",
              backgroundColor: "#5394CC",
              border: "none",
              padding: "4px 8px",
            }}
            onClick={() => router.push(`/portal/myServices/${data.cart_id}`)}
          >
            <span
              style={{
                color: "rgba(220, 233, 245, 0.88)",
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              {t("settings")}
            </span>
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
