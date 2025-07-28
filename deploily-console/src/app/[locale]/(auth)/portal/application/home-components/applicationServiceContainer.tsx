"use client";
import { ApplicationServiceInterface } from "@/lib/features/application/applicationServiceInterface";
import { useApplicationServicesList } from "@/lib/features/application/applicationServiceSelectors";
import { fetchApplicationServices } from "@/lib/features/application/applicationServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import { Button, Row, Space } from "antd";
import { useEffect } from "react";
import ApplicationServiceCard from "./applicationServiceCard";
import HomeCarousel from "../../components/homeCarousel";
import { useI18n } from "../../../../../../../locales/client";
import { useRouter } from "next/navigation";

export default function ApplicationServiceContainer() {
  const t = useI18n();
  const { isLoading, applicationServicesList } = useApplicationServicesList();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchApplicationServices(4));
  }, []);

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
            {t("application")}
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
          onClick={() => router.push("/portal/application")}
        >
          {t("seeAll")}
        </Button>

      </Row>
      <div style={{ position: 'relative', padding: '0 2rem' }}>
        <HomeCarousel>
          {!isLoading && applicationServicesList !== undefined &&
            applicationServicesList?.result?.map((row: ApplicationServiceInterface, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 10px",
                }}
              >
                <ApplicationServiceCard data={row} />
              </div>
            ))}
        </HomeCarousel>
      </div>

    </Space>
  </>);
}