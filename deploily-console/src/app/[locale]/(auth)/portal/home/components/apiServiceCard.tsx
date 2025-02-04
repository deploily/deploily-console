"use client";
import {Star} from "@phosphor-icons/react";
import {Card, Col, Row, Image} from "antd";
import Meta from "antd/es/card/Meta";

export default function ApiServiceCard({data}: any) {
  return (
    <>
      <Card hoverable>
        <Row align="middle" gutter={16}>
          <Col style={{paddingBottom: 10}}>
            <Image alt="Logo" src="/images/logo_service.png" width={80} height={80} />
          </Col>
          <Col style={{padding: 10}}>
            <Meta
              title={
                <p
                  style={{fontFamily: "Inter, sans-serif", fontWeight: "regular", fontSize: "20px"}}
                >
                  {data.name}
                </p>
              }
              description={
                <p
                  style={{
                    color: "#DD8859",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {data.price}
                </p>
              }
            />
          </Col>
          <Col style={{display: "flex", justifyContent: "flex-end"}}>
            <Star size={20} color="#7D7D7D" />
          </Col>{" "}
        </Row>
        <p>{data.description}</p>
      </Card>
    </>
  );
}
