import { useSubscription } from "@/lib/features/subscriptions/subscriptionSelectors";
import { fetchSubscriptionById } from "@/lib/features/subscriptions/subscriptionThunks";
import { useAppDispatch } from "@/lib/hook";
import { CalendarDots, Star } from "@phosphor-icons/react";
import { Badge, Button, Col, Image, Result, Row, Skeleton, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { IMAGES_URL } from "@/deploilyWebsiteUrls";
import { theme } from "@/styles/theme";
import Paragraph from "antd/es/typography/Paragraph";
import dayjs from "dayjs";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { DatePickerStyle } from "@/styles/components/datePickerStyle";
import { CustomErrorButton, CustomTransparentOrangeButton } from "@/styles/components/buttonStyle";
import { CustomSubscripionInput } from "@/styles/components/inputStyle";

import DocumentationDrawer from "./documentationDrawer";
import Link from "next/link";
import { subscriptionItems } from "./subscriptionItems";
import GenerateTokenComponent from "./generateTokenComponent";

export default function SubscriptionSettingContent({ subscription_id }: { subscription_id: string }) {
    const t = useI18n();
    const translate = useScopedI18n('subscription')
    const dispatch = useAppDispatch();
    const { currentSubscription, currentSubscriptionLoading, currentSubscriptionLoadingError } = useSubscription()
    const [openDrawer, setOpenDrawer] = useState(false);
    const [remainingDuration, setRemainingDuration] = useState<number>()

    const [isHovered, setIsHovered] = useState(false);
    const onClose = () => {
        setOpenDrawer(false);
    };
    useEffect(() => {
                  dispatch(fetchSubscriptionById(subscription_id));
    }, [subscription_id])
    
    useEffect(() => {
        if (currentSubscription !== undefined) {
            setRemainingDuration(getRemainingDuration(currentSubscription.start_date, currentSubscription.duration_month));
        }
    }, [currentSubscription]);

    const imageUrl = (image_service: string) => {
        return (
            image_service ? image_service.startsWith("http")
                ? image_service
                : `${IMAGES_URL}${image_service}`
                : "/images/logo_service.png"
        )
    }

    function getRemainingDuration(startDate: Date, durationMonths: number) {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setMonth(end.getMonth() + durationMonths);

        const today = new Date();

        if (today >= end) {
            return 0
        }

        const diffInMonths =
            (end.getFullYear() - today.getFullYear()) * 12 + (end.getMonth() - today.getMonth());
        return (diffInMonths)
    }

    return (
        <Space direction="vertical" size="large" style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}>
            {currentSubscriptionLoading && currentSubscription === undefined &&
                <>
                    <Skeleton.Image active />
                    <Skeleton active paragraph={{ rows: 2 }} />

                </>
            }
            {!currentSubscriptionLoading && currentSubscription !== undefined &&
                <>
                    <Row gutter={16}  >
                        <Col md={16} xs={24} >
                            <Badge
                                count={
                                    <Button style={{
                                        border: "none",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                                        borderRadius: "50%",
                                        padding: 0,
                                        width: 40,
                                        height: 40,
                                        minWidth: 40
                                    }}
                                        icon={
                                            <Star size={35} weight="fill" color="#7D7D7D" />}
                                    />
                                }
                                offset={[-20, 20]}>
                                <Image
                                    alt="Logo"
                                    src={imageUrl(currentSubscription.service_details.image_service)}
                                    width={220}
                                    height={220}
                                    preview={false}

                                />
                            </Badge>
                        </Col>

                        <Col md={8} xs={24}>
                            <Row>
                                <Col span={24} style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    alignSelf: "start"
                                }}>
                                    <Typography.Title level={2} style={{ color: theme.token.orange400 }}>
                                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(currentSubscription.total_amount)} DZD

                                    </Typography.Title>
                                </Col>
                                <Col span={24} style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    alignSelf: "start"
                                }}>
                                    <CustomTransparentOrangeButton onClick={() => setOpenDrawer(true)} >
                                        {t('details')}
                                    </CustomTransparentOrangeButton>


                                </Col>
                            </Row>


                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 0 }} >

                        <Typography.Title level={2}>{currentSubscription.service_details.name}</Typography.Title>

                    </Row>
                    <Row gutter={16} style={{ marginTop: 0 }} >
                        <Paragraph style={{ fontSize: 14 }} >
                            {currentSubscription.service_details.short_description}
                            {t("viewDocumentation")}&nbsp;
                            <Link
                                href={currentSubscription.service_details.documentation_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <Typography.Title
                                    level={5}
                                    style={{
                                        fontSize: 14,
                                        color: theme.token.blue300,
                                        textDecoration: isHovered ? "underline" : "none",
                                        display: "inline-block",
                                        margin: 0
                                    }}
                                >
                                    {t("documentation")}
                                </Typography.Title>
                            </Link>
                        </Paragraph>
                    </Row>
                    <Row gutter={[16, 10]}>
                        <Col md={4} xs={24} style={{ display: "flex", alignItems: "center" }} >
                            <CustomTypography >
                                {t('startDate')}
                            </CustomTypography>
                        </Col>
                        <Col md={4} xs={24}>
                            <DatePickerStyle
                                style={{ width: 160, color: theme.token.colorWhite }}
                                defaultValue={dayjs(currentSubscription.start_date, "YYYY-MM-DD")}
                                disabled
                                suffixIcon={<CalendarDots size={24} style={{ color: theme.token.blue200 }} />}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 10]}>
                        <Col md={4} xs={24} style={{ display: "flex", alignItems: "center" }}>
                            <CustomTypography >
                                {t('duration')}
                            </CustomTypography>
                        </Col>
                        <Col md={20} xs={24}>
                            <CustomSubscripionInput
                                defaultValue={`${currentSubscription.duration_month} / month(s)`}
                                style={{ width: 160, color: theme.token.colorWhite }} disabled />
                        </Col>
                    </Row>

                    <Row gutter={[16, 10]}>
                        <Col md={4} xs={24} style={{ display: "flex", alignItems: "center" }}>
                            <CustomTypography >
                                {t('remainingDuration')}
                            </CustomTypography>
                        </Col>
                        <Col md={20} xs={24}>
                            <CustomSubscripionInput
                                defaultValue={`${getRemainingDuration(currentSubscription.start_date, currentSubscription.duration_month)} / month(s)`}
                                style={{
                                    width: 160,
                                    color: remainingDuration !== undefined && remainingDuration <= 1 ? theme.token.colorError : theme.token.colorWhite
                                }} disabled />
                        </Col>
                    </Row>

                    {remainingDuration !== undefined && remainingDuration <= 1 &&
                        <Row gutter={[16, 10]}>
                            <Col md={16} xs={24} style={{ display: "flex", alignItems: "center" }}>
                                <CustomTypography >
                                    &quot;{translate('clickToRenewNow')}&quot;
                                </CustomTypography>
                            </Col>
                            <Col md={8} xs={24}>
                                <CustomErrorButton> {translate('renewNow')} </CustomErrorButton>
                            </Col>
                        </Row>
                    }
                    <GenerateTokenComponent subscription_id={subscription_id} />
                    <Row gutter={[16, 10]} key={currentSubscription.id}  >
                        {subscriptionItems(currentSubscription, t).map((item, index) => (
                            <div key={index} style={{ width: '100%' }}>
                                {item.label}
                                {item.children}
                            </div>
                        ))}
                    </Row>

                    <DocumentationDrawer openDrawer={openDrawer} onClose={onClose} currentSubscription={currentSubscription} t={t} />
                </>
            }
            {!currentSubscriptionLoading && currentSubscriptionLoadingError &&
                <Result
                    status="500"
                    title={t('error')}
                    subTitle={t('subTitleError')}
                />}
        </Space>
    )
}