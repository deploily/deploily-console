"use client";

import { Col, Form, Input, Row, Button, message, Radio } from "antd";
import Title from "antd/es/typography/Title";
import { useAppDispatch } from "@/lib/hook";
import { postPaymentProfile } from "@/lib/features/payment-profiles/paymentProfilesThunks";
import { useScopedI18n } from "../../../../../../../../locales/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPaymentProfile() {
    const t = useScopedI18n("profilePayment");
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [isCompany, setIsCompany] = useState(false);
    const router = useRouter();

    const handleFinish = async (values: any) => {
        try {
            const payload = {
                ...values,
                is_company: isCompany,
            };
            const response = await dispatch(postPaymentProfile(payload)).unwrap();
            message.success("Payment profile created successfully!");
            setIsCompany(false);
            if (response?.id) {
                router.push(`/portal/payment-profiles/${response.id}`);
            }
        } catch (err: any) {
            message.error("Failed to create payment profile: " + err);
        }
    };

    const renderLabel = (text: string) => (
        <>
            {text}
            <span style={{ color: "red", marginLeft: 4 }}>*</span>
        </>
    );

    return (
        <div style={{ paddingInline: 10 }}>
            <Row gutter={16} style={{ marginTop: 30 }}>
                <Col span={14}>
                    <Title level={3} style={{ fontWeight: 700, color: "#fff" }}>
                        {t("addPaymentProfile")}
                    </Title>
                </Col>
            </Row>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                style={{ paddingInline: 20, marginTop: 20 }}
            >
                <Form.Item >
                    <Radio.Group
                        onChange={(e) => setIsCompany(e.target.value)}
                        value={isCompany}
                    >
                        <Radio value={false}>{t("isIndividual")}</Radio>
                        <Radio value={true}>{t("isCompany")}</Radio>
                    </Radio.Group>
                </Form.Item>

                <Row style={{ padding: 20 }}>
                    <span style={{
                        color: "white",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "18px",
                        fontWeight: 800,
                    }}>
                        {t("profileInformation")}
                    </span>
                </Row>

                <Row gutter={16}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            label={renderLabel(t("firstName"))}
                            name="name"
                            rules={[{ required: true }]}
                            required={false}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item
                            label={renderLabel(t("lastName"))}
                            name="last_name"
                            rules={[{ required: true }]}
                            required={false}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col md={24} xs={24}>
                        <Form.Item
                            label={renderLabel(t("address"))}
                            name="address"
                            rules={[{ required: true }]}
                            required={false}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col md={16} xs={24}>
                        <Form.Item
                            label={renderLabel(t("city"))}
                            name="city"
                            rules={[{ required: true }]}
                            required={false}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item
                            label={renderLabel(t("codePostal"))}
                            name="postal_code"
                            rules={[{ required: true }]}
                            required={false}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col md={24} xs={24}>
                        <Form.Item
                            label={renderLabel(t("wilaya"))}
                            name="wilaya"
                            rules={[{ required: true }]}
                            required={false}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col md={24} xs={24}>
                        <Form.Item
                            label={renderLabel(t("country"))}
                            name="country"
                            rules={[{ required: true }]}
                            required={false}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col md={24} xs={24}>
                        <Form.Item
                            label={renderLabel(t("phone"))}
                            name="phone"
                            rules={[{ required: true }]}
                            required={false}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {isCompany && (
                    <>
                        <Row style={{ padding: 20 }}>
                            <span style={{
                                color: "white",
                                fontFamily: "Inter, sans-serif",
                                fontSize: "18px",
                                fontWeight: 800,
                            }}>
                                {t("taxCoordinate")}
                            </span>
                        </Row>

                        <Row gutter={16}>
                            <Col md={24} xs={24}>
                                <Form.Item label={renderLabel(t("etreprise"))} name="company_name">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col md={12} xs={24}>
                                <Form.Item label={renderLabel(t("commercialRegister"))} name="company_registration_number">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item label={renderLabel(t("taxArticle"))} name="tax_article">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col md={12} xs={24}>
                                <Form.Item label={renderLabel(t("nif"))} name="nif">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item label={renderLabel(t("nis"))} name="nis">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, paddingBottom: 40 }}>
                    <Button type="primary" htmlType="submit" style={{ boxShadow: "none" }}>
                        {t("save")}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
