"use client"

 import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { Badge, Button, Col, Input, Result, Row, Skeleton, Space, Typography } from "antd"
import Paragraph from "antd/es/typography/Paragraph";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import { Copy, EyeSlash, Eye } from "@phosphor-icons/react";
import { handleCopy } from "@/lib/utils/handleCopy";
import StatusComponents from "./componentsNextCloudDetails/statusComponent";
import DurationComponent from "./componentsNextCloudDetails/durationComponent";
import DocumentationDrawer from "../../../../utils/documentationDrawer";
import DocumentationComponents from "./componentsNextCloudDetails/documentationComponent";
import Link from "antd/es/typography/Link";
import { useNextCloudAppById } from "@/lib/features/next-cloud/nextCloudSelector";
import { fetchNextCloudAppById } from "@/lib/features/next-cloud/nextCloudThunks";

export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
    const t = useI18n();

    const tSubscription = useScopedI18n('subscription');
    const tOdoo = useScopedI18n("odooApp");
    const [visible, setVisible] = useState(false);

    const dispatch = useAppDispatch();
    const { nextCloudAppById, isLoading, loadingError } = useNextCloudAppById()
    const [openDrawer, setOpenDrawer] = useState(false);
    const onClose = () => {
        setOpenDrawer(false);
    };
    useEffect(() => {
        dispatch(fetchNextCloudAppById(my_app_id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Space direction="vertical" size="large" style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}>
                {isLoading && nextCloudAppById === undefined &&
                    <>
                        <Skeleton.Image active style={{ marginBottom: 10 }} />
                        <Skeleton active paragraph={{ rows: 2 }} />
                    </>
                }
                {!isLoading && nextCloudAppById !== undefined &&
                    <>
                        <Row gutter={16}  >
                            <Col md={16} xs={24} >
                                <Badge offset={[-20, 20]}>
                                    {nextCloudAppById.service_details && <ImageFetcher
                                        imagePath={nextCloudAppById.service_details.image_service}
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
                                            {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(nextCloudAppById.price)} DZD / {nextCloudAppById.service_plan.subscription_category === "monthly" ? t("month") : t("year")}

                                        </Typography.Title>
                                    </Col>
                                    <DocumentationComponents nextCloudAppById={nextCloudAppById} setOpenDrawer={setOpenDrawer} />
                                </Row>
                            </Col>
                        </Row>

                        <StatusComponents nextCloudAppById={nextCloudAppById} />


                        {nextCloudAppById.service_details && <Row gutter={16} style={{ marginTop: 0 }} >
                            <Paragraph style={{ fontSize: 14 }} >
                                {nextCloudAppById.service_details.description}

                            </Paragraph>
                        </Row>}

                        <DurationComponent nextCloudAppById={nextCloudAppById} />
                        <div>
                            <Typography style={{ fontWeight: 700, fontSize: 20, color: theme.token.orange600 }}>
                                {tSubscription("accessUrl")}
                            </Typography>

                            {/* <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    paddingBottom: "15px",
                                    alignItems: "center",
                                }}
                            >
                                <Link
                                    href={nextCloudAppById.access_url}
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
                                    {nextCloudAppById.access_url}
                                </Link>

                                <Button
                                    type="primary"
                                    style={{ boxShadow: "none" }}
                                    icon={<Copy />}
                                    onClick={() => handleCopy(nextCloudAppById.access_url)}
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
                                    value={nextCloudAppById.odoo_password}
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
                                    onClick={() => handleCopy(nextCloudAppById.odoo_password)}
                                />
                            </div> */}
                        </div>
                        <DocumentationDrawer openDrawer={openDrawer} onClose={onClose} currentSubscription={nextCloudAppById} t={t} />

                    </>}
                {!isLoading && loadingError &&
                    <Result
                        status="500"
                        title={t('error')}
                        subTitle={t('subTitleError')}
                    />}
            </Space >
        </>
    )
}