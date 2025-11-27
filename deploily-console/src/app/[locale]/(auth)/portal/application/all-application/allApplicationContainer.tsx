"use client";

import {ApplicationServiceInterface} from "@/lib/features/application/applicationServiceInterface";
import {useApplicationServicesList} from "@/lib/features/application/applicationServiceSelectors";
import {fetchApplicationServices} from "@/lib/features/application/applicationServiceThunks";
import {useFavoriteServices} from "@/lib/features/favorites/favoriteServiceSelectors";
import {useAppDispatch} from "@/lib/hook";
import {HomeOutlined, DownOutlined} from "@ant-design/icons";
import {MagnifyingGlass} from "@phosphor-icons/react";
import {Card, Col, Input, Pagination, Result, Row, Space} from "antd";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useI18n, useScopedI18n} from "../../../../../../../locales/client";
import ApplicationServiceCard from "../home-components/applicationServiceCard";

export default function AllApplicationServiceContainer() {
  // ===== Hooks =====
  const dispatch = useAppDispatch();
  const router = useRouter();
  const tApplication = useScopedI18n("applications");
  const t = useI18n();

  // ===== Local State =====
  const [currentPage, setCurrentPage] = useState(1);
  const [hover, setHover] = useState(false);
  const [filterParams, setFilter] = useState({
    page_size: 8,
    page: 0,
    searchTerm: "",
  });

  // ===== Redux Selectors =====
  const {isLoading, applicationServicesList, loadingError} = useApplicationServicesList();
  const {favoriteServiceAdded, favoriteServiceDeleted} = useFavoriteServices();

  // ===== Data =====
  const applications = applicationServicesList?.result || [];

  // ===== Handlers =====
  const handleChange = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      searchTerm: value,
    }));
  };

  const handlePageChange = (pageValue: number) => {
    setCurrentPage(pageValue);
    setFilter((prev) => ({
      ...prev,
      page: pageValue - 1,
    }));
  };

  // ===== Effects =====
  useEffect(() => {
    sessionStorage.setItem("fromPage", "seeAll");
  }, []);

  useEffect(() => {
    dispatch(fetchApplicationServices(filterParams));
  }, [filterParams, dispatch, favoriteServiceAdded, favoriteServiceDeleted]);

  // ===== Render =====
  return (
    <Space direction="vertical" size="middle" style={{display: "flex", paddingTop: 15}}>
      {/* Title */}
      <Row justify="space-between" align="middle" style={{padding: "0 20px"}}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Row>
            <Col span={24} style={{marginBottom: 12}}>
              <span
                style={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: 800,
                }}
              >
                <HomeOutlined
                  style={{
                    cursor: "pointer",
                    color: hover ? "orange" : "white",
                  }}
                  onClick={() => router.back()}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                />{" "}
                /{"\t"}
                {t("application")}
              </span>
            </Col>
          </Row>
        </Col>

        {/* Search Input */}
        <Col xs={24} sm={24} md={24} lg={12}>
          <Row justify="end" gutter={[16, 16]}>
            <Col xs={24} sm={12} md={10} lg={8}>
              <Input
                placeholder={tApplication("search")}
                allowClear
                prefix={<MagnifyingGlass style={{color: "#8c8c8c"}} />}
                value={filterParams.searchTerm}
                onChange={(e) => handleChange(e.target.value)}
                style={{
                  backgroundColor: "#1f1f1f",
                  color: "#fff",
                  border: "1px solid #333",
                  borderRadius: "6px",
                  width: "100%",
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Application Cards */}
      <Row gutter={[24, 24]} justify="start" style={{margin: 0}}>
        {isLoading && applications.length === 0 && (
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

        {!isLoading &&
          applications.length > 0 &&
          applications.map((row: ApplicationServiceInterface) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={6}
              style={{display: "flex", justifyContent: "center"}}
            >
              <ApplicationServiceCard data={row} />
            </Col>
          ))}
      </Row>

      {/* Errors */}
      {!isLoading && loadingError && applications.length === 0 && (
        <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
      )}
      {!isLoading && !loadingError && applications.length === 0 && (
        <Row justify="center">
          <Result
            status="404"
            title={tApplication("noResult")}
            subTitle={tApplication("noResultDescription")}
          />
        </Row>
      )}

      {/* Pagination */}
      <Row justify="end" style={{marginTop: 20}}>
        <Pagination
          current={currentPage}
          pageSize={filterParams.page_size}
          total={applicationServicesList?.count ?? 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </Row>
    </Space>
  );
}
