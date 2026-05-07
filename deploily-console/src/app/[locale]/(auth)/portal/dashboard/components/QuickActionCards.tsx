import { Card, Col, Row } from "antd";
import { useScopedI18n } from "../../../../../../../locales/client";
import { useRouter } from "next/navigation";

const quickActions = [
  {
    key: "startups",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: "🚀",
    link:"/portal/deployments"
  },
  {
    key: "businesses",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    icon: "💼",
    link: "/portal/application"
  },
  {
    key: "developers",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    icon: "👨‍💻",
    link: "/portal/api-services"
  },
  {
    key: "cloud",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    icon: "☁️",
    link: "/portal/cloud-resources"
  },
];


export default function QuickActionCards() {
  const t = useScopedI18n("quickActions");
  const router = useRouter();

  return (
    <div className="quick-actions">
      <Row gutter={[16, 16]}>
        {quickActions.map((action) => (
          <Col xs={24} sm={12} lg={6} key={action.key}>
            <Card
              className="action-card"
              style={{ background: action.gradient }}
              hoverable
            >
              <div className="action-icon">{action.icon}</div>
              <div className="action-content">
                <h3 className="action-title">{t(`${action.key}.title` as any)}</h3>
                <p className="action-description">{t(`${action.key}.description` as any)}</p>
                <button className="action-button" onClick={()=>router.push(action.link)}>
                  {t(`${action.key}.button` as any)} →
                </button>
              </div>
            </Card>
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
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        :global(.action-card .ant-card-body) {
          padding: 20px !important;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .action-icon {
          font-size: 32px;
          margin-bottom: 12px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .action-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .action-title {
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 6px 0;
        }

        .action-description {
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          margin: 0 0 12px 0;
          flex: 1;
          line-height: 1.4;
        }

        .action-button {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          padding: 6px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
          backdrop-filter: blur(10px);
          align-self: flex-start;
        }

        .action-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(2px);
        }

        @media (max-width: 768px) {
          .action-icon {
            font-size: 28px;
          }

          .action-title {
            font-size: 15px;
          }

          .action-description {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}