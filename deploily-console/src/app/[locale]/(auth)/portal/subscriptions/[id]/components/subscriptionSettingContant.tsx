import { useSubscribe } from "@/lib/features/subscribe/subscribeSelectors";
import { fetchSubscribeById, generateTokenThunk } from "@/lib/features/subscribe/subscribeThunks";
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
import { fetchServiceParametersValues } from "@/lib/features/subscribeParameterValues/subscribeParameterValuesThunks";
import { useServiceParametersValues } from "@/lib/features/subscribeParameterValues/subscribeParameterValuesSelectors";
import { CustomBlueButton, CustomErrorButton, CustomOrangeButton } from "@/styles/components/buttonStyle";
import DocumentationDrawer from "./documentationDrawer";
import { CustomSubscripionInput } from "@/styles/components/inputStyle";

export default function SubscriptionSettingContant({ subscribe_id }: { subscribe_id: string }) {
    const t = useI18n();
    const translate = useScopedI18n('subscription')
    const dispatch = useAppDispatch();
    const { currentSubscribe, currentSubscribeLoading, currentSubscribeLoadingError, generatedToken } = useSubscribe()
    const { serviceParameterValuesList } = useServiceParametersValues();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [remainingDuration, setRemainingDuration] = useState<number>()

    const onClose = () => {
        setOpenDrawer(false);
    };
    useEffect(() => {
        if (currentSubscribe === undefined) {
            dispatch(fetchSubscribeById(subscribe_id));
        }
        else {
            setRemainingDuration(getRemainingDuration(currentSubscribe.start_date, currentSubscribe.duration_month));
        }

        dispatch(fetchServiceParametersValues(subscribe_id));
    }, [generatedToken, currentSubscribe]);

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

    const generateApiKey = () => { dispatch(generateTokenThunk(subscribe_id)) }


    return (
        <Space direction="vertical" size="large" style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50 }}>
            {currentSubscribeLoading && currentSubscribe === undefined &&
                <>
                    <Skeleton.Image active />
                    <Skeleton active paragraph={{ rows: 2 }} />

                </>
            }
            {!currentSubscribeLoading && currentSubscribe !== undefined &&
                <>
                    <Row gutter={16}  >
                        <Col md={16} xs={24} >
                            <Badge
                                count={
                                    <Button style={{ border: "none", backgroundColor: "transparent", boxShadow: "none" }}
                                        icon={
                                            <Star size={40} weight="fill" color="#7D7D7D" />}
                                    />
                                }
                                offset={[-20, 20]}>
                                <Image
                                    alt="Logo"
                                    src={imageUrl(currentSubscribe.service_details.image_service)}
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
                                        {currentSubscribe.total_amount} DZD
                                    </Typography.Title>
                                </Col>
                                <Col span={24} style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    alignSelf: "start"
                                }}>
                                    <CustomOrangeButton onClick={() => setOpenDrawer(true)} >
                                        {t('documentation')}
                                    </CustomOrangeButton>
                                </Col>
                            </Row>


                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 0 }} >

                        <Typography.Title level={2}>{currentSubscribe.service_details.name}</Typography.Title>

                    </Row>
                    <Row gutter={16} style={{ marginTop: 0 }} >
                        <Paragraph style={{ fontSize: 14 }} >
                            {currentSubscribe.service_details.short_description}
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
                                defaultValue={dayjs(currentSubscribe.start_date, "YYYY-MM-DD")}
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
                                defaultValue={`${currentSubscribe.duration_month} / month(s)`}
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
                                defaultValue={`${getRemainingDuration(currentSubscribe.start_date, currentSubscribe.duration_month)} / month(s)`}
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
                    {serviceParameterValuesList?.result?.find(paramVal => paramVal.parameter !== undefined && paramVal.parameter.type === "token") == null &&
                        <CustomBlueButton
                            onClick={generateApiKey}
                            style={{ backgroundColor: theme.token.blue100, width: "20rem", color: theme.token.colorWhite }}
                        >
                            {t('ganerateKey')}
                        </CustomBlueButton>}

                    {/* {serviceParameterValuesList?.result
                        ?.filter(paramVal => paramVal.parameter !== undefined && paramVal.parameter.type !== "token")
                        .map((paramVal, index) => (
                            <div key={index} >
                                <CustomTypography> {paramVal.parameter.name} </CustomTypography>
                                <CustomSubscripionInput defaultValue={paramVal.value} />
                                
                            </div>
                        ))} */}

                    <DocumentationDrawer openDrawer={openDrawer} onClose={onClose} currentSubscribe={currentSubscribe} t={t} />
                </>
            }
            {!currentSubscribeLoading && currentSubscribeLoadingError &&
                <Result
                    status="500"
                    title={t('error')}
                    subTitle={t('subTitleError')}
                />}
        </Space>
    )
}