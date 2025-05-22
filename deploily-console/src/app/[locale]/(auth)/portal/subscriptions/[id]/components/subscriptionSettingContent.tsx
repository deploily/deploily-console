"use client"
import { ApiServiceInterface } from "@/lib/features/api-service/apiServiceInterface";
import { useApiServices } from "@/lib/features/api-service/apiServiceSelectors";
import { getApiServiceById } from "@/lib/features/api-service/apiServiceThunks";
import { useSubscription } from "@/lib/features/subscriptions/subscriptionSelectors";
import { fetchSubscriptionById } from "@/lib/features/subscriptions/subscriptionThunks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { CustomTransparentOrangeButton } from "@/styles/components/buttonStyle";
import { DatePickerStyle } from "@/styles/components/datePickerStyle";
import { CustomSubscripionInput } from "@/styles/components/inputStyle";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import { CalendarDots, Star } from "@phosphor-icons/react";
import { Badge, Button, Col, Result, Row, Skeleton, Space, Tag, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import { subscriptionStatusStyle } from "../../utils/subscriptionsConst";
import DocumentationDrawer from "./documentationDrawer";
import GenerateTokenComponent from "./generateTokenComponent";
import { subscriptionItems } from "./subscriptionItems";

export default function SubscriptionSettingContent({ subscription_id }: { subscription_id: string }) {
    const t = useI18n();
    const tSubscription = useScopedI18n('subscription');

    const dispatch = useAppDispatch();
    const { currentSubscription, currentSubscriptionLoading, currentSubscriptionLoadingError } = useSubscription()
    const { currentService } = useApiServices()
    const [openDrawer, setOpenDrawer] = useState(false);
    const [remainingDuration, setRemainingDuration] = useState<number>()
    const [serviceDetails, setServiceDetails] = useState<ApiServiceInterface>();

    const [isHovered, setIsHovered] = useState(false);
    const onClose = () => {
        setOpenDrawer(false);
    };
    useEffect(() => {
        dispatch(fetchSubscriptionById(subscription_id));
    }, [])





    useEffect(() => {
        if (currentSubscription !== undefined) {
            dispatch(getApiServiceById(`${currentSubscription.service_details.id}`));
            setRemainingDuration(getRemainingDuration(currentSubscription.start_date, currentSubscription.duration_month));
        }
    }, [currentSubscription]);



    useEffect(() => {

        if (currentService !== undefined) {
            setServiceDetails(currentService);
        }
    }, [currentService])

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
                                {serviceDetails && <ImageFetcher
                                    imagePath={serviceDetails.image_service}
                                    width={220}
                                    height={220}
                                />}
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
                                        {t('moreDetails')}
                                    </CustomTransparentOrangeButton>


                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}>
                        {serviceDetails && <Typography.Title level={2}>{serviceDetails.name}</Typography.Title>}
                        <Tag bordered={false} color={subscriptionStatusStyle(currentSubscription.status)} style={{ height: 'fit-content', fontSize: '14px', fontWeight: "bold", borderRadius: 20, padding: "5px 20px", textTransform: "capitalize" }}>
                            {tSubscription(currentSubscription.status as "active" | "inactive")}
                        </Tag>
                    </Row>

                    {serviceDetails && <Row gutter={16} style={{ marginTop: 0 }} >
                        <Paragraph style={{ fontSize: 14 }} >
                            {serviceDetails.short_description}
                            {t("viewDocumentation")}&nbsp;
                            <Link
                                href={currentSubscription?.service_details.api_playground_url ?? "https://docs.deploily.cloud/#/"}
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
                                    {t("ApiDocumentation")}
                                </Typography.Title>
                            </Link>
                        </Paragraph>
                    </Row>}
                    <Row
                        gutter={[16, 24]}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                        }}
                    >
                        {/* Start Date */}
                        <Col xs={24} md={12} lg={8}>
                            <Row gutter={[16, 10]} align="middle">
                                <Col xs={24} md={8}>
                                    <CustomTypography>
                                        {t('startDate')}
                                    </CustomTypography>
                                </Col>
                                <Col xs={24} md={16}>
                                    <DatePickerStyle
                                        style={{ width: 160, color: theme.token.colorWhite }}
                                        defaultValue={dayjs(currentSubscription.start_date, "YYYY-MM-DD")}
                                        disabled
                                        suffixIcon={<CalendarDots size={24} style={{ color: theme.token.blue200 }} />}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        {/* Duration */}
                        <Col xs={24} md={12} lg={8}>
                            <Row gutter={[16, 10]} align="middle">
                                <Col xs={24} md={8}>
                                    <CustomTypography>
                                        {t('duration')}
                                    </CustomTypography>
                                </Col>
                                <Col xs={24} md={16}>
                                    <CustomSubscripionInput
                                        defaultValue={`${currentSubscription.duration_month} / month(s)`}
                                        style={{ width: 160, color: theme.token.colorWhite }}
                                        disabled
                                    />
                                </Col>
                            </Row>
                        </Col>

                        {/* Remaining Duration */}
                        <Col xs={24} md={12} lg={8}>
                            <Row gutter={[16, 10]} align="middle">
                                <Col xs={24} md={8}>
                                    <CustomTypography>
                                        {t('remainingDuration')}
                                    </CustomTypography>
                                </Col>
                                <Col xs={24} md={16}>
                                    <CustomSubscripionInput
                                        defaultValue={`${getRemainingDuration(currentSubscription.start_date, currentSubscription.duration_month)} / month(s)`}
                                        style={{
                                            width: 160,
                                            color:
                                                remainingDuration !== undefined && remainingDuration <= 1
                                                    ? theme.token.colorError
                                                    : theme.token.colorWhite,
                                        }}
                                        disabled
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>


                    {/* {remainingDuration !== undefined && remainingDuration <= 1 &&//TODO WAIT FOR BACKEND
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
                    } */}

                    {serviceDetails &&
                        currentSubscription.status == 'active' ? <>
                        <GenerateTokenComponent subscription_id={subscription_id} />
                        <Row gutter={[16, 10]} key={currentSubscription.id}  >
                            {subscriptionItems(currentSubscription, serviceDetails, t).map((item, index) => (
                                <div key={index} style={{ width: '100%' }}>
                                    {item.label}
                                    {item.children}
                                </div>
                            ))}
                        </Row>
                    </> :
                        <Row gutter={[16, 10]} key={currentSubscription.id}  >

                            <Typography.Title level={4} style={{ color: theme.token.colorError, fontSize: 16, textAlign: "center", marginTop: 20 }}>
                                {tSubscription('inactiveMessage')}
                            </Typography.Title >
                        </Row>
                    }
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