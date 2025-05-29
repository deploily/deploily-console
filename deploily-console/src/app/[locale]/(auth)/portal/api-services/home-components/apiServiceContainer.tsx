"use client";
import { ApiServiceInterface } from '@/lib/features/api-service/apiServiceInterface';
import { useApiServices } from '@/lib/features/api-service/apiServiceSelectors';
import { fetchApiServices } from '@/lib/features/api-service/apiServiceThunks';
import { useFavoriteServices } from '@/lib/features/favorites/favoriteServiceSelectors';
import { useAppDispatch } from '@/lib/hook';
import { Button, Card, Col, Result, Row, Space } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useI18n } from '../../../../../../../locales/client';
import ApiServiceCard from './apiServiceCard';
import HomeCarousel from '../../components/homeCarousel';

export default function ApiServiceContainer() {
  const router = useRouter();
  const t = useI18n();

  const { apiServiceResponse,isLoadingServiceResponse,apiServiceLoadingError } = useApiServices();
  const dispatch = useAppDispatch();
  const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices()

  useEffect(() => {
    dispatch(fetchApiServices(4));
  }, [favoriteServiceAdded, favoriteServiceDeleted])

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', paddingTop: 15 }} >
      <Row style={{ paddingTop: 20 }} justify="space-between" align="middle">
        <span
          style={{
            paddingLeft: "20px",
            color: "white",
            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          {t("APIService")}
        </span>

        <Button
          style={{
            marginLeft: "20px",
            backgroundColor: "#6caff0",
            color: "white",
            fontWeight: "bold",
            padding: "10px 20px",
            fontSize: "16px",       // Increased font size
            borderRadius: "6px",    // Slightly reduced border radius
            border: "none",
            cursor: "pointer",
            minWidth: "120px",      // Ensures a good width
            height: "40px",         // Sets a comfortable height
          }}
          onClick={() => router.push("/portal/api-services")}
        >
          {t("seeAll")}
        </Button>

      </Row>
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
      <div style={{ position: 'relative', padding: '0 2rem' }}>
        <HomeCarousel>
          {apiServiceResponse?.result !== undefined &&
            apiServiceResponse?.result?.map((row: ApiServiceInterface, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 10px",
                }}
              >
                <ApiServiceCard key={row.id} service={row} />
              </div>
            ))}
        </HomeCarousel>
      </div>
      {!isLoadingServiceResponse && apiServiceLoadingError &&
        <Result
          status="500"
          title={t('error')}
          subTitle={t('subTitleError')}
        />}
    </Space>
  );
}
