"use client";
import {DetailsCollapse} from "deploily-ui-components";
import {useI18n, useScopedI18n} from "../../../../../../../../locales/client";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function ApplicationDetailsCollapseContainer({
  description,
  specifications,
  documentationUrl,
  // demoUrl
}: {
  description: string;
  specifications: string;
  documentationUrl: string;
  // demoUrl: string
}) {
  const t = useI18n();
  return (
    <DetailsCollapse
      items={[
        {
          label: t("description"),
          children: description,
        },
        {
          label: t("specifications"),
          children: (
            <div style={{fontWeight: 400, fontSize: 16}}>
              <ReactMarkdown>{specifications}</ReactMarkdown>
            </div>
          ),
        },
        {
          label: t("usefulLinks"),
          children: (
            <div style={{fontWeight: 400, fontSize: 16}}>
              <div style={{display: "flex", gap: "10px", width: "100%", flexWrap: "wrap"}}>
                <Link href={documentationUrl} style={{textDecoration: "underline"}} target="_blank">
                  {t("see_documentation")}
                </Link>
              </div>
              {/* <div style={{ display: 'flex', gap: '10px', width: '100%', flexWrap: "wrap" }}>
                                    <Link
                                        href={demoUrl}
                                        style={{ textDecoration: "underline" }} target="_blank"
                                    >
                                        {t('live_demo')}
                                    </Link>
                                </div> */}
            </div>
          ),
        },
      ]}
    />
  );
}
