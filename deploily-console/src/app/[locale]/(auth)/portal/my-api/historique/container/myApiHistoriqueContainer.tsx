import { useAppDispatch } from "@/lib/hook";
import { Card, Col, Result, Row } from "antd";
import { useEffect } from "react";
import { useApiServiceSubscription } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionSelectors";
import { fetchApiServiceSubscription } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionThunks";
import { ApiServiceSubscriptionInterface } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionInterface";
import { useI18n } from "../../../../../../../../locales/client";
import MyApiCard from "../../components/myApiCard";

export default function MyApiHistoriqueContainer() {
  const dispatch = useAppDispatch();
  const { apiServiceSubscriptionLoading, apiServiceSubscriptionResponse, apiServiceSubscriptionLoadingError } = useApiServiceSubscription()
  const t = useI18n();

  useEffect(() => {
    dispatch(fetchApiServiceSubscription());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredData: ApiServiceSubscriptionInterface[] =
    apiServiceSubscriptionResponse?.result?.filter(
      (row) => row.status !== "active"
    ) || [];
  return (
    <>
      {!apiServiceSubscriptionLoading && filteredData.length > 0 && (
        <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
          {filteredData.map((row) => (
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

      {apiServiceSubscriptionLoading && apiServiceSubscriptionResponse === undefined &&
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
      {!apiServiceSubscriptionLoading && apiServiceSubscriptionLoadingError &&
        <Result
          status="500"
          title={t('error')}
          subTitle={t('subTitleError')}
        />}
    </>
  );
}
