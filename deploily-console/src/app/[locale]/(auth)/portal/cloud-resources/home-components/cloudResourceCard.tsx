"use client";

import { postFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { ArrowRight, Star } from "@phosphor-icons/react";
import { Badge, Button, Card, Col, Row, Space } from "antd";
import Meta from "antd/es/card/Meta";
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
                position: "relative",

                height: "100%",
                width: "100%",
                padding: 0,
                cursor: "default",
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
                                            <Star size={20} weight="fill" color="#FC3232" /> :
                                            <Star size={20} weight="fill" color="#7D7D7D" />
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

                    <Col
                        span={12}
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                        }}
                    >
                        <p
                            style={{
                                color: "#DD8859",
                                fontWeight: "bold",
                                fontSize: 18,
                                margin: 0,
                                alignSelf: "flex-start", // ensures it's pinned to top within Col
                            }}
                        >
                            {resource.unit_price}
                        </p>
                    </Col>
                </Row>
                {/* Title & Description */}
                <Row style={{ height: "40%" }}>
                    <Col span={24}>
                        <Meta
                            title={
                                <p
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 500,
                                        marginBottom: 4,
                                        paddingTop: 12,
                                    }}
                                >
                                    {resource.name}
                                </p>
                            }
                            description={
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "#fff",
                                        marginBottom: 0,
                                    }}
                                >
                                    {resource.description}
                                </p>
                            }
                        />
                    </Col>
                </Row>
            </div>

            <Space style={{ position: "absolute", bottom: 16, right: 16 }}>
                <Button
                    style={{
                        color: "#fff",
                        border: "none",
                        padding: 4,
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
                            fontSize: 16,
                            fontWeight: 600,
                            paddingRight: 4,
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
