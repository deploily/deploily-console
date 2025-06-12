"use client";
import { ApplicationServiceInterface } from "@/lib/features/application/applicationServiceInterface";
import { fetchApplicationServices } from "@/lib/features/application/applicationServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import { Row } from "antd";
import { useEffect } from "react";
import ApplicationServiceCard from "./applicationServiceCard";
import HomeCarousel from "../../components/homeCarousel";
import { Button } from "deploily-ui-components";
import { useApplicationServicesList } from "@/lib/features/application/applicationServiceSelectors";

export default function ApplicationServiceContainer() {
  const { isLoading, applicationServicesList } = useApplicationServicesList();
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
          {!isLoading && applicationServicesList !== undefined && 
            applicationServicesList?.result?.map((row: ApplicationServiceInterface,index) => (
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