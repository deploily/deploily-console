import { Typography, Button } from "antd";
import { Copy } from "@phosphor-icons/react";
import { handleCopy } from "@/lib/utils/handleCopy";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const subscriptionItems = (serviceDetails: any, t: any) => [
  {
    key: "url",
    content: (
      <div
        style={{
          background: "#111",
          padding: 20,
          borderRadius: 12,
          border: "1px solid #222",
        }}
      >
        <Typography.Title level={5} style={{ color: "#fff" }}>
          {t("accessUrl")}
        </Typography.Title>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#000",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #333",
            color: "#fff",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span style={{ wordBreak: "break-all" }}>
            {serviceDetails.service_url}
          </span>

          <Button
            icon={<Copy />}
            onClick={() => handleCopy(serviceDetails.service_url)}
          />
        </div>
      </div>
    ),
  },

  {
    key: "curl",
    content: (
      <div
        style={{
          background: "#111",
          padding: 20,
          borderRadius: 12,
          border: "1px solid #222",
        }}
      >
        <Typography.Title level={5} style={{ color: "#fff" }}>
          CURL Request
        </Typography.Title>

        <div
          style={{
            position: "relative",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <SyntaxHighlighter
            language="bash"
            style={dracula}
            wrapLongLines
            customStyle={{
              margin: 0,
              background: "#0d0d0d",
              padding: "16px",
            }}
          >
            {serviceDetails.curl_command}
          </SyntaxHighlighter>

          <Button
            icon={<Copy />}
            onClick={() => handleCopy(serviceDetails.curl_command)}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
            }}
          />
        </div>
      </div>
    ),
  },
];