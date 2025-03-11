import { useEffect } from "react";
import { Row, Col } from "antd";
import { useAppDispatch } from "@/lib/hook";
import MyServiceCard from "./myServicesCard";
import { fetchMyServices } from "@/lib/features/myService/myServiceThunks";
import { useMyService } from "@/lib/features/myService/myServiceSelectors";
import { MyServiceInterface } from "@/lib/features/myService/myServiceInterface";

export default function MyServiceContentPage() {
  const dispatch = useAppDispatch();
  const {myServiceLoading, myServiceResponse} = useMyService()
  
  useEffect(() => {
    dispatch(fetchMyServices());
  }, []);

  return (
    <>
      {!myServiceLoading && myServiceResponse !== undefined && (
        <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
          {myServiceResponse?.result?.map((row: MyServiceInterface) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={6}
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
