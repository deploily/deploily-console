"use client";

import { postFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { ArrowRight, HeartStraight } from "@phosphor-icons/react";
import { Badge, Button, Card, Col, Row, Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useI18n } from "../../../../../../../locales/client";

export default function CloudResourceCard({ resource }: any) {
    const t = useI18n();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [hovered, setHovered] = useState(false);
    const handleFavoriteService = (resource_id: number) => {
        dispatch(postFavoriteService({ "service_id": resource_id }));
    }
    return (
        <Card
            hoverable
            style={{
                minWidth: 250,
                maxWidth: 270,
                height: 350,
            }}
            bodyStyle={{ padding: 16, height: "100%" }}
            onClick={() => {
                router.push(`/portal/cloud-resources/${resource.id}`);
            }}
        >
            <div style={{ height: "280px" }}>
                {/* Header */}
                <Row align="top" justify="space-between" gutter={16} style={{ height: "40%" }}>
                    <Col span={12}>
                        <Badge
                            count={
                                <Button
                                    style={{
                                        border: "none",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                                        borderRadius: "50%",
                                        padding: 0,
                                        width: 24,
                                        height: 24,
                                        minWidth: 24,
                                    }}
                                    icon={
                                        resource.is_in_favorite === true ?
                                            <HeartStraight size={20} weight="fill" color="#FC3232" /> :
                                            <HeartStraight size={20} weight="fill" color="#7D7D7D" />
                                    }
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFavoriteService(resource.id);
                                    }}
                                />
                            }
                            offset={[-12, 12]}
                        >
                            <ImageFetcher
                                imagePath={resource.image_service}

                                width={100}
                                height={100}
                            />
                        </Badge>
                    </Col>

                    <Col span={12}
                        style={{
                            height: "100%",
                            fontWeight: "bold",

                            justifyContent: "end",
                            display: "flex",
                        }}>
                        <Paragraph style={{ color: "#DD8859", fontSize: 16, }}>
                            {resource.unit_price != undefined ? (Intl.NumberFormat('fr-FR', { useGrouping: true }).format(resource.unit_price) + " DZD") : t('affiliation.onDemand')}
                        </Paragraph>
                    </Col>
                </Row>
                <Row style={{ height: "40%" }}>
                    <div>
                        <Paragraph ellipsis={{ rows: 2, expandable: false }} style={{ fontSize: 20, }}>
                            {resource.name}
                        </Paragraph>
                        <Paragraph ellipsis={{ rows: 3, expandable: false }} style={{ paddingTop: "0px" }}>
                            {resource.short_description}
                        </Paragraph>
                    </div>
                </Row>
            </div>

            <Space style={{ position: "absolute", bottom: 16, right: 16 }}>
                <Button
                    style={{
                        color: "#fff",
                        border: "none",
                        padding: "4px",
                        boxShadow: "none",
                        background: "transparent",
                        display: "flex",
                        alignItems: "center",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/portal/cloud-resources/${resource.id}`);
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <span
                        style={{
                            color: hovered ? theme.token.colorPrimary : theme.token.gray200,
                            fontSize: "16px",
                            fontWeight: 600,
                            paddingRight: 3,
                            transition: "color 0.3s ease",
                        }}
                    >
                        {t("details")}
                    </span>
                    <ArrowRight
                        size={20}
                        style={{
                            color: hovered ? theme.token.colorPrimary : theme.token.gray200,
                            transition: "color 0.3s ease",
                        }}
                    />
                </Button>
            </Space>
        </Card>
    );
}
