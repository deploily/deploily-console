"use client";
import {useAllServices} from "@/lib/features/apiService/apiServiceSelectors";
import {Row, Col} from "antd";
import ApiServiceCard from "./apiServiceCard";
import {ApiServiceInterface} from "@/lib/features/apiService/apiServiceInterface";
import {useEffect} from "react";
import {fetchApiServices} from "@/lib/features/apiService/apiServiceThunks";
import {useAppDispatch} from "@/lib/hook";

export default function ApiServiceContainer() {
  const {isLoading, apiServiceResponse} = useAllServices();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchApiServices());
  }, []);

  return (
    <>
      <Row style={{padding: 20}}>
        <span
          style={{
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          API Service
        </span>
      </Row>

      {!isLoading && apiServiceResponse !== undefined && (
        <Row gutter={[24, 24]} justify="start" style={{margin: 0}}>
          {apiServiceResponse?.result?.map((row: ApiServiceInterface) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={6}
              style={{display: "flex", justifyContent: "center"}}
            >
              <ApiServiceCard data={row} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
