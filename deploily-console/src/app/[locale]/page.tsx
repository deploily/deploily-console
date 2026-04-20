import { Content } from "antd/es/layout/layout";
import AppAppBar from "./components/appBar";
import LandingPageContent from "./components/landingPageContent";
import LoginLogoutButton from "./components/loginLogoutButton";
export default function LandingPage() {
  return (
    <main>
      <AppAppBar />
      <Content
        style={{
          backgroundColor: "#0c0d0f",
          height: "93vh",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Background illustration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('/images/background-illustration.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.3, // Adjust opacity for subtle effect
            zIndex: 0
          }}
        />

        {/* Content layer */}
        <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
          <LandingPageContent loginLogoutButton={<LoginLogoutButton />} />
        </div>
      </Content>
    </main>
  );
}