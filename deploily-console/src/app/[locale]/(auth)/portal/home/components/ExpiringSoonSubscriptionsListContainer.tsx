"use client";

import LoadingErrorContainer from "@/components/containers/loadingErrorContainer";
import { theme } from "@/styles/theme";
import {
  ArrowSquareOut,
  CalendarX,
  CurrencyDollar
} from "@phosphor-icons/react/dist/ssr";
import { Card, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useScopedI18n } from "../../../../../../../locales/client";
import getStatusStyle from "../../utils/getStatusStyle";
import { useDashboard } from "../features/dashboardSelector";
import EmptyListContainer from "@/components/containers/emptyListContainer";

function getAccentColor(status: string): string {
  switch (status?.toLowerCase()) {
    case "active": return "#51CF66";
    case "expired": return "#FF6B6B";
    case "pending": return "#FFA500";
    case "cancelled": return "#94a3b8";
    default: return "#fea94f";
  }
}

function formatDate(date: Date | string | undefined): string {
  if (!date) return "-";
  return new Date(date).toLocaleString("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function formatAmount(amount: number | undefined): string {
  if (!amount) return "-";
  return amount.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }) + " DZD";
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
        <Skeleton.Button active size="small" style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }} />
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
    duration_month: number;
    expiry_date: string;
    id: number;
    name: string;
    payment_status: string;
    price: number;
    service_plan: string;
    start_date: string;
    status: string;
    total_amount: number;
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

        {/* Text */}
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

        {/*
          Button is the LAST child inside the flex row.
          → Large screens: naturally sits at the right end of the row.
          → Small screens: pulled out via position:absolute to the top-right corner.
        */}
        <button
          className="expiring-action"
          style={{ color: accentColor }}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          aria-label="Open"
        >
          <ArrowSquareOut size={18} weight="bold" className="expiring-arrow" />
        </button>
      </div>
    </Card>
  );
}

// ── Container ─────────────────────────────────────────────────────────────────
export default function ExpiringSoonSubscriptionsListContainer() {
  const router = useRouter();
  const t = useScopedI18n("dashboard.expiringSoonSubscriptions");
  const { dashboardResponse, dashboardLoading, dashboardError } = useDashboard();

  if (!dashboardLoading && dashboardError) {
    return (<LoadingErrorContainer />);
  }    
  if(!dashboardLoading && dashboardResponse?.expiring_soon.length === 0) { 
       return <></>
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
      </div>

      <style jsx global>{`
        /* ── Grid ── */
        .expiring-grid {
          display: grid;
          gap: 12px;
        }

        /* ── Card ── */
        .expiring-card.ant-card {
          background: #1d1d1d !important;
          border: 1px solid rgba(81, 66, 54, 0.5) !important;
          border-radius: 12px !important;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative !important;
        }

        .expiring-card.ant-card:hover {
          border-color: rgba(81, 66, 54, 0.5) !important;
          transform: translateX(4px);
        }

        .expiring-card .ant-card-body {
        }

        /* ── Row layout: single flex row, never wraps ── */
        .expiring-content {
          display: flex;
          align-items: center;
          gap: 16px;
          /* no flex-wrap — button must never drop to a new line */
        }

        /* ── Icon box ── */
        .expiring-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ── Text block: grows, shrinks, clips — never pushes button out ── */
        .expiring-text {
          flex: 1 1 0;
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .expiring-id {
          color: #8b7c64;
          font-size: 12px;
          font-weight: 400;
        }

        .expiring-description {
          color: #b8a394;
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

        /* ── Action button — always last child in the flex row ── */
        .expiring-action {
          /* Keep it in the normal flow on large screens */
          position: static;
          flex-shrink: 0;
          background: transparent;
          border: none;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s, background 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .expiring-action:hover {
          opacity: 0.85;
          background: rgba(255, 255, 255, 0.06);
        }

        .expiring-arrow {
          transition: transform 0.2s;
        }

        .expiring-action:hover .expiring-arrow {
          transform: translate(2px, -2px);
        }

        /* ── Small screens: pin button to top-right corner of the card ── */
        @media (max-width: 560px) {
          .expiring-card .ant-card-body {
            padding: 14px !important;
            /* reserve space in top-right so content never slides under the button */
            padding-right: 44px !important;
          }

          .expiring-action {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 6px;
            border-radius: 6px;
          }

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

        /* ── Empty ── */
        .expiring-empty {
          color: #b8a194;
          font-size: 14px;
          text-align: center;
          padding: 32px 0;
          margin: 0;
        }
      `}</style>
    </>
  );
}