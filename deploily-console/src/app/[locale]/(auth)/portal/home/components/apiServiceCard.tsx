"use client";
import {Card, Col, Row} from "antd";
import Meta from "antd/es/card/Meta";

export default function ApiServiceCard({data}: any) {
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            hoverable
            style={{width: 240}}
            cover={<img alt="example" src="your-image-url-here.jpg" />}
          >
            <Meta title={data.name} description={data.price} />
            <p>{data.description}</p>
          </Card>
        </Col>
      </Row>
    </>
  );
}
