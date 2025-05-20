"use client";
import { CloudResourceInterface } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { useCloudResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { fetchCloudResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";
import { useAppDispatch } from "@/lib/hook";
import { Card, Col, Result, Row } from "antd";
import { useEffect } from "react";
import { useI18n } from "../../../../../../../locales/client";
import CloudResourceCard from "./cloudResourceCard";

export default function CloudResourceContainer() {
  const t = useI18n();
  const { isLoading, cloudResourceResponse, cloudResourceLoadingError } = useCloudResource();
  const dispatch = useAppDispatch();
  const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices()

  useEffect(() => {
    dispatch(fetchCloudResources());
  }, [favoriteServiceAdded, favoriteServiceDeleted]);

  return (
    <>
      <Row style={{ padding: 20 }}>
        <span
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          Cloud Resource
        </span>
        {/* <span style={{ color: "white", fontSize: "16px", marginLeft: 10, paddingTop: 4 }}>
          (coming soon)
        </span> */}
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

      {!isLoading && cloudResourceResponse !== undefined && (
        <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
          {cloudResourceResponse?.result?.map((row: CloudResourceInterface) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CloudResourceCard resource={row} />
            </Col>
          ))}
        </Row>

      )}
      {!isLoading && cloudResourceLoadingError &&
        <Result
          status="500"
          title={t('error')}
          subTitle={t('subTitleError')}
        />}

    </>
  );
}