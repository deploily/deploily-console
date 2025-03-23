import { useEffect } from "react";
import { Row, Col } from "antd";
import { useAppDispatch } from "@/lib/hook";
import { fetchSubscribe } from "@/lib/features/subscribe/subscribeThunks";
import {  useSubscribe } from "@/lib/features/subscribe/subscribeSelectors";
import { SubscribeInterface } from "@/lib/features/subscribe/subscribeInterface";
import SubscriptionCard from "./subscriptionCard";

export default function SubscriptionContainer() {
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
              <SubscriptionCard data={row} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
