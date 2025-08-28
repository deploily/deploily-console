import { Metadata } from "next";
import TermsConditionsPageContent from "./termsConditionsPageContent";

export const metadata: Metadata = {
  title: "Deploily - Terms and Conditions",
  description: "Read Deploily's terms of service, including account usage, billing, service limitations, termination, and liability.",
  keywords: "Terms and Conditions, Cloud Service Terms, Billing, User Agreement, SLA, Legal, Deploily Policy",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    url: "https://deploily.cloud/en/terms-conditions",
    title: "Deploily - Terms and Conditions",
    siteName: "Deploily",
    description: "Read Deploily's terms of service, including account usage, billing, service limitations, termination, and liability.",
    images: [{
      url: "https://deploily.cloud/images/Logo.jpg",
      alt: "Deploily Logo"
    }],
    locale: "en_US"
  },
};



export default function Page() {
  return (
    <TermsConditionsPageContent/> 
  );
}
