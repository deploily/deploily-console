import { CustomTransparentOrangeButton } from "@/styles/components/buttonStyle";
import { Badge, Col, Row } from "antd";
import { useI18n, useScopedI18n } from "../../../../../../../../../../locales/client";


export default function DucomentaionComponents({ odooAppById, setOpenDrawer }: { odooAppById: any, setOpenDrawer :any}) {
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
                              href={odooAppById.console_url}
                              target="_blank"
                              rel="noopener noreferrer"

                          >
                              {tSubscription('adminConsole')}
                          </CustomTransparentOrangeButton>
                      </Col>
    </>
  );
}