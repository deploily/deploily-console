// import { useI18n } from "../../../../../../../locales/client";

import { Plus } from "@phosphor-icons/react";
import { Button, Form, Input, message, Row, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useScopedI18n } from "../../../../../../../../locales/client";

import { SubscriptionInterface } from "@/lib/features/subscriptions/subscriptionInterface";
import { useSubscription } from "@/lib/features/subscriptions/subscriptionSelectors";
import { fetchSubscription } from "@/lib/features/subscriptions/subscriptionThunks";
import { useSupportTicket } from "@/lib/features/support-ticket/supportTicketSelector";
import { postSupportTicket } from "@/lib/features/support-ticket/supportTicketThunks";
import { useAppDispatch } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
const { Option } = Select;

export default function CreateSupportTicket() {
    const t = useScopedI18n('createSupportTicket')
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { subscriptionResponse } = useSubscription()
    const { addSupportTicketSuccess, addSupportTicketError } = useSupportTicket()
    const [messageApi] = message.useMessage();
    const router = useRouter()
    useEffect(() => {
        dispatch(fetchSubscription());
        if (addSupportTicketSuccess) {
            messageApi.open({
                type: 'success',
                content: 'Support ticket created successfully!',
            });
        }

        if (addSupportTicketError) {
            messageApi.open({
                type: 'error',
                content: 'Support ticket created successfully!',
            });

        }
    }, [addSupportTicketSuccess, addSupportTicketError]);
    const onFinish = (values: any) => {
        dispatch(postSupportTicket({
            subscription_id: values.subscription,
            title: values.subject,
            description: values.description,
            status: "open"
        })).then(() => {
            form.resetFields();
            router.back()
        })
    };




    return (
        <>
            <Title level={3} style={{ fontWeight: 700, color: '#ffff' }}>
                {t("title")}

            </Title>

            <Typography style={{ marginBlock: 30, fontSize: 16 }}>
                {t("typography")}
            </Typography>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
            >
                <Form.Item name="subscription" rules={[{ required: true }]}>
                    <Select
                        allowClear
                        style={{ width: "100%", height: 40 }}
                        placeholder={t("selectSubscription")}

                    >
                        {subscriptionResponse !== undefined ? subscriptionResponse?.result?.map((value: SubscriptionInterface) => (
                            <Option key={value.id} value={value.id}>{value.service_details.name} / {value.name}</Option>
                        )) : null}

                    </Select>

                </Form.Item>
                <Form.Item name="subject" rules={[{ required: true }]}>
                    <Input
                        allowClear
                        placeholder={t("subject")}
                        style={{ marginBlock: 20, height: 40, borderRadius: 0 }} />
                </Form.Item>
                <Form.Item name="description" rules={[{ required: true }]}>
                    <TextArea
                        style={{ borderRadius: 0 }}
                        placeholder={t("description")}
                        autoSize={{ minRows: 5, maxRows: 10 }}

                    />
                </Form.Item>
                <Form.Item>
                    <Row style={{ display: "flex", justifyContent: "end" }} >
                        <Button htmlType="submit"
                            style={{
                                color: "#ffff",
                                backgroundColor: "#5394CC",
                                padding: 10,
                                marginTop: 20,
                                borderRadius: 25,
                                fontSize: 15,
                                height: 45
                            }}
                            onClick={() => { }}
                        >
                            <Plus size={20} style={{ color: "rgba(220, 233, 245, 0.88)" }} />
                            {t("createTicket")}
                        </Button>
                    </Row>
                </Form.Item>
            </Form>
        </>
    )
}