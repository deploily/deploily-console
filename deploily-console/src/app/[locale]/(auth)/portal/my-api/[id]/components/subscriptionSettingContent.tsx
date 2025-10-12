"use client"
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { CustomTransparentOrangeButton } from "@/styles/components/buttonStyle";
import { DatePickerStyle } from "@/styles/components/datePickerStyle";
import { CustomSubscripionInput } from "@/styles/components/inputStyle";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import { CalendarDots } from "@phosphor-icons/react";
import { Badge, Col, Result, Row, Skeleton, Space, Tag, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import GenerateTokenComponent from "./generateTokenComponent";
import { useApiServiceSubscription } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionSelectors";
import { fetchApiServiceSubscriptionById } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionThunks";
import { subscriptionItems } from "./subscriptionItems";
import DocumentationDrawer from "../../../utils/documentationDrawer";
import { subscriptionStatusStyle } from "../../utils/subscriptionsConst";
import UpgradeApiSubscriptionComponents from "./upgradeSubscription";
import ShowdrawerSubscription from "./showDrawerSubscription";
import RenewApiSubscriptionComponents from "./renewSubscription";

export default function ApiServiceSubscriptionSettingContent({ apiServiceSubscription_id }: { apiServiceSubscription_id: string }) {
    const t = useI18n();
    const tApiServiceSubscription = useScopedI18n('apiServiceSubscription');

    const dispatch = useAppDispatch();
    const { currentApiServiceSubscription, currentApiServiceSubscriptionLoading, currentApiServiceSubscriptionLoadingError } = useApiServiceSubscription()
    const [openDrawer, setOpenDrawer] = useState(false);
    const [remainingDuration, setRemainingDuration] = useState<number>()

    const [isHovered, setIsHovered] = useState(false);
    const onClose = () => {
        setOpenDrawer(false);
    };
    useEffect(() => {
        dispatch(fetchApiServiceSubscriptionById(apiServiceSubscription_id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (currentApiServiceSubscription !== undefined) {
            setRemainingDuration(getRemainingDuration(currentApiServiceSubscription.start_date, currentApiServiceSubscription.duration_month));
        }
    }, [currentApiServiceSubscription]);


    function getRemainingDuration(startDate: Date, durationMonths: number) {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setMonth(end.getMonth() + durationMonths);

        const today = new Date();

        if (today >= end) {
            return 0
        }

        const diffInMonths =
            (end.getFullYear() - today.getFullYear()) * 12 + (end.getMonth() - today.getMonth()); //TODO VERIFY IF IS MONTH OR DAY
        
        return (diffInMonths)
    }


    const [drawerActionType, setDrawerActionType] = useState<"upgrade" | "renew" | null>(null);

    return (
        <Space direction="vertical" size="large" style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}>
            {currentApiServiceSubscriptionLoading && currentApiServiceSubscription === undefined &&
                <>
                    <Skeleton.Image active />
                    <Skeleton active paragraph={{ rows: 2 }} />
                </>
            }
            {!currentApiServiceSubscriptionLoading && currentApiServiceSubscription !== undefined &&
                <>
                    <Row gutter={16}  >
                        <Col md={16} xs={24} >
                            <Badge offset={[-20, 20]}>
                                {currentApiServiceSubscription.service_details && <ImageFetcher
                                    imagePath={currentApiServiceSubscription.service_details.image_service}
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
                                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(currentApiServiceSubscription.price)} DZD {currentApiServiceSubscription.service_plan.unity} / {currentApiServiceSubscription.service_plan.subscription_category === "monthly" ? t("month") : t("year")}

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
                <Row gutter={16} justify="space-between" align="middle">
                    {/* Title */}
                    <Col xs={24} sm={16} md={16} lg={16} xl={18}>
                        {currentApiServiceSubscription.service_details && (
                            <Typography.Title level={2} style={{ margin: 0 }}>
                                {currentApiServiceSubscription.service_details.name}
                            </Typography.Title>
                        )}
                    </Col>

                    {/* Actions */}
                    <Col xs={24} sm={8} md={8} lg={8} xl={6}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            alignItems: 'flex-end'
                        }}>
                            {/* Status Tag */}
                            <Tag
                                bordered={false}
                                color={subscriptionStatusStyle(currentApiServiceSubscription.status)}
                                style={{
                                    height: 'fit-content',
                                    fontSize: '14px',
                                    fontWeight: "bold",
                                    borderRadius: 20,
                                    padding: "5px 20px",
                                    textTransform: "capitalize"
                                }}
                            >
                                {tApiServiceSubscription(currentApiServiceSubscription.status as "active" | "inactive")}
                            </Tag>

                            {/* Action Buttons - Only show if status is active */}
                            {currentApiServiceSubscription.status === 'active' && (
                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    flexWrap: 'wrap',
                                    justifyContent: 'flex-end'
                                }}>
                                    <UpgradeApiSubscriptionComponents
                                        serviceId={currentApiServiceSubscription.service_details.id}
                                        oldPrice={currentApiServiceSubscription.price}
                                        planSelectedId={currentApiServiceSubscription.service_plan_id}
                                        start_date={currentApiServiceSubscription.start_date}
                                        oldDuration={currentApiServiceSubscription.duration_month}
                                        onClick={() => setDrawerActionType("upgrade")}
                                    />

                                    <RenewApiSubscriptionComponents
                                        serviceId={currentApiServiceSubscription.service_details.id}
                                        oldPrice={currentApiServiceSubscription.price}
                                        plan={currentApiServiceSubscription.service_plan_id}
                                        start_date={currentApiServiceSubscription.start_date}
                                        onClick={() => setDrawerActionType("renew")}
                                    />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
                    <ShowdrawerSubscription
                        IsSubscribed={currentApiServiceSubscription.service_details.is_subscribed}
                        subscriptionOldId={currentApiServiceSubscription.id}
                        drawerType={drawerActionType}
                    />
                    {currentApiServiceSubscription.service_details && <Row gutter={16} style={{ marginTop: 0 }} >
                        <Paragraph style={{ fontSize: 14 }} >
                            {currentApiServiceSubscription.service_details.short_description}
                            {t("viewDocumentation")}&nbsp;
                            <Link
                                href={currentApiServiceSubscription.service_details.api_playground_url ?? "https://docs.deploily.cloud/#/"}
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
                                        defaultValue={dayjs(currentApiServiceSubscription.start_date, "YYYY-MM-DD")}
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
                                        defaultValue={`${currentApiServiceSubscription.duration_month} / month(s)`}
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
                                        defaultValue={`${getRemainingDuration(currentApiServiceSubscription.start_date, currentApiServiceSubscription.duration_month)} / month(s)`}
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
             
                        {/* === PLAN & PLAN OPTIONS DISPLAY === */}
                        {currentApiServiceSubscription.get_plan_details && (
                            <Row
                                gutter={[16, 16]}
                                style={{
                                    marginTop: 20,
                                    background: theme.token.darkGray,
                                    borderRadius: 12,
                                    padding: 20,
                                }}
                            >
                                <Col span={24}>
                                    <Typography.Title
                                        level={4}
                                        style={{ marginBottom: 10, color: theme.token.blue300 }}
                                    >
                                        {/* t('planDetails') || */}
                                        Service Plan Details
                                    </Typography.Title>
                                </Col>

                                {/* === PLAN INFORMATION (INLINE DISPLAY) === */}
                                <Row gutter={[24, 12]} style={{ width: "100%", marginBottom: 10 }}>
                                    {/* Plan Name */}
                                    <Col xs={24} md={8}>
                                        <Row align="middle" gutter={[8, 0]}>
                                            <Col flex="none">
                                                <CustomTypography style={{ fontWeight: 500 }}>
                                                    {/* t('planName') || */} Plan Name:
                                                </CustomTypography>
                                            </Col>
                                            <Col flex="auto">
                                                <Typography.Text strong style={{ whiteSpace: "nowrap" }}>
                                                    {currentApiServiceSubscription.get_plan_details.plan?.name ||
                                                        currentApiServiceSubscription.name}
                                                </Typography.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    
                                </Row>

                                {/* === PLAN OPTIONS === */}
                                {Array.isArray(currentApiServiceSubscription.get_plan_details.options) &&
                                    currentApiServiceSubscription.get_plan_details.options.length > 0 && (
                                        <Col span={24} style={{ marginTop: 10 }}>
                                            <CustomTypography style={{ fontWeight: "bold" }}>
                                                {/* t('planOptions') || */} Plan Options:
                                            </CustomTypography>
                                            <div style={{ marginTop: 10 }}>
                                                {currentApiServiceSubscription.get_plan_details.options.map(
                                                    (option: any) => (
                                                        <Tag
                                                            key={option.id}
                                                            color="blue"
                                                            style={{
                                                                fontSize: 13,
                                                                borderRadius: 16,
                                                                marginBottom: 6,
                                                            }}
                                                        >
                                                            {option.html_content ||
                                                                `${option.option_type}: ${option.option_value}`}
                                                        </Tag>
                                                    )
                                                )}
                                            </div>
                                        </Col>
                                    )}
                            </Row>
                        )}

                  

                    {currentApiServiceSubscription.service_details &&
                        currentApiServiceSubscription.status == 'active' ? <>
                        <GenerateTokenComponent apiServiceSubscription_id={apiServiceSubscription_id} />
                        <Row gutter={[16, 10]} key={currentApiServiceSubscription.id}  >
                            {subscriptionItems(currentApiServiceSubscription, currentApiServiceSubscription.service_details, t).map((item, index) => (
                                <div key={index} style={{ width: '100%' }}>
                                    {item.label}
                                    {item.children}
                                </div>
                            ))}
                        </Row>
                    </> :
                        <Row gutter={[16, 10]} key={currentApiServiceSubscription.id}  >

                            <Typography.Title level={4} style={{ color: theme.token.colorError, fontSize: 16, textAlign: "center", marginTop: 20 }}>
                                {tApiServiceSubscription('inactiveMessage')}
                            </Typography.Title >
                        </Row>
                    }
                    <DocumentationDrawer openDrawer={openDrawer} onClose={onClose} currentSubscription={currentApiServiceSubscription} t={t} />
                </>
            }
            {!currentApiServiceSubscriptionLoading && currentApiServiceSubscriptionLoadingError &&
                <Result
                    status="500"
                    title={t('error')}
                    subTitle={t('subTitleError')}
                />}


        </Space>
    )
}