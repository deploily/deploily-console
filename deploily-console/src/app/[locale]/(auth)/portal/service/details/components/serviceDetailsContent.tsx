"use client";
import { Col, Row, Image, Typography, theme, Collapse, Card, Button } from "antd";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { useI18n } from "../../../../../../../../locales/client";
import { getItems } from "./getItems";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function ServiceDetailsContentPage() {
    const { useToken } = theme;
    const { token } = useToken();
    const t = useI18n();
    const [isMobile, setIsMobile] = useState(false);
   
    return (
        <>
            <Row gutter={16}>
                <Col style={{ padding: "50px 0px 50px 50px" }}>
                    <Image alt="Logo" src="/images/logo_service.png" width={220} height={220} />
                </Col>
                <Col xs={24} sm={12} md={8} lg={12} style={{ padding: 45, justifyContent: "start" }}>
                    <Typography.Title level={2}>Openrouteservice API</Typography.Title>
                    <Typography.Title level={2} style={{ color: token.colorPrimaryTextHover }}>1000,00</Typography.Title>
                    <Typography.Title level={4}>
                        Short description Short description Short description Short description
                    </Typography.Title>
                </Col>
            </Row>

            <Row
                justify={isMobile ? "center" : "start"}
                style={{
                    padding: 50,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: "20px",
                }}
            >
                <Col xs={24} sm={20} md={20} lg={16} style={{ textAlign: "start", width: "100%" }}>
                    <Collapse
                        bordered={false}
                        defaultActiveKey={["1"]}
                        expandIcon={({ isActive }) => (isActive ? <CaretUp /> : <CaretDown />)}
                        expandIconPosition="end"
                        style={{ background: token.colorBgContainer, width: "100%" }}
                        items={getItems}
                    />
                </Col>

                <Col style={{ padding: "0px 50px 50px 50px", textAlign: "center", display: "flex", justifyContent: "center" }}>
                    <Card style={{ width: 250 }}>
                        <Typography style={{ color: "#7D7D7D", paddingBottom: 10 }}>{t("offeredBy")}</Typography>
                        <Col style={{ paddingBottom: 10, textAlign: "center" }}>
                            <Image alt="Logo" src="/images/logo_transformatek.png" width={70} height={70} />
                        </Col>
                        <Typography style={{ paddingBottom: 10 }}> {t("oneMonthFree")} </Typography>

                        <Button
                            style={{
                                justifyContent: "end",
                                color: "#fff",
                                backgroundColor: "#D85912",
                                border: "none",
                                padding: "4px",
                            }}
                        ><Link href="/portal/myServices">
                            <span
                                style={{
                                    color: "rgba(220, 233, 245, 0.88)",
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                }}
                            >
                                {t("TryForFree")}
                            </span></Link>
                        </Button>
                    </Card>
                </Col>
            </Row>

            <Typography.Title level={2} style={{ color: "#3696EA", textAlign: "start", padding: "0px 50px 50px 50px" }}>
                {t("youLike")}
            </Typography.Title>
 
        </>
    );
}