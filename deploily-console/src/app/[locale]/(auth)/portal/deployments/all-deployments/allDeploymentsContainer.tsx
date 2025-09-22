
"use client";
import { DeploymentsServiceInterface } from "@/lib/features/deployment-service/deploymentServiceInterface";
import { useDeploymentServices } from "@/lib/features/deployment-service/deploymentServiceSelectors";
import { fetchDeploymentServices } from "@/lib/features/deployment-service/deploymentsServiceThunks";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";
import { useAppDispatch } from "@/lib/hook";
import { HomeOutlined } from '@ant-design/icons';
import { Card, Col, Pagination, Result, Row, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import DeploymentsServiceCard from "../home-components/deploymentsServiceCard";

export default function AllDeploymentServiceContainer() {
    const [searchTerm] = useState("");
    const tdeployment = useScopedI18n("deployment");

    const t = useI18n();
    const dispatch = useAppDispatch();
    const [hover, setHover] = useState(false);
    const router = useRouter();

    const { isLoading, deploymentServicesList, loadingError } = useDeploymentServices();


    const deploymentServices = deploymentServicesList?.result || [];
    const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices()

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchDeploymentServices());
    }, [favoriteServiceAdded, favoriteServiceDeleted]);

    useEffect(() => {
        sessionStorage.setItem("fromPage", "seeAll");

        const delayDebounceFn = setTimeout(() => {
            // dispatch(updateDeploymentServiceSearchValue(searchTerm));
            dispatch(fetchDeploymentServices());
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
                    <HomeOutlined
                        style={{ cursor: 'pointer', color: hover ? "orange" : 'white', }}
                        onClick={() => router.back()}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    /> / {"\t"}
                    {tdeployment("deployments")}
                </span>

                {/* <Space>
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
                </Space> */}

            </Row>
            <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
                {isLoading && deploymentServices.length === 0 && (
                    <Col xs={24} sm={12} md={10} lg={8} xl={8} style={{ display: "flex", justifyContent: "center" }}>
                        <Card loading={true} style={{ minWidth: 300 }} />
                    </Col>
                )}

                {!isLoading && deploymentServices.length > 0 &&
                    deploymentServices.map((row: DeploymentsServiceInterface, index) => (
                        <Col
                            key={index}
                            xs={24}
                            sm={12}
                            md={10}
                            lg={8}
                            xl={6}
                            style={{
                                display: "flex", justifyContent: "center",
                                opacity: index === 0 ? 1 : 0.5, // Show first item, hide others with reduced opacity
                                pointerEvents: index === 0 ? "auto" : "none" // Enable interaction for the first item only
                            }}
                        >
                            <DeploymentsServiceCard data={row} />
                        </Col>
                    ))}
            </Row>
            {!isLoading && loadingError && deploymentServices.length === 0 && (
                <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
            )}
            {!isLoading && !loadingError && deploymentServices.length === 0 && (
                <Row justify="center">
                    <Result
                        status="404"
                        title={tdeployment("noResult")}
                        subTitle={tdeployment("noResultDescription")}
                    />
                </Row>
            )}

            <Row justify="end" style={{ marginTop: 20 }}>

                <Pagination
                    current={currentPage}
                    pageSize={filterParams.page_size}
                    total={deploymentServicesList?.count ?? 0}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />

            </Row>
        </Space>
    );
}

