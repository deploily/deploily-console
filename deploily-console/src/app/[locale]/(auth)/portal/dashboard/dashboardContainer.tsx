"use client";

import { useProfile } from "@/lib/features/profile/profileSelectors";
import { getProfile } from "@/lib/features/profile/profileThunks";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import NotificationsList from "./components/NotificationsList";
import QuickActionCards from "./components/QuickActionCards";
import ReadyToScaleSection from "./components/ReadyToScaleSection";
import StatsCards from "./components/StatsCards";
import WelcomeHeader from "./components/WelcomeHeader";
import { useDashboard } from "./features/dashboardSelector";
import { fetchDashboardData } from "./features/dashboardThunks";
import ExpiringSubscriptionsCard from "./components/ExpiringSubscriptionsCard";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  const { currentProfile } = useProfile();
  const { dashboardResponse } = useDashboard();

  const [colFlex, setColFlex] = useState("20%");

  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(getProfile());

    const handleResize = () => {
      if (window.innerWidth < 480) {
        setColFlex("100%");
      } else if (window.innerWidth < 768) {
        setColFlex("50%");
      } else {
        setColFlex("20%");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <WelcomeHeader
        firstName={currentProfile?.first_name}
      />

      <QuickActionCards />

      {/* <NotificationsList /> */}
      <ExpiringSubscriptionsCard />

      <StatsCards
        dashboardResponse={dashboardResponse}
        colFlex={colFlex}
      />


      {/* <ReadyToScaleSection /> */}

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          padding: 24px;
          position: relative;
        }

        .dashboard-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}