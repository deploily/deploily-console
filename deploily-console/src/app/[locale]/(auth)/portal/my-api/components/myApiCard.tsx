import ImageFetcher from "@/lib/utils/imageFetcher";
import { CustomBlueButton } from "@/styles/components/buttonStyle";
import { Faders } from "@phosphor-icons/react";
import { Badge, Card, Col, Row, Space, Tag, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useRouter } from "next/navigation";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import { subscriptionStatusStyle } from "../utils/subscriptionsConst";
import { SubscriptionInterface } from "@/lib/features/subscriptions/subscriptionInterface";
export default function MyApiCard({ data }: { data: SubscriptionInterface }) {
    const tSubscription = useScopedI18n('subscription');

    const t = useI18n();
    const router = useRouter();
    return (
        <Card style={{ height: "100%", width: "100%", padding: 0, cursor: "pointer", position: "relative" }}
            onClick={() => router.push(`/portal/my-api/${data.id}`)}
        >
            <div style={{ height: "300px" }}>
                <Row align="middle" gutter={16} style={{ height: "40%" }} >
                    <Col span={12} style={{ height: "100%", }} >
                        <Badge
                            offset={[-12, 12]}
                        >
                            <ImageFetcher
                                imagePath={data.service_details.image_service}
                                width={100}
                                height={100}
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
                    onClick={() => router.push(`/portal/my-api/${data.id}`)}
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