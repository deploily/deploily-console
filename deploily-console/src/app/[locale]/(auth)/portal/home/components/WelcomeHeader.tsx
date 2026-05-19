import { Typography } from "antd";
import { useScopedI18n } from "../../../../../../../locales/client";

const { Title, Text } = Typography;

interface WelcomeHeaderProps {
  firstName?: string;
}

export default function WelcomeHeader({ firstName }: WelcomeHeaderProps) {
  const dashboardTranslate = useScopedI18n("dashboard");

  return (
    <div className="welcome-header">
      <Title level={2} className="welcome-title">
        {dashboardTranslate("welcome")}
        {firstName && (
          <span className="welcome-name">{firstName}</span>
        )}!
      </Title>
      <Text className="welcome-subtitle">{dashboardTranslate("subTitle")}</Text>

      <style jsx>{`
        .welcome-header {
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }

        :global(.welcome-title) {
          color: #fff !important;
          font-size: 28px !important;
          font-weight: 700 !important;
          margin: 0 !important;
          margin-bottom: 8px !important;
        }

        .welcome-name {
          color: #4facfe;
          margin-left: 8px;
        }

        :global(.welcome-subtitle) {
          color: #94a3b8 !important;
          font-size: 15px;
          display: block;
        }

        @media (max-width: 768px) {
          :global(.welcome-title) {
            font-size: 22px !important;
          }
        }
      `}</style>
    </div>
  );
}