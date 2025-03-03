"use client";
import { Row, Col, Space } from "antd";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hook";
import { useFavoriteServices } from "@/lib/features/favorites/favoriteServiceSelectors";
import { fetchMyFavoriteServices } from "@/lib/features/favorites/favoriteServiceThunks";
import { FavoriteServiceInterface } from "@/lib/features/favorites/favoriteServiceInterface";
import FavoriteServiceCard from "./components/favoriteServiceCard";

export default function FavoriteServicesContainer() {
    const { isLoading, favoriteServicesList } = useFavoriteServices();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMyFavoriteServices());
    }, []);

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex', paddingTop: 15 }} >

            {!isLoading && favoriteServicesList !== undefined && (
                <>
                    <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
                        {favoriteServicesList?.result?.map((row: FavoriteServiceInterface) => (
                            <Col
                                key={row.id}
                                xs={24}
                                sm={12}
                                md={10}
                                lg={8}
                                xl={6}
                                style={{ display: "flex", justifyContent: "center" }}
                            >
                                <FavoriteServiceCard favoriteService={row} />
                            </Col>
                        ))}
                    </Row>
                </>)}
        </Space>

    );
}
