"use client";
import { useHiEventsAppById } from "@/lib/features/hi-events/hiEventsSelector";
import { fetchHiEventsAppById } from "@/lib/features/hi-events/hiEventsThunks";
import { useAppDispatch } from "@/lib/hook";
import { handleCopy } from "@/lib/utils/handleCopy";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { Copy } from "@phosphor-icons/react";
import { Badge, Button, Col, Input, Result, Row, Skeleton, Space, Typography } from "antd";
import Link from "antd/es/typography/Link";
import Paragraph from "antd/es/typography/Paragraph";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import DocumentationDrawer from "../../../../utils/documentationDrawer";
import PlanDetailsComponent from "../../../../utils/planDetailsComponents";
import DocumentationComponents from "./componentsHiEventsDetails/documentationComponent";
import DurationComponent from "./componentsHiEventsDetails/durationComponent";
import StatusComponents from "./componentsHiEventsDetails/statusComponent";

export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
  const t = useI18n();

  const tSubscription = useScopedI18n("subscription");
  const tHiEvents = useScopedI18n("hiEventsApp");

  const dispatch = useAppDispatch();
  const { hiEventsAppById, isLoading, loadingError } = useHiEventsAppById();
  const [openDrawer, setOpenDrawer] = useState(false);
  const onClose = () => {
    setOpenDrawer(false);
  };
  useEffect(() => {
    dispatch(fetchHiEventsAppById(my_app_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}
    >
      {isLoading && hiEventsAppById === undefined && (
        <>
          <Skeleton.Image active style={{ marginBottom: 10 }} />
          <Skeleton active paragraph={{ rows: 2 }} />
        </>
      )}
      {!isLoading && hiEventsAppById !== undefined && (
        <>
          <Row gutter={16}>
            <Col md={16} xs={24}>
              <Badge offset={[-20, 20]}>
                {hiEventsAppById.service_details && (
                  <ImageFetcher
                    imagePath={hiEventsAppById.service_details.image_service}
                    width={220}
                    height={220}
                  />
                )}
              </Badge>
            </Col>

            <Col md={8} xs={24}>
              <Row>
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignSelf: "start",
                  }}
                >
                  <Typography.Title level={2} style={{ color: theme.token.orange400 }}>
                    {Intl.NumberFormat("fr-FR", { useGrouping: true }).format(
                      hiEventsAppById.total_amount / hiEventsAppById.duration_month,
                    )}{" "}
                    DZD /{" "}
                    {hiEventsAppById.service_plan.subscription_category === "monthly"
                      ? t("month")
                      : t("year")}
                  </Typography.Title>
                </Col>
                <DocumentationComponents
                  hiEventsAppById={hiEventsAppById}
                  setOpenDrawer={setOpenDrawer}
                />
              </Row>
            </Col>
          </Row>

          <StatusComponents hiEventsAppById={hiEventsAppById} />

          {hiEventsAppById.service_details && (
            <Row gutter={16} style={{ marginTop: 0 }}>
              <Paragraph style={{ fontSize: 14 }}>
                {hiEventsAppById.service_details.description}
              </Paragraph>
            </Row>
          )}

          <DurationComponent hiEventsAppById={hiEventsAppById} />
          <PlanDetailsComponent currentSubscription={hiEventsAppById} />
          {/* <ManagedResourcePlanDetails currentSubscription={hiEventsAppById} /> */}
          <div>
            <Typography style={{ fontWeight: 700, fontSize: 20, color: theme.token.orange600 }}>
              {tSubscription("accessUrl")}
            </Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                paddingBottom: "15px",
                alignItems: "center",
              }}
            >
              <Link
                href={hiEventsAppById.access_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginRight: "5px",
                  wordBreak: "break-all",
                  color: theme.token.gray100,
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                {hiEventsAppById.access_url}
              </Link>

              <Button
                type="primary"
                style={{ boxShadow: "none" }}
                icon={<Copy />}
                onClick={() => handleCopy(hiEventsAppById.access_url)}
              />
            </div>
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
          <DocumentationDrawer
            openDrawer={openDrawer}
            onClose={onClose}
            currentSubscription={hiEventsAppById}
            t={t}
          />
        </>
      )}
      {!isLoading && loadingError && (
        <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
      )}
    </Space>
  );
}
