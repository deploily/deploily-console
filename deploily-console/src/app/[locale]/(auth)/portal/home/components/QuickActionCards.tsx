import { useCloudResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { updateMyResourceFilterParams } from "@/lib/features/cloud-resource/cloudResourceSlice";
import { getMyResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { useMyApplicationList } from "@/lib/features/my-applications/myApplicationSelector";
import { fetchMyApplications } from "@/lib/features/my-applications/myApplicationThunks";
import { useAppDispatch } from "@/lib/hook";
import { DivCard } from "@/styles/components/divStyle";
import { theme } from "@/styles/theme";
import { Button, Card, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import RecentRessourceAffiliations from "./recentRessourceAffiliations";

const quickActions = [
  {
    key: "startups",
    icon: "🚀",
    link: "/portal/deployments",
    tableOfRecentSubscriptions: <div></div>
  },
  {
    key: "businesses",
    icon: "💼",
    link: "/portal/application",
    tableOfRecentSubscriptions: <div></div>
  },
  {
    key: "developers",
    icon: "👨‍💻",
    link: "/portal/api-services",
    tableOfRecentSubscriptions: <div></div>
  },
  {
    key: "cloud",
    icon: "☁️",
    link: "/portal/cloud-resources",
    tableOfRecentSubscriptions: <RecentRessourceAffiliations></RecentRessourceAffiliations>
  },
];

export default function QuickActionCards() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateMyResourceFilterParams({
      page_size: 3,
      page: 0,
    }));
    dispatch(getMyResources());
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const { myResourcesResponse, isLoading } = useCloudResource();
  const myApplicationsList= useMyApplicationList();

  return (
    <div className="quick-actions">
      <Row gutter={[16, 16]}>
        {quickActions.map((action) => (
          <Col xs={24} sm={12} lg={12} key={action.key}>
            {<QuickActionCardComponent 
                response={
                  action.key == "cloud" ? myResourcesResponse?.result :
                  action.key == "businesses" ? myApplicationsList.MyApplicationList :
                   undefined} 
                isloading={
                  action.key == "cloud" ? isLoading :
                  action.key == "businesses" ? myApplicationsList.isLoading :
                   false} 
                action={action}>
              </QuickActionCardComponent>}
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
          padding: 0px !important;
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
          line-height: 1.4;
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



export function QuickActionCardComponent({ response, isloading, action }: { response: any, isloading: boolean, action: any }) {
  const t = useScopedI18n("quickActions");
  const router = useRouter();

  return (
    <Card
      style={{ padding: '0px' }}
      className="action-card"
      hoverable>
      <DivCard
        style={{
          margin: 0,
          width: "100%",
          background: theme.token.darkGray,
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
        {isloading ? <></> : response != undefined && response.length > 0 ?
          <>
            <h3 className="action-title"
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
                paddingBottom: 16,
              }}>{t(`${action.key}.title` as any)}</h3>
            {action.tableOfRecentSubscriptions}
          </> :
          <div style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 16,
            paddingBottom: 16,
          }}>
            <div className="action-icon">{action.icon}</div>
            <div className="action-content" >
              <h3 className="action-title">{t(`${action.key}.title` as any)}</h3>
              <p className="action-description">{t(`${action.key}.description` as any)}</p>
            </div>
            <Button onClick={() => router.push(action.link)}
              style={{
                backgroundColor: theme.token.orange400,
                color: "white",
                fontWeight: "bold",
                fontSize: "12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                height: "40px",
                marginTop: "auto",
                marginLeft: "auto",
                minWidth: "220px"
              }}
            >
              {t(`${action.key}.button` as any)}
            </Button>
          </div>}
      </DivCard>
    </Card>);
}