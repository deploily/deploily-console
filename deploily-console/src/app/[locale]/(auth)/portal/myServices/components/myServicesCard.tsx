"use client";
import { ArrowRight, Star } from "@phosphor-icons/react";
import { Card, Col, Row, Image, Button, DatePicker, Typography, } from "antd";
import { useI18n } from "../../../../../../../locales/client";
import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Paragraph from "antd/es/typography/Paragraph";
import { Admin_URL } from "@/deploilyWebsiteUrls";

export default function MyServiceCard({ data }: any) {
  const t = useI18n();
  const dateFormat = "YYYY-MM-DD";
  const router = useRouter();
  const baseURL = Admin_URL; 

  // Corrected image handling
  const imageUrl = data.service?.image_service?.startsWith("http")
    ? data.service.image_service
    : data.service?.image_service
      ? `${baseURL}${data.service.image_service}`
      : "/images/logo_service.png";

  return (
    <Card style={{ height: "100%", width: "100%", position: "relative", paddingBottom: "60px" }}>
      <div style={{ height: "300px" }}>
        {/* Service Logo and Amount */}
        <Row align="middle" gutter={16} style={{ height: "30%" }}>
          <Col span={12} style={{ paddingBottom: 10 }}>
            <Image
              alt="Logo"
              src={imageUrl}
              width={80}
              height={80}
              fallback="/images/logo_service.png"
            />
          </Col>
          <Col span={12} style={{
            color: "#DD8859",
            fontWeight: "bold",
            fontSize: "18px",
            display: "flex",
            justifyContent: "flex-end",
            alignSelf: "start"
          }}>
            {data.amount}
          </Col>
        </Row>

        {/* Service Name & Favorite Icon */}
        <Row style={{ height: "20%", marginBottom: 8 }}>
          <Col span={20}>
            <Paragraph ellipsis={{ rows: 2 }} style={{ fontFamily: "Inter, sans-serif", fontSize: "20px" }}>
              {data.service?.name}
            </Paragraph>
          </Col>
          <Col span={4} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Star size={20} color="#7D7D7D" />
          </Col>
        </Row>

        {/* Service Date & Duration */}
        <Row style={{ height: "30%" }}>
          <div>
            <Row><Typography.Title level={5} style={{ marginTop: 8, marginRight: 8, fontWeight: 600 }}>
              {t('startDate')}
            </Typography.Title>
              <DatePicker
                style={{ marginTop: 10 }}
                defaultValue={dayjs(data.start_date, dateFormat)}
                disabled
              /></Row>
            <Row><Typography.Title level={5} style={{ marginTop: 8, fontWeight: 600, marginRight: 8 }}>
              {t('duration')}
            </Typography.Title>
              <Typography.Title level={5} style={{ marginTop: 8, fontWeight: 300 }}>
                {data.duration_month} {t('month')}
              </Typography.Title></Row>
          </div>

        </Row>
      </div>

      {/* Buttons (Details & Settings) */}
      <div style={{ position: "absolute", bottom: "20px", right: "20px", display: "flex", gap: "10px" }}>
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
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 600 }}>
              {t("details")}
            </span>
          </Button>
        </Link>

        <Button
          style={{
            color: "#fff",
            backgroundColor: "#5394CC",
            border: "none",
            padding: "4px 8px",
          }}
          onClick={() => router.push(`/portal/myServices/${data.cart_id}`)}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 600 }}>
            {t("settings")}
          </span>
        </Button>
      </div>
    </Card>
  );
}
