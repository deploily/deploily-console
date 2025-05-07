import type { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Deploily - Deploy to Sovereign Infrastructure ",
  description: "Deploily helps you deploy and manage your web applications easily in the cloud with just a few clicks.",
  keywords: "Deploily, Cloud Deployment, App Hosting, CI/CD, Web App Management, Cloud Proxy Solution, Application Deployment, Open Source Platform, Algerian Data Protection, Local Cloud Hosting, Local API Alternatives",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    url: "https://deploily.cloud/en",
    title: "Deploily - Deploy to Sovereign Infrastructure ",
    siteName: "Deploily",
    description: "Launch your apps in the cloud effortlessly with Deploily. Streamlined tools for developers to deploy, scale, and monitor web applications.",
    images: [{
      url: "https://deploily.cloud/images/Logo.jpg",
      alt: "Deploily Logo"
    }],
    locale: "en_US"
  },
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
