"use client";

import { CollapseProps, Typography } from "antd";
import { theme } from "@/styles/theme";
import { SubscriptionInterface } from "@/lib/features/subscriptions/subscriptionInterface";
import ReactMarkdown from "react-markdown";

export const subscriptionDetails = (row: SubscriptionInterface, t: any): CollapseProps["items"] => [
  {
    key: "1",
    label: (
      <Typography.Title level={3} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
        {t("description")}
      </Typography.Title>
    ),
    children: (
      <Typography.Paragraph style={{ fontWeight: 600, fontSize: 14, }}>
        {row.service_details.description}
      </Typography.Paragraph>
    ),
  },
  {
    key: "2",
    label: (
      <Typography.Title level={3} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
        {t("featuresSpecifications")}
      </Typography.Title>
    ),
    children: (
  <div style={{ fontWeight: 600, fontSize: 14, }}>
   <ReactMarkdown >       
     {row.service_details.specifications}
   </ReactMarkdown> 
        </div>
      ),
  },

];
