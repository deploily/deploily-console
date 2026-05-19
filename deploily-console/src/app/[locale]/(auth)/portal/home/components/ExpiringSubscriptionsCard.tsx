import { Card } from "antd";
import ExpiringSoonSubscriptionsListContainer from "./ExpiringSoonSubscriptionsListContainer";

export default function ExpiringSubscriptionsCard() {

  return (
    <div className="expiring-section">
      <Card 
        className="expiring-card"
        // title={
        //   <span className="card-title">
        //     {dashboardTranslate("expiringSoonSubscriptions.expiringSoonSubscriptions")}
        //   </span>
        // }
      >
        <ExpiringSoonSubscriptionsListContainer />
      </Card>

      <style jsx>{`
        .expiring-section {
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        :global(.expiring-card) {
          background: #1d1d1d !important;
          border: 1px solid rgba(71, 85, 105, 0.3) !important;
          border-radius: 16px !important;
          backdrop-filter: blur(10px);
        }

        :global(.expiring-card .ant-card-head) {
          border-bottom: 1px solid #1d1d1d !important;
          background: rgba(15, 23, 42, 0.4);
        }

        :global(.card-title) {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
        }

        :global(.expiring-card .ant-card-body) {
          padding: 24px !important;
        }
      `}</style>
    </div>
  );
}
