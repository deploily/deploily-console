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

  return (
    <Card>
      <Row align="middle" gutter={16}>
        <div style={{width: "100%", maxWidth: 126, overflow: "hidden"}}>
          <Image alt="Logo" src="/images/logo_service.png" width="100%" />
        </div>
        <Col flex="1">
          <Meta
            title={
              <Typography.Title level={4} style={{margin: 0, fontWeight: 400}}>
                {data.name}
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
            Duration: {data.duration_month} month(s)
          </Typography.Title>
        </Col>
        <Col>
          <Star size={20} color="#7D7D7D" />
        </Col>
      </Row>

      <Row gutter={8} justify="end" style={{marginTop: 12}}>
        <Col>
          <Link href="/portal/service/details" passHref legacyBehavior>
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
            onClick={() => router.push("/portal/myServices/myServiceParameters")}
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
