import { useSubscribe } from "@/lib/features/subscribe/subscribeSelectors";
import { fetchSubscribeById, generateTokenThunk } from "@/lib/features/subscribe/subscribeThunks";
import { useAppDispatch } from "@/lib/hook";
import { CalendarDots, CaretDown, CaretUp, Copy, Star } from "@phosphor-icons/react";
import { Badge, Button, Col, Image, Result, Row, Skeleton, Space, Typography, Tooltip, Collapse } from "antd";
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
import { CustomSubscripionInput } from "@/styles/components/inputStyle";
import { CustomDrawerCard } from "@/styles/components/cardStyle";

import { handleCopy } from "@/lib/utils/handleCopy";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import DocumentationDrawer from "./documentationDrawer";
import Link from "next/link";
import { getSubscriptionItems } from "./getSubscriptionItems";

export default function SubscriptionSettingContant({ subscribe_id }: { subscribe_id: string }) {
    const t = useI18n();
    const translate = useScopedI18n('subscription')
    const dispatch = useAppDispatch();
    const { currentSubscribe, currentSubscribeLoading, currentSubscribeLoadingError, generatedToken } = useSubscribe()
    const { serviceParameterValuesList } = useServiceParametersValues();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [remainingDuration, setRemainingDuration] = useState<number>()

      const [isHovered, setIsHovered] = useState(false);
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
        <Space direction="vertical" size="large" style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}>
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
                                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(currentSubscribe.total_amount)} DZD

                                    </Typography.Title>
                                </Col>
                                <Col span={24} style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    alignSelf: "start"
                                }}>
                                    <CustomOrangeButton onClick={() => setOpenDrawer(true)} >
                                    {t('details')}
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
                            {t("viewDocumentation")}&nbsp;
                            <Link
                                href={currentSubscribe.service_details.documentation_url}
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
                  
                    {serviceParameterValuesList?.result
                        ?.filter(paramVal => paramVal.parameter !== undefined && paramVal.parameter.type !== "token")
                        .map((paramVal, index) => (
                            <div key={index} >
                                <CustomTypography> {paramVal.parameter.name} </CustomTypography>
                                <CustomSubscripionInput defaultValue={paramVal.value} />
                                
                            </div>
                        ))}
            
                    {serviceParameterValuesList?.result?.find(paramVal => paramVal.parameter != undefined && paramVal.parameter.type === "token") == null &&
                        <CustomBlueButton
                            onClick={generateApiKey}
                            style={{ backgroundColor: theme.token.blue100, width: "20rem" }}
                        >
                            {t('ganerateKey')}
                        </CustomBlueButton>}
                    <Row gutter={[16, 10]} key={currentSubscribe.id}  >
                        <Collapse
                            bordered={false}
                            defaultActiveKey={["1", "2"]}
                            expandIcon={({ isActive }) => (isActive ? <CaretUp /> : <CaretDown />)}
                            expandIconPosition="end"
                            style={{
                                background: theme.token.darkGray, border: "1px solid",
                                borderColor: theme.token.gray100, width: "100%"
                            }}
                        items={getSubscriptionItems(currentSubscribe, t)}
                        />
                    </Row>

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