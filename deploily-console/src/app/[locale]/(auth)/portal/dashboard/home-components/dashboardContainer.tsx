"use client";
import { useProfile } from "@/lib/features/profile/profileSelectors";
import { getProfile } from "@/lib/features/profile/profileThunks";
import { useAppDispatch } from "@/lib/hook";
import { Handshake, Heart, Invoice, Question, SquaresFour } from "@phosphor-icons/react/dist/ssr";
import { Card, Col, Row, Typography } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import { DashboardResponse } from "../features/dashboardInterface";
import { useDashboard } from "../features/dashboardSelector";
import { fetchDashboardData } from "../features/dashboardThunks";
import ExpiringSoonSubscriptionsListContainer from "./expiringSoonSubscriptionsListContainer";

export default function DashboardContainer() {
  const dashboardtranslate = useScopedI18n("dashboard");

  const { Title, Text } = Typography;
  const dispatch = useAppDispatch();

  const { currentProfile } = useProfile();
  const { dashboardResponse } = useDashboard();

  const [colFlex, setColFlex] = useState("20%");
  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(getProfile());
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setColFlex("100%"); // mobile : 1 colonne
      } else if (window.innerWidth < 768) {
        setColFlex("50%"); // tablette : 2 colonnes
      } else {
        setColFlex("20%"); // desktop : 5 colonnes
      }
    };
    handleResize(); // init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const stats = (dashboardResponse: DashboardResponse) => {
    return [
      {
        key: "apiServices",
        title: dashboardtranslate("apiServices"),
        value: dashboardResponse.api_subscriptions,
        icon: <Invoice style={{ fontSize: 30, color: "#fff" }} />,
        color: "#FFB84D",
        seeMyServices: dashboardtranslate("seeMyApis"),
        subscribeNew: dashboardtranslate("subscribeNewApi"),
        linkToServicesList: "/portal/api-services",
        linkToMyServices: "/portal/my-api",
      },
      {
        key: "deployments",
        title: dashboardtranslate("deployments"),
        value: dashboardResponse.deployment_subscriptions,
        icon: <Handshake style={{ fontSize: 30, color: '#fff' }} />,
        color: '#5394CC',
        seeMyServices: dashboardtranslate('seeMyDeployments'),
        subscribeNew: dashboardtranslate('subscribeNewDeployment'),
        linkToServicesList: "/portal/deployments",
        linkToMyServices: "/portal/my-deployments",
      },
      {
        key: "applications",
        title: dashboardtranslate("applications"),
        value: dashboardResponse.app_subscriptions,
        icon: <SquaresFour style={{ fontSize: 30, color: "#fff" }} />,
        color: "#FF9933",
        seeMyServices: dashboardtranslate("seeMyApplications"),
        subscribeNew: dashboardtranslate("subscribeNewApplication"),
        linkToServicesList: "/portal/application",
        linkToMyServices: "/portal/my-applications",
      },

      {
        key: "supportTickets",
        title: dashboardtranslate("supportTickets"),
        value: dashboardResponse.support_tickets,
        icon: <Question style={{ fontSize: 30, color: "#fff" }} />,
        color: "#0099CC",
        seeMyServices: dashboardtranslate("seeMySupportTicket"),
        subscribeNew: dashboardtranslate("addSupportTocket"),
        linkToServicesList: "/portal/support-ticket/add",
        linkToMyServices: "/portal/support-ticket",
      },
      {
        key: "favorites",
        title: dashboardtranslate("favorites"),
        value: dashboardResponse.my_favorites,
        icon: <Heart style={{ fontSize: 30, color: "#fff" }} />,
        color: "#DD8859",
        seeMyServices: dashboardtranslate("seeMyFavorites"),
        subscribeNew: dashboardtranslate("seeMyFavorites"),
        linkToServicesList: "/portal/my-favorites",
        linkToMyServices: "/portal/my-favorites",
      },
    ]
  };

  return (
    <div style={{ padding: "24px", minHeight: "100vh" }}>
      {currentProfile && (
        <Title level={3} style={{ color: "#fff" }}>
          {dashboardtranslate("welcome")}
          {currentProfile.first_name}!
        </Title>
      )}
      <Text style={{ color: "#ccc" }}>{dashboardtranslate("subTitle")}</Text>

      <Row gutter={[16, 16]} wrap style={{ marginTop: 24 }}>
        {dashboardResponse && stats(dashboardResponse).map((stat) => (
          <Col flex={colFlex} key={stat.key}>
            <Card
              style={{
                height: "100%",
                minHeight: 170,
                minWidth: 130,
                backgroundColor: stat.color,
                color: "#fff",
                borderRadius: "8px",
                textAlign: "center",
              }}
              bodyStyle={{ padding: 20 }}
            >
              <div style={{ fontSize: 24 }}>{stat.icon}</div>
              <div style={{ fontSize: 14, height: "35px" }}>{stat.title}</div>
              <div style={{ fontSize: 32, fontWeight: "bold" }}>
                {stat.value.toString().padStart(2, "0")}
              </div>
              {stat.linkToServicesList && (
                <>
                  {stat.value === 0 ? (
                    <Link
                      href={stat.linkToServicesList}
                      style={{ color: "#fff", textDecoration: "underline" }}
                    >
                      {stat.subscribeNew}
                    </Link>
                  ) : (
                    <Link
                      href={stat.linkToMyServices}
                      style={{ color: "#fff", textDecoration: "underline" }}
                    >
                      {stat.seeMyServices}
                    </Link>
                  )}
                </>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <Card title={dashboardtranslate("expiringSoonSubscriptions.expiringSoonSubscriptions")} style={{ marginTop: 40 }}>
        <ExpiringSoonSubscriptionsListContainer />
      </Card>
    </div>
  );
}
