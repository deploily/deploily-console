"use client";
import { Col, Row, Image, Typography, theme, Collapse, Card, Button, Space } from "antd";
import { ArrowLeft, CaretDown, CaretUp, Star } from "@phosphor-icons/react";
import { useI18n } from "../../../../../../../../locales/client";
import { getItems } from "./getItems";
import { useEffect } from "react";
import { useAllServices } from "@/lib/features/apiService/apiServiceSelectors";
import { useAppDispatch } from "@/lib/hook";
import { getApiServiceById } from "@/lib/features/apiService/apiServiceThunks";
import { useRouter } from "next/navigation";
import { postServiceInCart } from "@/lib/features/cart/cartThunks";
import Paragraph from "antd/es/typography/Paragraph";
import { IMAGES_URL } from "@/deploilyWebsiteUrls";
import { postFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";

export default function ServiceDetailsContentPage({ serviceId }: { serviceId: string }) {
  const { useToken } = theme;
  const { token } = useToken();
  const t = useI18n();
  const { currentService } = useAllServices();
  const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices()
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getApiServiceById(serviceId));
  }, [serviceId, favoriteServiceAdded, favoriteServiceDeleted]);

  if (!currentService) return null;

  const imageUrl = currentService.image_service
    ? currentService.image_service.startsWith("http")
      ? currentService.image_service
      : `${IMAGES_URL}${currentService.image_service}`
    : "/images/logo_service.png";

  const handleFavoriteService = (service_id: number) => {
    dispatch(postFavoriteService({ "service_id": service_id }));
  }

  return (
    <>
      <div style={{ marginLeft: 40 }}>
        <Button style={{ border: "none", background: "#030303", boxShadow: "none" }}
          icon={<ArrowLeft color="#D85912" size={35} />} onClick={() => router.back()} />
      </div>
      <Space direction="vertical" size="large" style={{ paddingInline: 40, marginTop: 10, width: "100%" }}>
        <Row gutter={16}  >
          <Col md={16} xs={24} >
            <Image
              alt="Logo"
              src={imageUrl}
              width={220}
              height={220}
              preview={false}
            />
          </Col>

          <Col md={8} xs={24} style={{
            color: "#DD8859",
            fontWeight: "bold",
            fontSize: "18px",
            display: "flex",
            justifyContent: "start",
            alignSelf: "start"
          }}>
            <Typography.Title level={2} style={{ color: token.colorPrimaryTextHover }}>
              {currentService.unit_price}
            </Typography.Title>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 10 }} >
          <Col span={16} >
            <div>
              <Typography.Title level={2}>{currentService.name}</Typography.Title>
            </div>
          </Col>
          <Col span={8} style={{ display: "flex", justifyContent: "start" }}>
            <Button style={{ border: "none", backgroundColor: "transparent", boxShadow: "none" }}
              icon={currentService.is_in_favorite == true ?
                <Star size={20} weight="fill" color="#FC3232" /> :
                <Star size={20} color="#7D7D7D" />}
              onClick={() =>
                handleFavoriteService(currentService.id)
              }
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 10 }} >
          <Col span={16} >
            <div>
              <Paragraph style={{ fontSize: 18 }} >

                {currentService.description}
              </Paragraph>
            </div>
          </Col>

        </Row>
        <Row gutter={16} key={currentService.id}  >
          <Col md={16} xs={24} style={{ textAlign: "start", width: "100%", padding: 0, marginTop: 10 }}>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (isActive ? <CaretUp /> : <CaretDown />)}
              expandIconPosition="end"
              style={{ background: token.colorBgContainer, width: "100%" }}
              items={getItems(currentService, t)}
            />
          </Col>

          <Col md={8} xs={24}
            style={{
              paddingLeft: 10,
              marginTop: 10,
              textAlign: "center",
              display: "flex",
              justifyContent: "start",
            }}
          >
            <Card style={{ width: "90%", maxWidth: 300, height: 250 }}>
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
                  router.push("/portal/my-services")
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
      </Space>
    </>
  )

}
