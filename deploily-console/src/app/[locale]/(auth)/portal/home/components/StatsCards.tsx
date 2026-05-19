import { Col, Row } from "antd";
import Link from "next/link";
import {
  Invoice,
  Handshake,
  SquaresFour,
  Question,
  Heart,
} from "@phosphor-icons/react/dist/ssr";
import { DashboardResponse } from "../features/dashboardInterface";
import { useScopedI18n } from "../../../../../../../locales/client";

interface StatsCardsProps {
  dashboardResponse: DashboardResponse | undefined;
  colFlex: string;
}

export default function StatsCards({ dashboardResponse, colFlex }: StatsCardsProps) {
  const dashboardTranslate = useScopedI18n("dashboard");

  if (!dashboardResponse) return null;

  const stats = [
    {
      key: "apiServices",
      title: dashboardTranslate("apiServices"),
      value: dashboardResponse.api_subscriptions,
      icon: <Invoice size={22} weight="duotone" />,
      color: "#FFB84D",
      seeMyServices: dashboardTranslate("seeMyApis"),
      subscribeNew: dashboardTranslate("subscribeNewApi"),
      linkToServicesList: "/portal/api-services",
      linkToMyServices: "/portal/my-api",
    },
    {
      key: "deployments",
      title: dashboardTranslate("deployments"),
      value: dashboardResponse.deployment_subscriptions,
      icon: <Handshake size={22} weight="duotone" />,
      color: "#4facfe",
      seeMyServices: dashboardTranslate("seeMyDeployments"),
      subscribeNew: dashboardTranslate("subscribeNewDeployment"),
      linkToServicesList: "/portal/deployments",
      linkToMyServices: "/portal/my-deployments",
    },
    {
      key: "applications",
      title: dashboardTranslate("applications"),
      value: dashboardResponse.app_subscriptions,
      icon: <SquaresFour size={22} weight="duotone" />,
      color: "#f093fb",
      seeMyServices: dashboardTranslate("seeMyApplications"),
      subscribeNew: dashboardTranslate("subscribeNewApplication"),
      linkToServicesList: "/portal/application",
      linkToMyServices: "/portal/my-applications",
    },
    {
      key: "supportTickets",
      title: dashboardTranslate("supportTickets"),
      value: dashboardResponse.support_tickets,
      icon: <Question size={22} weight="duotone" />,
      color: "#51CF66",
      seeMyServices: dashboardTranslate("seeMySupportTicket"),
      subscribeNew: dashboardTranslate("addSupportTocket"),
      linkToServicesList: "/portal/support-ticket/add",
      linkToMyServices: "/portal/support-ticket",
    },
    {
      key: "favorites",
      title: dashboardTranslate("favorites"),
      value: dashboardResponse.my_favorites,
      icon: <Heart size={22} weight="duotone" />,
      color: "#FF6B6B",
      seeMyServices: dashboardTranslate("seeMyFavorites"),
      subscribeNew: dashboardTranslate("seeMyFavorites"),
      linkToServicesList: "/portal/my-favorites",
      linkToMyServices: "/portal/my-favorites",
    },
  ];

  return (
    <div className="stats-section">
      <Row gutter={[16, 16]} wrap>
        {stats.map((stat) => (
          <Col flex={colFlex} key={stat.key}>
            {stat.value>0 &&<div className="stat-card">
              {/* Top row: icon box + label */}
              <div className="stat-top">
                <div
                  className="stat-icon-box"
                  style={{
                    backgroundColor: `${stat.color}22`,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </div>
                <span className="stat-label">{stat.title}</span>
              </div>

              {/* Big number */}
              <div className="stat-value" style={{ color: stat.color }}>
                {stat.value.toString().padStart(2, "0")}
              </div>

              {/* Divider */}
              <div className="stat-divider" />

              {/* Link */}
              <div className="stat-link">
                {stat.value === 0 ? (
                  <Link
                    href={stat.linkToServicesList}
                    style={{ color: stat.color }}
                    className="stat-anchor"
                  >
                    {stat.subscribeNew}
                    <span className="stat-chevron">›</span>
                  </Link>
                ) : (
                  <Link
                    href={stat.linkToMyServices}
                    style={{ color: stat.color }}
                    className="stat-anchor"
                  >
                    {stat.seeMyServices}
                    <span className="stat-chevron">›</span>
                  </Link>
                )}
              </div>
            </div>}
          </Col>
        ))}
      </Row>

      <style jsx>{`
        .stats-section {
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .section-title {
          color: #94a3b8;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0;
        }

        /* ── Card shell ── */
        .stat-card {
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(71, 85, 105, 0.25);
          border-radius: 16px;
          padding: 20px 20px 16px;
          display: flex;
          flex-direction: column;
          min-width: 130px;
          height: 100%;
          backdrop-filter: blur(12px);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.04) 0%,
            transparent 60%
          );
          pointer-events: none;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          border-color: rgba(71, 85, 105, 0.5);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
        }

        /* ── Top row ── */
        .stat-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .stat-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-label {
          color: #94a3b8;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          line-height: 1.2;
        }

        /* ── Number ── */
        .stat-value {
          font-size: 40px;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 16px;
          letter-spacing: -1px;
        }

        /* ── Divider ── */
        .stat-divider {
          height: 1px;
          background: rgba(71, 85, 105, 0.25);
          margin-bottom: 12px;
        }

        /* ── Link ── */
        .stat-link {
          margin-top: auto;
        }

        :global(.stat-anchor) {
          font-size: 12px;
          font-weight: 600;
          text-decoration: none !important;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: gap 0.2s ease;
        }

        :global(.stat-anchor):hover {
          gap: 8px;
          text-decoration: none !important;
        }

        .stat-chevron {
          font-size: 16px;
          line-height: 1;
          font-weight: 400;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .stat-value {
            font-size: 32px;
          }

          .stat-label {
            font-size: 10px;
          }

          .stat-card {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}