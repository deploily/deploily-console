"use client";
import {ArrowRight, Star} from "@phosphor-icons/react";
import {Card, Col, Row, Image, Button, DatePicker, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import {useI18n} from "../../../../../../../locales/client";
import Link from "next/link";
import dayjs from "dayjs";
import {useRouter} from "next/navigation";

export default function MyServiceCard({data}: any) {
  const t = useI18n();
  const dateFormat = "YYYY-MM-DD";
  const router = useRouter();
  const baseURL = `http://192.168.1.15:5000/static/uploads/`;
  const imageUrl = data.image_service
    ? data.image_service.startsWith("http")
      ? data.image_service
      : `${baseURL}${data.image_service}`
    : "/images/logo_service.png";

  return (
    <Card>
      <Row align="middle" gutter={16}>
        <div style={{width: "100%", maxWidth: 126, overflow: "hidden"}}>
          <Image
            alt="Logo"
            src={imageUrl}
            width={80}
            height={80}
            fallback="/images/logo_service.png"
          />
        </div>
        <Col flex="1">
          <Meta
            title={
              <Typography.Title level={4} style={{margin: 10, fontWeight: 400}}>
                {data.service.name}
              </Typography.Title>
            }
            description={
              <Typography.Text strong style={{color: "#DD8859", fontSize: "20px"}}>
                {data.price}
              </Typography.Text>
            }
          />
          <DatePicker
            style={{marginTop: 10}}
            defaultValue={dayjs(data.start_date, dateFormat)}
            disabled
          />
          <Typography.Title level={5} style={{marginTop: 8, fontWeight: 400}}>
            {t('duration')}: {data.duration_month} {t('month')}
          </Typography.Title>
        </Col>
        <Col>
          <Star size={20} color="#7D7D7D" />
        </Col>
      </Row>

      <Row gutter={8} justify="end" style={{marginTop: 12}}>
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
              <ArrowRight size={20} style={{color: "rgba(220, 233, 245, 0.88)"}} />
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
