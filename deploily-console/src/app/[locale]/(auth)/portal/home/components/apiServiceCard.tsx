"use client";
import { ArrowRight, Star } from "@phosphor-icons/react";
import { Card, Col, Row, Image, Button, Space } from "antd";
import { useI18n } from "../../../../../../../locales/client";
import Paragraph from "antd/es/typography/Paragraph";
import { useRouter } from "next/navigation";
import { Admin_URL } from "@/deploilyWebsiteUrls";
import { ApiServiceInterface } from "@/lib/features/apiService/apiServiceInterface";
import { deleteFavoriteService, postFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import { useAppDispatch } from "@/lib/hook";

export default function ApiServiceCard({ service }:{service: ApiServiceInterface}) {
  const t = useI18n();
  const baseURL = Admin_URL; 
  const router = useRouter();
  const imageUrl = service.image_service
    ? service.image_service.startsWith("http")
      ? service.image_service
      : `${baseURL}${service.image_service}`
    : "/images/logo_service.png";
  const dispatch = useAppDispatch();


  const handleFavoriteService=(service_id:number)=>{
if(service.is_favorite){
        dispatch(deleteFavoriteService(service_id));

}else{
  dispatch(postFavoriteService({"service_id":service_id}));
}

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
            {service.unit_price}
          </Col>
        </Row>
        <Row style={{ height: "20%" }}>
          <Col span={20} >
            <div>
              <Paragraph ellipsis={{ rows: 2, expandable: false }} style={{ fontFamily: "Inter, sans-serif", fontSize: "20px"}}>
                {service.name}
              </Paragraph>
            </div>
          </Col>
          <Col span={4} style={{ display: "flex", justifyContent: "end" }}>   
            {service.is_favorite==true?
            <Star size={20} weight="fill" color="#FC3232" />:
            <Star size={20} color="#7D7D7D" />}

            <Button style={{ border: "none", background: "#030303", boxShadow: "none" }}
              icon={service.is_favorite == true ?
                  <Star size={20} weight="fill" color="#FC3232" /> :
                  <Star size={20} color="#7D7D7D" /> } onClick={() => 
                    handleFavoriteService(service.id)
                  } />

          </Col>
        </Row>
        <Row style={{ height: "30%" }}>
          <div>
            <Paragraph ellipsis={{ rows: 3, expandable: false }} style={{paddingTop: "10px" }}>
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
            backgroundColor: "#D85912",
            border: "none",
            padding: "4px",
          }}
          onClick={() => router.push(`/portal/service/${service.id}`)}
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
