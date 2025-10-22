"use client"
import { useOdooAppById } from "@/lib/features/odoo/odooSelector";
import { fetchOdooAppById } from "@/lib/features/odoo/odooThunks";
import { useAppDispatch } from "@/lib/hook";
import { handleCopy } from "@/lib/utils/handleCopy";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { Copy, Eye, EyeSlash } from "@phosphor-icons/react";
import { Badge, Button, Col, Input, Result, Row, Skeleton, Space, Typography } from "antd";
import Link from "antd/es/typography/Link";
import Paragraph from "antd/es/typography/Paragraph";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import DocumentationDrawer from "../../../../utils/documentationDrawer";
import DocumentationComponents from "./componentsOdooDetails/documentationComponent";
import DurationComponent from "./componentsOdooDetails/durationComponent";
import StatusComponents from "./componentsOdooDetails/statusComponent";
import ManagedResourcePlanDetails from "../../../../utils/managedResourcePlanDetails";
import PlanDetailsComponent from "../../../../utils/planDetailsComponents";

export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
    const t = useI18n();

    const tSubscription = useScopedI18n('subscription');
    const tOdoo = useScopedI18n("odooApp");
    const [visible, setVisible] = useState(false);

    const dispatch = useAppDispatch();
    const { odooAppById, isLoading, loadingError } = useOdooAppById()
    const [openDrawer, setOpenDrawer] = useState(false);
    const onClose = () => {
        setOpenDrawer(false);
    };
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
                                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(odooAppById.total_amount / odooAppById.duration_month)} DZD / {odooAppById.service_plan.subscription_category === "monthly" ? t("month") : t("year")}

                                    </Typography.Title>
                                </Col>
                                <DocumentationComponents odooAppById={odooAppById} setOpenDrawer={setOpenDrawer} />
                            </Row>
                        </Col>
                    </Row>

                    <StatusComponents odooAppById={odooAppById} />


                    {odooAppById.service_details && <Row gutter={16} style={{ marginTop: 0 }} >
                        <Paragraph style={{ fontSize: 14 }} >
                            {odooAppById.service_details.description}

                        </Paragraph>
                    </Row>}

                    <DurationComponent odooAppById={odooAppById} />
                    <PlanDetailsComponent currentSubscription={odooAppById} />
                    <ManagedResourcePlanDetails currentSubscription={odooAppById} />

                    <div>
                        <Typography style={{ fontWeight: 700, fontSize: 20, color: theme.token.orange600 }}>
                            {tSubscription("accessUrl")}
                        </Typography>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                paddingBottom: "15px",
                                alignItems: "center",
                            }}
                        >
                            <Link
                                href={odooAppById.access_url}
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
                                {odooAppById.access_url}
                            </Link>

                            <Button
                                type="primary"
                                style={{ boxShadow: "none" }}
                                icon={<Copy />}
                                onClick={() => handleCopy(odooAppById.access_url)}
                            />
                        </div>

                        <Typography style={{ fontWeight: 700, fontSize: 20, color: theme.token.orange600 }}>
                            {tOdoo("password")}
                        </Typography>

                        <div style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingBottom: "15px"
                        }}>
                            <Input.Password
                                value={odooAppById.odoo_password}
                                readOnly
                                visibilityToggle={{
                                    visible,
                                    onVisibleChange: setVisible,
                                }}
                                iconRender={visible => visible ? <Eye /> : <EyeSlash />}
                                style={{
                                    cursor: 'default',
                                    userSelect: 'text',
                                    caretColor: 'transparent',
                                    marginRight: "5px"
                                }}
                            />
                            <Button
                                type="primary"
                                style={{ boxShadow: "none" }}
                                icon={<Copy />}
                                onClick={() => handleCopy(odooAppById.odoo_password)}
                            />
                        </div>
                    </div>
                    <DocumentationDrawer openDrawer={openDrawer} onClose={onClose} currentSubscription={odooAppById} t={t} />

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