"use client";

import { Card, Image, Typography } from "antd";


export default function FailContentPage() {
  const { Title, Text } = Typography;

  return (
    <>
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
            color: '#ff4d4f',
          }}
        >
          {'Transaction failed'}
        </Title>
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

    </>
  );
}