"use client";
import { ApplicationServiceInterface } from "@/lib/features/application/applicationServiceInterface";
import { useApplicationService } from "@/lib/features/application/applicationServiceSelectors";
import { fetchApplicationServices } from "@/lib/features/application/applicationServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import { Col, Row } from "antd";
import { useEffect } from "react";
import ApplicationServiceCard from "./applicationServiceCard";

export default function ApplicationServiceContainer() {
  const { isLoading, applicationServiceResponse } = useApplicationService();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchApplicationServices());
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
          Applications
        </span>
        <span style={{ color: "white", fontSize: "16px", marginLeft: 10, paddingTop: 4 }}>
          (coming soon)
        </span>
      </Row>

      {!isLoading && applicationServiceResponse !== undefined && (
        <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
          {applicationServiceResponse?.result?.map((row: ApplicationServiceInterface) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ApplicationServiceCard data={row} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}