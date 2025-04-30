"use client";
import { CloudResourceInterface } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { useCloudResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { fetchCloudResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useAppDispatch } from "@/lib/hook";
import { Col, Row } from "antd";
import { useEffect } from "react";
import CloudResourceCard from "./cloudResourceCard";

export default function CloudResourceContainer() {
  const { isLoading, cloudResourceResponse } = useCloudResource();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCloudResources());
  }, []);

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
        <span style={{ color: "white", fontSize: "16px", marginLeft: 10, paddingTop: 4 }}>
          (coming soon)
        </span>
      </Row>

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
              <CloudResourceCard data={row} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}