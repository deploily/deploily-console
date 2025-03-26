"use client";
import { Button, Card, Col, ConfigProvider, Divider, Drawer, Input, Row, Select, Space, Typography } from "antd";
import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import { Coins } from "@phosphor-icons/react";
import { useAppDispatch } from "@/lib/hook";
import { fetchProfilesServices } from "@/lib/features/profile/profileServiceThunks";
import { useProfileServices } from "@/lib/features/profile/profileServiceSelectors";
import { checkPromoCode } from "@/lib/features/promoCode/promoCodeThunks";
import { usePromoCode } from "@/lib/features/promoCode/promoCodeSelectors";
import PaymentComponent from "./paymentComponent";
import { redirect, useRouter } from "next/navigation";
import { useSubscribe } from "@/lib/features/subscribe/subscribeSelectors";

export default function SubscribeDrawer({ openDrawer, onClose, planSelected }: { openDrawer: any, onClose: any, planSelected: any }) {
  const translate = useScopedI18n('subscription');
  const router = useRouter();
  const { newSubscribeResponse } = useSubscribe();
  const [promoCode, setPromoCode] = useState({promo_code: ""});
  const [sufficientBalance, checkSufficientBalance] = useState<boolean | null>(null);
  const [showConfirmButton, setShowConfirmButton] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [promoColor, setPromoColor] = useState("red");
  const { Option } = Select;
  const dispatch = useAppDispatch();
  const { isLoading, profileServicesList } = useProfileServices();
  const { promoCodeResponse } = usePromoCode();
  const [profileSelected, setProfileSelected] = useState({ id: 0, balance: 0, name: "default" });
  const handleSelectedProfile = (value: any) => {
    const selectedProfile = profileServicesList?.result.find(
      (profile) => profile.id === value
    );
    if (sufficientBalance === false) { setShowConfirmButton(false); }
    if (selectedProfile != undefined) {
      console.log(selectedProfile.balance);
      checkBalance(values.total_amount, selectedProfile.balance);

      setValues({ ...values, profile_id: selectedProfile.id });
      setProfileSelected(selectedProfile);
    }

  };

  const options = [
    { value: 1, label: '1 Month' },
    { value: 3, label: '3 Months' },
    { value: 6, label: '6 Months' },
    { value: 12, label: '1 Year' },
  ];

  const [values, setValues] = useState({
    duration: 1,
    total_amount: 0,
    promo_code: "",
    payment_method: "card",
    service_plan_selected_id: 1,
    profile_id: 0
  });



  const calculPrice = (totalAmount: number, duration: number) => {
    setTotalAmount((totalAmount * duration));
  };

  const calculatePercentage = (totalAmount: number, percentage: number) => {
    setTotalAmount((totalAmount - ((totalAmount * percentage) / 100)));

  };

  const checkBalance = (totalAmount: number, balance: number) => {
    if ((balance - totalAmount) >= 0) {
      checkSufficientBalance(true);
    } else {
      checkSufficientBalance(false);
    }
  };

  const handleChange = (value: number) => {

    setValues((values) => ({
      ...values,
      duration: value,
    }));

    calculPrice(planSelected.price, value);
    checkBalance(values.total_amount, profileSelected.balance);
  };

  useEffect(() => {
    if (planSelected) {
      setTotalAmount(planSelected.price);
      setValues((values) => ({
        ...values,
        service_plan_selected_id: planSelected.plan.id,
        total_amount: planSelected.price,

      }));
    }

    if (profileServicesList?.result?.length) {
      setValues((prevValues) => ({
        ...prevValues,
        profile_id: profileServicesList.result[0].id,
      }));
    }

  }, [planSelected,profileServicesList?.result]);




  // Handles updating promo percent and color based on promoCodeResponse
  useEffect(() => {
    if (promoCodeResponse?.rate !== undefined) {
      calculatePercentage(totalAmount, promoCodeResponse?.rate);
      setValues({ ...values, promo_code: promoCode.promo_code });

      setPromoColor("green");
      setValues((prevValues) => ({
        ...prevValues,
        promo_code: promoCode.promo_code
      }));
    }
  }, [promoCodeResponse]);

  // Checks the promo code when its length reaches 10
  useEffect(() => {
    if (promoCode.promo_code.length === 10) {
      dispatch(checkPromoCode(promoCode));
    } else {
      // calculatePercentage(values.total_amount, 0);

      setPromoColor("red");
    }
  }, [promoCode.promo_code]);





  useEffect(() => {
    const redirectedFlag = sessionStorage.getItem("redirectedFlag");

    if (!redirectedFlag) {
      sessionStorage.setItem("redirectedFlag", "true");
      router.replace("/portal/home");
    }
  }, []);

  useEffect(() => {
    console.log(newSubscribeResponse);

    if (newSubscribeResponse) {

      redirect(newSubscribeResponse.form_url);
    }
    dispatch(fetchProfilesServices());

  }, [newSubscribeResponse]);



  return (
    <>
      <Drawer
        placement="right"
        closable={true}

        onClose={onClose}
        open={openDrawer}
        getContainer={false} width={600}

        styles={{
          header: { borderBottom: "none", backgroundColor: theme.token.darkGray },
          body: { padding: 0, backgroundColor: theme.token.darkGray },


        }}
      >

        <Col style={{ padding: 20 }}>
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
                        defaultValue={values.duration}
                        style={{
                          width: 150,
                          borderRadius: "10px",
                        }}
                        onChange={handleChange}
                        dropdownStyle={{
                          backgroundColor: theme.token.gray50,
                          border: `2px solid ${theme.token.gray100}`


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
                  <Col span={14} >  <Typography.Text strong >{translate("price")}</Typography.Text></Col>
                  <Col span={10} color="red">
                    <Typography.Text strong style={{ fontSize: 16, fontWeight: 500, color: theme.token.orange400 }}>
                      {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(totalAmount)}
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
              defaultValue={profileSelected}
              style={{ width: "100%" }}
              dropdownRender={(menu) => (
                <>
                  <style>
                    {`
                      .ant-select-item-option-selected {
                      border: 1px solid ${theme.token.orange600} !important;
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
                  <Divider style={{ margin: 0, borderColor: theme.token.gray50 }} />
                  {menu}
                </>
              )}
              onChange={handleSelectedProfile}
            >
              {!isLoading && profileServicesList !== undefined && (

                <>

                  {profileServicesList?.result.map((profile, index) => (
                    <Option key={index} value={profile.id}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        paddingLeft: 10, paddingRight: 10
                      }}>
                        <span >{profile.name} </span>
                        <span style={{ color: theme.token.orange600 }}>{profile.balance}</span>

                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <span style={{ color: theme.token.orange600 }}>DZD</span>
                          <Coins size={24} color={theme.token.orange600} />
                        </div>
                      </div>
                    </Option>
                  ))}</>)}

            </Select>


          </ConfigProvider>

          {(sufficientBalance !== null && profileSelected.id !== 0) ? (sufficientBalance === true) ?
            (<Typography.Text style={{
              color: theme.token.green, paddingTop: 30, display: "flex",
              justifyContent: "center",
            }}>{translate("sufficientBalance")}
            </Typography.Text>) :
            (
              <Typography.Text style={{
                color: theme.token.green, paddingTop: 30, display: "flex",
                justifyContent: "center",
              }}>{translate("insufficientBalance")}
              </Typography.Text>
            ) : null
          }



          {(sufficientBalance === false && showConfirmButton === false) ?

            <PaymentComponent newSubscribe={values} setNewSubscribe={setValues} totalAmount={totalAmount} /> :

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
                  backgroundColor: theme.token.orange600,
                  border: "none",
                  paddingBlock: 15,
                  fontWeight: 600,
                  fontSize: 18,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                onClick={() => checkBalance(values.total_amount, profileSelected.balance)}              >
                {translate("confirm")}
              </Button></div>
          }


        </Col>


      </Drawer>
    </>
  )
}
