"use client";
import {useAllServices} from "@/lib/features/apiService/apiServiceSelectors";
import {Col, Row} from "antd";
import {ApiServiceInterface} from "@/lib/features/apiService/apiServiceInterface";
import {useEffect} from "react";
import {fetchApiServices} from "@/lib/features/apiService/apiServiceThunks";
import {useAppDispatch} from "@/lib/hook";
import MyServiceCard from "./myServicesCard";

export default function MyServiceContentPage() {
  const {isLoading, apiServiceResponse} = useAllServices();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchApiServices());
  }, []);

  return (
    <>
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
              style={{display: "flex", justifyContent: "center", marginBottom: 24}}
            >
              <MyServiceCard data={row} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
