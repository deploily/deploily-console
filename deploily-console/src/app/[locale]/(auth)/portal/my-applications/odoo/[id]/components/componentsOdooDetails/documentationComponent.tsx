import { CustomTransparentOrangeButton } from "@/styles/components/buttonStyle";
import { Col } from "antd";
import { useI18n, useScopedI18n } from "../../../../../../../../../../locales/client";
import { HUB_URL } from "@/deploilyWebsiteUrls";


export default function DocumentationComponent({ odooAppById, setOpenDrawer }: { odooAppById: any, setOpenDrawer: any }) {
    const t = useI18n();

    return (
        <>

            <Col span={24} style={{
                display: "flex",
                justifyContent: "end",
                alignSelf: "start"
            }}>
                <CustomTransparentOrangeButton
                    onClick={() => setOpenDrawer(true)}
                >
                    {t('moreDetails')}
                </CustomTransparentOrangeButton>
            </Col>
            <Col span={24} style={{
                display: "flex",
                justifyContent: "end",
                alignSelf: "start"
            }}>
                <CustomTransparentOrangeButton
                    href={odooAppById.service_details.documentation_url ?? "https://docs.deploily.cloud/#/"}
                    target="_blank"
                    rel="noopener noreferrer"

                >
                    {t('documentation')}
                </CustomTransparentOrangeButton>
            </Col>
            <Col span={24} style={{
                display: "flex",
                justifyContent: "end",
                alignSelf: "start"
            }}>
                <CustomTransparentOrangeButton
                    href={HUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"

                >
                    {t('forum')}
                </CustomTransparentOrangeButton>
            </Col>
        </>
    );
}