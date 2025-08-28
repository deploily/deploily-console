"use client";

import { Layout, Typography, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { terms } from "./utils/terms";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function TermsConditionsPageContent() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
                <Breadcrumb style={{ marginBottom: 24 }}>
                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Terms & Conditions</Breadcrumb.Item>
                </Breadcrumb>

                <Title level={2}>Deploily Terms & Conditions</Title>
                <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
                    Effective Date: {new Date().toLocaleDateString()} • Last Updated:{" "}
                    {new Date().toLocaleDateString()}
                </Text>
                <Paragraph>
                    Company Name: <Text strong>[Transformatek]</Text>
                    <br />
                    Web site: <a href="https://deploily.cloud">https://deploily.cloud</a>
                    <br />
                    Console: <a href="https://console.deploily.cloud">https://console.deploily.cloud</a>
                    <br />
                    Email: <a href="mailto:deploily@transformatek.dz">deploily@transformatek.dz</a>.
                </Paragraph>

                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {terms.map(({ title, content }) => (
                        <section key={title}>
                            <Title level={3}>{title}</Title>
                            {content.split("\n\n").map((para, idx) => (
                                <Paragraph key={idx}>
                                    {para.split("\n").map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </Paragraph>
                            ))}
                        </section>
                    ))}
                </div>

            </Content>
        </Layout>
    );
}
