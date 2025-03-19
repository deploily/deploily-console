import { SubscribeInterface } from "@/lib/features/subscribe/subscribeInterface";
import { IMAGES_URL } from "@/deploilyWebsiteUrls";
import { useI18n } from "../../../../../../../locales/client";
import { useRouter } from "next/navigation";
import { Badge, Button, Card, Col, Image, Row, Space } from "antd";
import { Faders, Star } from "@phosphor-icons/react";
import Paragraph from "antd/es/typography/Paragraph";
export default function MyServiceCard({ data }: { data: SubscribeInterface }) {

    const t = useI18n();
    const router = useRouter();

    const imageUrl = data?.service_details.image_service?.startsWith("http")
        ? data.service_details.image_service
        : data?.service_details.image_service
            ? `${IMAGES_URL}${data.service_details.image_service}`
            : "/images/logo_service.png";
    return (
        <Card style={{ height: "100%", width: "100%", padding: 0 }}>
            <div style={{ height: "300px" }}>
                <Row align="middle" gutter={16} style={{ height: "40%" }} >
                    <Col span={12} style={{ height: "100%", }} >
                        <Badge count={<Button style={{ border: "none", backgroundColor: "transparent", boxShadow: "none" }}
                            icon={<Star size={25} weight="fill" color="#7D7D7D" />} />}
                            offset={[-12, 12]}>

                            <Image
                                alt="Logo"
                                src={imageUrl}
                                width={100}
                                height={100}
                                preview={false}
                            />
                        </Badge>
                    </Col>
                    <Col span={12}
                        style={{
                            height: "100%",
                            fontWeight: "bold",
                            display:"flex", justifyContent:"end"
                        }}>
                        <Paragraph style={{ color: "#DD8859", fontSize: 16, }}>
                            {data.total_amount} DZD
                        </Paragraph>
                    </Col>
                </Row>

                <Row style={{ height: "40%" }}>
                    <div>
                        <Paragraph ellipsis={{ rows: 2, expandable: false }} style={{ fontSize: 20, }}>
                            {data.service_details.name}
                        </Paragraph>
                        <Paragraph ellipsis={{ rows: 3, expandable: false }} style={{ paddingTop: "0px" }}>
                            {data.service_details.short_description}
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
                        backgroundColor: "#5394CC",
                        border: "none",
                        padding: "4px 8px",
                    }}
                    onClick={() => router.push(`/portal/service/${data.id}`)}
                >
                    <Faders size={20} style={{ color: "rgba(220, 233, 245, 0.88)" }} />
                    <span
                        style={{
                            color: "rgba(220, 233, 245, 0.88)",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "16px",
                            fontWeight: 600,
                            paddingRight: 3
                        }}
                    >
                        {t("settings")}
                    </span>
                </Button>
            </Space>
        </Card>
    )
}