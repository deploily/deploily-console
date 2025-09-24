"use client";
import DetailsCollapse from "deploily-ui-components/components/Deployments/detailsCollapse";
import {useScopedI18n} from "../../../../../../../../locales/client";
import ReactMarkdown from "react-markdown";

export default function DeploymentDetailsCollapseContainer({
  description,
  specifications,
}: {
  description: string;
  specifications: string;
}) {
  const tdeployments = useScopedI18n("deployment");

  return (
    <DetailsCollapse
      items={[
        {
          label: tdeployments("description"),
          children: description,
        },
        {
          label: tdeployments("features"),
          children: (
            <div style={{fontWeight: 600, fontSize: 14}}>
              <ReactMarkdown>{specifications}</ReactMarkdown>
            </div>
          ),
        },
      ]}
    />
  );
}
