"use client";
import {Col, Row, Image, Typography, theme, Collapse, Card, Button} from "antd";
import {CaretDown, CaretUp} from "@phosphor-icons/react";
import {getItems} from "./getItems";
import {useI18n} from "../../../../../../../locales/client";

export default function Page() {
  const {useToken} = theme;
  const {token} = useToken();
  const t = useI18n();
  return (
    <>
      <Row gutter={16}>
        <Col style={{padding: "50px 0px 50px 50px"}}>
          <Image alt="Logo" src="/images/logo_service.png" width={220} height={220} />
        </Col>

        <Col style={{justifyContent: "start", padding: 45}}>
          <Typography.Title level={2}>Openrouteservice API</Typography.Title>
          <Typography.Title level={2} style={{color: token.colorPrimaryTextHover}}>
            1000,00
          </Typography.Title>
          <Typography.Title level={4}>
            Short description Short description Short description Short description
          </Typography.Title>
        </Col>
        <Col style={{padding: 50, textAlign: "center"}}>
          <Card style={{width: 250}}>
            <Typography style={{color: "#7D7D7D", paddingBottom: 10}}>{t("offeredBy")}</Typography>
            <Col style={{paddingBottom: 10, textAlign: "center"}}>
              <Image alt="Logo" src="/images/logo_transformatek.png" width={70} height={70} />
            </Col>
            <Typography style={{paddingBottom: 10}}> {t("oneMonthFree")} </Typography>

            <Button
              style={{
                justifyContent: "end",
                color: "#fff",
                backgroundColor: "#D85912",
                border: "none",
                padding: "4px",
              }}
            >
              {" "}
              <span
                style={{
                  color: "rgba(220, 233, 245, 0.88)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {t("TryForFree")}
              </span>
            </Button>
          </Card>
        </Col>
      </Row>
      <Row style={{padding: 20, paddingLeft: 50}} justify="start">
        <Col span={16}>
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({isActive}) => (isActive ? <CaretUp /> : <CaretDown />)}
            expandIconPosition="end"
            style={{
              background: token.colorBgContainer,
              width: "100%",
            }}
            items={getItems}
          />
        </Col>
      </Row>
      <Typography.Title level={2} style={{color: "#3696EA", padding: 50}}>
        {t("youLike")}
      </Typography.Title>
    </>
  );
}
