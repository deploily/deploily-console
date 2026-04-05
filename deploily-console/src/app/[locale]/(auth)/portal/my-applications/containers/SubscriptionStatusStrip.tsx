import { theme } from "@/styles/theme";
import { CalendarBlank, HourglassHigh, Timer } from "@phosphor-icons/react";
import { Typography } from "antd";
import dayjs from "dayjs";
import { useI18n } from "../../../../../../../locales/client";

interface SubscriptionStatusStripProps {
  startDate: Date;
  endDate: Date;
  durationMonth: number;
  remainingDuration: number;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  borderRight?: boolean;
  paddingLeft?: boolean;
  paddingRight?: boolean;
}

function StatItem({
  icon,
  label,
  value,
  borderRight = false,
  paddingLeft = false,
  paddingRight = false,
}: StatItemProps) {
  return (
    <div
      style={{
        ...(paddingRight && { paddingRight: 24 }),
        ...(paddingLeft && { paddingLeft: 24 }),
        ...(borderRight && { borderRight: "1px solid #1a1a1a" }),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        {icon}
        <Typography.Text
          style={{
            fontSize: 10,
            color: "#555",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.6px",
          }}
        >
          {label}
        </Typography.Text>
      </div>
      {value}
    </div>
  );
}

export default function SubscriptionStatusStrip({
  startDate,
  endDate,
  durationMonth,
  remainingDuration,
}: SubscriptionStatusStripProps) {
  const t = useI18n();

  const isUrgent = remainingDuration <= 1;
  const remainingColor = isUrgent ? theme.token.colorError : theme.token.orange600;

  return (
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
        <StatItem
          borderRight
          paddingRight
          icon={<CalendarBlank size={13} color="#555" />}
          label={t("startDate")}
          value={
            <Typography.Text
              style={{
                fontSize: 15,
                color: "#d0d0d0",
                fontWeight: 600,
                fontFamily: "monospace",
              }}
            >
              {dayjs(startDate).format("YYYY-MM-DD")}
            </Typography.Text>
          }
        />    
           {/* End Date */}
        <StatItem
          borderRight
          paddingRight
          icon={<CalendarBlank size={13} color="#555" />}
          label={t("endDate")}
          value={
            <Typography.Text
              style={{
                fontSize: 15,
                color: "#d0d0d0",
                fontWeight: 600,
                fontFamily: "monospace",
              }}
            >
              {dayjs(endDate).format("YYYY-MM-DD")}
            </Typography.Text>
          }
        />

        {/* Duration */}
        <StatItem
          borderRight
          paddingLeft
          paddingRight
          icon={<Timer size={13} color="#555" />}
          label={t("duration")}
          value={
            <Typography.Text style={{ fontSize: 15, color: "#d0d0d0", fontWeight: 600 }}>
              {durationMonth}{" "}
              <span style={{ fontSize: 12, color: "#555", fontWeight: 400 }}>
                {t("months")}
              </span>
            </Typography.Text>
          }
        />

        {/* Remaining */}
        <StatItem
          paddingLeft
          icon={<HourglassHigh size={13} color={remainingColor} />}
          label={t("remainingDuration")}
          value={
            <Typography.Text
              style={{ fontSize: 15, fontWeight: 600, color: remainingColor }}
            >
              {remainingDuration}{" "}
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: remainingColor,
                  opacity: 0.7,
                }}
              >
                {t("months")}
              </span>
            </Typography.Text>
          }
        />
      </div>
    </div>
  );
}
