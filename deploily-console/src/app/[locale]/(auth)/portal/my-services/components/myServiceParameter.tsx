"use client";
import { useCartLine } from "@/lib/features/cartLine/cartLineSelectors";
import { fetchCartLineById } from "@/lib/features/cartLine/cartLineThunks";
import { useAppDispatch } from "@/lib/hook";
import { Col, Row, Typography, Image, theme, DatePicker, Button, Space } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect } from "react";
import { useI18n } from "../../../../../../../locales/client";
import { ArrowLeft, Star } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import Paragraph from "antd/es/typography/Paragraph";
import ServiceParameterComponent from "./serviceParameterComponent";


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



  return (
    <>
      <div style={{ marginLeft: 40 }}>
        <Button style={{ border: "none", background: "#030303", boxShadow: "none" }}
          icon={<ArrowLeft color="#D85912" size={35} />} onClick={() => router.back()} />
      </div>
      <Space direction="vertical" size="large" style={{ paddingInline: 40, marginTop: 10, width: "100%" }}>
        <Row gutter={16} >
          <Col md={18} xs={24}  >
            <Image
              alt="Logo"
              src={imageUrl}
              preview={false}
              width={220}
              height={220}
            />
          </Col>
          <Col md={6} xs={24} style={{
            color: "#DD8859",
            fontWeight: "bold",
            fontSize: "18px",
            display: "flex",
            justifyContent: "start",
            alignSelf: "start"
          }}>
            <Typography.Title level={2} style={{ color: token.colorPrimaryTextHover }}>
              {currentCartLine.service.unit_price}
            </Typography.Title>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 10 }} >
          <Col span={18} >
            <div>
              <Typography.Title level={2}> {currentCartLine.service.name}</Typography.Title>

            </div>
          </Col>
          <Col span={6} style={{ display: "flex", justifyContent: "start" }}>
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
            <ServiceParameterComponent cartLine_id={cartLine_id} />
        </Col>
        </Row>
      </Space>
    </>
  );
}
