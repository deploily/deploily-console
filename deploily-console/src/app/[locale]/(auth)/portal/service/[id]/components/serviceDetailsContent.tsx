"use client";
import { Col, Row, Image, Typography, theme, Collapse, Card, Button, Space, Skeleton, Badge } from "antd";
import { ArrowLeft, CaretDown, CaretUp, Star } from "@phosphor-icons/react";
import { useI18n } from "../../../../../../../../locales/client";
import { getItems } from "./getItems";
import { useEffect } from "react";
import { useAllServices } from "@/lib/features/apiService/apiServiceSelectors";
import { useAppDispatch } from "@/lib/hook";
import { getApiServiceById } from "@/lib/features/apiService/apiServiceThunks";
import { useRouter } from "next/navigation";
import Paragraph from "antd/es/typography/Paragraph";
import { IMAGES_URL } from "@/deploilyWebsiteUrls";
import { postFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";
import { postMyService } from "@/lib/features/myService/myServiceThunks";

export default function ServiceDetailsContentPage({ serviceId }: { serviceId: string }) {
  const { useToken } = theme;
  const { token } = useToken();
  const t = useI18n();
  const { currentService, serviceLoading } = useAllServices();
  const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices()
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getApiServiceById(serviceId));
  }, [favoriteServiceAdded, favoriteServiceDeleted]);

  const imageUrl = (image_service: string) => {
    return (
      image_service ? image_service.startsWith("http")
        ? image_service
        : `${IMAGES_URL}${image_service}`
        : "/images/logo_service.png"
    )
  }

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
        {(serviceLoading || currentService === undefined) ?
          <>
            <Skeleton.Image active />
            <Skeleton active paragraph={{ rows: 2 }} />

          </> :
          <>
            <Row gutter={16}  >
              <Col md={16} xs={24} >
                <Badge count={<Button style={{ border: "none", backgroundColor: "transparent", boxShadow: "none" }}
                  icon={currentService.is_in_favorite == true ?
                    <Star size={40} weight="fill" color="#FC3232" /> :
                    <Star size={40} color="#7D7D7D" />}
                  onClick={() =>
                    handleFavoriteService(currentService.id)
                  }
                />}
                offset={[-20, 20]}>
                  <Image
                    alt="Logo"
                    src={imageUrl(currentService?.image_service)}
                    width={220}
                    height={220}
                    preview={false}

                  />
                </Badge>
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

              <Typography.Title level={2}>{currentService.name}</Typography.Title>


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
                      dispatch(postMyService({
                        "name": currentService.name,
                        "amount": currentService.unit_price,
                        "created_on": Date.now(),
                        "duration_month": 1,
                        "start_date": Date.now(),
                        "description": currentService.description,
                        "documentation_url": currentService.documentation_url,
                        "unit_price": currentService.unit_price,
                        "service_url": currentService.service_url,
                        "image_service": currentService.image_service,
                        "short_description": currentService.short_description,
                        "specifications": currentService.specifications,
                        "curl_command": currentService.curl_command,
                      }));
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
          </>



        }

      </Space>
    </>
  )

}
