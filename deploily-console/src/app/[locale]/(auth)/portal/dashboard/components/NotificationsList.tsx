import { Card } from "antd";
import {
  BellRinging,
  WarningCircle,
  CheckCircle,
  CreditCard,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";
import { useScopedI18n } from "../../../../../../../locales/client";

export default function NotificationsList() {
  const t = useScopedI18n("notifications");

  const notifications = [
    {
      id: 1,
      type: "expiring",
      icon: BellRinging,
      title: t("expiring.title"),
      description: t("expiring.description"),
      color: "#FF6B6B",
      action: t("expiring.action"),
    },
    {
      id: 2,
      type: "warning",
      icon: WarningCircle,
      title: t("warning.title"),
      description: t("warning.description"),
      color: "#FFA500",
      action: t("warning.action"),
    },
    {
      id: 3,
      type: "success",
      icon: CheckCircle,
      title: t("success.title"),
      description: t("success.description"),
      color: "#51CF66",
      action: t("success.action"),
    },
    {
      id: 4,
      type: "payment",
      icon: CreditCard,
      title: t("payment.title"),
      description: t("payment.description"),
      color: "#4ECDC4",
      action: t("payment.action"),
    },
    {
      id: 5,
      type: "profile",
      icon: UserCircle,
      title: t("profile.title"),
      description: t("profile.description"),
      color: "#9B59B6",
      action: t("profile.action"),
    },
  ];

  return (
    <div className="notifications-section">
      <div className="section-header">
        <h2 className="section-title">
          <BellRinging size={24} weight="fill" />
          {t("title")}
        </h2>
      </div>

      <div className="notifications-grid">
        {notifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <Card key={notification.id} className="notification-card" hoverable>
              <div className="notification-content">
                <div
                  className="notification-icon"
                  style={{ backgroundColor: `${notification.color}20` }}
                >
                  <IconComponent
                    size={24}
                    color={notification.color}
                    weight="duotone"
                  />
                </div>
                <div className="notification-text">
                  <h4 className="notification-title">{notification.title}</h4>
                  <p className="notification-description">{notification.description}</p>
                </div>
                <button
                  className="notification-action"
                  style={{
                    color: notification.color,
                    borderColor: notification.color,
                  }}
                >
                  {notification.action}
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      <style jsx>{`
        .notifications-section {
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .section-header {
          margin-bottom: 20px;
        }

        .section-title {
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
        }

        .notifications-grid {
          display: grid;
          gap: 12px;
        }

        :global(.notification-card) {
          background: rgba(30, 41, 59, 0.6) !important;
          border: 1px solid rgba(71, 85, 105, 0.3) !important;
          border-radius: 12px !important;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        :global(.notification-card):hover {
          background: rgba(30, 41, 59, 0.8) !important;
          border-color: rgba(71, 85, 105, 0.5) !important;
          transform: translateX(4px);
        }

        :global(.notification-card .ant-card-body) {
          padding: 16px !important;
        }

        .notification-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .notification-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notification-text {
          flex: 1;
          min-width: 0;
        }

        .notification-title {
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .notification-description {
          color: #94a3b8;
          font-size: 13px;
          margin: 0;
          line-height: 1.4;
        }

        .notification-action {
          background: transparent;
          border: 1.5px solid;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .notification-action:hover {
          opacity: 0.8;
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .notification-content {
            flex-wrap: wrap;
          }

          .notification-action {
            width: 100%;
            margin-top: 8px;
          }
        }

        @media (max-width: 768px) {
          .notification-icon {
            width: 40px;
            height: 40px;
          }

          .notification-title {
            font-size: 13px;
          }

          .notification-description {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}