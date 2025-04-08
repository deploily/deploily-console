"use client";

import { CollapseProps, Typography } from "antd";
import { ApiServiceInterface } from "@/lib/features/apiService/apiServiceInterface";
import Link from "next/link";
import { theme } from "@/styles/theme";

export const getItems = (row: ApiServiceInterface, t: any ): CollapseProps["items"] => [
  {
    key: "1",
    label: (
      <Typography.Title level={3} style={{ fontWeight: 700, fontSize:24, color: theme.token.orange600 }}>
        {t("description")}
      </Typography.Title>
    ),
    children: (
      <Typography.Paragraph style={{ fontWeight: 600, fontSize:14, }}>
        {row.description}
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
        {row.specifications}
      </Typography.Paragraph>
    ),
  },
 
];
