"use client";
import DeploymentDescriptionForConsole from "deploily-ui-components/components/Deployments/deploymentDescriptionForConsole";
import React from "react";
import {useI18n} from "../../../../../../../../locales/client";

export default function DeployementDescriptionContainer({
  title,
  description,
  documentationUrl,
  is_subscribed,
  logo,
  price,
}: {
  title: string;
  description: string;
  documentationUrl: string;
  logo: React.ReactNode;
  price: number;
  is_subscribed?: boolean;
}) {
  const t = useI18n();

  return (
    <div>
      <DeploymentDescriptionForConsole
        title={title}
        price={price}
        description={description}
        avatar={logo}
        documentationUrl={documentationUrl}
        documentationLabel={t("documentation")}
        is_subscribed_tag={is_subscribed ? t("subscribed") : undefined}
      />
    </div>
  );
}
