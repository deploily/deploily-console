"use client";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/hook";
import { Form, Input, Row, Col, Button, Typography, Space, Tooltip } from "antd";
import { Pencil, Plus, Trash } from "@phosphor-icons/react";
import { postDockerParameters } from "@/lib/features/docker/dockerThunks";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import { theme } from "@/styles/theme";

interface Parameter {
    id: number;
    key: string;
    value: string;
}

interface ParametersSectionProps {
    dockerById: any;
    my_dep_id: number;
    form: any;
}

export default function ParametersSection({
    dockerById,
    my_dep_id,
    form,
}: ParametersSectionProps) {
    const dispatch = useAppDispatch();
    const tDeployments = useScopedI18n("deployment");

    // edit states
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editKey, setEditKey] = useState("");
    const [editValue, setEditValue] = useState("");

    const handleEdit = (param: Parameter) => {
        setEditingId(param.id);
        setEditKey(param.key);
        setEditValue(param.value);
    };

    const handleSave = (paramId: number) => {
        const updatedParams = dockerById.parameters.map((p: Parameter) =>
            p.id === paramId ? { ...p, key: editKey, value: editValue } : p
        );

        dispatch(
            postDockerParameters({
                parameters: updatedParams.reduce((acc: Record<string, string>, curr: any) => {
                    acc[curr.key] = curr.value;
                    return acc;
                }, {}),
            })
        );

        setEditingId(null);
    };

    const handleFinish = (values: any) => {
        dispatch(
            postDockerParameters({
                parameters: values.pairs,
            })
        );
    };

    return (
        <div style={{ marginTop: 30 }}>
            <Typography
                style={{
                    fontWeight: 700,
                    fontSize: 24,
                    color: theme.token.orange600, // optional: use theme.token.orange600
                }}
            >
                {tDeployments("configureSettings")}
            </Typography>

            {/* Display existing parameters */}
            {dockerById?.parameters?.length > 0 && (
                <div style={{ marginTop: 15 }}>
                    {dockerById.parameters.map((param: Parameter) => (
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
                            <Col
                                flex="auto"
                                style={{ display: "flex", alignItems: "center", gap: "12px" }}
                            >
                                {editingId === param.id ? (
                                    <>
                                        <Input
                                            value={editKey}
                                            onChange={(e) => setEditKey(e.target.value)}
                                            style={{ width: "120px" }}
                                        />
                                        <Typography.Text>=</Typography.Text>
                                        <Input
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            style={{ width: "200px" }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Typography.Text strong>{param.key}</Typography.Text>
                                        <Typography.Text type="secondary">= {param.value}</Typography.Text>
                                    </>
                                )}
                            </Col>

                            <Col style={{ display: "flex", gap: "8px" }}>
                                {editingId === param.id ? (
                                    <>
                                        <Button type="primary" style={{ boxShadow: "none" }} onClick={() => handleSave(param.id)}>
                                            Save
                                        </Button>
                                        <Button onClick={() => setEditingId(null)}>Cancel</Button>
                                    </>
                                ) : (
                                    <>

                                            <Space size="small" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Button
                                                        type="primary"
                                                        ghost
                                                        shape="circle"
                                                        icon={<Pencil />}
                                                        onClick={() => handleEdit(param)}
                                                    />

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
                                    </>
                                )}
                            </Col>
                        </Row>
                    ))}
                </div>
            )}

            {/* Form for adding new parameters */}
            <Form form={form} onFinish={handleFinish} autoComplete="off" layout="vertical">
                <Form.List name="pairs">
                    {(fields, { add, remove }) => (
                        <>
                            <Form.Item
                                style={{ marginBottom: 12, justifyContent: "end", display: "flex" }}
                            >
                                <Button
                                    type="primary"
                                    style={{ boxShadow: "none" }}
                                    onClick={() => add()}
                                    icon={<Plus />}
                                >
                                    {tDeployments("addParameter")}
                                </Button>
                            </Form.Item>

                            {fields.map(({ key, name }) => (
                                <Row key={key} gutter={8}>
                                    <Col flex="1">
                                        <Form.Item
                                            name={[name, "key"]}
                                            rules={[{ required: true, message: "Key required" }]}
                                        >
                                            <Input placeholder="Key" />
                                        </Form.Item>
                                    </Col>
                                    <Col flex="1">
                                        <Form.Item
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

                            {fields.length > 0 && (
                                <Form.Item style={{ display: "flex", justifyContent: "end" }}>
                                    <Button type="primary" htmlType="submit" style={{ boxShadow: "none" }}>
                                        Save
                                    </Button>
                                </Form.Item>
                            )}
                        </>
                    )}
                </Form.List>
            </Form>

        </div>
    );
}
