import { useApiServiceSubscription } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionSelectors";
import { fetchApiServiceSubscription } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionThunks";
import { useCloudResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { updateMyResourceFilterParams } from "@/lib/features/cloud-resource/cloudResourceSlice";
import { getMyResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useMyApplicationList } from "@/lib/features/my-applications/myApplicationSelector";
import { fetchMyApplications } from "@/lib/features/my-applications/myApplicationThunks";
import { useMyDeploymentList } from "@/lib/features/my-deployments/myDeploymentSelector";
import { fetchMyDeployments } from "@/lib/features/my-deployments/myDeploymentThunks";
import { useAppDispatch } from "@/lib/hook";
import { DivCard } from "@/styles/components/divStyle";
import { theme } from "@/styles/theme";
import { Button, Card, Col, Row, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import RecentApiSubscriptions from "./recentApisSubscriptions";
import RecentAppSubscriptions from "./recentAppSubscriptions";
import RecentDeploymentsSubscriptions from "./recentDeploymentsSubscriptions";
import RecentRessourceAffiliations from "./recentRessourceAffiliations";
import styles from "./TableStyles.module.css";

const quickActions = [
  {
    key: "startups",
    listTitle: "deployments",
    icon: "🚀",
    link: "/portal/deployments",
    tableOfRecentSubscriptions: <RecentDeploymentsSubscriptions />,
  },
  {
    key: "businesses",
    listTitle: "applications",
    icon: "💼",
    link: "/portal/application",
    tableOfRecentSubscriptions: <RecentAppSubscriptions />,
  },
  {
    key: "developers",
    listTitle: "apis",
    icon: "👨‍💻",
    link: "/portal/api-services",
    tableOfRecentSubscriptions: <RecentApiSubscriptions />,
  },
  {
    key: "cloud",
    icon: "☁️",
    listTitle: "affiliations",
    link: "/portal/cloud-resources",
    tableOfRecentSubscriptions: <RecentRessourceAffiliations />,
  },
];

export default function QuickActionCards() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateMyResourceFilterParams({ page_size: 3, page: 0 }));
    dispatch(getMyResources());
    dispatch(fetchMyApplications());
    dispatch(fetchApiServiceSubscription());
    dispatch(fetchMyDeployments());
  }, [dispatch]);

  const { myResourcesResponse, isLoading } = useCloudResource();
  const myApplicationsList = useMyApplicationList();
  const myDeployments = useMyDeploymentList();
  const { apiServiceSubscriptionResponse, apiServiceSubscriptionLoading } = useApiServiceSubscription();

  return (
    <div className="quick-actions">
      <Row gutter={[16, 16]}>
        {quickActions.map((action) => (
          <Col xs={24} sm={12} lg={12} key={action.key}>
            <QuickActionCardComponent
              response={
                action.key === "cloud"
                  ? myResourcesResponse?.result
                  : action.key === "businesses"
                    ? myApplicationsList.MyApplicationList
                    : action.key === "developers"
                      ? apiServiceSubscriptionResponse
                      : action.key === "startups"
                        ? myDeployments.MyDeploymentList
                        : undefined
              }
              isloading={
                action.key === "cloud"
                  ? isLoading
                  : action.key === "businesses"
                    ? myApplicationsList.isLoading
                    : action.key === "developers"
                      ? apiServiceSubscriptionLoading
                      : action.key === "startups"
                        ? myDeployments.isLoading
                        : false
              }
              action={action}
            />
          </Col>
        ))}
      </Row>

      <style jsx>{`
        .quick-actions {
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        :global(.action-card) {
          border: none !important;
          border-radius: 16px !important;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          min-height: 140px;
        }

        :global(.action-card):hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
        }

        :global(.action-card .ant-card-body) {
          padding: 0px !important;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

export function QuickActionCardComponent({
  response,
  isloading,
  action,
}: {
  response: any;
  isloading: boolean;
  action: any;
}) {
  const t = useScopedI18n("quickActions");
  const translate = useI18n();
  const router = useRouter();
  const hasData = !isloading && response != null && response.length > 0;

  return (
    <Card style={{ padding: "0px" }} className="action-card" hoverable>
      <DivCard
        style={{
          margin: 0,
          width: "100%",
          background: "#1d1d1d",
          borderRadius: 16,
          padding: 0,
          height: "100%",
          border: `1px solid ${theme.token.orange600}20`,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${theme.token.orange600}, ${theme.token.orange600}80)`,
          }}
        />

        {isloading ? (
          <QuickActionCardSkeleton />
        ) : hasData ? (
          <>
            {/* Card header with title + "View all" */}
            <div className={styles.cardHeader}>
              <h3 className={styles.cardHeaderTitle}>
                {t(`${action.listTitle}` as any)}
              </h3>
              <span
                className={styles.cardHeaderLink}
                onClick={() => router.push(action.link)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && router.push(action.link)}
              >
                {translate("viewAll")}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8L8 2M8 2H3.5M8 2V6.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            {action.tableOfRecentSubscriptions}
          </>
        ) : (
          /* ── Empty state: new horizontal layout ── */
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "stretch",
              padding: "20px 20px 20px 20px",
              gap: 20,
              flex: 1,
              minHeight: 140,
            }}
          >
            {/* Left: large icon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                width: 84,
                height: 84,
                borderRadius: 14,
                background: `${theme.token.orange600}18`,
                border: `1px solid ${theme.token.orange600}30`,
                alignSelf: "center",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              <span style={{ fontSize: 44, lineHeight: 1 }}>{action.icon}</span>
            </div>

            {/* Divider */}
            <div
              style={{
                width: 1,
                alignSelf: "stretch",
                background: `${theme.token.orange600}25`,
                flexShrink: 0,
              }}
            />

            {/* Right: text + button */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 10,
                minWidth: 0,
              }}
            >
              {/* Title */}
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                {t(`${action.key}.title` as any)}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.91)",
                  fontSize: 14,
                  margin: 0,
                  lineHeight: 1.5,
                  flex: 1,
                }}
              >
                {t(`${action.key}.description` as any)}
              </p>

              {/* Button — bottom right */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  onClick={() => router.push(action.link)}
                  style={{
                    backgroundColor: theme.token.orange400,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "12px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    height: "38px",
                    paddingLeft: 18,
                    paddingRight: 18,
                  }}
                >
                  {t(`${action.key}.button` as any)}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DivCard>
    </Card>
  );
}

