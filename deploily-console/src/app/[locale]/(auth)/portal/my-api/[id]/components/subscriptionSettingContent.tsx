"use client";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { CustomTransparentOrangeButton } from "@/styles/components/buttonStyle";
import { DatePickerStyle } from "@/styles/components/datePickerStyle";
import { CustomSubscripionInput } from "@/styles/components/inputStyle";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import { CalendarDots, ArrowRight, BookOpen, Users, PlayCircle, Info } from "@phosphor-icons/react";
import { Badge, Col, Result, Row, Skeleton, Space, Tag, Typography, Card } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import GenerateTokenComponent from "./generateTokenComponent";
import { useApiServiceSubscription } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionSelectors";
import { fetchApiServiceSubscriptionById } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionThunks";
import { subscriptionItems } from "./subscriptionItems";
import DocumentationDrawer from "../../../utils/documentationDrawer";
import { subscriptionStatusStyle } from "../../utils/subscriptionsConst";
import UpgradeApiSubscriptionComponents from "./upgradeSubscription";
import ShowdrawerSubscription from "./showDrawerSubscription";
import RenewApiSubscriptionComponents from "./renewSubscription";
import PlanDetailsComponent from "../../../utils/planDetailsComponents";
import SubscriptionPlanCard from "../../../utils/subscriptionplanCard";

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

  const [isHovered, setIsHovered] = useState(false);
  const onClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    dispatch(fetchApiServiceSubscriptionById(apiServiceSubscription_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function getRemainingDuration(startDate: Date, durationMonths: number) {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + durationMonths);

    const today = new Date();

    if (today >= end) {
      return 0;
    }

    const diffInMonths =
      (end.getFullYear() - today.getFullYear()) * 12 + (end.getMonth() - today.getMonth());

    return diffInMonths;
  }

  const [drawerActionType, setDrawerActionType] = useState<"upgrade" | "renew" | null>(null);

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
          {/* HERO SECTION */}
          <Row gutter={[32, 32]} align="stretch">
            {/* LEFT - Service Info */}
            <Col xs={24} lg={16}>
              <div
                // style={{
                //   background: theme.token.darkGray,
                //   borderRadius: 20,
                //   padding: 40,
                //   height: "100%",
                //   border: `1px solid ${theme.token.orange600}15`,
                //   position: "relative",
                //   overflow: "hidden",
                // }}
              >
                {/* Top accent line */}
                <div
                  // style={{
                  //   position: "absolute",
                  //   top: 0,
                  //   left: 0,
                  //   right: 0,
                  //   height: 4,
                  //   background: `linear-gradient(90deg, ${theme.token.orange600}, ${theme.token.orange600}60)`,
                  // }}
                />

                <Row gutter={24} align="top" style={{marginBottom:'20px'}}>
                  {/* Logo */}
                  <Col xs={24} lg={6}>
                    <div
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 20,
                        background: `${theme.token.orange600}10`,
                        border: `2px solid ${theme.token.orange600}25`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {currentApiServiceSubscription.service_details && (
                        <ImageFetcher
                          imagePath={currentApiServiceSubscription.service_details.image_service}
                          width={100}
                          height={100}
                        />
                      )}
                    </div>
                  </Col>

                  {/* Title & Status */}
                  <Col xs={24} lg={16}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      {currentApiServiceSubscription.service_details && (
                        <Typography.Title level={2} style={{ margin: 0, fontSize: 32 }}>
                          {currentApiServiceSubscription.service_details.name}
                        </Typography.Title>
                      )}
                      <Tag
                        bordered={false}
                        color={subscriptionStatusStyle(currentApiServiceSubscription.status)}
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          borderRadius: 6,
                          padding: "4px 12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
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
                          fontSize: 15,
                          color: theme.token.colorTextBase,
                          margin: 0,
                          fontStyle: "italic",
                          lineHeight: 1.6,
                        }}
                      >
                        {currentApiServiceSubscription.service_details.short_description}
                      </Paragraph>
                    )}
                  </Col>
                </Row>
                        {/* RESOURCES & DOCUMENTATION */}
                        {currentApiServiceSubscription.service_details && (
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                              <Typography.Title
                                level={3}
                                style={{
                                  margin: 0,
                                  fontSize: 24,
                                  fontWeight: 700,
                                }}
                              >
                                Resources & Documentation
                              </Typography.Title>
                              <CustomTransparentOrangeButton
                                onClick={() => setOpenDrawer(true)}
                                icon={<Info size={18} />}
                              >
                                {t("moreDetails")}
                              </CustomTransparentOrangeButton>
                            </div>
        
                            <Row gutter={[20, 20]}>
                              {/* Documentation Card */}
                              {currentApiServiceSubscription.service_details.api_playground_url &&
                                <Col xs={24} sm={12} lg={8}>
                                  <Link
                                    href={
                                      currentApiServiceSubscription.service_details.api_playground_url
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <Row
                                      style={{
                                        background: theme.token.darkGray,
                                        borderRadius: 16,
                                        padding: 24,
                                        height: "100%",
                                        border: `1px solid ${theme.token.orange600}15`,
                                        transition: "all 0.3s ease",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-4px)";
                                        e.currentTarget.style.borderColor = `${theme.token.orange600}40`;
                                        e.currentTarget.style.boxShadow = `0 8px 24px ${theme.token.orange600}20`;
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.borderColor = `${theme.token.orange600}15`;
                                        e.currentTarget.style.boxShadow = "none";
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: 48,
                                          height: 48,
                                          borderRadius: 12,
                                          background: `${theme.token.orange600}15`,
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          marginBottom: 16,
                                        }}
                                      >
                                        <BookOpen size={24} color={theme.token.orange600} weight="duotone" />
                                      </div>
        
                                      <Typography.Title level={5} style={{ margin: "0 0 8px 0", fontSize: 18 }}>
                                        Documentation
                                      </Typography.Title>
                                    </Row>
                                  </Link>
                                </Col>}
                            </Row>
                          </div>
                        )}

                  {/* SUBSCRIPTION STATUS SECTION */}
                            <div
                              style={{
                                marginTop: 32,
                                padding: "20px 24px",
                                background: "rgba(0, 0, 0, 0.3)",
                                borderRadius: 12,
                                border: `1px solid ${theme.token.orange600}15`,
                              }}
                            >
                              <Typography.Text
                                style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: theme.token.colorTextBase,
                                  textTransform: "uppercase",
                                  letterSpacing: "1.2px",
                                  display: "block",
                                  marginBottom: 16,
                                }}
                              >
                                { "SUBSCRIPTION STATUS"}
                              </Typography.Text>
                
                              <Row gutter={[32, 16]}>
                                {/* Start Date */}
                                <Col xs={24} sm={8}>
                                  <div>
                                    <Typography.Text
                                      style={{
                                        fontSize: 10,
                                        color: theme.token.colorTextBase,
                                        fontWeight: 400,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        display: "block",
                                        marginBottom: 6,
                                      }}
                                    >
                                      {t("startDate")}
                                    </Typography.Text>
                                    <Typography.Text
                                      style={{
                                        fontSize: 14,
                                        color: theme.token.colorWhite,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {dayjs(currentApiServiceSubscription.start_date).format("YYYY-MM-DD")}
                                    </Typography.Text>
                                  </div>
                                </Col>
                
                                {/* Duration */}
                                <Col xs={24} sm={8}>
                                  <div>
                                    <Typography.Text
                                      style={{
                                        fontSize: 10,
                                        color: theme.token.colorTextBase,
                                        fontWeight: 400,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        display: "block",
                                        marginBottom: 6,
                                      }}
                                    >
                                      {t("duration")}
                                    </Typography.Text>
                                    <Typography.Text
                                      style={{
                                        fontSize: 14,
                                        color: theme.token.colorWhite,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {`${currentApiServiceSubscription.duration_month} month(s)`}
                                    </Typography.Text>
                                  </div>
                                </Col>
                
                                {/* Remaining Duration */}
                                <Col xs={24} sm={8}>
                                  <div>
                                    <Typography.Text
                                      style={{
                                        fontSize: 10,
                                        color: theme.token.colorTextBase,
                                        fontWeight: 400,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        display: "block",
                                        marginBottom: 6,
                                      }}
                                    >
                                      {t("remainingDuration")}
                                    </Typography.Text>
                                    <Typography.Text
                                      style={{
                                        fontSize: 14,
                                        color:
                                          remainingDuration !== undefined && remainingDuration <= 1
                                            ? theme.token.colorError
                                            : theme.token.orange600,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {`${getRemainingDuration(
                                        currentApiServiceSubscription.start_date,
                                        currentApiServiceSubscription.duration_month,
                                      )} month(s)`}
                                    </Typography.Text>
                                  </div>
                                </Col>
                              </Row>
                            </div>
              </div>
            </Col>

            {/* RIGHT - Pricing Card */}
            <Col xs={24} lg={8}>
              <SubscriptionPlanCard currentSubscription={currentApiServiceSubscription}/>
            </Col>
          </Row>

          {/* PLAN DETAILS COMPONENT */}
          {/* <PlanDetailsComponent currentSubscription={currentApiServiceSubscription} /> */}

          {/* ADDITIONAL CONTENT */}
          {currentApiServiceSubscription.service_details &&
            currentApiServiceSubscription.status == "active" ? (
              <>
                <GenerateTokenComponent apiServiceSubscription_id={apiServiceSubscription_id} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    marginTop: 16,
                  }}
                >
                  {subscriptionItems(
                    currentApiServiceSubscription.service_details,
                    t
                  ).map((item) => (
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
                style={{
                  color: theme.token.colorError,
                  fontSize: 18,
                  margin: 0,
                }}
              >
                {tApiServiceSubscription("inactiveMessage")}
              </Typography.Title>
            </div>
          )}

          <ShowdrawerSubscription
            IsSubscribed={currentApiServiceSubscription.service_details.is_subscribed}
            subscriptionOldId={currentApiServiceSubscription.id}
            drawerType={drawerActionType}
          />

          <DocumentationDrawer
            openDrawer={openDrawer}
            onClose={onClose}
            currentSubscription={currentApiServiceSubscription}
            t={t}
          />
        </Space>
      )}

      {!currentApiServiceSubscriptionLoading && currentApiServiceSubscriptionLoadingError && (
        <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
      )}
    </div>
  );
}