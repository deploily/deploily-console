"use client";

import { useProfile } from "@/lib/features/profile/profileSelectors";
import { getProfile } from "@/lib/features/profile/profileThunks";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import ExpiringSubscriptionsCard from "./components/ExpiringSubscriptionsCard";
import QuickActionCards from "./components/QuickActionCards";
import styles from "./components/TableStyles.module.css";
import WelcomeHeader from "./components/WelcomeHeader";
import { fetchDashboardData } from "./features/dashboardThunks";

// ─── Ad Banner Type ────────────────────────────────────────────────────────────
// This single object drives the full-width hero banner.
// Replace DEFAULT_AD_BANNER with your Redux selector once the backend is ready.
//
// BACKEND INTEGRATION:
//   GET /api/ads/hero?placement=dashboard
//   Response shape: AdHeroBanner (see below)
//
export interface AdHeroBanner {
  /** Small label above the title, e.g. "Infrastructure · Cloud" */
  eyebrow?: string;
  /** Main headline — plain text part */
  title: string;
  /** Word or phrase rendered in orange inside the title */
  titleAccent?: string;
  /** Subtitle / description */
  subtitle: string;
  /** Primary CTA button label */
  primaryLabel: string;
  /** Primary CTA URL */
  primaryUrl: string;
  /** Secondary CTA button label (optional) */
  secondaryLabel?: string;
  /** Secondary CTA URL (optional) */
  secondaryUrl?: string;
  /**
   * Background image URL from your CDN.
   * Falls back to backgroundFallback if omitted.
   */
  backgroundImage?: string;
  /** Fallback CSS gradient used when no image is provided */
  backgroundFallback?: string;
}

const DEFAULT_AD_BANNER: AdHeroBanner = {
  eyebrow: "Infrastructure · Cloud · DevOps",
  title: "Optimize Your",
  titleAccent: "Infrastructure",
  subtitle:
    "Real-time monitoring and deployment management for global TechOps. Scale your applications across regions with zero-latency overhead.",
  primaryLabel: "Get Started",
  primaryUrl: "/portal/deployments/new",
  secondaryLabel: "View Docs",
  secondaryUrl: "/docs",
  // Replace with your CDN URL once backend is ready:
  backgroundImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
  // backgroundImage: undefined,
  backgroundFallback:
    "linear-gradient(115deg, #0d0d0d 0%, #1a0c00 35%, #0f0f0f 65%, #111 100%)",
};

// ─── Hero Banner Component ─────────────────────────────────────────────────────
function AdHeroBannerSection({ banner = DEFAULT_AD_BANNER }: { banner?: AdHeroBanner }) {
  const bgStyle = banner.backgroundImage
    ? { backgroundImage: `url(${banner.backgroundImage})` }
    : { background: banner.backgroundFallback ?? DEFAULT_AD_BANNER.backgroundFallback };

  return (
    <div className={styles.adHeroSection}>
      <div className={styles.adHeroBanner} style={bgStyle}>
        <div className={styles.adHeroContent}>
          {banner.eyebrow && (
            <span className={styles.adHeroEyebrow}>{banner.eyebrow}</span>
          )}

          <h2 className={styles.adHeroTitle}>
            {banner.title}{" "}
            {banner.titleAccent && (
              <span className={styles.adHeroTitleAccent}>{banner.titleAccent}</span>
            )}
          </h2>

          <p className={styles.adHeroSubtitle}>{banner.subtitle}</p>

          <div className={styles.adHeroActions}>
            <button
              className={styles.adHeroCtaPrimary}
              onClick={() => { window.location.href = banner.primaryUrl; }}
            >
              {banner.primaryLabel}
            </button>

            {banner.secondaryLabel && banner.secondaryUrl && (
              <button
                className={styles.adHeroCtaSecondary}
                onClick={() => { window.location.href = banner.secondaryUrl!; }}
              >
                {banner.secondaryLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  const { currentProfile } = useProfile();

  const [colFlex, setColFlex] = useState("20%");

  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(getProfile());
    const handleResize = () => {
      if (window.innerWidth < 480) setColFlex("100%");
      else if (window.innerWidth < 768) setColFlex("50%");
      else setColFlex("20%");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <WelcomeHeader firstName={currentProfile?.first_name} />

      {/* <AdHeroBannerSection /> */}

      <QuickActionCards />



      <ExpiringSubscriptionsCard />


      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          padding: 24px;
          position: relative;
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