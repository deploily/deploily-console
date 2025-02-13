import {Col, Row, Typography, Image, theme, DatePicker, Button, Input} from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import {useState} from "react";

export default function MyServiceParameterPage() {
  const {useToken} = theme;
  const {token} = useToken();
  const dateFormat = "YYYY-MM-DD";
  const [apiKey, setApiKey] = useState("");

  const generateApiKey = () => {
    // Simulate API key generation
    const newKey = Math.random().toString(36).substr(2, 10).toUpperCase();
    setApiKey(newKey);
  };

  return (
    <>
      <Row gutter={16}>
        <Col style={{padding: "50px 0px 50px 50px"}}>
          <Image alt="Logo" src="/images/logo_service.png" width={220} height={220} />
        </Col>
        <Col xs={24} sm={12} md={16} lg={12} style={{padding: 45, justifyContent: "start"}}>
          <Typography.Title level={2}>Name service 1</Typography.Title>
          <Typography.Title level={2} style={{color: token.colorPrimaryTextHover}}>
            1000,00
          </Typography.Title>
          <Typography.Title level={4}>
            Short description Short description Short description Short description
          </Typography.Title>
          <Row>
            <Typography.Title level={5} style={{marginTop: 8, marginRight: 8, fontWeight: 600}}>
              Start date
            </Typography.Title>
            <DatePicker
              style={{marginTop: 10}}
              defaultValue={dayjs("2025-02-16", dateFormat)}
              disabled
            />
          </Row>
          <Typography.Title level={5} style={{marginTop: 8, fontWeight: 600}}>
            Duration 3 month(s)
          </Typography.Title>
        </Col>
      </Row>

      <Col style={{padding: 45}}>
        <Typography.Title level={5} style={{fontWeight: 600}}>
          ACCESS URL
        </Typography.Title>
        <Typography.Text>https://api.example.com/your-service</Typography.Text>

        <Typography.Title level={5} style={{marginTop: 15, fontWeight: 600}}>
          Link to Documentation
        </Typography.Title>
        <Link href="/docs/service-docs" target="_blank" style={{color: token.colorPrimary}}>
          View API Documentation
        </Link>

        <Typography.Title level={5} style={{marginTop: 15, fontWeight: 600}}>
          Parameter Values
        </Typography.Title>
        <Input placeholder="Enter parameter value" style={{marginBottom: 10}} />
        <Input placeholder="Enter parameter value" style={{marginBottom: 10}} />
        <Input placeholder="Enter parameter value" style={{marginBottom: 10}} />

        <Button
          onClick={generateApiKey}
          style={{marginTop: 20, backgroundColor: "#1890ff", color: "#fff"}}
        >
          GENERATE KEY
        </Button>
        {apiKey && (
          <Typography.Paragraph copyable style={{marginTop: 10, fontWeight: 600}}>
            {apiKey}
          </Typography.Paragraph>
        )}
      </Col>

      <Col style={{display: "flex", justifyContent: "flex-end", padding: 45, gap: 8}}>
        <Button style={{color: "#fff", backgroundColor: "#5394CC", border: "none"}}>
          <Link href="/portal/myServices" data-testid="mocked-link">
            <span
              style={{
                color: "rgba(220, 233, 245, 0.88)",
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              cancel
            </span>
          </Link>
        </Button>
        <Button style={{color: "#fff", backgroundColor: "#D85912", border: "none"}}>
          <Link href="/portal/myServices" data-testid="mocked-link">
            <span
              style={{
                color: "rgba(220, 233, 245, 0.88)",
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              save
            </span>
          </Link>
        </Button>
      </Col>
    </>
  );
}
