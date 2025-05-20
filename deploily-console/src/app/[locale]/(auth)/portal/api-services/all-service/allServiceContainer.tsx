"use client";
import { ApiServiceInterface } from "@/lib/features/api-service/apiServiceInterface";
import { useApiServices } from "@/lib/features/api-service/apiServiceSelectors";
import { updateApiServiceSearchValue } from "@/lib/features/api-service/apiServiceSlice";
import { fetchApiServices } from "@/lib/features/api-service/apiServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import { Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import { Button, Card, Col, Input, Pagination, Result, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import ApiServiceCard from "../home-components/apiServiceCard";

export default function AllApiServiceContainer() {
  const t = useI18n();
  const tServiceApi = useScopedI18n("serviceApi");
  const dispatch = useAppDispatch();

  const { apiServiceResponse, isLoadingServiceResponse, apiServiceLoadingError } = useApiServices();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");
  const services = apiServiceResponse?.result || [];

  useEffect(() => {
    dispatch(fetchApiServices());
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(updateApiServiceSearchValue(searchTerm));
      dispatch(fetchApiServices());
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex", paddingTop: 15 }}>
      <Row justify="space-between" align="middle" style={{ padding: "0 20px" }}>
        <span style={{ color: "white", fontSize: "24px", fontWeight: 800 }}>
          {t("APIService")}
        </span>

        {/* Search and Filter */}

        <Space>
          <Input
            placeholder={tServiceApi("search")}
            allowClear
            prefix={<MagnifyingGlass style={{ color: "#8c8c8c" }} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              backgroundColor: "#1f1f1f",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: "6px",
              width: 220,
            }}
          />

          <Button
            icon={<Funnel />}
            style={{
              backgroundColor: "#6caff0",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: 500,
            }}
            onClick={() => {
              dispatch(updateApiServiceSearchValue(searchTerm));
              dispatch(fetchApiServices());
            }}
          >
            {tServiceApi("filter")}
          </Button>
        </Space>
      </Row>

      {/* Service Cards */}
      <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
        {isLoadingServiceResponse && services.length === 0 && (
          <Col xs={24} sm={12} md={10} lg={8} xl={8} style={{ display: "flex", justifyContent: "center" }}>
            <Card loading={true} style={{ minWidth: 300 }} />
          </Col>
        )}

        {!isLoadingServiceResponse && services.length > 0 &&
          services.map((row: ApiServiceInterface) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ApiServiceCard service={row} />
            </Col>
          ))}
      </Row>

      {/* Error */}
      {!isLoadingServiceResponse && apiServiceLoadingError && services.length === 0 && (
        <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
      )}

      {/* Pagination */}
      {!isLoadingServiceResponse && services.length > itemsPerPage && (
        <Row justify="center">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={services.length}
            onChange={setCurrentPage}
            showSizeChanger={false}
          />
        </Row>
      )}
    </Space>
  );
}
