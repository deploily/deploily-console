"use client";
import { TtkEpayInterface } from "@/lib/features/ttk-epay/ttkEpayInterface";
import { Alert } from "antd";
import { useI18n } from "../../../../../../../../../locales/client";
import TtkEpayParams from "./ttkEpayParams";
import AccessUrlComponent from "../../../containers/accessUrlComponent";

export default function TtkepayParamsComponent({ ttkEpayById }: { ttkEpayById: TtkEpayInterface }) {
    const t = useI18n();

    return (
        <div
            style={{
                paddingTop: "20px"
            }}
        >
            <AccessUrlComponent access_url={ttkEpayById.access_url}/>

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
        </div>
    );
}