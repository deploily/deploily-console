"use client";
import {useApiServiceSubscriptionStates} from "@/lib/features/api-service-subscription-states/apiServiceSubscriptionSelectors";
import {updateApiServiceSubscriptionStates} from "@/lib/features/api-service-subscription-states/apiServiceSubscriptionSlice";
import {useAppDispatch} from "@/lib/hook";
import {theme} from "@/styles/theme";
import {Card, Col, ConfigProvider, Input, Row, Select, Space, Typography} from "antd";
import {useEffect, useState} from "react";
import {useScopedI18n} from "../../../../../../../../../../locales/client";
import {options} from "../../../../utils/apiServicesConst";

export default function NewApiServiceSubscriptionInfo({planSelected}: {planSelected: any}) {
  const {totalAmount, duration} = useApiServiceSubscriptionStates();

  const translate = useScopedI18n("apiServiceSubscription");
  const dispatch = useAppDispatch();

  const handleChangeDuration = (value: number) => {
    dispatch(updateApiServiceSubscriptionStates({duration: value}));
  };


  return (
    <>
      <Typography.Title level={4} style={{paddingBottom: 30}}>
        {translate("subscribeService")}
      </Typography.Title>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderColor: theme.token.gray50,
          boxShadow: "none",
        }}
      >
        {planSelected != undefined && (
          <Space direction="vertical" style={{width: "100%"}}>
            <Row gutter={16} align="top">
              <Col span={14}>
                {" "}
                <Typography.Text strong>{translate("serviceName")}</Typography.Text>
              </Col>
              <Col span={10}>
                {" "}
                <Typography.Text>{planSelected.service.name}</Typography.Text>
              </Col>
            </Row>
            <Row gutter={16} align="top">
              <Col span={14}>
                {" "}
                <Typography.Text strong>{translate("servicePlanSelected")}</Typography.Text>
              </Col>
              <Col span={10}>
                {" "}
                <Typography.Text>{planSelected.plan.name}</Typography.Text>
              </Col>
            </Row>
            <Row gutter={16} align="top">
              <Col span={14}>
                {" "}
                <Typography.Text strong>{translate("duration")}</Typography.Text>
              </Col>
              <Col span={10}>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        colorBgContainer: theme.token.gray50,
                      },
                    },
                  }}
                >
                  <Select
                    defaultValue={duration}
                    style={{
                      width: 150,
                      borderRadius: "10px",
                    }}
                    onChange={handleChangeDuration}
                    dropdownStyle={{
                      backgroundColor: theme.token.gray50,
                      border: `2px solid ${theme.token.gray100}`,
                    }}
                    options={options}
                  />
                </ConfigProvider>
              </Col>
            </Row>
            <Row gutter={16} align="top">
              <Col span={14}>
                {" "}
                <Typography.Text strong>{translate("price")}</Typography.Text>
              </Col>
              <Col span={10}>
                {" "}
                <Typography.Text strong>
                  {" "}
                  {Intl.NumberFormat("fr-FR", {useGrouping: true}).format(planSelected.price)}{" "}
                </Typography.Text>
                <Typography.Text> DZD </Typography.Text>{" "}
              </Col>
            </Row>
            <Row gutter={16} align="top">
              <Col span={14}>
                {" "}
                <Typography.Text strong>{translate("totalAmount")}</Typography.Text>
              </Col>
              <Col span={10} color="red">
                <Typography.Text
                  strong
                  style={{fontSize: 16, fontWeight: 500, color: theme.token.orange400}}
                >
                  {Intl.NumberFormat("fr-FR", {useGrouping: true}).format(totalAmount)}
                  <span style={{fontSize: 12, fontWeight: 400}}> DZD</span>
                </Typography.Text>
              </Col>
            </Row>
          </Space>
        )}
      </Card>
    </>
  );
}
