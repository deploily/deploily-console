"use client";

import { EpaymentResult } from "@/lib/features/epayment/epaymentInterface";
import { } from "@/styles/theme";
import { Button, Image, Typography } from "antd";

import { Card, Col, Row, Table } from 'antd';

const { Title, Text } = Typography;

export default function ConfirmContentPage({ paymentResult }: { paymentResult: EpaymentResult }) {
  const data = [
    { label: "Transaction ID", value: paymentResult.ID },
    { label: "Order Number", value: paymentResult.ORDER_NUMBER },
    { label: "Date", value: paymentResult.DATE },
    { label: "Hour", value: paymentResult.DATE },
    { label: "Amount", value: `${paymentResult.AMOUNT.toLocaleString()} DZD` },
    { label: "Card Holder", value: paymentResult.CARD_HOLDER_NAME },
    { label: "Payment Status", value: paymentResult.ACTION_CODE_DESCRIPTION },
    { label: "Authorization Code", value: paymentResult.AUTH_CODE },
    { label: "SATIM Order ID", value: paymentResult.SATIM_ORDER_ID },
  ];


  return (
    <div style={{
      maxWidth: 650,
      margin: '50px auto',
      padding: 24,
      color: '#fff',
      borderRadius: 8,
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    }}>
      <Text strong style={{ fontSize: 16, color: '#fff' }}>CIB/ E-Dahabia</Text>

      <Title
        level={5}
        style={{
          textAlign: 'center',
          margin: '12px 0',
          color: 'limegreen',
        }}
      >
        {'Transaction completed successfully'}
      </Title>

      <Card
        style={{ backgroundColor: '#141414', color: '#fff', marginBottom: 20 }}
      >
        <Table
          dataSource={data}
          pagination={false}
          bordered
          showHeader={false}
          rowKey="label"
          columns={[
            {
              dataIndex: 'label',
              key: 'label',
              render: text => <Text style={{ color: '#fff' }}>{text}</Text>,
              width: '50%',
            },
            {
              dataIndex: 'value',
              key: 'value',
              render: text => <Text style={{ color: '#fff' }}>{text}</Text>,
            },
          ]}
          style={{
            backgroundColor: '#141414',
            borderRadius: 4,
          }}
        />
      </Card>

      <Row gutter={16} justify="center" style={{ marginBottom: 24 }}>
        <Col>
          <Button type="primary" style={{ backgroundColor: '#1677ff' }}>
            Send by Email
          </Button>
        </Col>
        <Col>
          <Button type="primary" style={{ backgroundColor: '#1677ff' }}>
            Download
          </Button>
        </Col>
        <Col>
          <Button type="primary" style={{ backgroundColor: '#1677ff' }}>
            Print
          </Button>
        </Col>
      </Row>

      <Card
        style={{
          backgroundColor: '#e6fffb',
          textAlign: 'center',
          border: '1px solid #b5f5ec',
        }}
      >
        <Text strong style={{ color: 'black' }}>Contact SATIM : 3020</Text><br />
        <Image src="/images/satim-logo.png" alt="SATIM Logo" height={'110px'} width={'132px'} style={{ marginTop: 8 }} />
      </Card>
    </div>
  );
}
