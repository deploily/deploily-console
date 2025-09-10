import { Col, Row, Tag, Tooltip, Typography } from "antd";
import { useI18n, useScopedI18n } from "../../../../../../../../../../locales/client";
import { CalendarDots, PauseCircle, PlayCircle } from "@phosphor-icons/react";
import { applicationStatusStyle } from "@/app/[locale]/(auth)/portal/my-api/utils/subscriptionsConst";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { DatePickerStyle } from "@/styles/components/datePickerStyle";
import dayjs from "dayjs";
import { theme } from "@/styles/theme";
import { CustomSubscripionInput } from "@/styles/components/inputStyle";
import { useEffect, useState } from "react";


export default function DurationComponent({ nextCloudAppById }: { nextCloudAppById: any }) {
    const t = useI18n();
    const [remainingDuration, setRemainingDuration] = useState<number>()

    useEffect(() => {
        if (nextCloudAppById !== undefined) {
            setRemainingDuration(getRemainingDuration(nextCloudAppById.start_date, nextCloudAppById.duration_month));
        }
    }, [nextCloudAppById]);
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
        <>
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
                                style={{ width: "100%", color: theme.token.colorWhite }}
                                defaultValue={dayjs(nextCloudAppById.start_date, "YYYY-MM-DD")}
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
                                defaultValue={`${nextCloudAppById.duration_month} / month(s)`}
                                style={{ width: "100%", color: theme.token.colorWhite }}
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
                                defaultValue={`${getRemainingDuration(nextCloudAppById.start_date, nextCloudAppById.duration_month)} / month(s)`}
                                style={{
                                    width: "100%",
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
    );
}