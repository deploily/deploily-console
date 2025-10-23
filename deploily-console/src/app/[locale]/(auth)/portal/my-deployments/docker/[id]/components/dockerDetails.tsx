"use client";
import { useDockerById } from "@/lib/features/docker/dockerSelector";
import { fetchDockerById } from "@/lib/features/docker/dockerThunks";
import { useAppDispatch } from "@/lib/hook";
import { handleCopy } from "@/lib/utils/handleCopy";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { Copy, Eye, EyeSlash } from "@phosphor-icons/react";
import { Badge, Button, Col, Input, Result, Row, Skeleton, Space, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import DocumentationDrawer from "../../../../utils/documentationDrawer";
import DocumentationComponent from "./componentsDockerDetails/documentationComponent";
import DurationComponent from "./componentsDockerDetails/durationComponent";
import StatusComponents from "./componentsDockerDetails/statusComponent";
import ParametersSection from "./parametersSection";
import ManagedResourcePlanDetails from "../../../../utils/managedResourcePlanDetails";
import PlanDetailsComponent from "../../../../utils/planDetailsComponents";

export default function MyDockerDetails({ my_dep_id }: { my_dep_id: number }) {
    const t = useI18n();
    const tSubscription = useScopedI18n("subscription");
    const dispatch = useAppDispatch();
    const { dockerById, isLoading, loadingError } = useDockerById();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchDockerById(my_dep_id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [openDrawer, setOpenDrawer] = useState(false);
    const onClose = () => setOpenDrawer(false);


    return (
        <Space
            direction="vertical"
            size="large"
            style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}
        >
            {isLoading && dockerById === undefined && (
                <>
                    <Skeleton.Image active style={{ marginBottom: 10 }} />
                    <Skeleton active paragraph={{ rows: 2 }} />
                </>
            )}

            {!isLoading && dockerById !== undefined && (
                <>
                    <Row gutter={16}>
                        <Col md={16} xs={24}>
                            <Badge offset={[-20, 20]}>
                                {dockerById.service_details && (
                                    <ImageFetcher
                                        imagePath={dockerById.service_details.image_service}
                                        width={220}
                                        height={220}
                                    />
                                )}
                            </Badge>
                        </Col>

                        <Col md={8} xs={24}>
                            <Row>
                                <Col span={24} style={{ display: "flex", justifyContent: "end", alignSelf: "start" }}>
                                    <Typography.Title level={2} style={{ color: theme.token.orange400 }}>
                                        {Intl.NumberFormat("fr-FR", { useGrouping: true }).format(dockerById.total_amount / dockerById.duration_month)} DZD /
                                        {dockerById.service_details?.price_category === "monthly" ? t("month") : t("year")}
                                    </Typography.Title>
                                </Col>
                                <DocumentationComponent dockerById={dockerById} setOpenDrawer={setOpenDrawer} />
                            </Row>
                        </Col>
                    </Row>

                    <StatusComponents dockerById={dockerById} />

                    {dockerById.service_details && (
                        <Row gutter={16} style={{ marginTop: 0 }}>
                            <Paragraph style={{ fontSize: 14 }}>
                                {dockerById.service_details.description}
                            </Paragraph>
                        </Row>
                    )}

                    <DurationComponent dockerById={dockerById} />
                    <PlanDetailsComponent currentSubscription={dockerById} />
                    <ManagedResourcePlanDetails currentSubscription={dockerById} />


                    <div>
                        <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                            {tSubscription("accessUrl")}
                        </Typography>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", paddingBottom: "15px" }}>
                            <Input
                                value={dockerById.access_url}
                                readOnly
                                style={{ cursor: "default", userSelect: "text", caretColor: "transparent", width: "fit", marginRight: "5px" }}
                            />
                            <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(dockerById.access_url)} />
                        </div>
                    </div>
                    <div>
                        <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                            {tSubscription("argocdUrl")}
                        </Typography>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", paddingBottom: "15px" }}>
                            <Input
                                value={dockerById.argocd_url}
                                readOnly
                                style={{ cursor: "default", userSelect: "text", caretColor: "transparent", width: "fit", marginRight: "5px" }}
                            />
                            <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(dockerById.argocd_url)} />
                        </div>
                    </div>
                    <div>
                        <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                            {tSubscription("argocduserName")}
                        </Typography>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", paddingBottom: "15px" }}>
                            <Input
                                value={dockerById.argocd_user_name}
                                readOnly
                                style={{ cursor: "default", userSelect: "text", caretColor: "transparent", width: "fit", marginRight: "5px" }}
                            />
                            <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(dockerById.argocd_user_name)} />
                        </div>
                    </div>
                    <div>
                        <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                            {tSubscription("argocdPassword")}
                        </Typography>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", paddingBottom: "15px" }}>
                            {/* <Input
                                value={dockerById.argocd_password}
                                readOnly
                                style={{ cursor: "default", userSelect: "text", caretColor: "transparent", width: "fit", marginRight: "5px" }}
                            /> */}
                            <Input.Password
                                value={dockerById.argocd_password}
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
                            <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(dockerById.argocd_password)} />
                        </div>
                    </div>
                    <div>
                        <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                            {tSubscription("backendUrl")}
                        </Typography>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", paddingBottom: "15px" }}>
                            <Input
                                value={dockerById.backend_url}
                                readOnly
                                style={{ cursor: "default", userSelect: "text", caretColor: "transparent", width: "fit", marginRight: "5px" }}
                            />
                            <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(dockerById.backend_url)} />
                        </div>
                    </div>
                    <div>
                        <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                            {tSubscription("frontendUrl")}
                        </Typography>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", paddingBottom: "15px" }}>
                            <Input
                                value={dockerById.frontend_url}
                                readOnly
                                style={{ cursor: "default", userSelect: "text", caretColor: "transparent", width: "fit", marginRight: "5px" }}
                            />
                            <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(dockerById.frontend_url)} />
                        </div>
                    </div>

                    {/* PARAMETERS SECTION */}
                    <ParametersSection dockerById={dockerById} />

                    <DocumentationDrawer openDrawer={openDrawer} onClose={onClose} currentSubscription={dockerById} t={t} />
                </>
            )}

            {!isLoading && loadingError && <Result status="500" title={t("error")} subTitle={t("subTitleError")} />}
        </Space>
    );
}
