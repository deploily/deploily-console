import { Typography, Button } from "antd";
import { Copy, TreeStructure } from "@phosphor-icons/react";
import { handleCopy } from "@/lib/utils/handleCopy";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const subscriptionItems = (serviceDetails: any, t: any) => [
  {
    key: "url",
    content: (
      <div
        style={{
          background: "#1a1a1a",
          borderRadius: 14,
          border: "1px solid #2a2a2a",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "18px 20px 14px",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 4,
              height: 22,
              background: "#4f8ef7",
              borderRadius: 2,
            }}
          />
          <Typography.Title
            level={5}
            style={{ color: "#fff", margin: 0, fontSize: 16, fontWeight: 600 }}
          >
            {t("apiAccessUrl")}
          </Typography.Title>
        </div>

        <div style={{ padding: "0 20px 20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#0d0d0d",
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #2a2a2a",
              gap: 12,
            }}
          >
            <TreeStructure size={18} color="#555" />
            <span
              style={{
                flex: 1,
                color: "#e0e0e0",
                fontSize: 13,
                fontFamily: "monospace",
                wordBreak: "break-all",
              }}
            >
              {serviceDetails.service_url}
            </span>
            <Button
              type="text"
              size="small"
              icon={<Copy size={16} color="#888" />}
              onClick={() => handleCopy(serviceDetails.service_url)}
              style={{ padding: "0 6px", height: 28, flexShrink: 0 }}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "curl",
    content: (
      <div
        style={{
          background: "#1a1a1a",
          borderRadius: 14,
          border: "1px solid #2a2a2a",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px 6px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 4,
                height: 22,
                background: "#e8834a",
                borderRadius: 2,
              }}
            />
            <Typography.Title
              level={5}
              style={{ color: "#fff", margin: 0, fontSize: 16, fontWeight: 600 }}
            >
              {t("curlRequest")}
            </Typography.Title>
          </div>
          
        </div>

        <Typography.Text
          style={{
            color: "#666",
            fontSize: 12,
            display: "block",
            padding: "0 20px 12px",
          }}
        >
          {t("curlRequestSubtitle")}
        </Typography.Text>

        {/* Code block */}
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            language="bash"
            style={dracula}
            wrapLongLines
            customStyle={{
              margin: 0,
              background: "#0d0d0d",
              padding: "16px 20px",
              fontSize: 13,
              lineHeight: 1.7,
            }}
          >
            {serviceDetails.curl_command}
          </SyntaxHighlighter>
          <Button
            type="text"
            size="small"
            icon={<Copy size={15} color="#888" />}
            onClick={() => handleCopy(serviceDetails.curl_command)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 2,
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: 6,
              height: 30,
              padding: "0 8px",
            }}
          />
        </div>
      </div>
    ),
  },
];