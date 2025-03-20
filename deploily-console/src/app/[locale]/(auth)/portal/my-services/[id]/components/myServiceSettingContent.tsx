import { useSubscribe } from "@/lib/features/subscribe/subscribeSelectors";
import { fetchSubscribeById, generateTokenThunk } from "@/lib/features/subscribe/subscribeThunks";
import { useAppDispatch } from "@/lib/hook";
import { CalendarDots, CaretDown, CaretUp, Star } from "@phosphor-icons/react";
import { Badge, Button, Col, Collapse, Image,  Row, Skeleton, Space, Typography } from "antd";
import { useEffect } from "react";
import { IMAGES_URL } from "@/deploilyWebsiteUrls";
import { theme } from "@/styles/theme";
import Paragraph from "antd/es/typography/Paragraph";
import dayjs from "dayjs";
import { useI18n } from "../../../../../../../../locales/client";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { DatePickerStyle } from "@/styles/components/datePickerStyle";
import { CustomMyServiceInput } from "@/styles/components/inputStyle";
import { getMyServiceItems } from "./getMyServiceItems";
import { fetchServiceParametersValues } from "@/lib/features/myServiceParameterValues/myServiceParameterValuesThunks";
import { useServiceParametersValues } from "@/lib/features/myServiceParameterValues/myServiceParameterValuesSelectors";
import { CustomBlueButton } from "@/styles/components/buttonStyle";

export default function MyServiceSettingContant({ subscribe_id }: { subscribe_id: string }) {
    const t = useI18n();
    const dispatch = useAppDispatch();
    const { currentSubscribe, currentSubscribeLoading, generatedToken } = useSubscribe()
    const { serviceParameterValuesList } = useServiceParametersValues();



    useEffect(() => {
        dispatch(fetchSubscribeById(subscribe_id));
        dispatch(fetchServiceParametersValues(subscribe_id));
    }, [generatedToken]);

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
        end.setMonth(end.getMonth() + durationMonths); // Calculate end date

        const today = new Date();

        if (today >= end) {
            return 0; // Already expired
        }

        const diffInMonths =
            (end.getFullYear() - today.getFullYear()) * 12 + (end.getMonth() - today.getMonth());

        return diffInMonths;
    }

    const generateApiKey = () => { dispatch(generateTokenThunk(subscribe_id)) }


    return (
        <Space direction="vertical" size="large" style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50 }}>
            {(currentSubscribeLoading || currentSubscribe === undefined) ?
                <>
                    <Skeleton.Image active />
                    <Skeleton active paragraph={{ rows: 2 }} />

                </> :
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

                        <Col md={8} xs={24} style={{
                            display: "flex",
                            justifyContent: "end",
                            alignSelf: "start"
                        }}>
                            <Typography.Title level={2} style={{ color: theme.token.orange_6 }}>
                                {currentSubscribe.total_amount} DZD
                            </Typography.Title>
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
                    <Row gutter={[16,10]}>
                        <Col md={4} xs={24} style={{ display: "flex", alignItems: "center" }} >
                            <CustomTypography >
                                {t('startDate')}
                            </CustomTypography>
                        </Col>
                        <Col md={4} xs={24}>
                            <DatePickerStyle
                                style={{ width: 160 }}
                                defaultValue={dayjs(currentSubscribe.start_date, "YYYY-MM-DD")}
                                disabled
                                suffixIcon={<CalendarDots size={24} style={{ color: theme.token.blue_200 }} />}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16,10]}>
                        <Col md={4} xs={24} style={{ display: "flex", alignItems: "center" }}>
                            <CustomTypography >
                                {t('duration')}
                            </CustomTypography>
                        </Col>
                        <Col md={20} xs={24}>
                            <CustomMyServiceInput
                                defaultValue={`${currentSubscribe.duration_month} / month(s)`}
                                style={{ width: 160 }} disabled />
                        </Col>
                    </Row>
                    <Row gutter={[16,10]}>
                        <Col md={4}  xs={24} style={{ display: "flex", alignItems: "center" }}>
                            <CustomTypography >
                                {t('remainingDuration')}
                            </CustomTypography>
                        </Col>
                        <Col md={20}  xs={24}>
                            <CustomMyServiceInput
                                defaultValue={`${getRemainingDuration(currentSubscribe.start_date, currentSubscribe.duration_month)} / month(s)`}
                                style={{ width: 160 }} disabled />
                        </Col>
                    </Row>
                    {serviceParameterValuesList?.result?.find(paramVal => paramVal.parameter != undefined && paramVal.parameter.type === "token") == null &&
                        <CustomBlueButton
                            onClick={generateApiKey}
                            style={{ backgroundColor:theme.token.blue_100, width:"20rem"}}
                            >
                            {t('ganerateKey')}
                        </CustomBlueButton>}
                    <Row gutter={[16,10]} key={currentSubscribe.id}  >
                        <Collapse
                            bordered={false}
                            defaultActiveKey={["1","2"]}
                            expandIcon={({ isActive }) => (isActive ? <CaretUp /> : <CaretDown />)}
                            expandIconPosition="end"
                            style={{
                                background: theme.token.darkGray_1, border: "1px solid",
                                borderColor: theme.token.gray_1, width: "100%"
                            }}
                            items={getMyServiceItems(currentSubscribe, t)}
                        />
                    </Row>

                </>}
        </Space>
    )
}