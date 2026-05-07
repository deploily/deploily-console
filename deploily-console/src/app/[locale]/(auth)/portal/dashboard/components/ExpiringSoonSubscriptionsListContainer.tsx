"use client";

import { theme } from "@/styles/theme";
import {
  ArrowRight,
  CalendarX,
  CurrencyDollar,
} from "@phosphor-icons/react/dist/ssr";
import { Card, Result, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import getStatusStyle from "../../utils/getStatusStyle";
import { useDashboard } from "../features/dashboardSelector";

// Deterministic accent color per status
function getAccentColor(status: string): string {
  switch (status?.toLowerCase()) {
    case "active":
      return "#51CF66";
    case "expired":
      return "#FF6B6B";
    case "pending":
      return "#FFA500";
    case "cancelled":
      return "#94a3b8";
    default:
      return "#4facfe";
  }
}

function formatDate(date: Date | string | undefined): string {
  if (!date) return "-";
  return new Date(date).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAmount(amount: number | undefined): string {
  if (!amount) return "-";
  return (
    amount.toLocaleString("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }) + " DZD"
  );
}

// ── Skeleton row ──────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <Card className="expiring-card" style={{ pointerEvents: "none" }}>
      <div className="expiring-content">
        <div className="expiring-icon-box" style={{ backgroundColor: "rgba(71,85,105,0.2)" }}>
          <Skeleton.Avatar active size={24} shape="square" />
        </div>
        <div className="expiring-text">
          <Skeleton.Input active size="small" style={{ width: 180, marginBottom: 6 }} />
          <Skeleton.Input active size="small" style={{ width: 260 }} />
        </div>
        <Skeleton.Button active size="small" style={{ width: 90 }} />
      </div>
    </Card>
  );
}

// ── Real row ──────────────────────────────────────────────────────────────────
function ExpiringRow({
  record,
  t,
  onClick,
}: {
  record: {
    "duration_month": number,
    "expiry_date": string,
    "id": number,
    "name": string,
    "payment_status": string,
    "price": number,
    "service_plan": string,
    "start_date": string,
    "status": string,
    "total_amount": number
  };
  t: ReturnType<typeof useScopedI18n<"dashboard.expiringSoonSubscriptions">>;
  onClick: () => void;
}) {
  const accentColor = getAccentColor(record.status);
  const { label: statusLabel } = getStatusStyle(record.status, theme, t);

  return (
    <Card className="expiring-card" hoverable onClick={onClick}>
      <div className="expiring-content">
        {/* Icon box */}
        <div
          className="expiring-icon-box"
          style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
        >
          <CalendarX size={24} weight="duotone" />
        </div>

        {/* Main text block */}
        <div className="expiring-text">
          <h4 className="expiring-title">
            {record.service_plan || record.name || "-"}
            <span className="expiring-id">#{record.id}</span>
          </h4>
          <p className="expiring-description">
            <span className="expiring-meta-item">
              <CurrencyDollar size={13} weight="bold" />
              {formatAmount(record.total_amount)}
            </span>
            <span className="expiring-dot">·</span>
            <span className="expiring-meta-item">
              {t("expirayDate")}: {formatDate(record.expiry_date)}
            </span>
          </p>
        </div>

        {/* Status badge acting as action */}
        <button
          className="expiring-action"
          style={{ color: accentColor, borderColor: accentColor }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {statusLabel}
          <ArrowRight size={12} weight="bold" className="expiring-arrow" />
        </button>
      </div>
    </Card>
  );
}

// ── Container ─────────────────────────────────────────────────────────────────
export default function ExpiringSoonSubscriptionsListContainer() {
  const router = useRouter();
  const t = useScopedI18n("dashboard.expiringSoonSubscriptions");
  const translate = useI18n();
  const { dashboardResponse, dashboardLoading, dashboardError } = useDashboard();

  if (!dashboardLoading && dashboardError) {
    return (
      <Result
        status="500"
        title={translate("error")}
        subTitle={translate("subTitleError")}
      />
    );
  }


  return (
    <>
      <div className="expiring-grid">
        {dashboardLoading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
          : dashboardResponse?.expiring_soon.map((record) => (
            <ExpiringRow
              key={record.id}
              record={record}
              t={t}
              onClick={() => router.push(`/portal/my-api/${record.id}`)}
            />
          ))}

        {!dashboardLoading && dashboardResponse?.expiring_soon.length === 0 && (
          <p className="expiring-empty">{t("noData" as any) ?? "No expiring subscriptions."}</p>
        )}
      </div>

      <style jsx global>{`
        /* ── Grid ── */
        .expiring-grid {
          display: grid;
          gap: 12px;
        }

        /* ── Card — mirrors .notification-card ── */
        .expiring-card.ant-card {
          background: rgba(30, 41, 59, 0.6) !important;
          border: 1px solid rgba(71, 85, 105, 0.3) !important;
          border-radius: 12px !important;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .expiring-card.ant-card:hover {
          background: rgba(30, 41, 59, 0.8) !important;
          border-color: rgba(71, 85, 105, 0.5) !important;
          transform: translateX(4px);
        }

        .expiring-card .ant-card-body {
          padding: 16px !important;
        }

        /* ── Row layout — mirrors .notification-content ── */
        .expiring-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* ── Icon box — mirrors .notification-icon ── */
        .expiring-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ── Text block — mirrors .notification-text ── */
        .expiring-text {
          flex: 1;
          min-width: 0;
        }

        .expiring-title {
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 4px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .expiring-id {
          color: #64748b;
          font-size: 12px;
          font-weight: 400;
        }

        .expiring-description {
          color: #94a3b8;
          font-size: 13px;
          margin: 0;
          line-height: 1.4;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .expiring-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        .expiring-dot {
          color: #475569;
        }

        /* ── Action button — mirrors .notification-action ── */
        .expiring-action {
          background: transparent;
          border: 1.5px solid;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .expiring-action:hover {
          opacity: 0.8;
          transform: scale(1.05);
        }

        .expiring-arrow {
          transition: transform 0.2s;
        }

        .expiring-action:hover .expiring-arrow {
          transform: translateX(3px);
        }

        /* ── Empty ── */
        .expiring-empty {
          color: #94a3b8;
          font-size: 14px;
          text-align: center;
          padding: 32px 0;
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .expiring-content {
            flex-wrap: wrap;
          }

          .expiring-action {
            width: 100%;
            justify-content: center;
            margin-top: 4px;
          }
        }

        @media (max-width: 768px) {
          .expiring-icon-box {
            width: 40px;
            height: 40px;
          }

          .expiring-title {
            font-size: 13px;
          }

          .expiring-description {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}