import { CustomTransparentOrangeButton } from "@/styles/components/buttonStyle";
import { Col } from "antd";
import { useI18n, useScopedI18n } from "../../../../../../../../../../locales/client";


export default function DocumentationComponents({ supabaseAppById, setOpenDrawer }: { supabaseAppById: any, setOpenDrawer :any}) {
    const t = useI18n();
    
    const tSubscription = useScopedI18n('subscription');
         
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
                  href={supabaseAppById.service_details.documentation_url ?? "https://docs.deploily.cloud/#/"}
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
                  href={supabaseAppById.console_url}
                              target="_blank"
                              rel="noopener noreferrer"

                          >
                              {tSubscription('adminConsole')}
                          </CustomTransparentOrangeButton>
                      </Col>
    </>
  );
}