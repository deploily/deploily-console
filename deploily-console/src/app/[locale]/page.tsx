import AppAppBar from "./components/appBar";
import {Content} from "antd/es/layout/layout";
import LandingPageContent from "./components/landingPageContent";

export default function LandingPage() {
  return (
    <main>
      <AppAppBar />
      <Content style={{backgroundColor: "#0c0d0f", height: "93vh"}}>
        <LandingPageContent />
      </Content>
    </main>
  );
}
