"use client";
import { FavoriteServiceInterface } from "@/lib/features/favorites/favoriteServiceInterface";
import { deleteFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { ArrowRight, HeartStraight } from "@phosphor-icons/react";
import { Badge, Button, Card, Col, Row, Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useI18n } from "../../../../../../../locales/client";

export default function FavoriteServiceCard({ favoriteService }: { favoriteService: FavoriteServiceInterface }) {
    const t = useI18n();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [hovered, setHovered] = useState(false);



    const handleDeleteFavorite = () => {
        dispatch(deleteFavoriteService(favoriteService.id));
    };

    return (
        <Card style={{
            height: "100%", width: "100%", padding: 0, cursor: "pointer"
        }}
            onClick={() => router.push(`/portal/api-services/${favoriteService.service.id}`)} >
            <div style={{ height: "300px" }}>
                <Row align="middle" gutter={16} style={{ height: "40%" }}>
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
                                    icon={<HeartStraight size={20} weight="fill" color="#FC3232" />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteFavorite();
                                    }}
                                />
                            }
                            offset={[-12, 12]}
                        >
                            <ImageFetcher
                                imagePath={favoriteService.service.image_service}
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
                            alignItems: "start",
                        }}
                    >
                        <Paragraph style={{ color: theme.token.orange400, fontSize: 16 }}>
                            {Intl.NumberFormat("fr-FR", { useGrouping: true }).format(favoriteService.service.unit_price)} DZD
                        </Paragraph>
                    </Col>
                </Row>

                <Row style={{ height: "40%" }}>
                    <Col span={24}>
                        <Paragraph ellipsis={{ rows: 2 }} style={{ fontSize: 20 }}>
                            {favoriteService.service.name}
                        </Paragraph>
                        <Paragraph ellipsis={{ rows: 3 }} style={{ paddingTop: 0 }}>
                            {favoriteService.service.short_description}
                        </Paragraph>
                    </Col>
                </Row>
            </div>

            <Space
                style={{ position: "absolute", bottom: "20px", right: "20px" }}
            >
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
                        router.push(`/portal/api-services/${favoriteService.service.id}`);
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
