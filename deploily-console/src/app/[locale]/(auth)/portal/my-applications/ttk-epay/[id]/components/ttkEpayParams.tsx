'use client'
import { TtkEpayInterface } from "@/lib/features/ttk-epay/ttkEpayInterface";
import { handleCopy } from "@/lib/utils/handleCopy";
import { DivCard } from "@/styles/components/divStyle";
import { theme } from "@/styles/theme";
import { Copy, Eye, EyeSlash } from "@phosphor-icons/react";
import { Button, Input, Typography } from "antd";
import { useState } from "react";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { updateTtkEpay } from "@/lib/features/ttk-epay/ttkEpayThunks";

export default function TtkEpayParams({ data }: { data: TtkEpayInterface }) {
    const tSubscription = useScopedI18n('ttkEpay');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const dispatch = useAppDispatch();
    const [formValues, setFormValues] = useState({
        api_secret_key: data.api_secret_key,
        client_site_name: data.client_site_name,
        client_site_address: data.client_site_address,
        client_site_email: data.client_site_email,
        client_site_logo_url: data.client_site_logo_url,
        client_site_phone_number: data.client_site_phone_number,
        client_site_privacy: data.client_site_privacy,
        client_site_terms: data.client_site_terms,
        client_site_url: data.client_site_url,
        mvc_satim_fail_url: data.mvc_satim_fail_url,
        mvc_satim_server_url: data.mvc_satim_server_url,
        satim_base_url: data.satim_base_url,
        satim_confirm_url: data.satim_confirm_url,
        satim_currency: data.satim_currency,
        satim_client_server_url: data.satim_client_server_url,
        satim_description: data.satim_description,
        satim_fail_url: data.satim_fail_url,
        satim_json_params: data.satim_json_params,
        satim_language: data.satim_language,
        satim_password: data.satim_password,
        satim_server_url: data.satim_server_url,
        satim_terminal_id: data.satim_terminal_id,
        satim_user_name: data.satim_user_name,
    });
    
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
                                value={formValues.api_secret_key}
                                onChange={(e) => setFormValues({ ...formValues, api_secret_key: e.target.value })}
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
                            value={formValues.client_site_name}
                            onChange={(e) => setFormValues({ ...formValues, client_site_name: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_address")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.client_site_address}
                            onChange={(e) => setFormValues({ ...formValues, client_site_address: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_email")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.client_site_email}
                            onChange={(e) => setFormValues({ ...formValues, client_site_email: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_logo_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.client_site_logo_url}
                            onChange={(e) => setFormValues({ ...formValues, client_site_logo_url: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_phone_number")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.client_site_phone_number}
                            onChange={(e) => setFormValues({ ...formValues, client_site_phone_number: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_privacy")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.client_site_privacy}
                            onChange={(e) => setFormValues({ ...formValues, client_site_privacy: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_terms")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.client_site_terms}
                            onChange={(e) => setFormValues({ ...formValues, client_site_terms: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.client_site_url}
                            onChange={(e) => setFormValues({ ...formValues, client_site_url: e.target.value })}
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
                            value={formValues.mvc_satim_fail_url}
                            onChange={(e) => setFormValues({ ...formValues, mvc_satim_fail_url: e.target.value })}
                            
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("mvc_satim_server_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.mvc_satim_server_url}
                            onChange={(e) => setFormValues({ ...formValues, mvc_satim_server_url: e.target.value })}
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
                            value={formValues.satim_base_url}
                            onChange={(e) => setFormValues({ ...formValues, satim_base_url: e.target.value })}
                        />
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_confirm_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.satim_confirm_url}
                            onChange={(e) => setFormValues({ ...formValues, satim_confirm_url: e.target.value })}
                        />
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_currency")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.satim_currency}
                            onChange={(e) => setFormValues({ ...formValues, satim_currency: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_client_server_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.satim_client_server_url}
                            onChange={(e) => setFormValues({ ...formValues, satim_client_server_url: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_description")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.satim_description}
                            onChange={(e) => setFormValues({ ...formValues, satim_description: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_client_server_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.satim_client_server_url}
                            onChange={(e) => setFormValues({ ...formValues, satim_client_server_url: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_fail_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.satim_fail_url}
                            onChange={(e) => setFormValues({ ...formValues, satim_fail_url: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_json_params")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.satim_json_params}
                            onChange={(e) => setFormValues({ ...formValues, satim_json_params: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_language")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.satim_language}
                            onChange={(e) => setFormValues({ ...formValues, satim_language: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_password")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.satim_password}
                            onChange={(e) => setFormValues({ ...formValues, satim_password: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_server_url")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.satim_server_url}
                            onChange={(e) => setFormValues({ ...formValues, satim_server_url: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_terminal_id")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.satim_terminal_id}
                            onChange={(e) => setFormValues({ ...formValues, satim_terminal_id: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_user_name")}
                        </Typography>
                        <Input
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.satim_user_name}
                            onChange={(e) => setFormValues({ ...formValues, satim_user_name: e.target.value })}
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
                        onClick={() => dispatch(updateTtkEpay({ id: data.id, data: formValues  }))}
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