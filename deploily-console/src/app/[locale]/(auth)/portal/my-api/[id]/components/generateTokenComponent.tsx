"use client";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Copy, Eye, EyeSlash, ArrowClockwise, Key } from "@phosphor-icons/react";
import { Button, Typography } from "antd";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import { useApiServiceSubscription } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionSelectors";
import {
  fetchApiServiceSubscriptionById,
  generateTokenThunk,
} from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionThunks";
import { handleCopy } from "@/lib/utils/handleCopy";

export default function GenerateTokenComponent({
  apiServiceSubscription_id,
}: {
  apiServiceSubscription_id: string;
}) {
  const t = useI18n();
  const tApi = useScopedI18n("apiServiceSubscription");
  const dispatch = useAppDispatch();
  const { currentApiServiceSubscription, generateTokenSuccess } =
    useApiServiceSubscription();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (generateTokenSuccess) {
      dispatch(fetchApiServiceSubscriptionById(apiServiceSubscription_id));
    }
  }, [generateTokenSuccess]);

  const generateApiKey = () => {
    dispatch(generateTokenThunk(apiServiceSubscription_id));
  };

  const apiKey = currentApiServiceSubscription?.api_key ?? "";

  const maskedKey = apiKey
    ? visible
      ? apiKey
      : `${apiKey.slice(0, 8)}${"•".repeat(16)}${apiKey.slice(-4)}`
    : "";

  return (
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
          padding: "18px 20px 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 4,
              height: 22,
              background: theme.token.orange600,
              borderRadius: 2,
            }}
          />
          <Typography.Title
            level={5}
            style={{ color: "#fff", margin: 0, fontSize: 16, fontWeight: 600 }}
          >
            {tApi("apiKey")}
          </Typography.Title>
        </div>
        <Key size={28} color="#444" weight="fill" />
      </div>

      <div style={{ padding: "0 20px 20px" }}>

        {/* Key display row */}
        {apiKey && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#0d0d0d",
              borderRadius: 8,
              border: "1px solid #2a2a2a",
              padding: "10px 14px",
              marginBottom: 14,
              gap: 10,
            }}
          >
            <code
              style={{
                flex: 1,
                color: "#e0e0e0",
                fontSize: 13,
                fontFamily: "monospace",
                letterSpacing: "0.04em",
                wordBreak: "break-all",
              }}
            >
              {maskedKey}
            </code>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <Button
                type="text"
                size="small"
                icon={
                  visible
                    ? <EyeSlash size={16} color="#888" />
                    : <Eye size={16} color="#888" />
                }
                onClick={() => setVisible((p) => !p)}
                style={{ padding: "0 6px", height: 28 }}
              />
              <Button
                type="text"
                size="small"
                icon={<Copy size={16} color="#888" />}
                onClick={() => handleCopy(apiKey)}
                style={{ padding: "0 6px", height: 28 }}
              />
            </div>
          </div>
        )}

        {/* Generate / Regenerate button */}
        <Button
          type="primary"
          icon={<ArrowClockwise size={16} weight="bold" />}
          onClick={generateApiKey}
          block
          style={{
            background: theme.token.orange600,
            border: "none",
            height: 46,
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {apiKey ? t("reGanerateKey") : t("ganerateKey")}
        </Button>

        {/* Warning note */}
        {apiKey && (
          <Typography.Text
            style={{
              display: "block",
              textAlign: "center",
              color: "#666",
              fontSize: 12,
              fontStyle: "italic",
              marginTop: 12,
              lineHeight: 1.5,
            }}
          >
            {t("regenerateKeyWarning")}
          </Typography.Text>
        )}
      </div>
    </div>
  );
}