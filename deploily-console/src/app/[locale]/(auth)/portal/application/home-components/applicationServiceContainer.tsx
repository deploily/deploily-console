"use client";
import { ApplicationServiceInterface } from "@/lib/features/application/applicationServiceInterface";
import { useApplicationService } from "@/lib/features/application/applicationServiceSelectors";
import { fetchApplicationServices } from "@/lib/features/application/applicationServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import { Row } from "antd";
import { useEffect } from "react";
import ApplicationServiceCard from "./applicationServiceCard";
import HomeCarousel from "../../components/homeCarousel";
import { Button } from "deploily-ui-components";

export default function ApplicationServiceContainer() {
  const { isLoading, applicationServiceResponse } = useApplicationService();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchApplicationServices());
  }, []);

  return (
    <>
      <Button type="primary" label="Click Me" onClick={()=>{}} />

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
 <div style={{ position: 'relative', padding: '0 2rem' }}>
        <HomeCarousel>
      {!isLoading && applicationServiceResponse !== undefined && 
          applicationServiceResponse?.result?.map((row: ApplicationServiceInterface,index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 10px",
              }}
            >
              <ApplicationServiceCard data={row}/>
              </div>
          ))}
        </HomeCarousel>
        </div>
   
    </>
  );
}