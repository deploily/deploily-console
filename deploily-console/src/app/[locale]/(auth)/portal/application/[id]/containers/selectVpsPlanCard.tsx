"use client";

import { useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";
import { useManagedResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { getManagedResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { ManagedRessourceDetails } from "@/lib/features/resourceServicePlans/resourceServicesPlansInterface";
import { useServicePlansByType } from "@/lib/features/resourceServicePlans/resourceServicesPlansSelectors";
import { updateSelectedPlan } from "@/lib/features/resourceServicePlans/resourceServicesPlansSlice";
import { fetchResourceServicesPlans } from "@/lib/features/resourceServicePlans/resourceServicesPlansThunk";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { CaretCircleLeft, CaretCircleRight, Check } from "@phosphor-icons/react";
import { Card, Col, Grid, Row, Typography } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import Carousel from 'react-multi-carousel';
import { useScopedI18n } from "../../../../../../../../locales/client";


interface SelectVpsPlanTableProps {
    onVpsPlanSelect?: (plan: ManagedRessourceDetails) => void;
    selectedVpsPlan?: ManagedRessourceDetails | null;
    applicationId?: any;
    subscriptionCategory?: any;
}

const getPlanKey = (plan: any) =>
    `${plan.isManaged ? "managed" : "service"}-${plan.id}`;

export default function SelectVpsPlanCard({
    onVpsPlanSelect,
    selectedVpsPlan,
    applicationId,
    subscriptionCategory,
}: SelectVpsPlanTableProps = {}) {
    const dispatch = useAppDispatch();
    const t = useScopedI18n("applications");
    const screens = Grid.useBreakpoint();
    const { servicePlansList } = useServicePlansByType();
    const { managedResourceResponse } = useManagedResource();
    const { managed_ressource_details } = useNewApplicationSubscription();

    // Local selected key for instant visual feedback
    const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);

    useEffect(() => {
        dispatch(fetchResourceServicesPlans({ serviceId: applicationId, subscriptionCategory }));
        dispatch(getManagedResources());
    }, [applicationId, subscriptionCategory]);

    const allPlans = useMemo(() => {
        const managed =
            (managedResourceResponse || []).map((p) => ({
                ...p,
                isManaged: true,
                isAlreadyPaid: true,
            })) || [];

        const service =
            (servicePlansList?.result || []).map((p) => ({
                ...p,
                isManaged: false,
                isAlreadyPaid: false,
            })) || [];

        return [...managed, ...service];
    }, [managedResourceResponse, servicePlansList]);

    // Sync local state ONLY when external prop changes and local state is not set yet
    // (e.g. on initial load or when parent resets selection)
    useEffect(() => {
        if (selectedVpsPlan) {
            setSelectedKey(getPlanKey({ ...selectedVpsPlan }));
        } else if (managed_ressource_details) {
            setSelectedKey(`managed-${managed_ressource_details.id}`);
        }
    }, []); // run only on mount for initial value

    // If parent explicitly changes selectedVpsPlan after mount, sync it
    useEffect(() => {
        if (selectedVpsPlan) {
            setSelectedKey(getPlanKey({ ...selectedVpsPlan }));
        }
    }, [selectedVpsPlan?.id]);

    const handleSelect = (plan: any) => {
        // Set immediately — no waiting for parent or redux
        setSelectedKey(getPlanKey(plan));
        dispatch(updateSelectedPlan(plan));
        onVpsPlanSelect?.(plan);
    };

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
        if (screens.xl) return allPlans.length - 3;
        if (screens.lg) return allPlans.length - 3;
        if (screens.md) return allPlans.length - 2;
        return allPlans.length - 1;
    };

    return (
        <div style={{ padding: 20, backgroundColor: theme.token.darkGray, borderRadius: 16 }}>
            {allPlans.length > 0 && (
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
                    {allPlans.map((plan) => {
                        const key = getPlanKey(plan);
                        const isSelected = selectedKey === key;

                        return (
                            <div key={plan.id} className="plan-card-wrapper" style={{
                                padding: "0 10px", height: "100%",
                            }}>
                                <Card
                                    hoverable
                                    onClick={() => handleSelect(plan)}
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
                                        <div key={"preparation_time"} style={{ marginTop: "12px" }}>
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
                                                    {!plan.isManaged && (
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
                                            {plan.isManaged && plan.isAlreadyPaid ? (
                                                <Typography.Text style={{ color: "#777" }}>—</Typography.Text>
                                            ) : (
                                                <Typography.Title level={4} style={{ margin: 0, color: "white" }}>
                                                    {plan.price?.toLocaleString()} DZD
                                                </Typography.Title>
                                            )}
                                        </div>

                                        {Array.isArray(plan.options)
                                            ? plan.options
                                                .filter((o: any) =>
                                                    ["ram", "cpu", "disque"].includes(o.option_type)
                                                ).map((row: any) => (
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
                                                )) : null
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
                ) : <div></div>}

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
                ) : <div></div>}
            </div>
        </div>
    );
}