"use client";

import {  Filter } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { useCloudResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { fetchCloudResources, fetchResourceCategories, getProvidersList } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";
import { useAppDispatch } from "@/lib/hook";
import { DownOutlined, HomeOutlined } from '@ant-design/icons';
import { GridFour, ListDashes, MagnifyingGlass } from "@phosphor-icons/react";
import { Col, Input, Pagination, Result, Row, Select, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import AllCloudRessoucesList from "./allCloudRessourcesList";
import AllCloudResourcesCard from "./allCloudResourcesCard";

export default function AllCloudResourcesContainer() {
    // ===== Hooks =====
    const dispatch = useAppDispatch();
    const tServiceApi = useScopedI18n("serviceApi");
    const t = useI18n();
    const router = useRouter();
    const [toggleView, setToggleView] = useState(true)

    // ===== Local State =====
    const [currentPage, setCurrentPage] = useState(1);
    const [hover, setHover] = useState(false);
    const [filterParams, setFilter] = useState(
        {
            page_size: 8,
            page: 0,
            provider: undefined,
            category: undefined,
            searchTerm: "",
        },
    );

    // ===== Redux Selectors =====
    const { isLoading, cloudResourceResponse, cloudResourceLoadingError, providersListResponse, resourceCategoriesResponse } = useCloudResource();
    const { favoriteServiceAdded, favoriteServiceDeleted } = useFavoriteServices();

    // ===== Data =====
    const resources = cloudResourceResponse?.result || [];


    // ===== Handlers =====
    const handleChange = (value: string | number | null, field: keyof Filter) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            [field]: value === null ? undefined : field === "searchTerm" ? String(value) : Number(value),

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
        dispatch(fetchResourceCategories());
        dispatch(getProvidersList());

    }, []);

    useEffect(() => {
        dispatch(fetchCloudResources(filterParams));
    }, [filterParams, favoriteServiceAdded, favoriteServiceDeleted]);


    // ===== Render =====

    return (
        <Space direction="vertical" size="middle" style={{ display: "flex", paddingTop: 15 }}>

            {/* Title */}
            <Row justify="space-between" align="middle" style={{ padding: "0 20px" }}>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <Row>
                        <Col span={24} style={{ marginBottom: 12 }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: 800, }}>
                                <HomeOutlined
                                    style={{ cursor: 'pointer', color: hover ? "orange" : 'white', }}
                                    onClick={() => router.back()}
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                /> / {"\t"}
                                {t("cloudResources")}
                            </span>
                        </Col>
                    </Row>
                </Col>

                <Col xs={24} sm={24} md={24} lg={12}>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={24} lg={10}>
                            <Input
                                placeholder={tServiceApi("search")}
                                allowClear
                                prefix={<MagnifyingGlass style={{ color: "#8c8c8c" }} />}
                                value={filterParams.searchTerm}
                                onChange={(e) => handleChange(e.target.value, "searchTerm")}
                                style={{
                                    backgroundColor: "#1f1f1f",
                                    color: "#fff",
                                    border: "1px solid #333",
                                    borderRadius: "6px",

                                }}
                            />
                        </Col>

                        <Col xs={24} sm={12} md={10} lg={6}>
                            <Select
                                allowClear
                                onChange={(value) => handleChange(value, "category")}
                                options={resourceCategoriesResponse && resourceCategoriesResponse.result.map((provider) => ({
                                    value: provider.id,
                                    label: provider.name,
                                }))}
                                placeholder="Select Category"
                                suffixIcon={<DownOutlined style={{ color: 'orange' }} />}
                                style={{
                                    width: '100%',
                                    color: 'white',
                                    backgroundColor: '#1e1e1e',
                                    border: '2px solid #FF6600',
                                    borderRadius: '10px',
                                }}
                                dropdownStyle={{
                                    backgroundColor: '#1e1e1e',
                                    color: 'white',
                                }}
                            />
                        </Col>

                        <Col xs={24} sm={12} md={10} lg={6}>
                            <Select
                                allowClear

                                onChange={(value) => handleChange(value, "provider")}
                                options={providersListResponse && providersListResponse.result.map((provider) => ({
                                    value: provider.id,
                                    label: provider.name,
                                }))}
                                placeholder="Select Provider"
                                suffixIcon={<DownOutlined style={{ color: 'orange' }} />}
                                style={{
                                    width: '100%',
                                    color: 'white',
                                    backgroundColor: '#1e1e1e',
                                    border: '2px solid #FF6600',
                                    borderRadius: '10px',
                                }}
                                dropdownStyle={{
                                    backgroundColor: '#1e1e1e',
                                    color: 'white',
                                }}
                                optionLabelProp="label"
                            />
                        </Col>
                        <Col xs={24} sm={12} md={2} lg={2}>
                            <div style={{
                                backgroundColor: "#1f1f1f",
                                color: "#fff",
                                border: "1px solid #333",
                                borderRadius: "6px",
                                width: "35px",
                                paddingInline: 3,
                                paddingBlock: 0
                            }}>
                                {toggleView ?
                                    <ListDashes size={28} style={{ cursor: "pointer", }} onClick={() => setToggleView(!toggleView)} />
                                    :
                                    <GridFour size={28} style={{ cursor: "pointer", }} onClick={() => setToggleView(!toggleView)} />

                                }
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            {toggleView ? <AllCloudResourcesCard isLoading={isLoading} resources={resources} /> : <AllCloudRessoucesList isLoading={isLoading} resources={resources} />}

            {!isLoading && cloudResourceLoadingError && resources.length === 0 && (
                <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
            )}

            {/* Pagination */}
            <Row justify="end" style={{ marginTop: 20 }}>
                <Pagination
                    current={currentPage}
                    pageSize={filterParams.page_size}
                    total={cloudResourceResponse?.count ?? 0}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </Row>
        </Space>
    );
}
