"use client";
import { useAppDispatch } from "@/lib/hook";
import { Form, Input, Row, Col, Button, Typography, Space } from "antd";
import { Plus, Trash } from "@phosphor-icons/react";
import { postDockerParameters } from "@/lib/features/docker/dockerThunks";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import { theme } from "@/styles/theme";

interface Parameter {
    id: number;
    name: string;
    value: string;
}

interface ParametersSectionProps {
    dockerById: any;
}

export default function ParametersSection({
    dockerById,
}: ParametersSectionProps) {
    const dispatch = useAppDispatch();
    const tDeployments = useScopedI18n("deployment");
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        // send single param with deployment_subscription_id
        dispatch(
            postDockerParameters({
                data: {
                    deployment_subscription_id: dockerById.id,
                    name: values.name,
                    value: values.value,
                },
            })
        );
        form.resetFields();
    };

    return (
        <div style={{ marginTop: 30 }}>
            <Typography
                style={{
                    fontWeight: 700,
                    fontSize: 24,
                    color: theme.token.orange600,
                }}
            >
                {tDeployments("configureSettings")}
            </Typography>

            {/* Display existing parameters */}
            {dockerById?.custom_paramters?.length > 0 && (
                <div style={{ marginTop: 15 }}>
                    {dockerById.custom_paramters.map((param: Parameter) => (
                        <Row
                            key={param.id}
                            style={{
                                border: "1px solid #f0f0f0",
                                borderRadius: 8,
                                padding: "8px 12px",
                                marginBottom: 8,
                                alignItems: "center",
                                background: "#1a1818ff",
                            }}
                        >
                            <Col flex="auto" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <Typography.Text strong>{param.name}</Typography.Text>
                                <Typography.Text type="secondary">= {param.value}</Typography.Text>
                            </Col>

                            <Col>
                                <Space size="small">
                                    <Button
                                        danger
                                        type="primary"
                                        ghost
                                        shape="circle"
                                        icon={<Trash />}
                                        onClick={() =>
                                            dispatch(
                                                postDockerParameters({
                                                    parameters: dockerById.parameters
                                                        .filter((p: any) => p.id !== param.id)
                                                        .reduce((acc: Record<string, string>, curr: any) => {
                                                            acc[curr.key] = curr.value;
                                                            return acc;
                                                        }, {}),
                                                })
                                            )
                                        }
                                    />
                                </Space>
                            </Col>
                        </Row>
                    ))}
                </div>
            )}

            {/* Form for adding new single parameter */}
            <Form form={form} onFinish={handleFinish} autoComplete="off" layout="vertical" >
                <Row gutter={8} align="middle" style={{display:"flex", justifyItems:"center"}}>
                    <Col flex="1" >
                        <Form.Item 
                            name="name" style={{ marginBottom: 0 }}
                            rules={[{ required: true, message: "Key required" }]}
                        >
                            <Input placeholder="Key" />
                        </Form.Item>
                    </Col>
                    <Col flex="1">
                        <Form.Item
                            name="value" style={{ marginBottom: 0 }}
                            rules={[{ required: true, message: "Value required" }]}
                        >
                            <Input placeholder="Value" />
                        </Form.Item>
                    </Col>
                    <Col  >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ boxShadow: "none" }}
                            icon={<Plus />}
                        >
                            {tDeployments("addParameter")}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
