"use client";
import { ArrowRight, Star } from "@phosphor-icons/react";
import { Card, Col, Row, Image, Button, Space } from "antd";
import { useI18n } from "../../../../../../../locales/client";
import Paragraph from "antd/es/typography/Paragraph";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hook";
import { deleteFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import { FavoriteServiceInterface } from "@/lib/features/favorites/favoriteServiceInterface";

export default function FavoriteServiceCard({ favoriteService }: { favoriteService: FavoriteServiceInterface }) {
    const t = useI18n();
    const baseURL = `https://admin.deploily.cloud/static/uploads/`;
    const router = useRouter();
    const imageUrl = favoriteService.service.image_service
        ? favoriteService.service.image_service.startsWith("http")
            ? favoriteService.service.image_service
            : `${baseURL}${favoriteService.service.image_service}`
        : "/images/logo_service.png";
    const dispatch = useAppDispatch();
    const handleDeleteFavorite = () => {
        dispatch(deleteFavoriteService(favoriteService.id));
    }
    return (

        <Card style={{ height: "100%", width: "100%" }}>
            <div style={{ height: "300px" }}>
                <Row align="middle" gutter={16} style={{ height: "30%" }} >
                    <Col span={12} style={{ paddingBottom: 10 }}>
                        <Image
                            alt="Logo"
                            src={imageUrl}
                            width={80}
                            height={80}
                            preview={false}
                        />
                    </Col>
                    <Col span={12} style={{
                        color: "#DD8859",
                        fontWeight: "bold",
                        fontSize: "18px",
                        display: "flex",
                        justifyContent: "end",
                        alignSelf: "start"
                    }}>
                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(favoriteService.service.unit_price)} DZD
                    </Col>
                </Row>
                <Row style={{ height: "20%" }}>
                    <Col span={20} >
                        <div>
                            <Paragraph ellipsis={{ rows: 2, expandable: false }} style={{ fontFamily: "Inter, sans-serif", fontSize: "20px" }}>
                                {favoriteService.service.name}
                            </Paragraph>
                        </div>
                    </Col>

                    <Col span={4} style={{ display: "flex", justifyContent: "end" }}>
                        <Button style={{ border: "none", backgroundColor: "transparent", boxShadow: "none" }}
                            icon={<Star size={20} weight="fill" color="#FC3232" />
                            } onClick={() =>
                                handleDeleteFavorite()
                            } />
                    </Col>
                </Row>
                <Row style={{ height: "30%" }}>
                    <div>
                        <Paragraph ellipsis={{ rows: 3, expandable: false }} style={{ paddingTop: "10px" }}>
                            {favoriteService.service.short_description}
                        </Paragraph>
                    </div>
                </Row>
            </div>
            <Space
                style={{ position: "absolute", bottom: "20px", right: "20px" }}
            >
                <Button
                    style={{
                        color: "#fff",
                        backgroundColor: "#D85912",
                        border: "none",
                        padding: "4px",
                    }}
                    onClick={() => router.push(`/portal/service/${favoriteService.service.id}`)}
                >
                    <ArrowRight size={20} style={{ color: "rgba(220, 233, 245, 0.88)" }} />
                    <span
                        style={{
                            color: "rgba(220, 233, 245, 0.88)",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "16px",
                            fontWeight: 600,
                            paddingRight: 3
                        }}
                    >
                        {t("details")}
                    </span>
                </Button>
            </Space>
        </Card>



    );
}
