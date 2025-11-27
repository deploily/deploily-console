import {Col, Space} from "antd";
import PortalContent from "./containers/portalContent";
import {ReactElement} from "react";

export default async function HomeLayout({
  children,
}: {
  children: ReactElement;
  // params: Promise<{locale: string}>;
}) {
  // const {locale} = await params;

  return (
    <>
      <main>
        <Space direction="vertical" size="middle" style={{display: "flex", margin: "0px"}}>
          <Col
            style={{
              display: "flex",
              minHeight: "100vh",
              width: "100%",
              margin: "0px",
            }}
          >
            <PortalContent>{children}</PortalContent>
          </Col>
        </Space>
      </main>
    </>
  );
}
