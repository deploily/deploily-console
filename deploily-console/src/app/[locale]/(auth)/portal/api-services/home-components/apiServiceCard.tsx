"use client";
import { ApiServiceInterface } from "@/lib/features/api-service/apiServiceInterface";
import { postFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { ArrowRight, Star } from "@phosphor-icons/react";
import { Badge, Button, Card, Col, Row, Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useI18n } from "../../../../../../../locales/client";

export default function ApiServiceCard({ service }: { service: ApiServiceInterface }) {
  const t = useI18n();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [hovered, setHovered] = useState(false);


  const handleFavoriteService = (service_id: number) => {
    dispatch(postFavoriteService({ "service_id": service_id }));
  }
  return (
    <Card
      style={{
        height: "100%",
        width: "100%",
        padding: 0,
        cursor: "pointer",
      }}
      onClick={() => router.push(`/portal/api-services/${service.id}`)}
    >
      <div style={{ height: "300px" }}>
        <Row align="middle" gutter={16} style={{ height: "40%" }} >
          <Col span={12} style={{ height: "100%", }} >
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
                    minWidth: 24
                  }}
                  icon={
                    service.is_in_favorite === true ?
                      <Star size={20} weight="fill" color="#FC3232" /> :
                      <Star size={20} weight="fill" color="#7D7D7D" />
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteService(service.id);
                  }}
                />
              }
              offset={[-12, 12]}
            >
              <ImageFetcher
                imagePath={service.image_service}

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
              {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(service.unit_price)} DZD
            </Paragraph>
          </Col>
        </Row>

        <Row style={{ height: "40%" }}>
          <div>
            <Paragraph ellipsis={{ rows: 2, expandable: false }} style={{ fontSize: 20, }}>
              {service.name}
            </Paragraph>
            <Paragraph ellipsis={{ rows: 3, expandable: false }} style={{ paddingTop: "0px" }}>
              {service.short_description}
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
            border: "none",
            padding: "4px",
            boxShadow: "none",
            background: "transparent",
            display: "flex",
            alignItems: "center",
          }}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/portal/api-services/${service.id}`);
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
