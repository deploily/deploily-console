"use client";
import { Col, Row, Image, Typography, theme, Collapse, Card, Button } from "antd";
import { ArrowLeft, CaretDown, CaretUp, Star } from "@phosphor-icons/react";
import { useI18n } from "../../../../../../../../locales/client";
import { getItems } from "./getItems";
import { useEffect, useState } from "react";
import { useAllServices } from "@/lib/features/apiService/apiServiceSelectors";
import { useAppDispatch } from "@/lib/hook";
import { getApiServiceById } from "@/lib/features/apiService/apiServiceThunks";
import { useRouter } from "next/navigation";
import { postServiceInCart } from "@/lib/features/cart/cartThunks";

export default function ServiceDetailsContentPage({ serviceId }: { serviceId: string }) {
  const { useToken } = theme;
  const { token } = useToken();
  const t = useI18n();
  const [isMobile] = useState(false);
  const { serviceLoading, currentService } = useAllServices();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (serviceId) {
      dispatch(getApiServiceById(serviceId));
    }
  }, [dispatch, serviceId]);

  const baseURL = "https://admin.deploily.cloud/static/uploads/";

  if (serviceLoading || !currentService) return null;

  return (
    <>
      <Row gutter={16} key={currentService.id}>
        <div style={{ padding: "10px" }}>
          <Button style={{ border: "none", background: "#030303", boxShadow: "none" }} icon={<ArrowLeft color="#D85912" size={35} />} onClick={() => router.back()} />
        </div>
        <Col style={{ padding: "50px 0px 50px 50px" }}>
          <Image
            alt="Logo"
            src={
              currentService.image_service
                ? `${baseURL}${currentService.image_service}`
                : "/images/logo_service.png"
            }
            width={220}
            height={220}
            fallback="/images/logo_service.png"
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={12} style={{ padding: 45 }}>
          <Typography.Title level={2}>{currentService.name}</Typography.Title>
          <Typography.Title level={2} style={{ color: token.colorPrimaryTextHover }}>
            {currentService.unit_price}
          </Typography.Title>
          <Typography.Title level={4}>{currentService.description}</Typography.Title>
        </Col>

        <Col style={{ display: "flex", justifyContent: "flex-end", padding: 45 }}>
          <Star size={20} color="#7D7D7D" />
        </Col>
      </Row>

      <Row
        key={currentService.id}
        justify={isMobile ? "center" : "start"}
        style={{
          padding: 50,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "20px",
        }}
      >
        <Col xs={24} sm={20} md={20} lg={16} style={{ textAlign: "start", width: "100%" }}>
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (isActive ? <CaretUp /> : <CaretDown />)}
            expandIconPosition="end"
            style={{ background: token.colorBgContainer, width: "100%" }}
            items={getItems(currentService, t)}
          />
        </Col>

        <Col
          style={{
            padding: "0px 50px 50px 50px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card style={{ width: 250 }}>
            <Typography style={{ color: "#7D7D7D", paddingBottom: 10 }}>{t("offeredBy")}</Typography>
            <Col style={{ paddingBottom: 10, textAlign: "center" }}>
              <Image alt="Logo" src="/images/logo_transformatek.png" width={70} height={70} />
            </Col>
            <Typography style={{ paddingBottom: 10 }}>{t("oneMonthFree")}</Typography>

            <Button
              style={{
                color: "#fff",
                backgroundColor: "#D85912",
                border: "none",
                padding: "4px",
              }}
              onClick={() => {
                dispatch(postServiceInCart(serviceId));
                router.push("/portal/myServices")
              }}
            >
              <span
                style={{
                  color: "rgba(220, 233, 245, 0.88)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {t("TryForFree")}
              </span>
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
}
