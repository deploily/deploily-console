"use client";
import { Card, Col, ConfigProvider, Input, Row, Select, Space, Typography } from "antd";
import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { checkPromoCode } from "@/lib/features/promo-code/promoCodeThunks";
import { usePromoCode } from "@/lib/features/promo-code/promoCodeSelectors";
import { useSubscriptionStates } from "@/lib/features/subscriptionStates/subscriptionSelectors";

export default function NewSubscriptionInfo({ planSelected }: { planSelected: any }) {
  const { totalAmount, promoColor, duration } = useSubscriptionStates()

  const translate = useScopedI18n('subscription');
  const [promoCode, setPromoCode] = useState({ promo_code: "" });
  const dispatch = useAppDispatch();
  const { promoCodeResponse } = usePromoCode();


  const options = [
    { value: 1, label: '1 Month' },//TODO TRANSLATE THIS 
    { value: 3, label: '3 Months' },
    { value: 6, label: '6 Months' },
    { value: 12, label: '1 Year' },
  ];

  const handleChangeDuration = (value: number) => {
    dispatch({
      type: "SubscriptionStates/updateSubscriptionStates", payload: { duration: value }
    });
  };
  // Handles updating promo percent and color based on promoCodeResponse
  useEffect(() => {
    if (promoCodeResponse?.rate !== undefined) {
      dispatch({ type: "SubscriptionStates/updateSubscriptionStates", payload: { "promoCodeRate": promoCodeResponse.rate } })
    }
  }, [promoCodeResponse]);

  // Checks the promo code when its length reaches 10
  useEffect(() => {
    dispatch({ type: "SubscriptionStates/updateSubscriptionStates", payload: { "promoCode": promoCode.promo_code } })
    if (promoCode.promo_code.length === 10) {
      dispatch(checkPromoCode(promoCode));
    }
  }, [promoCode.promo_code]);

  return (
    <>
      <Typography.Title level={4} style={{ paddingBottom: 30 }}>{translate("subscribeService")}</Typography.Title>
      <Card style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderColor: theme.token.gray50,
        boxShadow: "none",
      }}
      >
        {(planSelected != undefined) &&
          <Space direction="vertical" style={{ width: "100%" }}>
            <Row gutter={16} align="top" >
              <Col span={14} >  <Typography.Text strong >{translate("serviceName")}</Typography.Text></Col>
              <Col span={10} > <Typography.Text >{planSelected.service.name}</Typography.Text></Col>
            </Row>
            <Row gutter={16} align="top" >
              <Col span={14} >  <Typography.Text strong >{translate("servicePlanSelected")}</Typography.Text></Col>
              <Col span={10} > <Typography.Text >{planSelected.plan.name}</Typography.Text></Col>
            </Row>
            <Row gutter={16} align="top" >
              <Col span={14} >  <Typography.Text strong >{translate("duration")}</Typography.Text></Col>
              <Col span={10} >
                <ConfigProvider theme={{
                  components: {
                    Select: {
                      colorBgContainer: theme.token.gray50,
                    }
                  }
                }}>
                  <Select
                    defaultValue={duration}
                    style={{
                      width: 150,
                      borderRadius: "10px",
                    }}
                    onChange={handleChangeDuration}
                    dropdownStyle={{
                      backgroundColor: theme.token.gray50,
                      border: `2px solid ${theme.token.gray100}`
                    }}
                    options={options}
                  />
                </ConfigProvider>
              </Col>
            </Row>
            <Row gutter={16} align="top" >
              <Col span={14} >  <Typography.Text strong >{translate("price")}</Typography.Text></Col>
              <Col span={10} > <Typography.Text strong> {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(planSelected.price)} </Typography.Text>
                <Typography.Text >  DZD   </Typography.Text> </Col>
            </Row>

            <Row gutter={16} align="top" >
              <Col span={14} >  <Typography.Text strong >{translate("promoCode")}</Typography.Text></Col>
              <Col span={10} >
                <Input
                  placeholder=".........."
                  value={promoCode.promo_code}
                  onChange={(e) => setPromoCode({ ...promoCode, promo_code: e.target.value })}
                  maxLength={10}
                  style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "none", padding: "0px 0px",
                    textIndent: 0,
                    color: promoColor
                  }}
                />

              </Col>
            </Row>
            <Row gutter={16} align="top" >
              <Col span={14} >  <Typography.Text strong >{translate("totalAmount")}</Typography.Text></Col>
              <Col span={10} color="red">
                <Typography.Text strong style={{ fontSize: 16, fontWeight: 500, color: theme.token.orange400 }}>
                  {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(totalAmount)}
                  <span style={{ fontSize: 12, fontWeight: 400 }}>  DZD</span>
                </Typography.Text>

              </Col>
            </Row>


          </Space>}
      </Card>
    </>
  )
}
