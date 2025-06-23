'use client'
import { Button, Input, Typography } from "antd";
import { theme } from "@/styles/theme";
import { ttkEpayInterface } from "@/lib/features/ttk-epay/ttkEpayInterface";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import { useState } from "react";
import { Copy, Eye, EyeSlash } from "@phosphor-icons/react";
import { handleCopy } from "@/lib/utils/handleCopy";
import { DivCard } from "@/styles/components/divStyle";

export default function TtkEpayParams({ data }: { data: ttkEpayInterface }) {
    const tSubscription = useScopedI18n('ttkEpay');
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <>
            <DivCard style={{ backgroundColor: "#030304" }} >

                <DivCard>
                    <div >
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("secretKey")}
                        </Typography>
                        <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <Input
                                disabled={data.application_status == "processing"}
                                style={{ width: "fit", color: "white", marginRight: "5px" }}
                                value={data.api_secret_key}
                                type={passwordVisible ? "text" : "password"}
                            />

                            <Button type="primary" style={{ boxShadow: "none" }} icon={passwordVisible ? <EyeSlash /> : <Eye />} onClick={() => setPasswordVisible(prev => !prev)} />
                            <Button type="primary" style={{ boxShadow: "none", margin: '0px 5px' }} icon={<Copy />} onClick={() => handleCopy(data.api_secret_key ?? "")} />

                        </div>
                    </div>
                </DivCard>

                <DivCard>
                    <div >
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_name")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.client_site_name}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_address")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.client_site_address}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_email")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.client_site_email}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_logo_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.client_site_logo_url}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_phone_number")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.client_site_phone_number}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_privacy")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.client_site_privacy}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_terms")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.client_site_terms}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.client_site_url}
                        />
                    </div>

                </DivCard>

                <DivCard>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("mvc_satim_fail_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.mvc_satim_fail_url}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("mvc_satim_server_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.mvc_satim_server_url}
                        />
                    </div>
                </DivCard>

                <DivCard>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_base_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_base_url}
                        />
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_confirm_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_confirm_url}
                        />
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_currency")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_currency}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_client_server_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_client_server_url}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_description")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_description}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_client_server_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_client_server_url}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_fail_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_fail_url}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_json_params")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_json_params}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_language")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_language}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_password")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_password}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_server_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_server_url}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_terminal_id")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_terminal_id}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_user_name")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={data.satim_user_name}
                        />
                    </div>
                </DivCard>
                <div style={{ display: "flex", justifyContent: "end", gap: 10 }} >

                    <Button
                        type="primary"
                        style={{
                            backgroundColor: "#D85912",
                            border: "none",
                            boxShadow: "none"
                        }}
                        disabled={data.application_status == "processing"}
                    >
                        <span
                            style={{
                                color: "rgba(220, 233, 245, 0.88)",
                                fontSize: "16px",
                                fontWeight: 600,
                            }}
                        >
                            {tSubscription("save")}
                        </span>
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: "#D85912",
                            border: "none",
                            boxShadow: "none"
                        }}
                    >
                        <span
                            style={{
                                color: "rgba(220, 233, 245, 0.88)",
                                fontSize: "16px",
                                fontWeight: 600,
                            }}
                        >
                            {tSubscription("reset")}
                        </span>
                    </Button>
                </div>
            </DivCard>

        </>
    )
}