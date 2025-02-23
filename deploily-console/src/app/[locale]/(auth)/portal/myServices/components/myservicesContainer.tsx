"use client";
import {Col, Row} from "antd";
import {useEffect} from "react";
import {useAppDispatch} from "@/lib/hook";
import MyServiceCard from "./myServicesCard";
import { useCartLine } from "@/lib/features/cartLine/cartLineSelectors";
import { CartLinesInterface } from "@/lib/features/cartLine/cartLineInterface";
import { fetchCartLines } from "@/lib/features/cartLine/cartLineThunks";

export default function MyServiceContentPage() {
  const { isLoading, cartLineResponse } = useCartLine();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCartLines());
  }, []);

  return (
    <>
      {!isLoading && cartLineResponse !== undefined && (
        <Row gutter={[24, 24]} justify="start" style={{margin: 0}}>
          {cartLineResponse?.result?.map((row: CartLinesInterface) => (
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
