"use client";
import { CiCdServiceInterface } from "@/lib/features/ci-cd-service/cicdServiceInterface";
import { useCiCdService } from "@/lib/features/ci-cd-service/cicdServiceSelectors";
import { fetchCiCdServices } from "@/lib/features/ci-cd-service/cicdServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import { Row, Space } from "antd";
import { useEffect } from "react";
import HomeCarousel from "../../components/homeCarousel";
import CiCdServiceCard from "./cdCdServiceCard";

export default function CiCdServiceContainer() {
  const { isLoading, cicdServiceResponse } = useCiCdService();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCiCdServices());
  }, []);

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
            CICD
          </span>
          <span style={{ color: "white", fontSize: "16px", marginLeft: 10, paddingTop: 4 }}>
            (coming soon)
          </span>
        </Row>

        <div style={{ position: 'relative', padding: '0 2rem' }}>
          <HomeCarousel>
            {!isLoading && cicdServiceResponse !== undefined && cicdServiceResponse?.result?.map((row: CiCdServiceInterface, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 10px",
                }}
              >
                <CiCdServiceCard data={row} />
              </div>
            ))}
          </HomeCarousel>
        </div>
      </Space>
    </>
  );
}