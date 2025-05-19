"use client";
import { Row } from "antd";
import { useI18n } from "../../../../../../locales/client";
import MyResourcesContainer from "./components/myResourcesPageContent";

export default function Page() {
    const t = useI18n();
    return (
        <>
            <Row style={{ padding: 20 }}>
                <span
                    style={{
                        color: "white",

                        fontSize: "24px",
                        fontWeight: 800,
                    }}
                >
                    {t("myResources")}
                </span>
            </Row>
            <MyResourcesContainer />
        </>
    );
}
