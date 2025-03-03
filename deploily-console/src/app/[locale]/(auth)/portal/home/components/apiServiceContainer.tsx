"use client";
import { useAllServices } from "@/lib/features/apiService/apiServiceSelectors";
import { Row, Col, Space } from "antd";
import ApiServiceCard from "./apiServiceCard";
import { ApiServiceInterface } from "@/lib/features/apiService/apiServiceInterface";
import { useEffect } from "react";
import { fetchApiServices } from "@/lib/features/apiService/apiServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import { useI18n } from "../../../../../../../locales/client";

export default function ApiServiceContainer() {
  const t = useI18n();
  const { isLoading, apiServiceResponse } = useAllServices();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchApiServices());
  }, []);

  return (

    <Space direction="vertical" size="middle" style={{ display: 'flex', paddingTop: 15 }} >

      {!isLoading && apiServiceResponse !== undefined && (
        <>
          <Row style={{ padding: 20 }}>
            <span
              style={{
                color: "white",
                fontFamily: "Inter, sans-serif",
                fontSize: "24px",
                fontWeight: 800,
              }}
            >
              {t("APIService")}
            </span>
          </Row>

          <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>


            {apiServiceResponse?.result?.map((row: ApiServiceInterface) => (
              <Col
                key={row.id}
                xs={24}
                sm={12}
                md={10}
                lg={8}
                xl={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <ApiServiceCard key={row.id} service={row} />

              </Col>
            ))}
          </Row>

        </>)}
    </Space>

  );
}
