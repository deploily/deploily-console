"use client";
import {Card, Row, theme} from "antd";

export default function ComingSoonPage() {
  const {useToken} = theme;
  const {token} = useToken();

  return (
    <Row justify="center" align="middle" style={{height: "80vh", padding: 20}}>
      <Card
        hoverable
        style={{backgroundColor: token.colorPrimary, justifyItems: "center"}}
        cover={<img alt="coming soon" src="/images/coming_soon.jpg" width={800} height={400} />}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Behind the scenes, we&apos;re crafting something special. Stay tuned for what&apos;s to
          come!
        </p>
      </Card>
    </Row>
  );
}
