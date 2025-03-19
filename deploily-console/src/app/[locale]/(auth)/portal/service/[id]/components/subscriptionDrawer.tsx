"use client";
import { Button, Card, Col, ConfigProvider, Divider, Drawer, Input, Row, Select, Space, Typography } from "antd";
import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../../locales/client";
import { Coins } from "@phosphor-icons/react";
import { useAppDispatch } from "@/lib/hook";
import { fetchProfilesServices } from "@/lib/features/profile/profileServiceThunks";
import { useProfileServices } from "@/lib/features/profile/profileServiceSelectors";

export default function SubscriptionDrawer({ openDrawer, onClose, planSelected }: { openDrawer: any, onClose: any, planSelected: any }) {
  const translate = useScopedI18n('subscription');
  const [promoCode, setPromoCode] = useState("");
  const [promoPercent, setPromoPercent] = useState(0);
  const [promoColor, setPromoColor] = useState("red");
  const { Option } = Select;
  const dispatch = useAppDispatch();
  const { isLoading, profileServicesList } = useProfileServices();
  

  const options = [
    { value: 1, label: '1 Month' },
    { value: 3, label: '3 Months' },
    { value: 6, label: '6 Months' },
    { value: 12, label: '1 Year' },
  ];

  const profileList = [
    { name: "Default", balance: 1000 },
    { name: "profile 1", balance: 1000 },
    { name: "profile 2", balance: 5000 }
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
    dispatch(fetchProfilesServices());

  }, [promoCode]);


    
  return (
    <>
      <Drawer
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
          <Typography.Title level={4} style={{ paddingBottom: 30 }}>{translate("subscribeService")}</Typography.Title>


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
                          colorBgContainer: theme.token.gray_1,
                        }

                      }
                    }}>
                      <Select
                        defaultValue={duration}
                        style={{
                          width: 150,
                          borderRadius: "10px",
                        }}
                        onChange={handleChange}
                        dropdownStyle={{
                          backgroundColor: theme.token.gray_1,
                          border: `2px solid ${theme.token.gray_0}`


                        }}
                        options={options}
                      /></ConfigProvider>
                  </Col>
                </Row>
                <Row gutter={16} align="top" >
                  <Col span={14} >  <Typography.Text strong >{translate("totalAmount")}</Typography.Text></Col>
                  <Col span={10} > <Typography.Text strong> {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(planSelected.price)} </Typography.Text>
                    <Typography.Text >  DZD   </Typography.Text> </Col>
                </Row>
                <Row gutter={16} align="top" >
                  <Col span={14} >  <Typography.Text strong >{translate("promoCode")}</Typography.Text></Col>
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
                  <Col span={14} >  <Typography.Text strong >{translate("price")}</Typography.Text></Col>
                  <Col span={10} color="red">
                    <Typography.Text strong style={{ fontSize: 16, fontWeight: 500, color: theme.token.orange_6 }}>
                      {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(calculatePercentage(calculPrice(planSelected.price, duration), promoPercent))}
                      <span style={{ fontSize: 12, fontWeight: 400 }}>  DZD</span>
                    </Typography.Text>

                  </Col>
                </Row>


              </Space>}
          </Card>


          <Typography.Title level={4} style={{ paddingTop: 30, paddingBottom: 20 }}>{translate("selectProfile")}</Typography.Title>
          <ConfigProvider theme={{
            components: {
              Select: {
                borderRadius: 0,
                controlHeight: 50,
                optionSelectedBg: "#7D7D7D33",
                optionActiveBg: "#DD8859",
              }

            }
          }}>
            <Select
              defaultValue={profileList[0].name}
              style={{ width: "100%" }}
              dropdownRender={(menu) => (
                <>
                  <style>
                    {`
                      .ant-select-item-option-selected {
                      border: 1px solid ${theme.token.orange_7} !important;
                      border-radius: 4px;
                      }
                    `}
                  </style>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: 20,


                  }}>
                    <span style={{ fontWeight: "bold" }}>{translate("profile")}</span>
                    <span style={{ fontWeight: "bold" }}>{translate("balance")}</span>
                    <span />
                  </div>
                  <Divider style={{ margin: 0, borderColor: theme.token.gray_1 }} />
                  {menu}
                </>
              )}
            >
               {!isLoading && profileServicesList !== undefined && (
                <>
              {profileServicesList?.result.map((profile, index) => (
                <Option key={index} value={profile.name}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    paddingLeft: 10, paddingRight: 10
                  }}>
                    <span >{profile.name} </span>
                    <span style={{ color: theme.token.orange_7 }}>{profile.balance}</span>

                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ color: theme.token.orange_7 }}>DZD</span>
                      <Coins size={24} color={theme.token.orange_7} />
                    </div>
                  </div>
                </Option>
              ))}</>)}

            </Select>

          </ConfigProvider>
          
          {/* <Typography.Text style={{
            color: theme.token.green, paddingTop: 30, display: "flex",
            justifyContent: "center",
          }}>{translate("sufficientBalance")}
          </Typography.Text> */}

          <div
            style={{
              paddingTop: 50,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              style={{
                color: theme.token.colorWhite,
                backgroundColor: theme.token.orange_7,
                border: "none",
                paddingBlock: 15,
                fontWeight: 600,
                fontSize: 18,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {translate("confirm")}
            </Button></div>
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