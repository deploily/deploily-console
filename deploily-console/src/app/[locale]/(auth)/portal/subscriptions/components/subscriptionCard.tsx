import { IMAGES_URL } from "@/deploilyWebsiteUrls";
import { SubscriptionInterface } from "@/lib/features/subscriptions/subscriptionInterface";
import { CustomBlueButton } from "@/styles/components/buttonStyle";
import { Faders, Star } from "@phosphor-icons/react";
import { Badge, Button, Card, Col, Image, Row, Space, Tag, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useRouter } from "next/navigation";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import { subscriptionStatusStyle } from "../utils/subscriptionsConst";
export default function SubscriptionCard({ data }: { data: SubscriptionInterface }) {
    const tSubscription = useScopedI18n('subscription');
    const t = useI18n();
    const router = useRouter();

    const imageUrl = data?.service_details.image_service?.startsWith("http")
        ? data.service_details.image_service
        : data?.service_details.image_service
            ? `${IMAGES_URL}${data.service_details.image_service}`
            : "/images/logo_service.png";
    return (
        <Card style={{ height: "100%", width: "100%", padding: 0, cursor: "pointer", position: "relative" }}
            onClick={() => router.push(`/portal/subscriptions/${data.id}`)}
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
                                    icon={<Star size={25} weight="fill" color="#7D7D7D" />}
                                />
                            }
                            offset={[-12, 12]}
                        >
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
                            display: "flex", justifyContent: "end"
                        }}>
                        <Paragraph style={{ color: "#DD8859", fontSize: 16, }}>
                            {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(data.total_amount)} DZD

                        </Paragraph>
                    </Col>
                </Row>

                <Row style={{ height: "40%" }}>
                    <div>
                        <Row gutter={16} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}>
                            <Paragraph ellipsis={{ rows: 1, expandable: false }} style={{ fontSize: 20, }}>
                                {data.service_details.name}
                            </Paragraph>
                            <Tag bordered={false} color={subscriptionStatusStyle(data.status)} style={{ height: 'fit-content', fontSize: '14px', fontWeight: "bold", borderRadius: 20, padding: "2px 10px", textTransform: "capitalize" }}>
                                {tSubscription(data.status as "active" | "inactive")}
                            </Tag>
                        </Row>
                        <Paragraph ellipsis={{ rows: 3, expandable: false }} style={{ paddingTop: "0px" }}>
                            {data.service_details.short_description}
                        </Paragraph>
                    </div>
                </Row>
            </div>
            <Space
                style={{ position: "absolute", bottom: "20px", right: "20px" }}
            >
                <CustomBlueButton
                    onClick={() => router.push(`/portal/subscriptions/${data.id}`)}
                >
                    <Faders size={20} />
                    <Typography
                        style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            paddingRight: 3
                        }}
                    >
                        {t("setting")}
                    </Typography>
                </CustomBlueButton>
            </Space>
        </Card>
    )
}