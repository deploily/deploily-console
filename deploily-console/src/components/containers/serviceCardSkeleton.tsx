// .tsx
"use client";

import { Card, Col, Row, Skeleton } from "antd";

export function ServiceCardSkeleton() {
    return (
        <Card
            style={{ minWidth: 250, maxWidth: 270, height: 350 }}
              styles={{ body: { padding: 16, height: "100%" }}}
        >
            <div style={{ height: "280px" }}>
                {/* Header */}
                <Row align="top" justify="space-between" gutter={16} style={{ height: "40%" }}>
                    <Col span={12}>
                        <Skeleton.Image active style={{ width: 100, height: 100, borderRadius: 12 }} />
                    </Col>
                    <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Skeleton.Input active size="small" style={{ width: 110, height: 18 }} />
                    </Col>
                </Row>

                {/* Title & Description */}
                <Row style={{ height: "40%", paddingTop: 12 }}>
                    <Col span={24}>
                        <Skeleton.Input active size="default" style={{ width: "80%", marginBottom: 10 }} />
                        <Skeleton.Input active size="small" style={{ width: "100%", marginBottom: 6 }} />
                        <Skeleton.Input active size="small" style={{ width: "70%" }} />
                    </Col>
                </Row>
            </div>

            {/* Details button */}
            <div style={{ position: "absolute", bottom: 16, right: 16 }}>
                <Skeleton.Input active size="small" style={{ width: 80, height: 20 }} />
            </div>
        </Card>
    );
}



export function ServiceCardsSkeleton() {
    return (
        <Row gutter={[16, 16]} style={{ flexWrap: "nowrap", overflow: "hidden", padding: "0 10px" }}>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "center", margin: "0 10px" }}>
                    <ServiceCardSkeleton />
                </div>
            ))}
        </Row>
    );
}


