"use client";

import { CloudResourceInterface } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { Table, Button, Typography } from "antd";
import { HeartStraight, ArrowRight } from "@phosphor-icons/react";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { postFavoriteService } from "@/lib/features/favorites/favoriteServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { useI18n } from "../../../../../../../locales/client";
import { theme } from "@/styles/theme";
import { useState } from "react";

export default function AllCloudRessoucesList({
    isLoading,
    resources
}: { isLoading: boolean; resources: CloudResourceInterface[] }) {

    const t = useI18n();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { Paragraph } = Typography;
    const handleFavoriteService = (id: number) => {
        dispatch(postFavoriteService({ service_id: id }));
    };
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const columns = [

        {
            title: t("name"),
            dataIndex: "name",
            width: 250,
            render: (_: any, row: CloudResourceInterface) => (

                <Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0, fontWeight: 600 }}>
                    <ImageFetcher
                        imagePath={row.image_service}
                        width={45}
                        height={45}
                    />
                    <span style={{ marginLeft: "5px" }} > {row.name}</span>

                </Paragraph>
            )
        },

        {
            title: t("description"),
            dataIndex: "short_description",
            width: 400,
            render: (value: any) => (
                <Paragraph ellipsis={{ rows: 2 }} style={{ margin: 0 }}>
                    {value}
                </Paragraph>
            )
        },

        {
            title: t("price"),
            dataIndex: "unit_price",
            width: 180,
            render: (value: any, row: CloudResourceInterface) => (
                <Paragraph style={{ color: "#DD8859", fontWeight: 600, margin: 0 }}>
                    {value
                        ? Intl.NumberFormat("fr-FR").format(value) +
                        " DZD / " +
                        (row.price_category === "monthly" ? t("month") : t("year"))
                        : t("affiliation.onDemand")
                    }
                </Paragraph>
            )
        },

        {
            title: t("favorite"),
            dataIndex: "is_in_favorite",
            width: 120,
            render: (_: any, row: CloudResourceInterface) => {
                return (
                    <Button
                        style={{
                            border: "none",
                            backgroundColor: "#fff",
                            boxShadow: "0 0 3px rgba(0,0,0,0.2)",
                            borderRadius: "50%",
                            width: 24,
                            height: 24,
                            padding: 0,
                        }}
                        icon={
                            row.is_in_favorite
                                ? <HeartStraight size={16} weight="fill" color="#FC3232" />
                                : <HeartStraight size={16} weight="fill" color="#888" />
                        }
                        onClick={() => {
                            handleFavoriteService(row.id);
                        }}
                    />
                )
            }
        },

        {
            title: "",
            dataIndex: "id",
            width: 120,
            render: (id: number) => (
                <Button
                    type="text"
                    style={{
                        border: "none",
                        background: "transparent",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 600,
                        transition: "0.3s ease",
                        color: hoveredId === id
                            ? theme.token.colorPrimary
                            : theme.token.gray200,
                    }}
                    onMouseEnter={() => setHoveredId(id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/portal/cloud-resources/${id}`);
                    }}
                >
                    <span style={{ fontSize: 16, paddingRight: 4 }}>
                        {t("details")}
                    </span>
                    <ArrowRight size={18} />
                </Button>
            )

        }
    ];

    return (
        <Table
            loading={isLoading}
            columns={columns}
            dataSource={resources}
            rowKey="id"
            pagination={false}
            bordered={false}
            style={{borderRadius:"16px"}}

        />
    );
}


