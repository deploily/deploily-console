"use client";
import { postAffiliation } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Collapse, CollapseProps, Drawer, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";


export default function AffiliationDrawer({ openDrawer, onClose, planSelected, provider }: { openDrawer: any, onClose: any, planSelected: any, provider: any }) {
    const itemsHelp: CollapseProps['items'] = [
        {
            key: '1',
            label: 'How it work ?',
            children: 'Deploily establishes a contract with a cloud provider to obtain exclusive discounts.',
        },
        {
            key: '2',
            label: 'Comment avoir remise ?',
            children: 'Vous devez avoir un compte approuvé par l’équipe Deploily.',
        },
        {
            key: '3',
            label: 'Comment appliquer remise ?',
            children: 'La remise est automatiquement appliquée une fois connecté.',
        },
        {
            key: '4',
            label: 'Pourqui on peut pas commender sur deploily ?',
            children: 'Certains fournisseurs ne permettent pas encore la commande directe.',
        },
        {
            key: '5',
            label: 'Mission Deploily ?',
            children: 'Faciliter l’accès aux ressources cloud à prix réduit.',
        },
    ];
    const dispatch = useAppDispatch();
    const [affiliation, setAffiliation] = useState<any>(null);
    const customExpandIcon = (panelProps: any) =>
        panelProps.isActive ? <MinusOutlined /> : <PlusOutlined />;

    useEffect(() => {

        if (planSelected && provider) {
            setAffiliation({
                provider: provider.id,
                service_plan: planSelected.id,
                total_price: planSelected.price,
                Affiliation_state: "pending",
            });
        }
    }, [planSelected, provider]);
    const handleAffiliation = async () => {
        dispatch(postAffiliation(affiliation))
    };

    return (
        <>
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
                                    <Col span={10} > <Typography.Text >{planSelected.price}</Typography.Text></Col>
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
                        items={itemsHelp.map(({ key, label, children }) => ({
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
