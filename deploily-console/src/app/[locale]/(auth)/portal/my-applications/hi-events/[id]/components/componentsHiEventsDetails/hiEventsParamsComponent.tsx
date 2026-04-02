"use client";
import { theme } from "@/styles/theme";
import { Input, Typography } from "antd";
import { HiEventsAppInterface } from "@/lib/features/hi-events/hiEventsInterface";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import AccessUrlComponent from "../../../../containers/accessUrlComponent";

export default function HiEventsParamsComponent({ hiEventsAppById }: { hiEventsAppById: HiEventsAppInterface }) {
  const tHiEvents = useScopedI18n("hiEventsApp");
 
  return (
    <div
      style={{ paddingTop: 20 }}
    >
          <div>
            <AccessUrlComponent access_url={hiEventsAppById.access_url}/>
            <div>
              <Typography style={{ fontWeight: 700, fontSize: 20, color: theme.token.orange600 }}>
                {tHiEvents("event_url")}
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
                  value={hiEventsAppById.event_url}
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
              <Typography style={{ fontWeight: 700, fontSize: 20, color: theme.token.orange600 }}>
                {tHiEvents("event_domain")}
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
                  value={hiEventsAppById.event_domain}
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
