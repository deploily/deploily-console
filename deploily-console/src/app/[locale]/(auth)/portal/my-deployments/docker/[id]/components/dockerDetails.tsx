"use client"
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import {
    Badge,
    Button,
    Col,
    Form,
    Input,
    Result,
    Row,
    Skeleton,
    Space,
    Typography
} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import StatusComponents from "./componentsDockerDetails/statusComponent";
import DocumentationComponent from "./componentsDockerDetails/documentationComponent";
import DurationComponent from "./componentsDockerDetails/durationComponent";
import { useDockerById } from "@/lib/features/docker/dockerSelector";
import { fetchDockerById } from "@/lib/features/docker/dockerThunks";
import { handleCopy } from "@/lib/utils/handleCopy";
import { Copy, Plus, Trash } from "@phosphor-icons/react";
import DocumentationDrawer from "../../../../utils/documentationDrawer";

export default function MyDockerDetails({ my_dep_id }: { my_dep_id: number }) {
    const t = useI18n();
    const tSubscription = useScopedI18n("subscription");
    const tDeployments = useScopedI18n("deployments");
    const dispatch = useAppDispatch();
    const { dockerById, isLoading, loadingError } = useDockerById();

    useEffect(() => {
        dispatch(fetchDockerById(my_dep_id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [openDrawer, setOpenDrawer] = useState(false);
    const onClose = () => setOpenDrawer(false);

    // 🆕 Ant Design form
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        console.log("Submitted Key/Values:", values);
        // Here you could dispatch to redux or call backend API
    };

    return (
        <Space
            direction="vertical"
            size="large"
            style={{
                paddingInline: 40,
                marginBlock: 10,
                width: "100%",
                marginBottom: 50,
                paddingTop: 20
            }}
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
                                <Col
                                    span={24}
                                    style={{
                                        display: "flex",
                                        justifyContent: "end",
                                        alignSelf: "start"
                                    }}
                                >
                                    <Typography.Title
                                        level={2}
                                        style={{ color: theme.token.orange400 }}
                                    >
                                        {Intl.NumberFormat("fr-FR", { useGrouping: true }).format(
                                            dockerById.price
                                        )}{" "}
                                        DZD /{" "}
                                        {dockerById.price_category === "monthly"
                                            ? t("month")
                                            : t("year")}
                                    </Typography.Title>
                                </Col>
                                <DocumentationComponent
                                    dockerById={dockerById}
                                    setOpenDrawer={setOpenDrawer}
                                />
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

                    <div>
                        <Typography
                            style={{
                                fontWeight: 700,
                                fontSize: 24,
                                color: theme.token.orange600
                            }}
                        >
                            {tSubscription("accessUrl")}
                        </Typography>
                        <div
                            style={{
                                flexDirection: "row",
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                paddingBottom: "15px"
                            }}
                        >
                            <Input
                                value={dockerById.access_url}
                                readOnly
                                style={{
                                    cursor: "default",
                                    userSelect: "text",
                                    caretColor: "transparent",
                                    width: "fit",
                                    marginRight: "5px"
                                }}
                            />
                            <Button
                                type="primary"
                                style={{ boxShadow: "none" }}
                                icon={<Copy />}
                                onClick={() => handleCopy(dockerById.access_url)}
                            />
                        </div>
                    </div>

                    {/* 🆕 FORM FOR KEY/VALUE */}
                    <div style={{ marginTop: 30 }}>
                        <Typography
                            style={{
                                fontWeight: 700,
                                fontSize: 24,
                                color: theme.token.orange600
                            }}
                        >
                            {tDeployments("configureSettings")} {/* traduction */}
                        </Typography>

                        <Form
                            form={form}
                            onFinish={handleFinish}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Form.List name="pairs">
                                {(fields, { add, remove }) => (
                                    <>
                                        <Form.Item style={{ marginBottom: 12, justifyContent: 'end', display: 'flex' }}>
                                            <Button
                                                type="primary"
                                                style={{ boxShadow: "none" }}
                                                onClick={() => add()}
                                                icon={<Plus />}
                                            >
                                                {tDeployments("addParameter")} {/* traduction */}
                                            </Button>
                                        </Form.Item>

                                        {fields.map(({ key, name, ...restField }) => (
                                            <Row key={key} gutter={8}>
                                                <Col flex="1">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, "key"]}
                                                        rules={[{ required: true, message: "Key required" }]}
                                                    >
                                                        <Input placeholder="Key" />
                                                    </Form.Item>
                                                </Col>
                                                <Col flex="1">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, "value"]}
                                                        rules={[{ required: true, message: "Value required" }]}
                                                    >
                                                        <Input placeholder="Value" />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        danger
                                                        style={{ boxShadow: "none" }}
                                                        icon={<Trash />}
                                                        onClick={() => remove(name)}
                                                    />
                                                </Col>
                                            </Row>
                                        ))}
                                        {/* ✅ Show Save button only if at least one item exists */}
                                        {fields.length > 0 && (
                                            <Form.Item
                                                style={{ display: "flex", justifyContent: "end" }}
                                            >
                                                <Button type="primary" htmlType="submit" style={{ boxShadow: "none" }}>
                                                    {t("save")}
                                                </Button>
                                            </Form.Item>
                                        )}
                                    </>
                                )}
                            </Form.List>
                        </Form>
                    </div>

                    <DocumentationDrawer
                        openDrawer={openDrawer}
                        onClose={onClose}
                        currentSubscription={dockerById}
                        t={t}
                    />
                </>
            )}
            {!isLoading && loadingError && (
                <Result
                    status="500"
                    title={t("error")}
                    subTitle={t("subTitleError")}
                />
            )}
        </Space>
    );
}