function QuickActionCardSkeleton() {
  return (
    <Card style={{ padding: "0px" }} className="action-card">
      <DivCard
        style={{
          margin: 0,
          width: "100%",
          background: theme.token.darkGray,
          borderRadius: 16,
          padding: 0,
          height: "100%",
          minHeight: 140,
          border: `1px solid ${theme.token.orange600}20`,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${theme.token.orange600}, ${theme.token.orange600}80)`,
          }}
        />

        {/* Skeleton header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px 10px 16px",
            borderBottom: "1px solid rgba(255, 122, 0, 0.12)",
          }}
        >
          <Skeleton.Input active size="small" style={{ width: 100, height: 14 }} />
          <Skeleton.Input active size="small" style={{ width: 50, height: 12 }} />
        </div>

        {/* Skeleton rows */}
        <div style={{ padding: "8px 0" }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              <Skeleton.Input active size="small" style={{ width: "22%", height: 14 }} />
              <Skeleton.Input active size="small" style={{ width: "22%", height: 14 }} />
              <Skeleton.Input active size="small" style={{ width: "18%", height: 14 }} />
              <Skeleton.Input active size="small" style={{ width: 70, height: 22, borderRadius: 20 }} />
              <Skeleton.Input active size="small" style={{ width: "18%", height: 14 }} />
            </div>
          ))}
        </div>
      </DivCard>
    </Card>
  );
}