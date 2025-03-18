"use client";
import { Card, Col, Drawer, Input, Row, Select, Space, Typography } from "antd";
import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
export default function SubscriptionDrawer({ openDrawer, onClose, planSelected }: { openDrawer: any, onClose: any, planSelected: any }) {
  const [promoCode, setPromoCode] = useState("");
  const [promoPercent, setPromoPercent] = useState(0);
  const [promoColor, setPromoColor] = useState("red");

  const options = [
    { value: 1, label: '1 Month' },
    { value: 3, label: '3 Months' },
    { value: 6, label: '6 Months' },
    { value: 12, label: '1 Year' },
  ];
  const [duration, setDuration] = useState(options[0].value);

  const handleChange = (value: number) => {
    setDuration(value);
    console.log(`selected ${value}`);
  };
  useEffect(() => {
    //Todo if ===10 send to back if success 
    if (promoCode.length === 10) {
      setPromoPercent(20);
      setPromoColor("green");
      console.log(promoCode);

    }//todo else if faild
    else {
      setPromoPercent(0);
      setPromoColor("red");

    }
  }, [promoCode]);
  return (
    <>
      <Drawer
        title="Subscribe Service"
        placement="right"
        closable={true}

        onClose={onClose}
        open={openDrawer}
        getContainer={false} width={600}

        styles={{
          header: { borderBottom: "none", backgroundColor: theme.token.darkGray_1 },
          body: { padding: 0, backgroundColor: theme.token.darkGray_1 },


        }}
      >
        <Col style={{ padding: 30 }}>


          <Card style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            borderColor: theme.token.gray_1,
            boxShadow: "none",

          }}
          >
            {(planSelected != undefined) &&
              <Space direction="vertical" style={{ width: "100%" }}>

                <Row gutter={16} align="top" >
                  <Col span={14} >  <Typography.Text strong >Service Name :</Typography.Text></Col>
                  <Col span={10} > <Typography.Text >{planSelected.service.name}</Typography.Text></Col>
                </Row>
                <Row gutter={16} align="top" >
                  <Col span={14} >  <Typography.Text strong >Service Plan selected :</Typography.Text></Col>
                  <Col span={10} > <Typography.Text >{planSelected.plan.name}</Typography.Text></Col>
                </Row>
                <Row gutter={16} align="top" >
                  <Col span={14} >  <Typography.Text strong >Duration :</Typography.Text></Col>
                  <Col span={10} >
                    <Select
                      defaultValue={duration}
                      style={{
                        width: 120, backgroundColor: theme.token.gray_0, borderRadius: "6px",
                        border: `1px solid ${theme.token.gray_1}`,
                      }}
                      onChange={handleChange}
                      dropdownStyle={{
                        backgroundColor: theme.token.gray_1,

                      }}
                      options={options}
                    />
                  </Col>
                </Row>
                <Row gutter={16} align="top" >
                  <Col span={14} >  <Typography.Text strong >Total Amount :</Typography.Text></Col>
                  <Col span={10} > <Typography.Text strong> {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(planSelected.price)} </Typography.Text>
                    <Typography.Text >  DZD   </Typography.Text> </Col>
                </Row>
                <Row gutter={16} align="top" >
                  <Col span={14} >  <Typography.Text strong >Promo code :</Typography.Text></Col>
                  <Col span={10} >
                    <Input
                      placeholder=".........."
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
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
                  <Col span={14} >  <Typography.Text strong >Price :</Typography.Text></Col>
                  <Col span={10} color="red">
                    <Typography.Text strong  style={{fontSize: 16, fontWeight: 500, color: theme.token.orange_6}}>
                      {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(calculatePercentage(calculPrice(planSelected.price, duration), promoPercent))}
                      <span style={{ fontSize: 12, fontWeight: 400 }}>  DZD</span>
                    </Typography.Text>
                    
                  </Col>
                </Row>


              </Space>}
          </Card>


          <Typography.Title level={3} >
            Select  Profile
          </Typography.Title>
        </Col>


      </Drawer>
    </>
  )
}

export function calculatePercentage(totalAmount: number, percentage: number): number {
  return totalAmount - ((totalAmount * percentage) / 100);
}

export function calculPrice(totalAmount: number, duration: number): number {
  return (totalAmount * duration);
}