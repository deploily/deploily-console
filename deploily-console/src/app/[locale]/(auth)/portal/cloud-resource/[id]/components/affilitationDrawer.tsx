"use client";
import { Provider, ResourceInterface } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { useCloudResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { postAffiliation } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { CloseCircleTwoTone, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Collapse, Drawer, notification, Row, Space, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../../locales/client";
import { getItemsHelp } from "./itemsHelp";
export default function AffiliationDrawer({ openDrawer, onClose, planSelected, currentResource }: { openDrawer: any, onClose: any, planSelected: any, currentResource: ResourceInterface }) {
    const t = useScopedI18n("itemsHelp");
    const translate = useScopedI18n('subscription');
    const toastTranslate = useScopedI18n('toast');
    const itemsHelp = getItemsHelp(t);
    const { isAffiliationCreatedSuccess, isAffiliationCreatedFailed } = useCloudResource();
    const router = useRouter();

    const dispatch = useAppDispatch();
    const [affiliation, setAffiliation] = useState<any>(null);
    const [provider, setProvider] = useState<Provider>();
    const customExpandIcon = (panelProps: any) =>
        panelProps.isActive ? <MinusOutlined /> : <PlusOutlined />;

    function applyDiscount(price: number, percentage: number): number {
        return Math.round(price * (1 - percentage / 100));
    }



    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: 20 }} />
                    <span style={{ color: '#000', fontWeight: 600 }}> {toastTranslate("titleFailed")}</span>
                </div>
            ),
            description: (
                <div style={{ color: '#888' }}>
                    {toastTranslate("failed")}
                </div>
            ),
            duration: 4,
            style: {
                backgroundColor: '#fff',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
        });
    };


    useEffect(() => {
        if (isAffiliationCreatedSuccess) {
            router.replace("/portal/my-resources");
        } if (isAffiliationCreatedFailed) {
            openNotification();
        }

        setProvider(currentResource.provider)

        if (planSelected) {
            setAffiliation({
                service_plan_selected_id: planSelected.id,
                total_price: applyDiscount(planSelected!.price, currentResource.discount)
            });
        }
    }, [currentResource.discount, currentResource.provider, planSelected, router, toastTranslate]);
    const handleAffiliation = async () => {
        dispatch(postAffiliation(affiliation))
    };

    return (
        <>
            {contextHolder}
            <Drawer
                placement="right"
                closable={true}
                onClose={onClose}
                open={openDrawer}
                getContainer={false}
                width={600}
                styles={{
                    header: { borderBottom: "none", backgroundColor: theme.token.darkGray },
                    body: { padding: 0, backgroundColor: theme.token.darkGray },
                }}
            >

                <Col style={{ padding: 20 }}>
                    <Typography.Title level={4} style={{ paddingBottom: 30 }}>Order Resource </Typography.Title>
                    <Card style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        borderColor: theme.token.gray50,
                        boxShadow: "none",
                    }}
                    >
                        {(planSelected != undefined && provider != undefined) &&
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <Row gutter={16} align="top" >
                                    <Col span={14} >  <Typography.Text strong >Provider Name : </Typography.Text></Col>
                                    <Col span={10} > <Typography.Text >{provider.name}</Typography.Text></Col>
                                </Row>
                                <Row gutter={16} align="top" >
                                    <Col span={14} >  <Typography.Text strong >Email : </Typography.Text></Col>
                                    <Col span={10} > <Typography.Text >{provider.mail_support}</Typography.Text></Col>
                                </Row>
                                <Row gutter={16} align="top" >
                                    <Col span={14} >  <Typography.Text strong >Phone : </Typography.Text></Col>
                                    <Col span={10} > <Typography.Text >{provider.phone_support}</Typography.Text></Col>
                                </Row>
                                <Row gutter={16} align="top" >
                                    <Col span={14} >  <Typography.Text strong >Website : </Typography.Text></Col>
                                    <Col span={10} > <Typography.Text >{provider.website}</Typography.Text></Col>
                                </Row>
                                <Row gutter={16} align="top" >
                                    <Col span={14} >  <Typography.Text strong > Service Plan selected : </Typography.Text></Col>
                                    <Col span={10} > <Typography.Text >{planSelected.plan.name}</Typography.Text></Col>
                                </Row>
                                <Row gutter={16} align="top" >
                                    <Col span={14} >  <Typography.Text strong > Price :</Typography.Text></Col>
                                    <Col span={10} > <Typography.Text >
                                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(applyDiscount(planSelected!.price, currentResource.discount))}
                                        <span style={{ fontSize: 12, fontWeight: 400 }}> DZD/{translate("month")}</span>
                                    </Typography.Text></Col>
                                </Row>
                            </Space>
                        }

                    </Card>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24, marginBottom: 24 }}>
                        <Button
                            onClick={() => handleAffiliation()}
                            style={{
                                color: theme.token.colorWhite,
                                backgroundColor: theme.token.orange600,
                                border: "none",
                                paddingInline: 24,
                                paddingBlock: 12,
                                fontWeight: 600,
                                fontSize: 16,
                            }}
                        >
                            Confirm & Order Now
                        </Button>
                    </div>

                    <Collapse accordion
                        expandIcon={customExpandIcon}
                        expandIconPosition="end"

                        defaultActiveKey={['1']}
                        style={{
                            backgroundColor: theme.token.darkGray,
                            color: theme.token.blue100,
                            borderRadius: 12,
                            overflow: 'hidden',
                        }}
                        items={(itemsHelp ?? []).map(({ key, label, children }) => ({
                            key,
                            label: (
                                <Typography.Text style={{ color: '#fff', fontWeight: 600 }}>
                                    {label}
                                </Typography.Text>
                            ),
                            children:
                                (<Typography.Text >
                                    {children}
                                </Typography.Text>),
                            style: {
                                backgroundColor: "#0B0D10",
                                borderBottom: `1px solid ${theme.token.gray50}`,
                            },
                        }))}
                    />

                </Col>

            </Drawer>
        </>
    )
}
