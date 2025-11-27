import {CustomTransparentOrangeButton} from "@/styles/components/buttonStyle";
import {Col} from "antd";
import {useI18n} from "../../../../../../../../../../locales/client";
import {HUB_URL} from "@/deploilyWebsiteUrls";

export default function DocumentationComponent({
  dockerById,
  setOpenDrawer,
}: {
  dockerById: any;
  setOpenDrawer: any;
}) {
  const t = useI18n();

  return (
    <>
      <Col
        span={24}
        style={{
          display: "flex",
          justifyContent: "end",
          alignSelf: "start",
        }}
      >
        <CustomTransparentOrangeButton onClick={() => setOpenDrawer(true)}>
          {t("moreDetails")}
        </CustomTransparentOrangeButton>
      </Col>
      <Col
        span={24}
        style={{
          display: "flex",
          justifyContent: "end",
          alignSelf: "start",
        }}
      >
        <CustomTransparentOrangeButton
          href={dockerById.service_details?.documentation_url ?? "https://docs.deploily.cloud/#/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("documentation")}
        </CustomTransparentOrangeButton>
      </Col>
      <Col
        span={24}
        style={{
          display: "flex",
          justifyContent: "end",
          alignSelf: "start",
        }}
      >
        <CustomTransparentOrangeButton href={HUB_URL} target="_blank" rel="noopener noreferrer">
          {t("forum")}
        </CustomTransparentOrangeButton>
      </Col>
      <Col
        span={24}
        style={{
          display: "flex",
          justifyContent: "end",
          alignSelf: "start",
        }}
      >
        <CustomTransparentOrangeButton
          href={dockerById.demo_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("demo_link")}
        </CustomTransparentOrangeButton>
      </Col>
    </>
  );
}
