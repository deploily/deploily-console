"use client";

import { useAppDispatch } from '@/lib/hook';
import { HomeOutlined } from '@ant-design/icons';
import { Col, Row, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import { fetchDeploymentServiceById } from '@/lib/features/deployment-service/deploymentsServiceThunks';

export default function DeploymentDetailsPageContent({ deploymentServiceId }: { deploymentServiceId: any }) {
    const tdeployment = useScopedI18n("deployment");
    const dispatch = useAppDispatch();

    const router = useRouter();
    const [hover, setHover] = useState(false);
    const [fromPage, setFromPage] = useState<"seeAll" | "home" | null>(null);


    useEffect(() => {
        dispatch(fetchDeploymentServiceById(deploymentServiceId));
    }, []);
    useEffect(() => {

        const storedFrom = sessionStorage.getItem("fromPage");

        if (storedFrom === "home" || storedFrom === "seeAll") {
            setFromPage(storedFrom);
        }
    }, []);

    return (
        <>

            <Space
                direction="vertical"
                size="large"
                style={{
                    paddingInline: 40,
                    marginBlock: 10,
                    width: "100%",
                    marginBottom: 50,
                    paddingTop: 20,
                    justifyContent: "center",
                }}
            >

                <Col xs={24} sm={24} md={24} lg={12}>
                    <Row>
                        <Col span={24} style={{ marginBottom: 12 }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: 800, }}>

                                <span
                                    style={{ cursor: "pointer", color: hover ? "orange" : "white" }}
                                    onClick={() => router.back()}
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                >
                                    {fromPage === "home" ? (
                                        <HomeOutlined style={{ marginRight: 4 }} />
                                    ) : (
                                        tdeployment("deployments")
                                    )}
                                </span>  / {"\t"}
                                {deploymentServiceId !== undefined && deploymentServiceId.name}
                            </span>


                        </Col>
                    </Row>
                </Col>

            </Space>

        </>
    );
}
