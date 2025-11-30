import { CloudResourceInterface } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { Card, Col, Row } from "antd";
import CloudResourceCard from "../home-components/cloudResourceCard";

export default function AllCloudResourcesCard({ isLoading, resources }: { isLoading: boolean, resources: CloudResourceInterface[] }) {

    return (
        <>
            <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
                {isLoading && resources.length === 0 && (
                    <Col xs={24} sm={12} md={10} lg={8} xl={8} style={{ display: "flex", justifyContent: "center" }}>
                        <Card loading={true} style={{ minWidth: 300 }} />
                    </Col>
                )}

                {resources.length > 0 &&
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

                            <CloudResourceCard resource={row} from={"seeAll"} />
                        </Col>
                    ))}

            </Row>
        </>
    )

}