"use client";
import { CloudResourceInterface } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { useCloudResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { updateCloudResourcesSearchValue } from "@/lib/features/cloud-resource/cloudResourceSlice";
import { fetchCloudResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";
import { useAppDispatch } from "@/lib/hook";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Card, Col, Input, Pagination, Result, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import CloudResourceCard from "../home-components/cloudResourceCard";

export default function AllCloudResourcesContainer() {
    const [searchTerm, setSearchTerm] = useState("");
    const tServiceApi = useScopedI18n("serviceApi");
    const t = useI18n();
    const dispatch = useAppDispatch();

    const { isLoading, cloudResourceResponse, cloudResourceLoadingError } = useCloudResource();

    const resources = cloudResourceResponse?.result || [];
    const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    useEffect(() => {
        dispatch(fetchCloudResources(10));
    }, [favoriteServiceAdded, favoriteServiceDeleted]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            dispatch(updateCloudResourcesSearchValue(searchTerm));
            dispatch(fetchCloudResources(10));
        }, 800);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, dispatch]);
    return (
        <Space direction="vertical" size="middle" style={{ display: "flex", paddingTop: 15 }}>
            <Row justify="space-between" align="middle" style={{ padding: "0 20px" }}>
                <span style={{ color: "white", fontSize: "24px", fontWeight: 800 }}>
                    {t("cloudResources")}
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


                </Space>
            </Row>
            <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
                {isLoading && resources.length === 0 && (
                    <Col xs={24} sm={12} md={10} lg={8} xl={8} style={{ display: "flex", justifyContent: "center" }}>
                        <Card loading={true} style={{ minWidth: 300 }} />
                    </Col>
                )}

                {!isLoading && resources.length > 0 &&
                    resources.map((row: CloudResourceInterface) => (
                        <Col
                            key={row.id}
                            xs={24}
                            sm={12}
                            md={10}
                            lg={8}
                            xl={6}
                            style={{ display: "flex", justifyContent: "center" }}
                        >
                            <CloudResourceCard resource={row} />
                        </Col>
                    ))}
            </Row>
            {!isLoading && cloudResourceLoadingError && resources.length === 0 && (
                <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
            )}

            {/* Pagination */}
            {!isLoading && resources.length > itemsPerPage && (
                <Row justify="center">
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={resources.length}
                        onChange={setCurrentPage}
                        showSizeChanger={false}
                    />
                </Row>
            )}
        </Space>
    );
}
