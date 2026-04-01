import { CustomTransparentOrangeButton } from "@/styles/components/buttonStyle";
import { theme } from "@/styles/theme";
import { BookOpen, Code, Desktop, Info, Monitor } from "@phosphor-icons/react";
import { Col, Row, Typography } from "antd";
import Link from "next/link";
import { useI18n } from "../../../../../../../locales/client";

export type DocUrlType = "documentation" | "adminConsole" | "demoUrl" | "consoleUrl";

export interface DocUrl {
  type: DocUrlType;
  url: string;
}

interface ResourcesAndDocumentationProps {
  docsUrls: DocUrl[];
  onMoreDetailsClick: () => void;
}

const DOC_URL_CONFIG: Record<
  DocUrlType,
  { labelKey: string; subtitleKey: string; icon: React.ReactNode }
> = {
  documentation: {
    labelKey: "documentation",
    subtitleKey: "apiReferenceAndGuides",
    icon: <BookOpen size={20} color={theme.token.orange600} weight="duotone" />,
  },
  adminConsole: {
    labelKey: "adminConsole",
    subtitleKey: "manageYourService",
    icon: <Monitor size={20} color={theme.token.orange600} weight="duotone" />,
  },
  demoUrl: {
    labelKey: "liveDemo",
    subtitleKey: "tryItOut",
    icon: <Desktop size={20} color={theme.token.orange600} weight="duotone" />,
  },
  consoleUrl: {
    labelKey: "console",
    subtitleKey: "serviceConsole",
    icon: <Code size={20} color={theme.token.orange600} weight="duotone" />,
  },
};

export default function ResourcesAndDocumentation({
  docsUrls,
  onMoreDetailsClick,
}: ResourcesAndDocumentationProps) {
  const t = useI18n();

  if (docsUrls.length === 0) return null;

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <div>
          <Typography.Text
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#555",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              display: "block",
              marginBottom: 4,
            }}
          >
            {t("quickAccess")}
          </Typography.Text>
          <Typography.Title level={4} style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
            {t("resourcesAndDocumentation")}
          </Typography.Title>
        </div>

        <CustomTransparentOrangeButton
          onClick={onMoreDetailsClick}
          icon={<Info size={16} />}
          style={{ fontSize: 13 }}
        >
          {t("moreDetails")}
        </CustomTransparentOrangeButton>
      </div>

      {/* Resource Cards */}
      <Row gutter={[14, 14]}>
        {docsUrls.map(({ type, url }) => {
          const config = DOC_URL_CONFIG[type];
          return (
            <Col key={type} xs={24} sm={12} lg={8}>
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    background: "#0f0f0f",
                    borderRadius: 14,
                    padding: "18px 20px",
                    border: "1px solid #1f1f1f",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = `${theme.token.orange600}40`;
                    el.style.background = "#141414";
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = `0 8px 24px ${theme.token.orange600}15`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "#1f1f1f";
                    el.style.background = "#0f0f0f";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${theme.token.orange600}15`,
                      border: `1px solid ${theme.token.orange600}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {config.icon}
                  </div>

                  {/* Label */}
                  <div>
                    <Typography.Text
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#e0e0e0",
                        display: "block",
                      }}
                    >
                      {t(config.labelKey as any)}
                    </Typography.Text>
                    <Typography.Text style={{ fontSize: 11, color: "#555" }}>
                      {t(config.subtitleKey as any)}
                    </Typography.Text>
                  </div>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}