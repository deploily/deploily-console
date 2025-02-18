"use client";
import { useAllServices } from "@/lib/features/apiService/apiServiceSelectors";
import { getApiServiceById } from "@/lib/features/apiService/apiServiceThunks";
import { useAppDispatch } from "@/lib/hook";
import { CollapseProps, Typography } from "antd";
import { useEffect } from "react";
import { ApiServiceInterface } from "@/lib/features/apiService/apiServiceInterface";
import Link from "next/link";

export function useFetchServiceById( serviceId : string ) {
  const dispatch = useAppDispatch();
  const { serviceLoading, currentService } = useAllServices();

  useEffect(() => {
    if (serviceId) {
      dispatch(getApiServiceById(serviceId));
    }
  }, []);
  return { serviceLoading, currentService };
}

export const getItems = (row: ApiServiceInterface, t: any ): CollapseProps["items"] => [
  {
    key: "1",
    label: (
      <Typography.Title level={3} style={{ fontWeight: 400, color: "#D85912" }}>
        {t("description")}
      </Typography.Title>
    ),
    children: (
      <Typography.Paragraph style={{ fontWeight: 400 }}>
        {row.description}
      </Typography.Paragraph>
    ),
  },
  {
    key: "2",
    label: (
      <Typography.Title level={3} style={{ fontWeight: 400, color: "#D85912" }}>
        {t("featuresSpecifications")}
      </Typography.Title>
    ),
    children: (
      <Typography.Paragraph style={{ fontWeight: 400 }}>
        {row.specifications}
      </Typography.Paragraph>
    ),
  },
  ...(row.documentation_url
    ? [
      {
        key: "3",
        label: (
          <Link href={row.documentation_url} target="_blank" rel="noopener noreferrer">
            <Typography.Title level={3} style={{ fontWeight: 400, color: "#D85912" }}>
              {t("documentation")}
            </Typography.Title>
          </Link>
        ),
      },
    ]
    : []),
];
