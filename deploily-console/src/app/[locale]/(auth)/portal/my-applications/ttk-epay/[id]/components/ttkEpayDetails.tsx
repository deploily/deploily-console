"use client";
import { useTtkEpayById, useTtkEpayUpdate } from "@/lib/features/ttk-epay/ttkEpaySelector";
import { fetchTtkEpayById } from "@/lib/features/ttk-epay/ttkEpayThunks";
import { useAppDispatch } from "@/lib/hook";
import { handleCopy } from "@/lib/utils/handleCopy";
import {
  Copy,
  LinkSimple
} from "@phosphor-icons/react";
import {
  Alert,
  Button,
  Result,
  Skeleton,
  Space,
  Typography
} from "antd";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import DocumentationDrawer from "../../../../utils/documentationDrawer";
import AppServiceSubscriptionSettingContent from "../../../containers/AppServiceSubscriptionSettingContent";
import TtkEpayParams from "./ttkEpayParams";

export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
  const t = useI18n();
  const tSubscription = useScopedI18n("subscription");

  const dispatch = useAppDispatch();
  const { ttkEpayById, isLoading, loadingError } = useTtkEpayById();
  const { updateTtkEpay } = useTtkEpayUpdate();
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    dispatch(fetchTtkEpayById(my_app_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTtkEpay]);


  const onClose = () => setOpenDrawer(false);

  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "40px 24px",
        minHeight: "100vh",
      }}
    >
      {isLoading && ttkEpayById === undefined && (
        <>
          <Skeleton.Image active style={{ width: 300, height: 300 }} />
          <Skeleton active paragraph={{ rows: 6 }} style={{ marginTop: 24 }} />
        </>
      )}

      {!isLoading && ttkEpayById !== undefined && (
        <Space direction="vertical" size={32} style={{ width: "100%" }}>

          <AppServiceSubscriptionSettingContent appServiceSubscription={ttkEpayById} isLoading={isLoading} />

          {/* ── ACCESS URL CARD ───────────────────────────────────── */}
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
                {tSubscription("accessUrl")}
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
                  gap: 10,
                }}
              >
                <span
                  style={{
                    flex: 1,
                    color: "#e0e0e0",
                    fontSize: 13,
                    fontFamily: "monospace",
                    wordBreak: "break-all",
                  }}
                >
                  {ttkEpayById.access_url}
                </span>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <Button
                    type="text"
                    size="small"
                    icon={<LinkSimple size={16} color="#888" />}
                    onClick={() => window.open(ttkEpayById.access_url, "_blank")}
                    style={{ padding: "0 6px", height: 28 }}
                  />
                  <Button
                    type="text"
                    size="small"
                    icon={<Copy size={16} color="#888" />}
                    onClick={() => handleCopy(ttkEpayById.access_url)}
                    style={{ padding: "0 6px", height: 28 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── ERROR ALERT ───────────────────────────────────────── */}
          {ttkEpayById.application_status === "error" && (
            <Alert
              message={<span style={{ color: "black" }}>{t("error")}</span>}
              description={
                <span style={{ color: "black" }}>{ttkEpayById.deployment_error}</span>
              }
              type="error"
              showIcon
            />
          )}

          {/* ── TTK EPAY PARAMS ───────────────────────────────────── */}
          <TtkEpayParams data={ttkEpayById} />

          <DocumentationDrawer
            openDrawer={openDrawer}
            onClose={onClose}
            currentSubscription={ttkEpayById}
            t={t}
          />
        </Space>
      )}

      {!isLoading && loadingError && (
        <Result
          status="500"
          title={t("errorMessage")}
          subTitle={t("subTitleErrorMessage")}
        />
      )}
    </div>
  );
}