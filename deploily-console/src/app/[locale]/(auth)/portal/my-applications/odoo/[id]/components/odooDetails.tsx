"use client"

import { useOdooAppById } from "@/lib/features/odoo/odooSelector";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { CustomTransparentOrangeButton } from "@/styles/components/buttonStyle";
import { theme } from "@/styles/theme";
import { Badge, Col, Row, Skeleton, Space, Typography } from "antd"
import { useEffect } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import { fetchOdooAppById } from "@/lib/features/odoo/odooThunks";


export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
    const t = useI18n();

    const tSubscription = useScopedI18n('subscription');

    const dispatch = useAppDispatch();
    const { odooAppById, isLoading, loadingError } = useOdooAppById()

    useEffect(() => {
        dispatch(fetchOdooAppById(my_app_id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (

        <Space direction="vertical" size="large" style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}>
            {isLoading && odooAppById === undefined &&
                <>
                    <Skeleton.Image active style={{ marginBottom: 10 }} />
                    <Skeleton active paragraph={{ rows: 2 }} />
                </>
            }
            {!isLoading && odooAppById !== undefined &&
                <>
                    <Row gutter={16}  >
                        <Col md={16} xs={24} >
                            <Badge offset={[-20, 20]}>
                                {odooAppById.service_details && <ImageFetcher
                                    imagePath={odooAppById.service_details.image_service}
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
                                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(odooAppById.price)} DZD / {odooAppById.service_plan.subscription_category === "monthly" ? t("month") : t("year")}

                                    </Typography.Title>
                                </Col>
                                <Col span={24} style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    alignSelf: "start"
                                }}>
                                    <CustomTransparentOrangeButton
                                    // onClick={() => setOpenDrawer(true)}
                                    >
                                        {t('moreDetails')}
                                    </CustomTransparentOrangeButton>


                                </Col>


                            </Row>
                        </Col>
                    </Row></>}
        </Space >

    )
}