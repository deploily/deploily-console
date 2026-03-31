"use client";

import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Copy, Eye, EyeSlash, ArrowClockwise } from "@phosphor-icons/react";
import { Button, Input, Typography } from "antd";
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

  return (
    <div
      style={{
        background: "#111",
        padding: 20,
        borderRadius: 12,
        border: "1px solid #222",
      }}
    >
      <Typography.Title
        level={5}
        style={{ color: "#fff", marginBottom: 12 }}
      >
        {tApi("apiKey")}
      </Typography.Title>

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Input
          disabled
          value={apiKey}
          type={visible ? "text" : "password"}
          style={{
            flex: 1,
            background: "#000",
            color: "#fff",
            border: "1px solid #333",
          }}
        />

        {apiKey && (
          <>
            <Button
              icon={visible ? <EyeSlash /> : <Eye />}
              onClick={() => setVisible((p) => !p)}
            />
            <Button
              icon={<Copy />}
              onClick={() => handleCopy(apiKey)}
            />
          </>
        )}

        <Button
          type="primary"
          icon={<ArrowClockwise />}
          onClick={generateApiKey}
          style={{
            background: theme.token.orange600,
            border: "none",
          }}
        >
          {apiKey ? t("reGanerateKey") : t("ganerateKey")}
        </Button>
      </div>
    </div>
  );
}