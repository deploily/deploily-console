import { useEffect } from "react";
import { Row, Col } from "antd";
import { useAppDispatch } from "@/lib/hook";
import MyServiceCard from "./MyServiceCard";
import { fetchSubscribe } from "@/lib/features/subscribe/subscribeThunks";
import {  useSubscribe } from "@/lib/features/subscribe/subscribeSelectors";
import { SubscribeInterface } from "@/lib/features/subscribe/subscribeInterface";

export default function MyServiceContentPage() {
  const dispatch = useAppDispatch();
  const { subscribeLoading, subscribeResponse } = useSubscribe()

  useEffect(() => {
    dispatch(fetchSubscribe());
  }, []);

  return (
    <>
      {!subscribeLoading && subscribeResponse !== undefined && (
        <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
          {subscribeResponse?.result?.map((row: SubscribeInterface) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={8}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <MyServiceCard data={row} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
