"use client";

import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { ArrowRight, HeartStraight } from "@phosphor-icons/react";
import { Badge, Button, Card, Col, Row, Space } from "antd";
import { useRouter } from "next/navigation";
import { useI18n } from "../../../../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { postFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import Paragraph from "antd/es/typography/Paragraph";

export default function ApplicationServiceCard({ data }: any) {
    const t = useI18n();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleFavoriteService = (service_id: number) => {
        dispatch(postFavoriteService({ service_id }));
    };
    return (
        <Card
            hoverable
            style={{
                minWidth: 250,
                maxWidth: 270,
                height: 350,
            }}
            bodyStyle={{ padding: 16, height: "100%" }}
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
                                    icon={data.is_in_favorite ? (
                                        <HeartStraight size={20} weight="fill" color="#FC3232" />
                                    ) : (
                                        <HeartStraight size={20} weight="fill" color="#7D7D7D" />
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFavoriteService(data.id);
                                    }}
                                />
                            }
                            offset={[-12, 12]}
                        >
                            <ImageFetcher
                                imagePath={data.image_service}
                                width={100}
                                height={100}
                            />
                        </Badge>
                    </Col>

                    <Col
                        span={12}
                        style={{
                            height: "100%",
                            fontWeight: "bold",

                            justifyContent: "end",
                            display: "flex",
                        }}
                    >
                        <Paragraph style={{ color: "#DD8859", fontSize: 16, margin: 0 }}>
                            {Intl.NumberFormat("fr-FR", {
                                useGrouping: true,
                            }).format(data.unit_price)}{" "}
                            DZD
                        </Paragraph>
                    </Col>

                </Row>

                {/* Title & Description */}
                <Row style={{ height: "40%" }}>
                    <Col span={24}>
                        <Paragraph
                            ellipsis={{ rows: 2 }}
                            style={{ fontSize: 20, marginBottom: 0 }}
                        >
                            {data.name}
                        </Paragraph>
                        <Paragraph ellipsis={{ rows: 3 }} style={{ margin: 0 }}>
                            {data.short_description}
                        </Paragraph>
                    </Col>
                </Row>
            </div>

            {/* Details Button */}
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
                        router.push(`/portal/application/${data.id}`);
                    }}
                >
                    <span
                        style={{
                            color: theme.token.gray200,
                            fontSize: 16,
                            fontWeight: 600,
                            paddingRight: 4,
                            transition: "color 0.3s ease",

                        }}
                    >
                        {/* //TODO ADD TRANSLATION */}
                        {t("details")}

                    </span>
                    <ArrowRight
                        size={20}
                        style={{
                            color: theme.token.gray200,
                            transition: "color 0.3s ease",
                        }}
                    />
                </Button>
            </Space>
        </Card>
    );
}
