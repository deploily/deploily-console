"use client";

import {DeploymentsServiceInterface} from "@/lib/features/deployment/deploymentServiceInterface";
import {useDeploymentServices} from "@/lib/features/deployment/deploymentServiceSelectors";
import {fetchDeploymentServices} from "@/lib/features/deployment/deploymentsServiceThunks";
import {useAppDispatch} from "@/lib/hook";
import {Button, Row, Space} from "antd";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useI18n, useScopedI18n} from "../../../../../../../locales/client";
import HomeCarousel from "../../components/homeCarousel";
import DeploymentsServiceCard from "./deploymentsServiceCard";

export default function DeploymentsServiceContainer() {
  const {isLoading, deploymentServicesList} = useDeploymentServices();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const tdeployment = useScopedI18n("deployment");
  const t = useI18n();

  useEffect(() => {
    dispatch(fetchDeploymentServices());
  }, []);

  return (
    <>
      <Space direction="vertical" size="middle" style={{display: "flex", paddingTop: 15}}>
        <Row style={{paddingTop: 20}} justify="space-between" align="middle">
          <span
            style={{
              color: "white",
              paddingLeft: "20px",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            {tdeployment("deployments")}
          </span>
          <Button
            style={{
              marginLeft: "20px",
              backgroundColor: "#6caff0",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              fontSize: "16px", // Increased font size
              borderRadius: "6px", // Slightly reduced border radius
              border: "none",
              cursor: "pointer",
              minWidth: "120px", // Ensures a good width
              height: "40px", // Sets a comfortable height
            }}
            onClick={() => router.push("/portal/deployments")}
          >
            {t("seeAll")}
          </Button>
        </Row>

        <div style={{position: "relative", padding: "0 2rem"}}>
          {!isLoading && deploymentServicesList !== undefined && (
            <HomeCarousel>
              {deploymentServicesList?.result?.map((row: DeploymentsServiceInterface, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 10px",
                    opacity: index === 0 ? 1 : 0.5, // Show first item, hide others with reduced opacity
                    pointerEvents: index === 0 ? "auto" : "none", // Enable interaction for the first item only
                  }}
                >
                  <DeploymentsServiceCard data={row} />
                </div>
              ))}
            </HomeCarousel>
          )}
        </div>
      </Space>
    </>
  );
}
