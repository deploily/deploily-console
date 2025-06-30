"use client";
import { useAppDispatch } from "@/lib/hook";
import { CaretDown, CaretUp, HeartStraight } from "@phosphor-icons/react";
import { Badge, Button, Card, Col, Collapse, Result, Row, Skeleton, Space, Typography } from "antd";
import { useEffect } from "react";
import { useI18n } from "../../../../../../../../locales/client";
import { getItems } from "./getItems";
// import { useRouter } from "next/navigation";
import { useApiServices } from "@/lib/features/api-service/apiServiceSelectors";
import { getApiServiceById } from "@/lib/features/api-service/apiServiceThunks";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";
import { postFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import { ServicePlan } from "@/lib/features/service-plans/servicePlanInterface";
import { useServicePlan } from "@/lib/features/service-plans/servicePlanSelector";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { HomeOutlined } from '@ant-design/icons';
import Paragraph from "antd/es/typography/Paragraph";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ServicePlanCard from "./servicePlanCard";
import ApiServiceSubscriptionDrawer from "./apiServiceSubscriptionDrawer/apiServiceSubscriptionDrawer";

export default function ServiceDetailsContentPage({ serviceId }: { serviceId: string }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [planSelected, setSelectedPlan] = useState(undefined);
  const [isHovered, setIsHovered] = useState(false);
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const [fromPage, setFromPage] = useState<"seeAll" | "home" | null>(null);


  const showDrawer = (plan: any | null) => {
    if (plan !== null) {
      setSelectedPlan(plan);
      dispatch({ type: "ApiServiceSubscriptionStates/updateApiServiceSubscriptionStates", payload: { "price": plan.price } });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteServiceAdded, favoriteServiceDeleted]);



  const handleFavoriteService = (service_id: number) => {
    dispatch(postFavoriteService({ "service_id": service_id }));
  }
  useEffect(() => {
    const storedFrom = sessionStorage.getItem("fromPage");

    if (storedFrom === "home" || storedFrom === "seeAll") {
      setFromPage(storedFrom);
    }
  }, []);
  return (
    <>
      <Space direction="vertical" size="large"
        style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Row>
            <Col span={24} style={{ marginBottom: 12 }}>
              <span style={{ color: "white", fontSize: "24px", fontWeight: 800, }}>

                <span
                  style={{ cursor: "pointer", color: hover ? "orange" : "white" }}
                  onClick={() => router.back()}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  {fromPage === "home" ? (
                    <HomeOutlined style={{ marginRight: 4 }} />
                  ) : (
                    t("APIService")
                  )}
                </span>  / {"\t"}
                {currentService !== undefined && currentService.name}
              </span>


            </Col>
          </Row>
        </Col>
        {serviceLoading && currentService === undefined &&
          <>
            <Skeleton.Image active />
            <Skeleton active paragraph={{ rows: 2 }} />

          </>}
        {!serviceLoading && currentService !== undefined &&
          <>
            <Row gutter={[16, 24]}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
              }} >
              <Col style={{ display: "flex", justifyContent: "start" }}>
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
                          <HeartStraight size={35} weight="fill" color="#FC3232" />
                        ) : (
                          <HeartStraight size={35} color="#7D7D7D" />
                        )
                      }
                      onClick={() => handleFavoriteService(currentService.id)}
                    />
                  }
                  offset={[-20, 20]}
                >
                  <ImageFetcher
                    imagePath={currentService?.image_service}
                    width={220}
                    height={220}
                  />
                </Badge>
              </Col>

              {/* Name and Price */}
              <Col style={{ flexDirection: "column", justifyContent: "start" }}>
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
                      xs={24} sm={24} md={12} lg={10} xl={8} xxl={6}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "0.5rem",
                      }}
                    >
                      <div style={{ width: "100%", display: "flex", justifyContent: "center", maxWidth: 350, }}>
                        <ServicePlanCard
                          servicePlan={row}
                          showDrawer={() => showDrawer(row)}
                        /></div>
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
          <ApiServiceSubscriptionDrawer openDrawer={openDrawer} onClose={onClose} planSelected={planSelected} />
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
