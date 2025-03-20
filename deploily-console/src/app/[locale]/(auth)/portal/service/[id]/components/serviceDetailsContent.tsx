"use client";
import { Col, Row, Image, Typography, Collapse, Button, Space, Skeleton, Badge, Card } from "antd";
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
import { theme } from "@/styles/theme";
import { fetchServicePlan } from "@/lib/features/servicePlan/servicePlanThanks";
import { useServicePlan } from "@/lib/features/servicePlan/servicePlanSelector";
import { ServicePlan } from "@/lib/features/servicePlan/servicePlanInterface";
import ServicePlanCard from "./servicePlanCard";
import { useState } from "react";
import SubscriptionDrawer from "./subscriptionDrawer";

export default function ServiceDetailsContentPage({ serviceId }: { serviceId: string }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [planSelected, setSelectedPlan] = useState(undefined);

  const showDrawer = (plan:any) => {
     setSelectedPlan(plan);
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };
  const t = useI18n();
  const { currentService, serviceLoading } = useAllServices();
  const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices()
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { servicePlanResponse, servicePlanLoading } = useServicePlan()
  useEffect(() => {
    dispatch(getApiServiceById(serviceId));
    dispatch(fetchServicePlan(serviceId))
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
      <Space direction="vertical" size="large" style={{ paddingInline: 40, marginBlock: 10, width: "100%"  ,marginBottom:50}}>
        {(serviceLoading || currentService === undefined) ?
          <>
            <Skeleton.Image active />
            <Skeleton active paragraph={{ rows: 2 }} />

          </> :
          <>
            <Row gutter={16}  >
              <Col md={16} xs={24} >
                <Badge
                  count={
                    <Button style={{ border: "none", backgroundColor: "transparent", boxShadow: "none" }}
                      icon={currentService.is_in_favorite == true ?
                        <Star size={40} weight="fill" color="#FC3232" /> :
                        <Star size={40} color="#7D7D7D" />}
                      onClick={() => handleFavoriteService(currentService.id)}
                    />
                  }
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
                display: "flex",
                justifyContent: "end",
                alignSelf: "start"
              }}>
                <Typography.Title level={2} style={{ color: theme.token.orange_6 }}>
                  {currentService.unit_price} DZD
                </Typography.Title>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 0 }} >

              <Typography.Title level={2}>{currentService.name}</Typography.Title>

            </Row>
            <Row gutter={16} style={{ marginTop: 0 }} >
              <Paragraph style={{ fontSize: 14 }} >
                {currentService.short_description}
              </Paragraph>
            </Row>
            <Row gutter={16} key={currentService.id}  >
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (isActive ? <CaretUp /> : <CaretDown />)}
                expandIconPosition="end"
                style={{
                  background: theme.token.darkGray_1, border: "1px solid",
                  borderColor: theme.token.gray_1, width: "100%"
                }}
                items={getItems(currentService, t)}
              />

            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Typography.Title level={2} style={{ color: theme.token.blue_100, fontSize: 24, }}>
                  {t('SelectServicePlan')}
                </Typography.Title>
              </Col>
              {servicePlanLoading || servicePlanResponse?.result === undefined ?
                <Col
                  xs={24}
                  sm={12}
                  md={10}
                  lg={8}
                  xl={8}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card loading={true} style={{ minWidth: 300 }} />
                </Col> :
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
                      <ServicePlanCard key={row.id} servicePlan={row}  showDrawer={() => showDrawer(row)}/>
                     

                    </Col>
                  ))}
                </>
              }
            </Row>
            <SubscriptionDrawer openDrawer={openDrawer} onClose={onClose} planSelected={planSelected}/>
          </>
        }

      </Space>
    </>
  )

}
