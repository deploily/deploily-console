
import { useAppDispatch } from "@/lib/hook";
import { Card, Col, Result, Row } from "antd";
import { useEffect } from "react";
import { useI18n } from "../../../../../../../../locales/client";
import MyAppCard from "../../components/myAppCard";
import { myApplicationInterface } from "@/lib/features/my-applications/myApplicationInterface";
import { useMyApplicationList } from "@/lib/features/my-applications/myApplicationSelector";
import { fetchMyApplications } from "@/lib/features/my-applications/myApplicationThunks";

export default function MyApplicationHistoryContainerr() {
  const dispatch = useAppDispatch();
  const { isLoading, MyApplicationList, loadingError } = useMyApplicationList();
  const t = useI18n();

  useEffect(() => {
    dispatch(fetchMyApplications());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const filteredData: myApplicationInterface[] =
      MyApplicationList?.result?.filter(
      (row) => row.status !== "active"
    ) || [];
  return (
    <>
          {!isLoading && filteredData.length > 0 && (
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
                  <MyAppCard data={row} />
            </Col>
          ))}
        </Row>
      )}

          {isLoading && MyApplicationList === undefined &&
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
          {!isLoading && loadingError &&
        <Result
          status="500"
          title={t('error')}
          subTitle={t('subTitleError')}
        />}
    </>
  );
}
