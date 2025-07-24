"use client"
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { Badge, Button, Col, Input, Result, Row, Skeleton, Space, Typography } from "antd"
import Paragraph from "antd/es/typography/Paragraph";
import { useEffect } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import { fetchOdooAppById } from "@/lib/features/odoo/odooThunks";
import { useSupabaseAppById } from "@/lib/features/supabase/supabaseSelector";

export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
    const t = useI18n();

    const tSubscription = useScopedI18n('subscription');

    const dispatch = useAppDispatch();
    const { supabaseAppById, isLoading, loadingError } = useSupabaseAppById()
    
    useEffect(() => {
        dispatch(fetchOdooAppById(my_app_id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <Space direction="vertical" size="large" style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}>
            {isLoading && supabaseAppById === undefined &&
                <>
                    <Skeleton.Image active style={{ marginBottom: 10 }} />
                    <Skeleton active paragraph={{ rows: 2 }} />
                </>
            }
            {!isLoading && supabaseAppById !== undefined &&
                <>
                    <Row gutter={16}  >
                        <Col md={16} xs={24} >
                            <Badge offset={[-20, 20]}>
                                {supabaseAppById.service_details && <ImageFetcher
                                    imagePath={supabaseAppById.service_details.image_service}
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
                                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(supabaseAppById.price)} DZD / {supabaseAppById.service_plan.subscription_category === "monthly" ? t("month") : t("year")}

                                    </Typography.Title>
                                </Col>
                            </Row>
                        </Col>
                    </Row>



                    {supabaseAppById.service_details && <Row gutter={16} style={{ marginTop: 0 }} >
                        <Paragraph style={{ fontSize: 14 }} >
                            {supabaseAppById.service_details.description}

                        </Paragraph>
                    </Row>}

                  

                </>}
            {!isLoading && loadingError &&
                <Result
                    status="500"
                    title={t('error')}
                    subTitle={t('subTitleError')}
                />}
        </Space >
    )
}