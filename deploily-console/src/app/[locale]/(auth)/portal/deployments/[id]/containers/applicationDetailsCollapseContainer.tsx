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
  const tApplications = useScopedI18n("applications");

  return (
    <DetailsCollapse
      items={[
        {
          label: tApplications("description"),
          children: description,
        },
        {
          label: tApplications("features"),
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
