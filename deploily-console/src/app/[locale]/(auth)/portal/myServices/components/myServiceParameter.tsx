"use client";
import { useCartLine } from "@/lib/features/cartLine/cartLineSelectors";
import { fetchCartLineById, generateTokenThunk } from "@/lib/features/cartLine/cartLineThunks";
import { useAppDispatch } from "@/lib/hook";
import { Col, Row, Typography, Image, theme, DatePicker, Button, Input, Space, message, Tooltip } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect } from "react";
import { useI18n } from "../../../../../../../locales/client";
import { ArrowLeft, Copy, Star } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import Paragraph from "antd/es/typography/Paragraph";


export default function MyServiceParameterPage({ cartLine_id }: { cartLine_id: string }) {
  const { useToken } = theme;
  const { token } = useToken();
  const dateFormat = "YYYY-MM-DD";
  const t = useI18n();

  const { cartLineLoading, currentCartLine } = useCartLine();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (cartLine_id) {
      dispatch(fetchCartLineById(cartLine_id));
    }
  }, []);

  if (cartLineLoading || !currentCartLine) return null;

  const baseURL = `https://admin.deploily.cloud/static/uploads/`;
  const imageUrl = currentCartLine?.service?.image_service
    ? currentCartLine?.service?.image_service.startsWith("http")
      ? currentCartLine?.service?.image_service
      : `${baseURL}${currentCartLine?.service?.image_service}`
    : "/images/logo_service.png";

  const generateApiKey = () => { dispatch(generateTokenThunk(cartLine_id)) }

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    message.success("Copied to clipboard!");
  };
  return (
    <>
      <div style={{ marginLeft: 20 }}>
        <Button style={{ border: "none", background: "#030303", boxShadow: "none" }}
          icon={<ArrowLeft color="#D85912" size={35} />} onClick={() => router.back()} />
      </div>
      <Space direction="vertical" size="large" style={{ paddingInline: 200, marginTop: 10, width: "100%" }}>
        <Row gutter={16} >
          <Col span={12} >
            <Image
              alt="Logo"
              src={imageUrl}
              preview={false}
              width={220}
              height={220}
            />
          </Col>
          <Col span={12} style={{
            color: "#DD8859",
            fontWeight: "bold",
            fontSize: "18px",
            display: "flex",
            justifyContent: "end",
            alignSelf: "start"
          }}>
            <Typography.Title level={2} style={{ color: token.colorPrimaryTextHover }}>
              {currentCartLine.service.unit_price}
            </Typography.Title>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 10 }} >
          <Col span={20} >
            <div>
              <Typography.Title level={2}> {currentCartLine.service.name}</Typography.Title>

            </div>
          </Col>
          <Col span={4} style={{ display: "flex", justifyContent: "end" }}>
            <Star size={20} color="#7D7D7D" />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 10 }} >
          <Col span={24} >
            <div>
              <Paragraph style={{ fontSize: 18 }} >

                {currentCartLine.service.short_description}
              </Paragraph>
            </div>
          </Col>

        </Row>
        <Row>
          <Typography.Title level={5} style={{ marginTop: 8, marginRight: 8, fontWeight: 600 }}>
            {t('startDate')}
          </Typography.Title>
          <DatePicker
            style={{ marginTop: 8 }}
            defaultValue={dayjs(currentCartLine?.start_date, dateFormat)}
            disabled
          />
        </Row>
        <Typography.Title level={5} style={{ fontWeight: 600 }}>
          {t('duration')} {currentCartLine.duration_month} {t('month')}
        </Typography.Title>
        <Row gutter={16}>
          <Col span={24}>
            <Typography.Title level={5} style={{ fontWeight: 600 }}>
              {t('accessUrl')}
            </Typography.Title>
            <Typography.Text> {currentCartLine.service.service_url} </Typography.Text>

            <Typography.Title level={5} style={{ marginTop: 15, fontWeight: 600 }}>
              {t('link')}
            </Typography.Title>
            <Link href={currentCartLine.service.documentation_url} target="_blank" style={{ color: token.colorPrimary }}>
              {t('viewApi')}
            </Link>

            <Typography.Title level={5} style={{ marginTop: 15, fontWeight: 600 }}>
              {t('parameterValue')}
            </Typography.Title>
            {currentCartLine.parameters_values.map((parameter: any) => (
              <div key={parameter.id} >
                <Row gutter={10}>
                  <Col span={16}>
                    <Input defaultValue={parameter.value} style={{ marginBottom: 10 }} /></Col>
                  <Col span={8}>
                    <Tooltip title="Copy">
                    <Button type="primary" style={{boxShadow:"none"}} icon={<Copy />} onClick={() => handleCopy(parameter.value)} />
                  </Tooltip>
                  </Col>
                </Row>
              </div>
            ))}
            <>
              {currentCartLine.parameters_values.find(param => param.type === 'token') ? (
                <div>
                  <Input
                    defaultValue={currentCartLine.parameters_values.find(param => param.type === 'token')?.type}
                    placeholder="Enter parameter value"
                    style={{ marginBottom: 10 }}
                  />
                </div>
              ) : null}
            </>
            {/* {currentCartLine.parameters_values.find(param => param.type === 'token') == null && <Button //TODO UNCOMMENT THIS AFTER LOGIC FIX 
              onClick={generateApiKey}
              style={{ marginTop: 20, backgroundColor: "#1890ff", color: "#fff" }}
               >
               {t('ganerateKey')}
               </Button>} */}
            {currentCartLine.parameters_values.length < 0 &&
              <Button
                onClick={generateApiKey}
                style={{ marginTop: 20, backgroundColor: "#1890ff", color: "#fff" }}>
                {t('ganerateKey')}
              </Button>}
        </Col>
        </Row>
      </Space>
    </>
  );
}
