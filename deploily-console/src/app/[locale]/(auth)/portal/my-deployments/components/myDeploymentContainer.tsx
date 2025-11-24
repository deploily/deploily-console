import {Card, Col, Result, Row} from "antd";
import {useEffect} from "react";
import {useI18n, useScopedI18n} from "../../../../../../../locales/client";
import {fetchMyDeployments} from "@/lib/features/my-deployments/myDeploymentThunks";
import {useMyDeploymentList} from "@/lib/features/my-deployments/myDeploymentSelector";
import {useAppDispatch} from "@/lib/hook";
import MyDeploymentCard from "./myDeploymentCard";

export default function MyDeploymentContainer() {
  const dispatch = useAppDispatch();
  const {isLoading, MyDeploymentList, loadingError} = useMyDeploymentList();
  const t = useI18n();
  const tDeployment = useScopedI18n("deployment");
  useEffect(() => {
    dispatch(fetchMyDeployments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Loading */}
      {isLoading && (
        <Col
          xs={24}
          sm={12}
          md={10}
          lg={8}
          xl={8}
          style={{display: "flex", justifyContent: "center"}}
        >
          <Card loading={true} style={{minWidth: 300}} />
        </Col>
      )}

      {/* Success */}
      {!isLoading && !loadingError && MyDeploymentList && MyDeploymentList?.length > 0 && (
        <Row gutter={[24, 24]} justify="start" style={{margin: 0}}>
          {MyDeploymentList?.map((row) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={8}
              style={{display: "flex", justifyContent: "center"}}
            >
              <MyDeploymentCard data={row} />
            </Col>
          ))}
        </Row>
      )}

      {/* Error */}
      {!isLoading && loadingError && (
        <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
      )}

      {/* Empty */}
      {!isLoading && !loadingError && MyDeploymentList?.length === 0 && (
        <Result
          status="404"
          title={tDeployment("noDeployments")}
          subTitle={tDeployment("noActiveDeploymentFound")}
        />
      )}
    </>
  );
}
