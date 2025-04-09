"use client";

import { CollapseProps, Typography } from "antd";
import { theme } from "@/styles/theme";
import { SubscribeInterface } from "@/lib/features/subscribe/subscribeInterface";

export const subscriptionDetails = (row: SubscribeInterface, t: any ): CollapseProps["items"] => [
  {
    key: "1",
    label: (
      <Typography.Title level={3} style={{ fontWeight: 700, fontSize:24, color: theme.token.orange600 }}>
        {t("description")}
      </Typography.Title>
    ),
    children: (
      <Typography.Paragraph style={{ fontWeight: 600, fontSize:14, }}>
        {row.service_details.description}
      </Typography.Paragraph>
    ),
  },
  {
    key: "2",
    label: (
      <Typography.Title level={3} style={{ fontWeight: 700, fontSize:24, color: theme.token.orange600 }}>
        {t("featuresSpecifications")}
      </Typography.Title>
    ),
    children: (
      <Typography.Paragraph style={{ fontWeight: 600 }}>
        {row.service_details.specifications}
      </Typography.Paragraph>
    ),
  },
 
];
