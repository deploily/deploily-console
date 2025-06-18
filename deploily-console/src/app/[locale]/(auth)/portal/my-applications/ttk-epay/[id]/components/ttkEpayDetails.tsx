"use client"
import { useTtkEpayById } from "@/lib/features/ttk-epay/ttkEpaySelector";
import { fetchTtkEpayById } from "@/lib/features/ttk-epay/ttkEpayThunks";
import { useAppDispatch } from "@/lib/hook";
import { DatePickerStyle } from "@/styles/components/datePickerStyle";
import { CustomSubscripionInput } from "@/styles/components/inputStyle";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import { CalendarDots } from "@phosphor-icons/react";
import { Badge, Col, Result, Row, Skeleton, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import ImageFetcher from "@/lib/utils/imageFetcher";
import Paragraph from "antd/es/typography/Paragraph";
import Link from "next/link";
import { subscriptionStatusStyle } from "../../../../my-api/utils/subscriptionsConst";



export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
    const t = useI18n();
    const tSubscription = useScopedI18n('subscription');

    const dispatch = useAppDispatch();
    const { ttkEpayById, isLoading, loadingError } = useTtkEpayById()
    const [remainingDuration, setRemainingDuration] = useState<number>()
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        dispatch(fetchTtkEpayById(my_app_id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (ttkEpayById !== undefined) {
            setRemainingDuration(getRemainingDuration(ttkEpayById.start_date, ttkEpayById.duration_month));
        }
    }, [ttkEpayById]);


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
            {isLoading && ttkEpayById === undefined &&
                <>
                    <Skeleton.Image active />
                    <Skeleton active paragraph={{ rows: 2 }} />
                </>
            }
            {!isLoading && ttkEpayById !== undefined &&
                <>
                    <Row gutter={16}  >
                        <Col md={16} xs={24} >
                            <Badge offset={[-20, 20]}>
                                {ttkEpayById.service_details && <ImageFetcher
                                    imagePath={ttkEpayById.service_details.image_service}
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
                                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(ttkEpayById.total_amount)} DZD

                                    </Typography.Title>
                                </Col>
                                <Col span={24} style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    alignSelf: "start"
                                }}>
                                    

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
                        {ttkEpayById.service_details && <Typography.Title level={2}>{ttkEpayById.service_details.name}</Typography.Title>}
                        <Tag bordered={false} color={subscriptionStatusStyle(ttkEpayById.status)} style={{ height: 'fit-content', fontSize: '14px', fontWeight: "bold", borderRadius: 20, padding: "5px 20px", textTransform: "capitalize" }}>
                            {tSubscription(ttkEpayById.status as "active" | "inactive")}
                        </Tag>
                    </Row>

                    {ttkEpayById.service_details && <Row gutter={16} style={{ marginTop: 0 }} >
                        <Paragraph style={{ fontSize: 14 }} >
                            {ttkEpayById.service_details.description}
                            {t("viewDocumentation")}&nbsp;
                            <Link
                                href={ttkEpayById.service_details.documentation_url ?? "https://docs.deploily.cloud/#/"}
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
                                        defaultValue={dayjs(ttkEpayById.start_date, "YYYY-MM-DD")}
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
                                        defaultValue={`${ttkEpayById.duration_month} / month(s)`}
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
                                        defaultValue={`${getRemainingDuration(ttkEpayById.start_date, ttkEpayById.duration_month)} / month(s)`}
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


                </>
            }
            {!isLoading && loadingError &&
                <Result
                    status="500"
                    title={t('error')}
                    subTitle={t('subTitleError')}
                />}
        </Space>
    )
}