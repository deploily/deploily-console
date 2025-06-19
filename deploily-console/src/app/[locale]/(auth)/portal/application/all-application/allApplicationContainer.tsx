
"use client";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";
import { useAppDispatch } from "@/lib/hook";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Card, Col, Input, Pagination, Result, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import { useApplicationServicesList } from "@/lib/features/application/applicationServiceSelectors";
import { ApplicationServiceInterface } from "@/lib/features/application/applicationServiceInterface";
import { fetchApplicationServices } from "@/lib/features/application/applicationServiceThunks";
import ApplicationServiceCard from "../home-components/applicationServiceCard";
import { updateApplicationServiceSearchValue } from "@/lib/features/application/applicationServiceSlice";

export default function AllApplicationServiceContainer() {
    const [searchTerm, setSearchTerm] = useState("");
    const tApplication = useScopedI18n("applications");
    const t = useI18n();
    const dispatch = useAppDispatch();

    const { isLoading, applicationServicesList, loadingError } = useApplicationServicesList();
   
    const applications = applicationServicesList?.result || [];
    const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices()

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchApplicationServices(10));
    }, [favoriteServiceAdded, favoriteServiceDeleted]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            dispatch(updateApplicationServiceSearchValue(searchTerm));
            dispatch(fetchApplicationServices(10));
        }, 800);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, dispatch]);
    
    const [filterParams, setFilter] = useState(
        {
            page_size: 10,
            page: 0,
            searchTerm: "",
        },
    );

    const handlePageChange = (pageValue: number) => {

        setCurrentPage(pageValue);
        setFilter((prev) => ({
            ...prev,
            page: pageValue - 1,
        }));
    };
    return (
        <Space direction="vertical" size="middle" style={{ display: "flex", paddingTop: 15 }}>
            <Row justify="space-between" align="middle" style={{ padding: "0 20px" }}>
                <span style={{ color: "white", fontSize: "24px", fontWeight: 800 }}>
                    {t("application")}
                </span>

                <Space>
                    <Input
                        placeholder={tApplication("search")}
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


                </Space>
            </Row>
            <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
                {isLoading && applications.length === 0 && (
                    <Col xs={24} sm={12} md={10} lg={8} xl={8} style={{ display: "flex", justifyContent: "center" }}>
                        <Card loading={true} style={{ minWidth: 300 }} />
                    </Col>
                )}

                {!isLoading && applications.length > 0 &&
                    applications.map((row: ApplicationServiceInterface) => (
                        <Col
                            key={row.id}
                            xs={24}
                            sm={12}
                            md={10}
                            lg={8}
                            xl={6}
                            style={{ display: "flex", justifyContent: "center" }}
                        >
                            <ApplicationServiceCard data={row} />
                        </Col>
                    ))}
            </Row>
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

            <Row justify="end" style={{ marginTop: 20 }}>
                  
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

