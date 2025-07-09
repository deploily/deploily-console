'use client'
import { TtkEpayInterface } from "@/lib/features/ttk-epay/ttkEpayInterface";
import { handleCopy } from "@/lib/utils/handleCopy";
import { DivCard } from "@/styles/components/divStyle";
import { theme } from "@/styles/theme";
import { Copy, Eye, EyeSlash } from "@phosphor-icons/react";
import { Button, Input, Select, Typography } from "antd";
import { useState } from "react";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { updateTtkEpay } from "@/lib/features/ttk-epay/ttkEpayThunks";

export default function TtkEpayParams({ data }: { data: TtkEpayInterface }) {
    const tSubscription = useScopedI18n('ttkEpay');
    const [secretKeyVisible, setSecretKeyVisible] = useState(false);
    const [satimPasswordVisible, setSatimPasswordVisible] = useState(false);
    const dispatch = useAppDispatch();
    const [formValues, setFormValues] = useState({
        ttk_epay_api_secret_key: data.ttk_epay_api_secret_key,
        ttk_epay_client_site_name: data.ttk_epay_client_site_name,
        ttk_epay_client_site_address: data.ttk_epay_client_site_address,
        ttk_epay_client_site_email: data.ttk_epay_client_site_email,
        ttk_epay_client_site_logo_url: data.ttk_epay_client_site_logo_url,
        ttk_epay_client_site_phone_number: data.ttk_epay_client_site_phone_number,
        ttk_epay_client_site_privacy: data.ttk_epay_client_site_privacy,
        ttk_epay_client_site_terms: data.ttk_epay_client_site_terms,
        ttk_epay_client_site_url: data.ttk_epay_client_site_url,
        ttk_epay_mvc_satim_fail_url: data.ttk_epay_mvc_satim_fail_url,
        ttk_epay_mvc_satim_server_url: data.ttk_epay_mvc_satim_server_url,
        ttk_epay_mvc_satim_confirm_url: data.ttk_epay_mvc_satim_confirm_url,
        ttk_epay_satim_base_url: data.ttk_epay_satim_base_url,
        ttk_epay_satim_confirm_url: data.ttk_epay_satim_confirm_url,
        ttk_epay_satim_currency: data.ttk_epay_satim_currency,
        ttk_epay_satim_client_server_url: data.ttk_epay_satim_client_server_url,
        ttk_epay_satim_description: data.ttk_epay_satim_description,
        ttk_epay_satim_fail_url: data.ttk_epay_satim_fail_url,
        ttk_epay_satim_json_params: data.ttk_epay_satim_json_params,
        ttk_epay_satim_language: data.ttk_epay_satim_language,
        ttk_epay_satim_password: data.ttk_epay_satim_password,
        ttk_epay_satim_server_url: data.ttk_epay_satim_server_url,
        ttk_epay_satim_terminal_id: data.ttk_epay_satim_terminal_id,
        ttk_epay_satim_user_name: data.ttk_epay_satim_user_name,
    });

    return (
        <>
            <DivCard style={{ backgroundColor: "#030304" }} >

                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.gray100, marginBottom: 5 }}>
                    * {tSubscription("displayInfoNote")}
                </Typography>

                <DivCard>
                    <div >
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("secretKey")}
                        </Typography>
                        <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <Input
                                placeholder="e.g. ttk_epay_51N*******dZqU"
                                disabled={data.application_status == "processing"}
                                style={{ width: "fit", color: "white", marginRight: "5px" }}
                                value={formValues.ttk_epay_api_secret_key}
                                onChange={(e) => setFormValues({ ...formValues, ttk_epay_api_secret_key: e.target.value })}
                                type={secretKeyVisible ? "text" : "password"}
                            />

                            <Button type="primary" style={{ boxShadow: "none" }} icon={secretKeyVisible ? <EyeSlash /> : <Eye />} onClick={() => setSecretKeyVisible(prev => !prev)} />
                            <Button type="primary" style={{ boxShadow: "none", margin: '0px 5px' }} icon={<Copy />} onClick={() => handleCopy(data.ttk_epay_api_secret_key ?? "")} />

                        </div>
                    </div>
                </DivCard>

                <DivCard>
                    <div >
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_name")}
                        </Typography>
                        <Input
                            placeholder="e.g. My Awesome Store"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_client_site_name}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_client_site_name: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_url")}
                        </Typography>
                        <Input
                            placeholder="e.g. https://www.example.com"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_client_site_url}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_client_site_url: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_logo_url")}
                        </Typography>
                        <Input
                            placeholder="e.g. https://www.example.com/logo.png"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_client_site_logo_url}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_client_site_logo_url: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_address")}
                        </Typography>
                        <Input
                            placeholder="e.g. 123 Main Street, City, Country"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_client_site_address}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_client_site_address: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_email")}
                        </Typography>
                        <Input
                            placeholder="e.g. contact@example.com"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_client_site_email}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_client_site_email: e.target.value })}
                        />
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_phone_number")}
                        </Typography>
                        <Input
                            placeholder="e.g. +213 555 123 456"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_client_site_phone_number}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_client_site_phone_number: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_privacy")}
                        </Typography>
                        <Input
                            placeholder="e.g. https://www.example.com/privacy-policy"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_client_site_privacy}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_client_site_privacy: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_terms")}
                        </Typography>
                        <Input
                            placeholder="e.g. https://www.example.com/terms-of-service"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_client_site_terms}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_client_site_terms: e.target.value })}
                        />
                    </div>


                </DivCard>

                <DivCard>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("mvc_satim_confirm_url")}
                        </Typography>
                        <Input
                            placeholder="e.g. https://yourdomain.com/ttk-epay/satim/confirm"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_mvc_satim_confirm_url}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_mvc_satim_confirm_url: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("mvc_satim_fail_url")}
                        </Typography>
                        <Input
                            placeholder="e.g. https://yourdomain.com/ttk-epay/satim/fail"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_mvc_satim_fail_url}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_mvc_satim_fail_url: e.target.value })}

                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("mvc_satim_server_url")}
                        </Typography>
                        <Input
                            placeholder="e.g. https://yourdomain.com/ttk-epay/satim/server"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_mvc_satim_server_url}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_mvc_satim_server_url: e.target.value })}
                        />
                    </div>

                </DivCard>

                <DivCard>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_user_name")}
                        </Typography>
                        <Input
                            placeholder="e.g. merchant_user"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_satim_user_name}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_satim_user_name: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_password")}
                        </Typography>
                        <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <Input
                                placeholder={tSubscription("placeholderSatimPassword")}
                                disabled={data.application_status == "processing"}
                                style={{ width: "fit", color: "white", marginRight: "5px" }}
                                value={formValues.ttk_epay_satim_password}
                                onChange={(e) => setFormValues({ ...formValues, ttk_epay_satim_password: e.target.value })}
                                type={satimPasswordVisible ? "text" : "password"}
                            />

                            <Button type="primary" style={{ boxShadow: "none" }} icon={satimPasswordVisible ? <EyeSlash /> : <Eye />} onClick={() => setSatimPasswordVisible(prev => !prev)} />
                        </div>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_currency")}
                        </Typography>
                        <Input
                            disabled
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_satim_currency}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_satim_currency: e.target.value })}
                        />
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_base_url")}
                        </Typography>
                        <Input
                            placeholder="e.g. https://satim.dz/api"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_satim_base_url}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_satim_base_url: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_fail_url")}
                        </Typography>
                        <Input
                            placeholder="e.g. https://yourdomain.com/ttk-epay/satim/fail"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_satim_fail_url}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_satim_fail_url: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_confirm_url")}
                        </Typography>
                        <Input
                            placeholder="e.g. https://yourdomain.com/ttk-epay/satim/confirm"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_satim_confirm_url}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_satim_confirm_url: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_server_url")}
                        </Typography>

                        <Select
                            defaultValue={formValues.ttk_epay_satim_server_url}
                            disabled={data.application_status == "processing"}
                            options={[
                                { value: 'https://cib.satim.dz', label: 'PRODUCTION (https://cib.satim.dz)' },
                                { value: 'https://test.satim.dz', label: 'TESTING (https://test.satim.dz)' },
                                { value: 'https://satimapi.apps.depoily.cloud', label: 'EMULATOR (https://satimapi.apps.depoily.cloud)' },
                            ]}
                            onChange={(value) => setFormValues({ ...formValues, ttk_epay_satim_server_url: value })}
                            style={{ width: "100%", color: "white" }}
                            allowClear
                            placeholder="e.g. EMULATOR"
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_client_server_url")}
                        </Typography>
                        <Input
                            placeholder="e.g. https://yourdomain.com/ttk-epay/satim/server"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_satim_client_server_url}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_satim_client_server_url: e.target.value })}
                        />
                    </div>

                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_description")}
                        </Typography>
                        <Input
                            placeholder="e.g. Online payment for order #123"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_satim_description}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_satim_description: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_language")}
                        </Typography>
                        {data.application_status == "processing" ? (
                            <Input
                                disabled
                                style={{ width: "fit", color: "white" }}
                                value={formValues.ttk_epay_satim_language}
                            />
                        ) :
                            <Select
                                defaultValue={formValues.ttk_epay_satim_language}
                                disabled={data.application_status == "processing"}
                                options={[
                                    { value: 'EN', label: 'EN' },
                                    { value: 'FR', label: 'FR' },
                                    { value: 'AR', label: 'AR' },
                                ]}
                                onChange={(value) => setFormValues({ ...formValues, ttk_epay_satim_language: value })}
                                style={{ width: "100%", color: "white" }}
                                allowClear
                                placeholder="e.g. EN"
                            />
                        }
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_terminal_id")}
                        </Typography>
                        <Input
                            placeholder="e.g. 12345678"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_satim_terminal_id}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_satim_terminal_id: e.target.value })}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_json_params")}
                        </Typography>
                        <Input
                            disabled
                            style={{ width: "fit", color: "white" }}
                            value={`{"force_terminal_id":"${formValues.ttk_epay_satim_terminal_id}","udf1":"2018105301346","udf5":"ggsf85s42524s5uhgsf"}`}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_satim_json_params: e.target.value })}
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
                        onClick={() => dispatch(updateTtkEpay({ id: data.id, data: formValues }))}
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
                    {data.required_restart &&
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: "#D85912",
                                border: "none",
                                boxShadow: "none"
                            }}
                            onClick={() => dispatch(updateTtkEpay({ id: data.id, data: { application_status: "processing" } }))}
                        >
                            <span
                                style={{
                                    color: "rgba(220, 233, 245, 0.88)",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                }}
                            >
                                {tSubscription("restart")}
                            </span>
                        </Button>
                    }
                </div>
            </DivCard>

        </>
    )
}