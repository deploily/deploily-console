"use client";

import { ResourceInterface } from "@/lib/features/cloud-resource/cloudResourceInterface";
import { theme } from "@/styles/theme";
import { CollapseProps, Typography } from "antd";
import ReactMarkdown from "react-markdown";



export const getResourceItems = (currentResource: ResourceInterface, t: any,): CollapseProps["items"] => [
  {
    key: "1",
    label: (
      <Typography.Title level={3} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
        {t("whoIs")} {currentResource.provider?.name}
      </Typography.Title>
    ),
    children: (
      <Typography.Paragraph style={{ fontWeight: 600, fontSize: 14, }}>
        {currentResource.provider?.short_description}
      </Typography.Paragraph>
    ),
  },
  {
    key: "2",
    label: (
      <Typography.Title level={3} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
        {t("contactProvider")}
      </Typography.Title>
    ),
    children: (
      <div style={{ fontWeight: 600, fontSize: 14, }}>
        <ReactMarkdown>

          {`
### ${currentResource.provider?.name}

**Support Email:** [${currentResource.provider?.mail_support}](mailto:${currentResource.provider?.mail_support})  
**Sales Email:** [${currentResource.provider?.mail_sailes}](mailto:${currentResource.provider?.mail_sailes})  

**Support Phone:** ${currentResource.provider?.phone_support || "_N/A_"}  
**Sales Phone:** ${currentResource.provider?.phone_sailes || "_N/A_"}  
**Partnership Phone:** ${currentResource.provider?.phone_partnership || "_N/A_"}  

**Facebook:** ${currentResource.provider?.facebook_page || "_N/A_"}  
**Instagram:** ${currentResource.provider?.instagram_page || "_N/A_"}  
**LinkedIn:** ${currentResource.provider?.linkedin_page || "_N/A_"}  
**Website:** ${currentResource.provider?.website || "_N/A_"}  


    `}
        </ReactMarkdown>
      </div>
    ),
  },

];
