import { useMyApplicationList } from "@/lib/features/my-applications/myApplicationSelector";
import { fetchMyApplications } from "@/lib/features/my-applications/myApplicationThunks";
import { useAppDispatch } from "@/lib/hook";
import { Card, Col, Result, Row } from "antd";
import { useEffect } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import MyAppCard from "./myAppCard";

export default function MyAppContainer() {
  const dispatch = useAppDispatch();
  const { isLoading, MyApplicationList, loadingError } = useMyApplicationList();
  const t = useI18n();
  const tApp = useScopedI18n('applications');
  useEffect(() => {
    dispatch(fetchMyApplications());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const filteredData: myApplicationInterface[] =
  //   MyApplicationList?.result?.filter((row) => row.status !== "inactive") || [];

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
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card loading={true} style={{ minWidth: 300 }} />
        </Col>
      )}

      {/* Success */}
      {!isLoading && !loadingError && MyApplicationList && MyApplicationList?.result.length > 0 && (
        <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
          {MyApplicationList?.result.map((row) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={8}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <MyAppCard data={row} />
            </Col>
          ))}
        </Row>
      )}

      {/* Error */}
      {!isLoading && loadingError && (
        <Result
          status="500"
          title={t("error")}
          subTitle={t("subTitleError")}
        />
      )}

      {/* Empty */}
      {!isLoading && !loadingError && MyApplicationList?.result.length === 0 && (
        <Result
          status="404"
          title={tApp("noApplications")}
          subTitle={tApp("noActiveApplicationsFound")}
        />
      )}
    </>
  );
}
