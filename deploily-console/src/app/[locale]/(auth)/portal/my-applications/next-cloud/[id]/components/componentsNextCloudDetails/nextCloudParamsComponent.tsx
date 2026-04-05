"use client";

import {theme} from "@/styles/theme";
import {Input, Typography} from "antd";
import { NextCloudAppInterface } from "@/lib/features/next-cloud/nextCloudInterface";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import AccessUrlComponent from "../../../../containers/accessUrlComponent";

export default function NextCloudParamsComponent({ nextCloudAppById }: { nextCloudAppById: NextCloudAppInterface}) {

  const tNextCloud = useScopedI18n("nextCloud");

  return (
      <div
        style={{paddingTop: 20}}>
            <div>
              <AccessUrlComponent access_url={nextCloudAppById.access_url}/>
              
              <div>
                <Typography style={{fontWeight: 700, fontSize: 20, color: theme.token.orange600}}>
                  {tNextCloud("nextcloud_url")}
                </Typography>

                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingBottom: "15px",
                  }}
                >
                  <Input
                    value={nextCloudAppById.nextcloud_url}
                    readOnly
                    style={{
                      cursor: "default",
                      userSelect: "text",
                      caretColor: "transparent",
                      marginRight: "5px",
                    }}
                  />
                </div>
              </div>

              <div>
                <Typography style={{fontWeight: 700, fontSize: 20, color: theme.token.orange600}}>
                  {tNextCloud("nextcloud_domain")}
                </Typography>

                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingBottom: "15px",
                  }}
                >
                  <Input
                    value={nextCloudAppById.nextcloud_domain}
                    readOnly
                    style={{
                      cursor: "default",
                      userSelect: "text",
                      caretColor: "transparent",
                      marginRight: "5px",
                    }}
                  />
                </div>
              </div>
            </div>
  
          </div>       
  );
}
