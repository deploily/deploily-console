"use client";
import { useApiServiceSubscription } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionSelectors";
import { fetchApiServiceSubscriptionById } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionThunks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { CustomTransparentOrangeButton } from "@/styles/components/buttonStyle";
import { theme } from "@/styles/theme";
import { BookOpen, CalendarBlank, HourglassHigh, Info, Timer } from "@phosphor-icons/react";
import { Col, Result, Row, Skeleton, Space, Tag, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import DocumentationDrawer from "../../../utils/documentationDrawer";
import SubscriptionPlanCard from "../../../utils/subscriptionplanCard";
import { subscriptionStatusStyle } from "../../utils/subscriptionsConst";
import GenerateTokenComponent from "./generateTokenComponent";
import { subscriptionItems } from "./subscriptionItems";

export default function ApiServiceSubscriptionSettingContent({
  apiServiceSubscription_id,
}: {
  apiServiceSubscription_id: string;
}) {
  const t = useI18n();
  const tApiServiceSubscription = useScopedI18n("apiServiceSubscription");

  const dispatch = useAppDispatch();
  const {
    currentApiServiceSubscription,
    currentApiServiceSubscriptionLoading,
    currentApiServiceSubscriptionLoadingError,
  } = useApiServiceSubscription();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [remainingDuration, setRemainingDuration] = useState<number>();

  const onClose = () => setOpenDrawer(false);

  useEffect(() => {
    dispatch(fetchApiServiceSubscriptionById(apiServiceSubscription_id));
  }, []);

  useEffect(() => {
    if (currentApiServiceSubscription !== undefined) {
      setRemainingDuration(
        getRemainingDuration(
          currentApiServiceSubscription.start_date,
          currentApiServiceSubscription.duration_month,
        ),
      );
    }
  }, [currentApiServiceSubscription]);

  function getRemainingDuration(startDate: string, durationMonths: number) {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + durationMonths);
    const today = new Date();
    if (today >= end) return 0;
    return (
      (end.getFullYear() - today.getFullYear()) * 12 +
      (end.getMonth() - today.getMonth())
    );
  }

  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "40px 24px",
        minHeight: "100vh",
      }}
    >
      {currentApiServiceSubscriptionLoading && currentApiServiceSubscription === undefined && (
        <>
          <Skeleton.Image active style={{ width: 300, height: 300 }} />
          <Skeleton active paragraph={{ rows: 6 }} style={{ marginTop: 24 }} />
        </>
      )}

      {!currentApiServiceSubscriptionLoading && currentApiServiceSubscription !== undefined && (
        <Space direction="vertical" size={32} style={{ width: "100%" }}>
          <Row gutter={[32, 32]} align="stretch">
            {/* LEFT - Service Info */}
            <Col xs={24} lg={16}>
              <div>
                <div
                  style={{
                    position: "absolute",
                    top: -60,
                    left: -60,
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${theme.token.orange600}08 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                <div style={{ padding: "28px 0px 0" }}>
                  {/* Service header: logo + title */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 20,
                      marginBottom: 28,
                    }}
                  >
                    {/* Logo */}
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 16,
                        background: "#1e1e1e",
                        border: `1px solid ${theme.token.orange600}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        flexShrink: 0,
                        boxShadow: `0 4px 20px ${theme.token.orange600}10`,
                      }}
                    >
                      {currentApiServiceSubscription.service_details && (
                        <ImageFetcher
                          imagePath={currentApiServiceSubscription.service_details.image_service}
                          width={60}
                          height={60}
                        />
                      )}
                    </div>

                    {/* Title + status + description */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          flexWrap: "wrap",
                          marginBottom: 6,
                        }}
                      >
                        {currentApiServiceSubscription.service_details && (
                          <Typography.Title
                            level={2}
                            style={{ margin: 0, fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}
                          >
                            {currentApiServiceSubscription.service_details.name}
                          </Typography.Title>
                        )}
                        <Tag
                          bordered={false}
                          color={subscriptionStatusStyle(currentApiServiceSubscription.status)}
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            borderRadius: 20,
                            padding: "3px 10px",
                            textTransform: "uppercase",
                            letterSpacing: "0.8px",
                          }}
                        >
                          {tApiServiceSubscription(
                            currentApiServiceSubscription.status as "active" | "inactive",
                          )}
                        </Tag>
                      </div>

                      {currentApiServiceSubscription.service_details && (
                        <Paragraph
                          style={{
                            fontSize: 14,
                            color: "#888",
                            margin: 0,
                            fontStyle: "italic",
                            lineHeight: 1.6,
                          }}
                        >
                          {currentApiServiceSubscription.service_details.short_description}
                        </Paragraph>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: "#1f1f1f", marginBottom: 28 }} />

                  {/* RESOURCES & DOCUMENTATION */}
                  {currentApiServiceSubscription.service_details && (
                    <div style={{ marginBottom: 28 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 18,
                        }}
                      >
                        <div>
                          <Typography.Text
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              color: "#555",
                              textTransform: "uppercase",
                              letterSpacing: "1.2px",
                              display: "block",
                              marginBottom: 4,
                            }}
                          >
                            {t("quickAccess")}
                          </Typography.Text>
                          <Typography.Title
                            level={4}
                            style={{ margin: 0, fontSize: 18, fontWeight: 700 }}
                          >
                            {t("resourcesAndDocumentation")}
                          </Typography.Title>
                        </div>
                        <CustomTransparentOrangeButton
                          onClick={() => setOpenDrawer(true)}
                          icon={<Info size={16} />}
                          style={{ fontSize: 13 }}
                        >
                          {t("moreDetails")}
                        </CustomTransparentOrangeButton>
                      </div>

                      <Row gutter={[14, 14]}>
                        {currentApiServiceSubscription.service_details.api_playground_url && (
                          <Col xs={24} sm={12} lg={8}>
                            <Link
                              href={currentApiServiceSubscription.service_details.api_playground_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: "none", display: "block" }}
                            >
                              <div
                                style={{
                                  background: "#0f0f0f",
                                  borderRadius: 14,
                                  padding: "18px 20px",
                                  border: "1px solid #1f1f1f",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 14,
                                  transition: "all 0.25s ease",
                                  cursor: "pointer",
                                }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLDivElement).style.borderColor = `${theme.token.orange600}40`;
                                  (e.currentTarget as HTMLDivElement).style.background = "#141414";
                                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${theme.token.orange600}15`;
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLDivElement).style.borderColor = "#1f1f1f";
                                  (e.currentTarget as HTMLDivElement).style.background = "#0f0f0f";
                                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                                }}
                              >
                                <div
                                  style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 10,
                                    background: `${theme.token.orange600}15`,
                                    border: `1px solid ${theme.token.orange600}20`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <BookOpen size={20} color={theme.token.orange600} weight="duotone" />
                                </div>
                                <div>
                                  <Typography.Text
                                    style={{
                                      fontSize: 14,
                                      fontWeight: 600,
                                      color: "#e0e0e0",
                                      display: "block",
                                    }}
                                  >
                                    {t("documentation")}
                                  </Typography.Text>
                                  <Typography.Text style={{ fontSize: 11, color: "#555" }}>
                                    {t("apiReferenceAndGuides")}
                                  </Typography.Text>
                                </div>
                              </div>
                            </Link>
                          </Col>
                        )}
                      </Row>
                    </div>
                  )}
                </div>

                {/* SUBSCRIPTION STATUS — full-width footer strip */}
                <div
                  style={{
                    background: "#0a0a0a",
                    borderTop: "1px solid #1a1a1a",
                    padding: "20px 28px",
                  }}
                >
                  <Typography.Text
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#444",
                      textTransform: "uppercase",
                      letterSpacing: "1.4px",
                      display: "block",
                      marginBottom: 16,
                    }}
                  >
                    {t("subscriptionStatus")}
                  </Typography.Text>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 0,
                    }}
                  >
                    {/* Start Date */}
                    <div style={{ paddingRight: 24, borderRight: "1px solid #1a1a1a" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                        <CalendarBlank size={13} color="#555" />
                        <Typography.Text
                          style={{
                            fontSize: 10,
                            color: "#555",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.6px",
                          }}
                        >
                          {t("startDate")}
                        </Typography.Text>
                      </div>
                      <Typography.Text
                        style={{
                          fontSize: 15,
                          color: "#d0d0d0",
                          fontWeight: 600,
                          fontFamily: "monospace",
                        }}
                      >
                        {dayjs(currentApiServiceSubscription.start_date).format("YYYY-MM-DD")}
                      </Typography.Text>
                    </div>

                    <div style={{
                      paddingRight: 24, paddingLeft: 24, borderRight: "1px solid #1a1a1a"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                        <CalendarBlank size={13} color="#555" />
                        <Typography.Text
                          style={{
                            fontSize: 10,
                            color: "#555",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.6px",
                          }}
                        >
                          {t("endDate")}
                        </Typography.Text>
                      </div>
                      <Typography.Text
                        style={{
                          fontSize: 15,
                          color: "#d0d0d0",
                          fontWeight: 600,
                          fontFamily: "monospace",
                        }}
                      >
                        {dayjs(new Date(
                          new Date(currentApiServiceSubscription.start_date).setMonth(
                            new Date(currentApiServiceSubscription.start_date).getMonth() + currentApiServiceSubscription.duration_month
                          )
                        )).format("YYYY-MM-DD")}
                      </Typography.Text>
                    </div>

                    {/* Duration */}
                    <div
                      style={{
                        paddingLeft: 24,
                        paddingRight: 24,
                        borderRight: "1px solid #1a1a1a",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                        <Timer size={13} color="#555" />
                        <Typography.Text
                          style={{
                            fontSize: 10,
                            color: "#555",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.6px",
                          }}
                        >
                          {t("duration")}
                        </Typography.Text>
                      </div>
                      <Typography.Text style={{ fontSize: 15, color: "#d0d0d0", fontWeight: 600 }}>
                        {currentApiServiceSubscription.duration_month}{" "}
                        <span style={{ fontSize: 12, color: "#555", fontWeight: 400 }}>
                          {t("months")}
                        </span>
                      </Typography.Text>
                    </div>

                    {/* Remaining */}
                    <div style={{ paddingLeft: 24 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                        <HourglassHigh
                          size={13}
                          color={
                            remainingDuration !== undefined && remainingDuration <= 1
                              ? theme.token.colorError
                              : theme.token.orange600
                          }
                        />
                        <Typography.Text
                          style={{
                            fontSize: 10,
                            color: "#555",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.6px",
                          }}
                        >
                          {t("remainingDuration")}
                        </Typography.Text>
                      </div>
                      <Typography.Text
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color:
                            remainingDuration !== undefined && remainingDuration <= 1
                              ? theme.token.colorError
                              : theme.token.orange600,
                        }}
                      >
                        {getRemainingDuration(
                          currentApiServiceSubscription.start_date,
                          currentApiServiceSubscription.duration_month,
                        )}{" "}
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 400,
                            color:
                              remainingDuration !== undefined && remainingDuration <= 1
                                ? theme.token.colorError
                                : theme.token.orange600,
                            opacity: 0.7,
                          }}
                        >
                          {t("months")}
                        </span>
                      </Typography.Text>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* RIGHT - Pricing Card */}
            <Col xs={24} lg={8}>
              <SubscriptionPlanCard currentSubscription={currentApiServiceSubscription} />
            </Col>
          </Row>

          {/* ADDITIONAL CONTENT */}
          {currentApiServiceSubscription.service_details &&
            currentApiServiceSubscription.status === "active" ? (
            <>
              <GenerateTokenComponent apiServiceSubscription_id={apiServiceSubscription_id} />
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
                {subscriptionItems(currentApiServiceSubscription.service_details, t).map((item) => (
                  <div key={item.key}>{item.content}</div>
                ))}
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: 40,
                background: `${theme.token.colorError}10`,
                borderRadius: 16,
                border: `1px solid ${theme.token.colorError}30`,
              }}
            >
              <Typography.Title
                level={4}
                style={{ color: theme.token.colorError, fontSize: 18, margin: 0 }}
              >
                {tApiServiceSubscription("inactiveMessage")}
              </Typography.Title>
            </div>
          )}

          <DocumentationDrawer
            openDrawer={openDrawer}
            onClose={onClose}
            currentSubscription={currentApiServiceSubscription}
            t={t}
          />
        </Space>
      )}

      {!currentApiServiceSubscriptionLoading && currentApiServiceSubscriptionLoadingError && (
        <Result
          status="500"
          title={t("errorMessage")}
          subTitle={t("subTitleErrorMessage")}
        />
      )}
    </div>
  );
}