import { Card, Button } from "antd";
import { Rocket } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useScopedI18n } from "../../../../../../../locales/client";

export default function ReadyToScaleSection() {
  const router = useRouter();
  const t = useScopedI18n("readyToScale");

  return (
    <div className="scale-section">
      <Card className="scale-card">
        <div className="scale-content">
          <div className="scale-icon-wrapper">
            <Rocket size={48} weight="duotone" className="scale-icon" />
          </div>
          <div className="scale-text">
            <h3 className="scale-title">{t("title")}</h3>
            <p className="scale-description">{t("description")}</p>
          </div>
          <Button
            type="primary"
            size="large"
            className="scale-button"
            onClick={() => router.push("/portal/create-payment")}
          >
            {t("button")}
          </Button>
        </div>
      </Card>

      <style jsx>{`
        .scale-section {
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        :global(.scale-card) {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          border: none !important;
          border-radius: 16px !important;
          overflow: hidden;
          position: relative;
        }

        :global(.scale-card)::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          border-radius: 50%;
        }

        :global(.scale-card .ant-card-body) {
          padding: 32px !important;
          position: relative;
          z-index: 1;
        }

        .scale-content {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .scale-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        :global(.scale-icon) {
          color: #fff;
        }

        .scale-text {
          flex: 1;
          min-width: 250px;
        }

        .scale-title {
          color: #fff;
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .scale-description {
          color: rgba(255, 255, 255, 0.9);
          font-size: 15px;
          margin: 0;
        }

        :global(.scale-button) {
          background: #fff !important;
          color: #667eea !important;
          border: none !important;
          font-weight: 600 !important;
          height: 48px !important;
          padding: 0 32px !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          transition: all 0.3s ease !important;
        }

        :global(.scale-button):hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25) !important;
        }

        .footer {
          text-align: center;
          padding: 24px 0;
          color: #64748b;
          font-size: 13px;
        }

        .footer p {
          margin: 0;
        }

        @media (max-width: 768px) {
          :global(.scale-card .ant-card-body) {
            padding: 24px !important;
          }

          .scale-content {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .scale-title {
            font-size: 20px;
          }

          .scale-description {
            font-size: 14px;
          }

          :global(.scale-button) {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}