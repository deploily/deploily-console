// import { useI18n } from "../../../../../../../locales/client";

import { Plus } from "@phosphor-icons/react";
import { Button, Form, Input, message, Row, Select, Typography, Upload, UploadFile, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useScopedI18n } from "../../../../../../../../locales/client";

import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useAppDispatch } from "@/lib/hook";
import { fetchSubscribe } from "@/lib/features/subscribe/subscribeThunks";
import { useSubscribe } from "@/lib/features/subscribe/subscribeSelectors";
import { SubscribeInterface } from "@/lib/features/subscribe/subscribeInterface";
import { postSupportTicket } from "@/lib/features/support-ticket/supportTicketThanks";
import { useSupportTicket } from "@/lib/features/support-ticket/supportTicketSelector";
const { Option } = Select;

export default function CreateSupportTecket() {
    const t = useScopedI18n('createSupportTicket')
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { subscribeResponse, subscribeLoading, subscribeLoadingError } = useSubscribe()
    const { addSupportTicketSuccess, addSupportTicketError } = useSupportTicket()
    // const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState<UploadFile[]>()
    const [messageApi] = message.useMessage();

    useEffect(() => {
        dispatch(fetchSubscribe());
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

    const handleChange: UploadProps['onChange'] = ({ fileList: newFile }) =>
        setFileList(newFile);
    const onFinish = (values: any) => {
        dispatch(postSupportTicket({
            my_service_id: values.subscribe,
            title: values.subject,
            description: values.description,
            image: (fileList && fileList.length > 0) ? fileList[0].thumbUrl : null,
            status: "open"
        })).then(() => {
            setFileList([]);
            form.resetFields();
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
                <Form.Item name="subscribe" rules={[{ required: true }]}>
                    <Select
                        allowClear
                        style={{ width: "100%", height: 40 }}
                        placeholder={t("selectService")}

                    >
                        {subscribeResponse !== undefined ? subscribeResponse?.result?.map((value: SubscribeInterface) => (
                            <Option key={value.id} value={value.id}>{value.name}</Option>
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
                <Form.Item name="image" rules={[{ required: true }]}>
                    <div style={{ marginBlock: 20, }}>
                        <Upload style={{ border: "none" }}
                            accept="image/png, image/jpeg"
                            listType="picture"
                            maxCount={1}
                            fileList={fileList}
                            beforeUpload={() => false}
                            onChange={handleChange}
                        >
                            <Button style={{
                                color: "#fff",
                                backgroundColor: "#D85912",
                                border: "none",
                                paddingInline: 10,
                            }}>
                                <UploadOutlined />
                                {t('uploadFile')}
                            </Button>
                        </Upload>
                    </div>
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