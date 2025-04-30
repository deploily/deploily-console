"use client";

import { CustomPayementInput } from "@/styles/components/inputStyle";
import { Col, Form, Row, Spin, Alert } from "antd";
import { useScopedI18n } from "../../../../../../../locales/client";
import { theme } from "@/styles/theme";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hook";
import { useProfile } from "@/lib/features/profile/profileSelectors";
import { getProfile } from "@/lib/features/profile/profileThunks";

export default function ProfileContentDetails() {
    const t = useScopedI18n("profile");
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { currentProfile } = useProfile();

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    useEffect(() => {
        if (currentProfile) {
            const currentValues = form.getFieldsValue();
            const isFormEmpty = !currentValues.name && !currentValues.lastName && !currentValues.email && !currentValues.username;

            if (isFormEmpty) {
                form.setFieldsValue({
                    name: currentProfile.first_name || "",
                    lastName: currentProfile.last_name || "",
                    email: currentProfile.email || "",
                    password: "", // not displayed, but placeholder
                    username: currentProfile.username || "",
                });
            }
        }
    }, []);



    return (
        <Form
            form={form}
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 0 }}
            colon={false}
            style={{ paddingInline: 20 }}
        >
            <Row gutter={[16, 16]}>
                <Col md={12} xs={24}>
                    <Form.Item label={t("firstName")} name="name">
                        <CustomPayementInput style={{ color: theme.token.colorWhite }} />
                    </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                    <Form.Item label={t("lastName")} name="lastName">
                        <CustomPayementInput style={{ color: theme.token.colorWhite }} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item label={t("email")} name="email">
                <CustomPayementInput style={{ color: theme.token.colorWhite }} />
            </Form.Item>

            <Row gutter={[16, 16]}>
                <Col md={24} xs={24}>
                    <Form.Item label={t("username")} name="username">
                        <CustomPayementInput style={{ color: theme.token.colorWhite }} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
