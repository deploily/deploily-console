import { SubscriptionInterface } from "@/lib/features/subscriptions/subscriptionInterface";
import { useSubscription } from "@/lib/features/subscriptions/subscriptionSelectors";
import { fetchSubscription } from "@/lib/features/subscriptions/subscriptionThunks";
import { useAppDispatch } from "@/lib/hook";
import { Card, Col, Result, Row } from "antd";
import { useEffect } from "react";
import { useI18n } from "../../../../../../../locales/client";
import MyApiCard from "./myApiCard";

export default function MyApiContainer() {
  const dispatch = useAppDispatch();
  const { subscriptionLoading, subscriptionResponse, subscriptionLoadingError } = useSubscription()
  const t = useI18n();

  useEffect(() => {
    dispatch(fetchSubscription());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!subscriptionLoading && subscriptionResponse !== undefined && (
        <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
          {subscriptionResponse?.result?.map((row: SubscriptionInterface) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={8}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <MyApiCard data={row} />
            </Col>
          ))}
        </Row>
      )}
      {subscriptionLoading && subscriptionResponse === undefined &&
        <Col
          xs={24}
          sm={12}
          md={10}
          lg={8}
          xl={8}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card loading={true} style={{ minWidth: 300 }} />
        </Col>
      }
      {!subscriptionLoading && subscriptionLoadingError &&
        <Result
          status="500"
          title={t('error')}
          subTitle={t('subTitleError')}
        />}
    </>
  );
}
