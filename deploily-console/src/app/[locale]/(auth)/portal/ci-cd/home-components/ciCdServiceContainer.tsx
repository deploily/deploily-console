"use client";
import { Row, Col } from "antd";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hook";
import CiCdServiceCard from "./cdCdServiceCard";
import { fetchCiCdServices } from "@/lib/features/ci-cd-service/cicdServiceThunks";
import { useCiCdService } from "@/lib/features/ci-cd-service/cicdServiceSelectors";
import { CiCdServiceInterface } from "@/lib/features/ci-cd-service/cicdServiceInterface";

export default function CiCdServiceContainer() {
  const { isLoading, cicdServiceResponse } = useCiCdService();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCiCdServices());
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
          CICD
        </span>
        <span style={{ color: "white", fontSize: "16px", marginLeft: 10 , paddingTop: 4 }}>
          (comming soon)  
        </span>
      </Row>

      {!isLoading && cicdServiceResponse !== undefined && (
        <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
          {cicdServiceResponse?.result?.map((row: CiCdServiceInterface) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CiCdServiceCard data={row} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}