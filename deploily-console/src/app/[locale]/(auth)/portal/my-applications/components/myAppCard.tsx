import ImageFetcher from "@/lib/utils/imageFetcher";
import { CustomBlueButton } from "@/styles/components/buttonStyle";
import { Faders, HeartStraight } from "@phosphor-icons/react";
import { Badge, Button, Card, Col, Row, Space, Tag, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useRouter } from "next/navigation";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import { myApplicationInterface } from "@/lib/features/my-applications/myApplicationInterface";
import { myApplicationsUrls } from "../utils/myApplicationsUrls";
import { subscriptionStatusStyle } from "../../my-api/utils/subscriptionsConst";
export default function MyAppCard({ data }: { data: myApplicationInterface }) {
    const t = useI18n();
    const tSubscription = useScopedI18n("subscription");
    const router = useRouter();

    const handleClick = async (service_slug: string) => {
        
        router.push(`/portal/my-applications/${myApplicationsUrls(service_slug)}/${data.id}`)

    }

    return (
        <Card style={{ height: "100%", width: "100%", padding: 0, cursor: "pointer", position: "relative" }}
            onClick={() => handleClick(data.service_details.service_slug)}
        >
            <div style={{ height: "300px" }}>
                <Row align="middle" gutter={16} style={{ height: "40%" }} >
                    <Col span={12} style={{ height: "100%", }} >
                        {/* <Badge
                            offset={[-12, 12]}
                        >
                            <ImageFetcher
                                imagePath={data.image_service}
                                width={100}
                                height={100}
                            />
                        </Badge> */}
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
                                        data.is_in_favorite ? (
                                            <HeartStraight size={20} weight="fill" color="#FC3232" />
                                        ) : (
                                            <HeartStraight size={20} weight="fill" color="#7D7D7D" />
                                        )
                                    }
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // handleFavoriteService(service.id);
                                    }}
                                />
                            }
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
                            {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(data.price)} DZD / {data.service_plan.subscription_category === "monthly" ? t("month") : t("year")}

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
                                {data.name}
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
                    onClick={() => handleClick(data.service_details.service_slug)}
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