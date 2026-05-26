"use client";
import { webApplicationDepInterface } from "@/lib/features/webApplication/webApplicationInterface";
import { UpdateWebApplicationdata } from "@/lib/features/webApplication/webApplicationThunks";
import { useAppDispatch } from "@/lib/hook";
import { handleCopy } from "@/lib/utils/handleCopy";
import { theme } from "@/styles/theme";
import { Copy, Eye, EyeSlash, LinkSimple } from "@phosphor-icons/react";
import { Button, Input } from "antd";
import { useState } from "react";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import AccessUrlComponent from "../../../../containers/accessUrlComponent";
import planNames from "../../../../utils/planNames";
import PodsDetails from "../podDetails";

// ─── inline styles ────────────────────────────────────────────────────────────

const styles = {
  wrapper: {
    paddingTop: 20,
    fontFamily: "'Inter', sans-serif",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: theme.token.orange600,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: "#71717a",
    marginBottom: 28,
  },
  card: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 12,
    padding: "28px 32px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
  },
  sectionDivider: {
    borderTop: "1px solid #27272a",
    margin: "8px 0 20px",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#52525b",
    textTransform: "uppercase" as const,
    letterSpacing: "0.2em",
    marginBottom: 20,
  },
  // 2-column grid via a simple flex row
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },
  fieldWrapper: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: theme.token.orange600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.07em",
  },
  labelSmall: {
    fontSize: 13,
    fontWeight: 600,
    color: theme.token.orange600,
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  input: {
    flex: 1,
    backgroundColor: "#121212",
    borderColor: "#2a2a2a",
    color: "#e4e4e7",
    cursor: "default",
    userSelect: "text" as const,
    caretColor: "transparent",
    borderRadius: 8,
  },
  btnLink: {
    flexShrink: 0,
    backgroundColor: "rgba(249,115,22,0.1)",
    border: "1px solid rgba(249,115,22,0.2)",
    color: theme.token.orange600,
    boxShadow: "none",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnCopy: {
    flexShrink: 0,
    backgroundColor: "#27272a",
    border: "1px solid #3f3f46",
    color: "#a1a1aa",
    boxShadow: "none",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

// ─── sub-component: a single read-only field row ─────────────────────────────

interface FieldRowProps {
  label: string;
  value: string;
  isPassword?: boolean;
  showLink?: boolean;
  passwordVisible?: boolean;
  onVisibleChange?: (v: boolean) => void;
  labelStyle?: React.CSSProperties;
}

function FieldRow({
  label,
  value,
  isPassword = false,
  showLink = false,
  passwordVisible,
  onVisibleChange,
  labelStyle,
}: FieldRowProps) {
  return (
    <div style={styles.fieldWrapper}>
      <span style={{ ...styles.labelSmall, ...labelStyle }}>{label}</span>
      <div style={styles.inputRow}>
        {isPassword ? (
          <Input.Password
            value={value}
            readOnly
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange,
            }}
            iconRender={(vis) => (vis ? <Eye size={16} /> : <EyeSlash size={16} />)}
            style={styles.input}
          />
        ) : (
          <Input value={value} readOnly style={styles.input} />
        )}

        {showLink && (
          <Button
            style={styles.btnLink}
            icon={<LinkSimple size={16} />}
            onClick={() => window.open(value, "_blank")}
          />
        )}

        <Button
          style={styles.btnCopy}
          icon={<Copy size={16} />}
          onClick={() => handleCopy(value)}
        />
      </div>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function WebApplicationParamsComponent({
  webApplicationById,
}: {
  webApplicationById: webApplicationDepInterface;
}) {
  const tSubscription = useScopedI18n("subscription");
  const dispatch = useAppDispatch();

  // separate visibility state per password field
  const [adminPassVisible, setAdminPassVisible] = useState(false);
  const [readonlyPassVisible, setReadonlyPassVisible] = useState(false);

  const handleSavePodNames = (updatedPodNames: string[]) => {
    const podNameUpdates = updatedPodNames.reduce<Record<string, string>>(
      (acc, name, index) => {
        acc[`pod_name_${index + 1}`] = name;
        return acc;
      },
      {}
    );

    dispatch(
      UpdateWebApplicationdata({
        webApplicationById: webApplicationById?.id,
        webApplicationdataUpdated: podNameUpdates,
      })
    );
  };

  return (
    <div style={styles.wrapper}>
      {/* Access URL sits above the card (unchanged component) */}
      <AccessUrlComponent access_url={webApplicationById.access_url} />

      {/* Page heading */}
      <h2 style={styles.pageTitle}>ArgoCD</h2>
      <p style={styles.pageSubtitle}>
        {tSubscription("argocdDescription")}
      </p>

      {/* ── Main card ── */}
      <div style={styles.card}>

        {/* ArgoCD URL – full width */}
        <FieldRow
          label={tSubscription("argocdUrl")}
          value={webApplicationById.argocd_url}
          showLink
          labelStyle={styles.label}
        />

        {/* ── Administrator credentials ── */}
        <div style={styles.sectionDivider} />
        <p style={styles.sectionTitle}>{tSubscription("argocdAdminSection")}</p>

        <div style={styles.grid}>
          <FieldRow
            label={tSubscription("argocduserName")}
            value={webApplicationById.argocd_user_name}
          />
          <FieldRow
            label={tSubscription("argocdPassword")}
            value={webApplicationById.argocd_password}
            isPassword
            passwordVisible={adminPassVisible}
            onVisibleChange={setAdminPassVisible}
          />
        </div>

        {/* ── Read-only credentials ── */}
        <div style={styles.sectionDivider} />
        <p style={styles.sectionTitle}>{tSubscription("argocdReadonlySection")}</p>

        <div style={styles.grid}>
          <FieldRow
            label={tSubscription("argocdReadonlyUser")}
            value={webApplicationById.argocd_readOnly_user}
          />
          <FieldRow
            label={tSubscription("argocdReadonlyPassword")}
            value={webApplicationById.argocd_readOnly_password}
            isPassword
            passwordVisible={readonlyPassVisible}
            onVisibleChange={setReadonlyPassVisible}
          />
        </div>
      </div>

      {/* Pods section (unchanged) */}
      <PodsDetails
        webApplicationById={webApplicationById}
        planNames={planNames}
        theme={theme}
        handleCopy={handleCopy}
        onSave={handleSavePodNames}
      />
    </div>
  );
}