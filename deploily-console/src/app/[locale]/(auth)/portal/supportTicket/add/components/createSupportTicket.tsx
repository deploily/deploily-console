// import { useI18n } from "../../../../../../../locales/client";

import { Plus } from "@phosphor-icons/react";
import { Button, Input, Row, Select, Typography, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useScopedI18n } from "../../../../../../../../locales/client";

import React from 'react';
import { UploadOutlined } from '@ant-design/icons';

export default function CreateSupportTecket() {
    const t = useScopedI18n('createSupportTicket')
    
    return (
        <>
            <Title level={3} style={{ fontWeight: 700, color: '#ffff' }}>
                {t("title")}

            </Title>

            <Typography style={{ marginBlock: 30, fontSize: 16 }}>
                {t("typography")}
            </Typography>

            <Select
                style={{ width: "100%", height: 40 }}
                showSearch
                placeholder={t("selectService")}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                    {
                        value: '1',
                        label: 'Service 1',
                    },
                    {
                        value: '2',
                        label: 'Service 2',
                    },
                    {
                        value: '3',
                        label: 'Service 3',
                    },

                ]}

            />
            <Input style={{ marginBlock: 20, height: 40, borderRadius: 0 }} placeholder={t("subject")} allowClear />
            <TextArea
                style={{ borderRadius: 0 }}
                placeholder={t("description")}
                autoSize={{ minRows: 5, maxRows: 10 }}
            />
            <div style={{ marginBlock: 20, }}>
                <Upload style={{ border: "none" }}
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture"
                    maxCount={1}
                // defaultFileList={fileList}
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
            <Row style={{ display: "flex", justifyContent: "end" }} >
                <Button
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
        </>
    )
}