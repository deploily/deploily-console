"use client"
import { useSupabaseAppById } from "@/lib/features/supabase/supabaseSelector";
import { fetchSupabaseAppById } from "@/lib/features/supabase/supabaseThunks";
import { useAppDispatch } from "@/lib/hook";
import { handleCopy } from "@/lib/utils/handleCopy";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { Copy } from "@phosphor-icons/react";
import { Badge, Button, Col, Input, Result, Row, Skeleton, Space, Typography } from "antd";
import Link from "antd/es/typography/Link";
import Paragraph from "antd/es/typography/Paragraph";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import DocumentationDrawer from "../../../../utils/documentationDrawer";
import DocumentationComponents from "./componentsSupabaseDetails/documentationComponent";
import DurationComponent from "./componentsSupabaseDetails/durationComponent";
import StatusComponents from "./componentsSupabaseDetails/statusComponent";
import ManagedResourcePlanDetails from "../../../../utils/managedResourcePlanDetails";
import PlanDetailsComponent from "../../../../utils/planDetailsComponents";

export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
    const t = useI18n();

    const tSupabase = useScopedI18n('supabase');

    const dispatch = useAppDispatch();
    const { supabaseAppById, isLoading, loadingError } = useSupabaseAppById()

    useEffect(() => {
        dispatch(fetchSupabaseAppById(my_app_id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [openDrawer, setOpenDrawer] = useState(false);
    const onClose = () => {
        setOpenDrawer(false);
    };
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
                                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(supabaseAppById.service_plan.price + supabaseAppById.managed_ressource_details.price)} DZD / {supabaseAppById.service_plan.subscription_category === "monthly" ? t("month") : t("year")}

                                    </Typography.Title>
                                </Col>
                                <DocumentationComponents supabaseAppById={supabaseAppById} setOpenDrawer={setOpenDrawer} />

                            </Row>
                        </Col>
                    </Row>
                    <StatusComponents supabaseAppById={supabaseAppById} />

                    {supabaseAppById.service_details && <Row gutter={16} style={{ marginTop: 0 }} >
                        <Paragraph style={{ fontSize: 14 }} >
                            {supabaseAppById.service_details.description}

                        </Paragraph>
                    </Row>}
                    <DurationComponent supabaseAppById={supabaseAppById} />
                    <PlanDetailsComponent currentSubscription={supabaseAppById} />
                    <ManagedResourcePlanDetails currentSubscription={supabaseAppById} />

                    <div>

                        {/* supabase_url */}
                        <Typography style={{ fontWeight: 700, fontSize: 20, color: theme.token.orange600 }}>
                            {tSupabase("supabase_url")}
                        </Typography>
                        <div style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingBottom: "15px"
                        }}>
                            <Link
                                href={supabaseAppById.access_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    marginRight: "5px",
                                    wordBreak: "break-all",
                                    color: theme.token.gray100,
                                    fontWeight: 500,
                                    fontSize: 18
                                }}
                            >
                                {supabaseAppById.access_url}
                            </Link>

                            <Button
                                type="primary"
                                style={{ boxShadow: "none" }}
                                icon={<Copy />}
                                onClick={() => handleCopy(supabaseAppById.api_key)}
                            />
                        </div>
                        <Typography style={{ fontWeight: 700, fontSize: 20, color: theme.token.orange600 }}>
                            {tSupabase("supabase_anonKey")}
                        </Typography>

                        <div style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingBottom: "15px"
                        }}>
                            <Input
                                value={supabaseAppById.supabase_anonKey}
                                readOnly
                                style={{
                                    cursor: 'default',
                                    userSelect: 'text',
                                    caretColor: 'transparent',
                                    width: "fit",
                                    marginRight: "5px"
                                }}
                            />
                            <Button
                                type="primary"
                                style={{ boxShadow: "none" }}
                                icon={<Copy />}
                                onClick={() => handleCopy(supabaseAppById.supabase_anonKey)}
                            />
                        </div>
                    </div>
                    <DocumentationDrawer openDrawer={openDrawer} onClose={onClose} currentSubscription={supabaseAppById} t={t} />

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