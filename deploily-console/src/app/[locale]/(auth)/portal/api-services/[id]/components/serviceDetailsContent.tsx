"use client";
import { Col, Row, Image, Typography, Collapse, Button, Space, Skeleton, Badge, Card, Result } from "antd";
import { CaretDown, CaretUp, Star } from "@phosphor-icons/react";
import { useI18n } from "../../../../../../../../locales/client";
import { getItems } from "./getItems";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hook";
// import { useRouter } from "next/navigation";
import Paragraph from "antd/es/typography/Paragraph";
import { IMAGES_URL } from "@/deploilyWebsiteUrls";
import { postFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";
import { theme } from "@/styles/theme";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useServicePlan } from "@/lib/features/service-plans/servicePlanSelector";
import { ServicePlan } from "@/lib/features/service-plans/servicePlanInterface";
import ServicePlanCard from "./servicePlanCard";
import { useState } from "react";
import SubscribeDrawer from "./subscriptionDrawer/subscriptionDrawer";
import Link from "next/link";
import { useApiServices } from "@/lib/features/api-service/apiServiceSelectors";
import { getApiServiceById } from "@/lib/features/api-service/apiServiceThunks";

export default function ServiceDetailsContentPage({ serviceId }: { serviceId: string }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [planSelected, setSelectedPlan] = useState(undefined);
  const [isHovered, setIsHovered] = useState(false);

  const showDrawer = (plan: any | null) => {
    if (plan !== null) {
      setSelectedPlan(plan);
      dispatch({ type: "SubscriptionStates/updateSubscriptionStates", payload: { "price": plan.price } });
    }
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };
  const t = useI18n();
  const { currentService, serviceLoading, currentServiceError } = useApiServices();
  const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices()
  const dispatch = useAppDispatch();
  const { servicePlanResponse, servicePlanLoading, servicePlanError } = useServicePlan()

  useEffect(() => {
    dispatch(getApiServiceById(serviceId));
    dispatch(fetchServicePlans(serviceId))
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
      <Space direction="vertical" size="large"
        style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}>
        {serviceLoading && currentService === undefined &&
          <>
            <Skeleton.Image active />
            <Skeleton active paragraph={{ rows: 2 }} />

          </>}
        {!serviceLoading && currentService !== undefined &&
          <>
            <Row gutter={16} >
              <Col md={5} xs={24} style={{ display: "flex", justifyContent: "start" }}>
                <Badge
                  count={
                    <Button
                      style={{
                        border: "none",
                        backgroundColor: "#fff",
                        boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                        borderRadius: "50%",
                        padding: 0,
                        width: 40,
                        height: 40,
                        minWidth: 40,
                      }}
                      icon={
                        currentService.is_in_favorite === true ? (
                          <Star size={35} weight="fill" color="#FC3232" />
                        ) : (
                          <Star size={35} color="#7D7D7D" />
                        )
                      }
                      onClick={() => handleFavoriteService(currentService.id)}
                    />
                  }
                  offset={[-20, 20]}
                >
                  <Image
                    alt="Logo"
                    src={imageUrl(currentService?.image_service)}
                    width={220}
                    height={220}
                    preview={false}
                  />
                </Badge>
              </Col>

              {/* Name and Price */}
              <Col md={19} xs={24} style={{ flexDirection: "column", justifyContent: "start" }}>
                <Typography.Title level={3} style={{ marginBottom: 8 }}>
                  {currentService.name}
                </Typography.Title>
                <Typography.Title level={4} style={{ color: theme.token.orange400, margin: 0 }}>
                  {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(currentService.unit_price)} DZD
                </Typography.Title>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 0 }} >
              <Paragraph style={{ fontSize: 14 }} >
                {currentService.short_description}

                {t("viewDocumentation")}&nbsp;
                <Link
                  href={currentService.documentation_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Typography.Title
                    level={5}
                    style={{
                      fontSize: 14,
                      color: theme.token.blue300,
                      textDecoration: isHovered ? "underline" : "none",
                      display: "inline-block",
                      margin: 0
                    }}
                  >
                    {t("documentation")}
                  </Typography.Title>
                </Link>

              </Paragraph>
            </Row>
            <Row gutter={16} key={currentService.id}  >
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (isActive ? <CaretUp /> : <CaretDown />)}
                expandIconPosition="end"
                style={{
                  background: theme.token.darkGray, border: "1px solid",
                  borderColor: theme.token.gray50, width: "100%"
                }}
                items={getItems(currentService, t)}
              />

            </Row>
            <Row gutter={[16, 24]} justify="start">
              <Col span={24}>
                <Typography.Title level={2} style={{ color: theme.token.blue100, fontSize: 24, }}>
                  {t('SelectServicePlan')}
                </Typography.Title>
              </Col>
              {servicePlanLoading && servicePlanResponse?.result === undefined &&
                <Col
                  xs={24}
                  sm={12}
                  md={10}
                  lg={8}
                  xl={8}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card loading={true} style={{ minWidth: 300 }} />
                </Col>
              }
              {!servicePlanLoading && servicePlanResponse?.result !== undefined &&
                <>
                  {servicePlanResponse?.result?.map((row: ServicePlan) => (
                    <Col
                      key={row.id}
                      xs={24}
                      sm={12}
                      md={10}
                      lg={8}
                      xl={8}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {row.plan && (
                        <div style={{ width: "100%", maxWidth: 340 }}>
                          <ServicePlanCard
                            key={row.id}
                            servicePlan={row}
                            showDrawer={() => showDrawer(row)}
                          />
                        </div>
                      )}
                    </Col>

                  ))}
                </>
              }
              {!servicePlanLoading && servicePlanError &&
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <Result
                    status="500"
                    title={t('error')}
                    subTitle={t('subTitleError')}
                  />
                </div>
              }
            </Row>
            <SubscribeDrawer openDrawer={openDrawer} onClose={onClose} planSelected={planSelected} />
          </>
        }

        {!serviceLoading && currentServiceError &&
          <Space direction="vertical" size="large" align="center" >
            <Result
              status="500"
              title={t('error')}
              subTitle={t('subTitleError')}
            />
          </Space>
        }

      </Space>
    </>
  )

}
