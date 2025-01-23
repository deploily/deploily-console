import { Col } from "antd";
import PortalContent from "./containers/portalContent";
import { ReactElement } from "react";


export default async function HomeLayout({ children, params }: {
  children: ReactElement;
  params: Promise<{locale: string}>;
}) {
    const { locale } = await params;

    return (
        <>
            <main>
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
            </main>
        </>
    );
}
