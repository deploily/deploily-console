"use client";

import { useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";
import { getManagedResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { ManagedRessourceDetails } from "@/lib/features/resourceServicePlans/resourceServicesPlansInterface";
import { updateSelectedPlan } from "@/lib/features/resourceServicePlans/resourceServicesPlansSlice";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { CaretCircleLeft, CaretCircleRight, Check } from "@phosphor-icons/react";
import { Card, Col, Grid, Row, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import Carousel from 'react-multi-carousel';
import { useScopedI18n } from "../../../../../../../../locales/client";
import { useVpsManagedResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";


interface SelectVpsPlanTableProps {
    onVpsPlanSelect?: (plan: ManagedRessourceDetails) => void;
    applicationId?: any;
    subscriptionCategory?: any;
}

export default function SelectManagedRessourcePlanCard({
    onVpsPlanSelect,
    applicationId,
    subscriptionCategory,
}: SelectVpsPlanTableProps = {}) {
    const dispatch = useAppDispatch();
    const t = useScopedI18n("applications");
    const screens = Grid.useBreakpoint();

   const { vpsManagedResourceResponse } = useVpsManagedResource();
     const { managed_ressource_details } = useNewApplicationSubscription();

    useEffect(() => {
         dispatch(getManagedResources());
    }, [applicationId, subscriptionCategory, dispatch]);

    const handlePlanChange = (selectedKey: string | number) => {
        const foundPlan = vpsManagedResourceResponse?.find(
            (element) => element.id == selectedKey,
        );
        if (foundPlan) {
            dispatch(updateSelectedPlan({
                ...foundPlan,
                isManaged: true,
                isAlreadyPaid: true,
            }));

            // Call the callback if provided
            onVpsPlanSelect?.(foundPlan);
        }
    };

    const selectedId =
        managed_ressource_details && managed_ressource_details.isManaged
            ? managed_ressource_details.id
            : undefined;

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 3500, min: 1600 },
            items: 3,
            partialVisibilityGutter: 0,
        },
        desktop: {
            breakpoint: { max: 1600, min: 1024 },
            items: 3,
            partialVisibilityGutter: 0,
        },
        tablet: {
            breakpoint: { max: 1024, min: 600 },
            items: 2,
            partialVisibilityGutter: 40,
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1,
            partialVisibilityGutter: 40,
        },
    };

    const partialVisible = !screens.xl;
    const carouselRef = useRef<any>(null);
    const [hoverLeft, setHoverLeft] = useState(false);
    const [hoverRight, setHoverRight] = useState(false);
    const [canGoPrev, setCanGoPrev] = useState(false);
    const [canGoNext, setCanGoNext] = useState(true);

    const getMaxSlide = () => {
        const count = vpsManagedResourceResponse?.length ?? 0;
        if (screens.xl) return count - 3;
        if (screens.lg) return count - 3;
        if (screens.md) return count - 2;
        return count - 1;
    };

    return (
        <div style={{ padding: 20, backgroundColor: theme.token.darkGray, borderRadius: 16 }}>
            {vpsManagedResourceResponse && vpsManagedResourceResponse.length > 0 && (
                <Carousel
                    responsive={responsive}
                    arrows={false}
                    infinite={false}
                    partialVisible={partialVisible}
                    containerClass="plans-carousel"
                    itemClass="carousel-item-padding-0-px"
                    showDots={false}
                    ref={carouselRef}
                    afterChange={(previousSlide, { currentSlide }) => {
                        const max = getMaxSlide();
                        setCanGoPrev(currentSlide > 0);
                        setCanGoNext(currentSlide < max);
                    }}
                >
                    {vpsManagedResourceResponse.map((plan) => {
                        const isSelected = selectedId === plan.id;

                        return (
                            <div key={plan.id} className="plan-card-wrapper" style={{ padding: "0 10px", height: "100%" }}>
                                <Card
                                    hoverable
                                    onClick={() => handlePlanChange(plan.id)}
                                    style={{
                                        borderRadius: 12,
                                        cursor: "pointer",
                                        border: isSelected
                                            ? `2px solid ${theme.token.colorPrimary}`
                                            : "2px solid #333",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    actions={[
                                        <div key="preparation_time" style={{ marginTop: "12px" }}>
                                            <Typography.Text style={{ color: "#bbb" }}>
                                                {t("preparation_time")}: {plan.preparation_time} {t("hours")}
                                            </Typography.Text>
                                        </div>
                                    ]}
                                    title={
                                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                            <Row style={{ display: "flex", alignItems: "center", flexWrap: "nowrap", width: "100%" }}>
                                                <div style={{ width: 40, height: 40, marginRight: 8, flexShrink: 0 }}>
                                                    <ImageFetcher
                                                        imagePath={plan.provider_info?.logo}
                                                        width={40}
                                                        height={40}
                                                    />
                                                </div>
                                                <Col style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                                                    {plan.isManaged && (
                                                        <span
                                                            style={{
                                                                color: theme.token.colorSuccess,
                                                                fontWeight: "bold",
                                                                marginRight: 4,
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            {t("managed")}
                                                        </span>
                                                    )}
                                                    <span>{`${plan.provider_info?.name || ""} / ${plan.plan_name}`}</span>
                                                </Col>
                                            </Row>
                                        </div>
                                    }
                                >
                                    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                        <div style={{ marginTop: 3, marginBottom: 8, textAlign: "center" }}>
                                            <Typography.Title level={4} style={{ margin: 0, color: "white" }}>
                                                {plan.price?.toLocaleString()} DZD
                                            </Typography.Title>
                                        </div>

                                        {Array.isArray(plan.options)
                                            ? plan.options
                                                .filter((o: any) =>
                                                    ["ram", "cpu", "disque"].includes(o.option_type)
                                                )
                                                .map((row: any) => (
                                                    <Row gutter={16} key={row.id} align="middle">
                                                        <Col span={3}>
                                                            {row.icon ? row.icon : <Check size={24} color={theme.token.gray100} />}
                                                        </Col>
                                                        <Col span={21}>
                                                            <Typography.Paragraph
                                                                style={{
                                                                    fontSize: 16,
                                                                    color: "white",
                                                                    margin: 0,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    minHeight: 24,
                                                                }}
                                                            >
                                                                {row.html_content}
                                                            </Typography.Paragraph>
                                                        </Col>
                                                    </Row>
                                                ))
                                            : null
                                        }
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </Carousel>
            )}

            <div style={{ display: 'flex', justifyContent: "space-between", marginTop: 15 }}>
                {canGoPrev ? (
                    <CaretCircleLeft
                        size={32}
                        weight="bold"
                        color={hoverLeft ? theme.token.colorPrimary : "#666"}
                        onMouseEnter={() => setHoverLeft(true)}
                        onMouseLeave={() => setHoverLeft(false)}
                        onClick={() => carouselRef.current?.previous()}
                        style={{ cursor: "pointer", transition: "0.25s" }}
                    />
                ) : <div />}

                {canGoNext ? (
                    <CaretCircleRight
                        size={32}
                        weight="bold"
                        color={hoverRight ? theme.token.colorPrimary : "#666"}
                        onMouseEnter={() => setHoverRight(true)}
                        onMouseLeave={() => setHoverRight(false)}
                        onClick={() => carouselRef.current?.next()}
                        style={{ cursor: "pointer", transition: "0.25s" }}
                    />
                ) : <div />}
            </div>
        </div>
    );
}