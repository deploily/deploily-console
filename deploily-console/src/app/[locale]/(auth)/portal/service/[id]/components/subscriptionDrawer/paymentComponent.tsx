"use client";
import { Button, Card, Checkbox, CheckboxChangeEvent, Flex, Image, Radio, RadioChangeEvent, Typography, } from "antd";
import { useState } from "react";
import { theme } from "@/styles/theme";
import { useAppDispatch } from "@/lib/hook";
import { postSubscribe } from "@/lib/features/subscribe/subscribeThunks";

export default function PaymentComponent({ newSubscribe,setNewSubscribe,totalAmount}:{newSubscribe:any,setNewSubscribe:any,totalAmount:number}) {
  

   const [value, setValue] = useState(false);


  const onChange = (e: RadioChangeEvent) => {

    setNewSubscribe({ ...newSubscribe, payment_method:e.target.value});

  };
  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    setValue(e.target.value);
    
  };
  const dispatch = useAppDispatch();

  const handleSubscribe = async () => {
     dispatch(postSubscribe(newSubscribe));
};

  return (
    <>
      <Typography.Title level={4} style={{ paddingTop: 20, paddingBottom: 20 }}>Choose the payment method</Typography.Title>
<Flex vertical gap="start" style={{ padding: 10, backgroundColor: theme.token.colorBgBase, }}>
          <Radio.Group block defaultValue={newSubscribe.payment_method}
            onChange={onChange}
            value={newSubscribe.payment_method}>
            <Radio value="card"  >Card</Radio>
            <Radio value="bank_transfer">Bank transfer</Radio>
          </Radio.Group>

        </Flex>
      <Card title="CIB/ E-Dahabia" style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderColor: theme.token.gray50,
        boxShadow: "none",
        textAlign: "center"
      }}
        styles={{ header: { borderColor: theme.token.gray50, textAlign: "start" } }}

      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <Typography.Title level={5} style={{fontWeight:500}}>
          Total to pay:  
           <Typography.Text strong>  {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(totalAmount)}  </Typography.Text>
          DZD
        </Typography.Title>
        <Button
        onClick={() => console.log(newSubscribe)}
        style={{
              color: "#fff",
              backgroundColor: "#D85912",
              border: "none",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }} > captcha</Button>
        <Checkbox style={{padding:15}} onChange={onChangeCheckbox} value={value}>I accept the general conditions of use</Checkbox>

        <Button
            style={{
              color: "#fff",
              backgroundColor: theme.token.blue300,
              border: "none",
              padding: "25px 10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            icon={<Image src="/images/paymentIcon.png" alt="PAY" style={{ width: 60, height: 35 }} preview={false}/>}
            onClick={ handleSubscribe}
          >
            
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 600 }}>
              PAY
            </span>
          </Button>
        </div>
      </Card>
    </>
  )
}

