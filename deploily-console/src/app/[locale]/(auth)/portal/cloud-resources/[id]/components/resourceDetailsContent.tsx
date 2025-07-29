"use client";

import { useCloudResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { getResourceById } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";
import { postFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import { ServicePlan } from "@/lib/features/service-plans/servicePlanInterface";
import { useServicePlan } from "@/lib/features/service-plans/servicePlanSelector";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { HomeOutlined } from '@ant-design/icons';
import { CaretDown, CaretUp, HeartStraight } from "@phosphor-icons/react";
import { Badge, Button, Card, Col, Collapse, Result, Row, Skeleton, Space, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "../../../../../../../../locales/client";
import AffiliationDrawer from "./affilitationDrawer";
import { getResourceItems } from "./getResourceItems";
import RessourcePlanCard from "./ressourcePlanCard";


export default function ResourceDetailsContentPage({ resource_id }: { resource_id: string }) {
    const dispatch = useAppDispatch();
    const t = useI18n();
    const [isHovered, setIsHovered] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [planSelected, setSelectedPlan] = useState(undefined);
    const { currentResource, isLoading, cloudResourceLoadingError } = useCloudResource();
    const { servicePlanResponse, servicePlanLoading, servicePlanError } = useServicePlan();
    const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices();
    const [hover, setHover] = useState(false);
    const router = useRouter();
    const [fromPage, setFromPage] = useState<"seeAll" | "home" | null>(null);



    const handleFavoriteService = (resource_id: number) => {
        dispatch(postFavoriteService({ "service_id": resource_id }));
    }

    useEffect(() => {
        dispatch(getResourceById(resource_id));
        dispatch(fetchServicePlans(resource_id));
    }, [dispatch, resource_id, favoriteServiceAdded, favoriteServiceDeleted]);

    const showDrawer = (plan: any | null) => {
        if (plan !== null) {
            setSelectedPlan(plan);//TODO CHECK THIS 
            dispatch({ type: "ApiServiceSubscriptionStates/updateApiServiceSubscriptionStates", payload: { "price": plan.price } });
        }
        setOpenDrawer(true);
    };
    const onClose = () => {
        setOpenDrawer(false);
    };

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
                                        t("cloudResources")
                                    )}
                                </span> / {"\t"}
                                {currentResource !== undefined && currentResource.name}
                            </span>
                        </Col>
                    </Row>
                </Col>
                {isLoading && currentResource === undefined &&
                    <>
                        <Skeleton.Image active />
                        <Skeleton active paragraph={{ rows: 2 }} />

                    </>}
                {!isLoading && currentResource !== undefined &&
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
                                                currentResource.is_in_favorite === true ? (
                                                    <HeartStraight size={35} weight="fill" color="#FC3232" />
                                                ) : (
                                                    <HeartStraight size={35} color="#7D7D7D" />
                                                )
                                            }
                                            onClick={() => handleFavoriteService(currentResource.id)}
                                        />
                                    }
                                    offset={[-20, 20]}
                                >
                                    <ImageFetcher
                                        imagePath={currentResource?.image_service}
                                        width={220}
                                        height={220}
                                    />
                                </Badge>
                            </Col>

                            {/* Name and Price */}
                            <Col style={{ flexDirection: "column", justifyContent: "start" }}>
                                <Typography.Title level={3} style={{ marginBottom: 8 }}>
                                    {currentResource.name}
                                </Typography.Title>
                                <Typography.Title level={4} style={{ color: theme.token.orange400, margin: 0 }}>
                                    {currentResource.unit_price !== undefined ? ((Intl.NumberFormat('fr-FR', { useGrouping: true }).format(currentResource.unit_price) )+ " DZD " + " / " + (currentResource.price_category == "monthly" ? t("month") : t("year")) ): t('affiliation.onDemand')}

                                </Typography.Title>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ marginTop: 0 }} >
                            <Paragraph style={{ fontSize: 14 }} >
                                {currentResource.short_description}
                                {t("viewDocumentation")}&nbsp;
                                <Link
                                    href={currentResource.documentation_url}
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
                        <Row gutter={16} key={currentResource.id}  >
                            <Collapse
                                bordered={false}
                                defaultActiveKey={["1"]}
                                expandIcon={({ isActive }) => (isActive ? <CaretUp /> : <CaretDown />)}
                                expandIconPosition="end"
                                style={{
                                    background: theme.token.darkGray, border: "1px solid",
                                    borderColor: theme.token.gray50, width: "100%"
                                }}
                                items={getResourceItems(currentResource, t)}
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
                                            {row.plan && (
                                                <div style={{
                                                    width: "100%",
                                                    maxWidth: 350,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}>
                                                    <RessourcePlanCard
                                                        key={row.id}
                                                        resourcePlan={row}
                                                        currentResource={currentResource}
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
                            }</Row>
                        <AffiliationDrawer openDrawer={openDrawer} onClose={onClose} planSelected={planSelected} currentResource={currentResource} />
                    </>
                }
                {!isLoading && cloudResourceLoadingError &&
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