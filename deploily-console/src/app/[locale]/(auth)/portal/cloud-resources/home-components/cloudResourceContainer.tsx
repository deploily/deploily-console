"use client";
import { CloudResourceInterface } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { useCloudResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { fetchCloudResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";
import { useAppDispatch } from "@/lib/hook";
import { Button, Card, Col, Result, Row, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useI18n } from "../../../../../../../locales/client";
import HomeCarousel from "../../components/homeCarousel";
import CloudResourceCard from "./cloudResourceCard";

export default function CloudResourceContainer() {
  const t = useI18n();
  const { isLoading, cloudResourceResponse, cloudResourceLoadingError } = useCloudResource();
  const dispatch = useAppDispatch();
  const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices()
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem("fromPage", "home");

    dispatch(fetchCloudResources({ page_size: 4 }));
  }, [favoriteServiceAdded, favoriteServiceDeleted]);

  return (
    <>
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
            {t('cloudResources')}
          </span>
          <Button
            style={{
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
            onClick={() => router.push("/portal/cloud-resources")}
          >
            {t("seeAll")}
          </Button>
        </Row>
        {isLoading && cloudResourceResponse?.result === undefined &&

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
          <HomeCarousel key={`${favoriteServiceAdded}-${favoriteServiceDeleted}`}>
            {!isLoading && cloudResourceResponse !== undefined && cloudResourceResponse?.result?.map((row: CloudResourceInterface, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 10px",

                }}
              >
                <CloudResourceCard resource={row} from={"home"} />
              </div>


            ))}
          </HomeCarousel>
        </div>
        {!isLoading && cloudResourceLoadingError &&
          <Result
            status="500"
            title={t('error')}
            subTitle={t('subTitleError')}
          />}
      </Space>
    </>
  );
}