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
        console.log(values)
        try {
            const payload = {
                ...values,
                is_company: isCompany,
            };
            const response =   await dispatch(postPaymentProfile(payload)).unwrap();
            message.success("Payment profile created successfully!");
            setIsCompany(false);
            if (response?.id) {
                router.push(`/portal/payment-profiles/${response.id}`);
            }
        } catch (err: any) {
            message.error("Failed to create payment profile: " + err);
        }
    };

    return (
        <div style={{ paddingInline: 10 }}>
            <Row gutter={16} style={{ marginTop: 30 }}>
                <Col span={14}>
                    <Title level={3} style={{ fontWeight: 700, color: "#fff" }}>
                        {t("addPaymentProfile")}
                    </Title>
                </Col>
            </Row>

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

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                style={{ paddingInline: 20, marginTop: 20 }}
            >
                <Row gutter={16}>
                    <Col md={12} xs={24}>
                        <Form.Item label={t("firstName")} name="name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item label={t("lastName")} name="last_name">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col md={24} xs={24}>
                        <Form.Item label={t("etreprise")} name="company_name">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col md={24} xs={24}>
                        <Form.Item label={t("address")} name="address">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col md={16} xs={24}>
                        <Form.Item label={t("city")} name="city">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item label={t("codePostal")} name="postal_code">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col md={24} xs={24}>
                        <Form.Item label={t("wilaya")} name="wilaya">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col md={24} xs={24}>
                        <Form.Item label={t("country")} name="country">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col md={24} xs={24}>
                        <Form.Item label={t("phone")} name="phone">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label={t("isCompany")}>
                    <Radio.Group
                        onChange={(e) => setIsCompany(e.target.value)}
                        value={isCompany}
                    >
                        <Radio value={true}>{t("yes")}</Radio>
                        <Radio value={false}>{t("no")}</Radio>
                    </Radio.Group>
                </Form.Item>

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
                            <Col md={12} xs={24}>
                                <Form.Item label={t("commercialRegister")} name="company_registration_number">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item label={t("taxArticle")} name="tax_article">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col md={12} xs={24}>
                                <Form.Item label={t("nif")} name="nif">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item label={t("nis")} name="nis">
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
