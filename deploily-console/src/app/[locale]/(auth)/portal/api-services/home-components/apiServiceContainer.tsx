"use client";
import { Row, Col, Space, Card, Result } from "antd";
import ApiServiceCard from "./apiServiceCard";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hook";
import { useI18n } from "../../../../../../../locales/client";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";
import { useApiServices } from "@/lib/features/api-service/apiServiceSelectors";
import { ApiServiceInterface } from "@/lib/features/api-service/apiServiceInterface";
import { fetchApiServices } from "@/lib/features/api-service/apiServiceThunks";

export default function ApiServiceContainer() {
  const t = useI18n();
  const { apiServiceResponse, isLoadingServiceResponse, apiServiceLoadingError } = useApiServices();
  const dispatch = useAppDispatch();
  const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices()


  useEffect(() => {
    dispatch(fetchApiServices());
  }, [favoriteServiceAdded, favoriteServiceDeleted])
  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex', paddingTop: 15 }} >

        <Row style={{ padding: 20 }}>
          <span
            style={{
              color: "white",

              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            {t("APIService")}
          </span>
        </Row>

        <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
          {isLoadingServiceResponse && apiServiceResponse?.result === undefined &&

            <Col
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={8}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card loading={true} style={{ minWidth: 300 }} />
            </Col>
          }
          {!isLoadingServiceResponse && apiServiceResponse?.result !== undefined &&
            <>
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
            </>
          }

        </Row>

        {!isLoadingServiceResponse && apiServiceLoadingError &&
          <Result
            status="500"
            title={t('error')}
            subTitle={t('subTitleError')}
          />}

      </Space>

    </>
  );
}
