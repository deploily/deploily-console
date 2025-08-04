"use client"
import { useTtkEpayById, useTtkEpayUpdate } from "@/lib/features/ttk-epay/ttkEpaySelector";
import { fetchTtkEpayById } from "@/lib/features/ttk-epay/ttkEpayThunks";
import { useAppDispatch } from "@/lib/hook";
import { handleCopy } from "@/lib/utils/handleCopy";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { CustomTransparentOrangeButton } from "@/styles/components/buttonStyle";
import { DatePickerStyle } from "@/styles/components/datePickerStyle";
import { CustomSubscripionInput } from "@/styles/components/inputStyle";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import { CalendarDots, Copy, PauseCircle, PlayCircle } from "@phosphor-icons/react";
import { Alert, Badge, Button, Col, Input, Result, Row, Skeleton, Space, Tag, Tooltip, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import { applicationStatusStyle } from "../../../../my-api/utils/subscriptionsConst";
import DocumentationDrawer from "../../../../utils/documentationDrawer";
import ShowdrawerSubscription from "../../../components/showMyAppDrawerSubscription";
import TtkEpayParams from "./ttkEpayParams";
import UpgradeMyAppSubscriptionComponents from "../../../components/upgradeMyAppSubscription";
import RenewMyAppSubscriptionComponents from "../../../components/renewMyAppSubscription";

export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
    const t = useI18n();
    const tSubscription = useScopedI18n('subscription');

    const dispatch = useAppDispatch();
    const { ttkEpayById, isLoading, loadingError } = useTtkEpayById()
    const { updateTtkEpay } = useTtkEpayUpdate()
    const [remainingDuration, setRemainingDuration] = useState<number>()
    const [openDrawer, setOpenDrawer] = useState(false);

    const [drawerActionType, setDrawerActionType] = useState<"upgrade" | "renew" | null>(null);


    useEffect(() => {
        dispatch(fetchTtkEpayById(my_app_id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateTtkEpay])

    useEffect(() => {
        if (ttkEpayById !== undefined) {
            setRemainingDuration(getRemainingDuration(ttkEpayById.start_date, ttkEpayById.duration_month));
        }
    }, [ttkEpayById]);

    const onClose = () => {
        setOpenDrawer(false);
    };
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
                    <Skeleton.Image active style={{ marginBottom: 10 }} />
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
                                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(ttkEpayById.price)} DZD {ttkEpayById.service_plan.unity} / {ttkEpayById.service_plan.subscription_category === "monthly" ? t("month") : t("year")}

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
                                <Col span={24} style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    alignSelf: "start"
                                }}>
                                    <CustomTransparentOrangeButton
                                        href={ttkEpayById.service_details.documentation_url ?? "https://docs.deploily.cloud/#/"}
                                        target="_blank"
                                        rel="noopener noreferrer"


                                    >
                                        {t('documentation')}
                                    </CustomTransparentOrangeButton>


                                </Col>
                                <Col span={24} style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    alignSelf: "start"
                                }}>
                                    <CustomTransparentOrangeButton
                                        href={ttkEpayById.console_url}
                                        target="_blank"
                                        rel="noopener noreferrer"

                                    >
                                        {tSubscription('adminConsole')}
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
                        {ttkEpayById.service_details &&
                            <Typography.Title level={2}>
                                {ttkEpayById.service_details.name}
                                {ttkEpayById.status === "active" ?
                                    <Tooltip placement="rightTop" title={t('subscription.active')} color={"green"}>
                                        <PlayCircle size={24} weight="bold" style={{ marginLeft: 10, color: "green" }} />
                                    </Tooltip>

                                    :
                                    <Tooltip placement="rightTop" title={t('subscription.inactive')} color={"red"}>
                                        <PauseCircle size={24} weight="bold" style={{ marginLeft: 10, color: "red" }} />
                                    </Tooltip>
                                }
                            </Typography.Title>}

                        <Col xs={24} md={12} lg={8}>
                            <Row gutter={[16, 10]} justify="end" >
                                <Tag bordered={false} color={applicationStatusStyle(ttkEpayById.application_status)}
                                    style={{ height: 'fit-content', fontSize: '14px', fontWeight: "bold", borderRadius: 20, padding: "5px 20px", textTransform: "capitalize" }}>
                                    {tSubscription(ttkEpayById.application_status as "processing" | "error" | "deployed")}
                                </Tag>
                                {ttkEpayById.status === 'active' && (
                                    <div style={{
                                        display: 'flex',
                                        gap: '8px',
                                        flexWrap: 'wrap',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <UpgradeMyAppSubscriptionComponents
                                            serviceId={ttkEpayById.service_details.id}
                                            oldPrice={ttkEpayById.price}
                                            start_date={ttkEpayById.start_date}
                                            onClick={() =>
                                                setDrawerActionType("upgrade")
                                            }
                                        />
                                        <RenewMyAppSubscriptionComponents
                                            serviceId={ttkEpayById.service_details.id}
                                            oldPrice={ttkEpayById.price}
                                            start_date={ttkEpayById.start_date}
                                            duration={ttkEpayById.duration_month}
                                            plan={ttkEpayById.service_plan.id}
                                            selectedVpsPlan={ttkEpayById.ressource_service_plan.id}
                                            onClick={() =>
                                                setDrawerActionType("renew")
                                            }
                                        />
                                    </div>
                                )}
                            </Row>
                        </Col>
                    </Row>

                    <ShowdrawerSubscription
                        serviceId={ttkEpayById.service_details.id}
                        isSubscribed={ttkEpayById.service_details.is_subscribed}
                        subscriptionOldId={ttkEpayById.id}
                        drawerType={drawerActionType}
                    />

                    {ttkEpayById.service_details && <Row gutter={16} style={{ marginTop: 0 }} >
                        <Paragraph style={{ fontSize: 14 }} >
                            {ttkEpayById.service_details.description}

                        </Paragraph>
                    </Row>}

                    {/* <CustomTypography style={{ color: "rgba(221, 136, 89, 1)", textDecoration: "underline " }} >{tSubscription('application')}</CustomTypography> */}

                    <Row
                        gutter={[16, 24]}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginBlock: 20
                        }}
                    >
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
                    <div>
                        <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                            {tSubscription("accessUrl")}
                        </Typography>
                        <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "100%", paddingBottom: "15px" }}>
                            <Input value={ttkEpayById.access_url}
                                readOnly
                                style={{
                                    cursor: 'default',
                                    userSelect: 'text',
                                    caretColor: 'transparent',
                                    width: "fit",
                                    marginRight: "5px"
                                }} />
                            <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(ttkEpayById.access_url)} />
                        </div>
                    </div>
                    {ttkEpayById.application_status == "error" &&
                        <div style={{ marginBlock: 20 }} >
                            <Alert
                                message={<span style={{ color: 'black' }}>{t('error')}</span>}
                                description={<span style={{ color: 'black' }}>{ttkEpayById.deployment_error}</span>}
                                type="error"
                                showIcon
                            />
                        </div>
                    }
                    <TtkEpayParams data={ttkEpayById} />
                    <DocumentationDrawer openDrawer={openDrawer} onClose={onClose} currentSubscription={ttkEpayById} t={t} />

                </>
            }
            {!isLoading && loadingError &&
                <Result
                    status="500"
                    title={t('error')}
                    subTitle={t('subTitleError')}
                />}
        </Space >

    )
}