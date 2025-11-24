"use client";
import { TtkEpayInterface } from "@/lib/features/ttk-epay/ttkEpayInterface";
import { updateTtkEpay } from "@/lib/features/ttk-epay/ttkEpayThunks";
import { useAppDispatch } from "@/lib/hook";
import { handleCopy } from "@/lib/utils/handleCopy";
import { DivCard } from "@/styles/components/divStyle";
import { theme } from "@/styles/theme";
import { FormControlLabel, Radio, RadioGroup, Tooltip } from "@mui/material";
import { Copy, Eye, EyeSlash } from "@phosphor-icons/react";
import { Button, Input, Select, Typography } from "antd";
import { useState } from "react";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import { generateKey } from "../../utils/generateKey";

export default function TtkEpayParams({ data }: { data: TtkEpayInterface }) {
    const tSubscription = useScopedI18n("ttkEpay");
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
        ttk_epay_address: data.address,
        ttk_epay_RC: data.RC,
        ttk_epay_AI: data.AI,
        ttk_epay_NIF: data.NIF,
        ttk_epay_NIS: data.NIS,
    });

    return (
        <>
            <DivCard style={{ backgroundColor: "#030304" }}>
                <Typography
                    style={{ fontWeight: 700, fontSize: 16, color: theme.token.gray100, marginBottom: 5 }}
                >
                    * {tSubscription("displayInfoNote")}
                </Typography>

                <DivCard>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                                {tSubscription("secretKey")}
                            </Typography>
                            <Tooltip title={tSubscription("secretKeyTooltip")} placement="right">
                                <Typography
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 16,
                                        color: theme.token.orange600,
                                        cursor: "pointer",
                                    }}
                                >
                                    ?
                                </Typography>
                            </Tooltip>
                        </div>

                        <div
                            style={{
                                flexDirection: "row",
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Input
                                placeholder="e.g. ttk_epay_51N*******dZqU"
                                disabled={data.application_status === "processing"}
                                style={{ width: "fit", color: "white", marginRight: "5px" }}
                                value={formValues.ttk_epay_api_secret_key}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, ttk_epay_api_secret_key: e.target.value })
                                }
                                type={secretKeyVisible ? "text" : "password"}
                            />
                            <Button
                                type="primary"
                                style={{ boxShadow: "none", marginRight: "5px" }}
                                onClick={() =>
                                    setFormValues({ ...formValues, ttk_epay_api_secret_key: generateKey() })
                                }
                            >
                                {tSubscription("generateKey")}
                            </Button>
                            <Button
                                type="primary"
                                style={{ boxShadow: "none" }}
                                icon={secretKeyVisible ? <EyeSlash /> : <Eye />}
                                onClick={() => setSecretKeyVisible((prev) => !prev)}
                            />
                            <Button
                                type="primary"
                                style={{ boxShadow: "none", margin: "0px 5px" }}
                                icon={<Copy />}
                                onClick={() => handleCopy(data.ttk_epay_api_secret_key ?? "")}
                            />
                        </div>
                    </div>
                </DivCard>

                <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                    {tSubscription("Brand")}
                </Typography>
                <DivCard>
                    <div>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("client_site_name")}
                        </Typography>
                        <Input
                            placeholder="e.g. My Awesome Store"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_client_site_name}
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_client_site_name: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_client_site_url: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_client_site_logo_url: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_client_site_address: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_client_site_email: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_client_site_phone_number: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_client_site_privacy: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_client_site_terms: e.target.value })
                            }
                        />
                    </div>
                </DivCard>

                <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                    {tSubscription("adminContact")}
                </Typography>
                <DivCard>
                    <div style={{ marginBottom: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("address")}
                        </Typography>
                        <Input
                            placeholder="123 Main Street, City, Country"
                            disabled={data.application_status === "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_address}
                            onChange={(e) => setFormValues({ ...formValues, ttk_epay_address: e.target.value })}
                        />
                    </div>
                    <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
                        <div style={{ flex: 1 }}>
                            <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                                RC
                            </Typography>
                            <Input
                                placeholder="12A3456789-01/23"
                                disabled={data.application_status === "processing"}
                                style={{ width: "100%", color: "white" }}
                                value={formValues.ttk_epay_RC}
                                onChange={(e) => setFormValues({ ...formValues, ttk_epay_RC: e.target.value })}
                            />
                        </div>

                        <div style={{ flex: 1 }}>
                            <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                                AI
                            </Typography>
                            <Input
                                placeholder="20015678901"
                                disabled={data.application_status === "processing"}
                                style={{ width: "100%", color: "white" }}
                                value={formValues.ttk_epay_AI}
                                onChange={(e) => setFormValues({ ...formValues, ttk_epay_AI: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 20 }}>
                        <div style={{ flex: 1 }}>
                            <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                                NIF
                            </Typography>
                            <Input
                                placeholder="1234567890"
                                disabled={data.application_status === "processing"}
                                style={{ width: "100%", color: "white" }}
                                value={formValues.ttk_epay_NIF}
                                onChange={(e) => setFormValues({ ...formValues, ttk_epay_NIF: e.target.value })}
                            />
                        </div>

                        <div style={{ flex: 1 }}>
                            <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                                NIS
                            </Typography>
                            <Input
                                placeholder="9876543210"
                                disabled={data.application_status === "processing"}
                                style={{ width: "100%", color: "white" }}
                                value={formValues.ttk_epay_NIS}
                                onChange={(e) => setFormValues({ ...formValues, ttk_epay_NIS: e.target.value })}
                            />
                        </div>
                    </div>
                </DivCard>

                <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                    {tSubscription("satim_server_url")}
                </Typography>
                <DivCard style={{ marginTop: 20 }}>
                    <RadioGroup
                        row
                        name="satim-url-selection-group"
                        sx={{ gap: 2 }}
                        value={formValues.ttk_epay_satim_server_url}
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                ttk_epay_satim_server_url: e.target.value,
                            })
                        }
                    >
                        <FormControlLabel
                            value="https://cib.satim.dz"
                            control={
                                <Radio
                                    disabled={data.application_status == "processing"}
                                    sx={{
                                        "&.Mui-disabled .MuiSvgIcon-root": {
                                            color: "#818080 !important",
                                            fontSize: 20,
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "#ffffff",
                                            fontSize: 20,
                                        },
                                    }}
                                />
                            }
                            label={
                                <Typography
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        color:
                                            data.application_status === "processing" ? "#818080" : theme.token.colorWhite,
                                    }}
                                >
                                    PRODUCTION (https://cib.satim.dz)
                                </Typography>
                            }
                            sx={{
                                "& .MuiFormControlLabel-label.Mui-disabled": {
                                    color: "#818080 !important",
                                },
                                "& .MuiFormControlLabel-label": {
                                    color: "#ffffff",
                                },
                            }}
                        />

                        <FormControlLabel
                            value="https://test.satim.dz"
                            control={
                                <Radio
                                    disabled={data.application_status == "processing"}
                                    sx={{
                                        "&.Mui-disabled .MuiSvgIcon-root": {
                                            color: "#818080 !important",
                                            fontSize: 20,
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "#ffffff",
                                            fontSize: 20,
                                        },
                                    }}
                                />
                            }
                            label={
                                <Typography
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        color:
                                            data.application_status === "processing" ? "#818080" : theme.token.colorWhite,
                                    }}
                                >
                                    TESTING (https://test.satim.dz)
                                </Typography>
                            }
                        />

                        <FormControlLabel
                            value="https://satimapi.apps.deploily.cloud"
                            control={
                                <Radio
                                    disabled={data.application_status == "processing"}
                                    sx={{
                                        "&.Mui-disabled .MuiSvgIcon-root": {
                                            color: "#818080 !important",
                                            fontSize: 20,
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "#ffffff",
                                            fontSize: 20,
                                        },
                                    }}
                                />
                            }
                            label={
                                <Typography
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        color:
                                            data.application_status === "processing" ? "#818080" : theme.token.colorWhite,
                                    }}
                                >
                                    EMULATOR (https://satimapi.apps.deploily.cloud)
                                </Typography>
                            }
                        />
                    </RadioGroup>
                </DivCard>

                <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                    {tSubscription("satimSetup")}
                </Typography>

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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_satim_user_name: e.target.value })
                            }
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_password")}
                        </Typography>
                        <div
                            style={{
                                flexDirection: "row",
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Input
                                placeholder={tSubscription("placeholderSatimPassword")}
                                disabled={data.application_status == "processing"}
                                style={{ width: "fit", color: "white", marginRight: "5px" }}
                                value={formValues.ttk_epay_satim_password}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, ttk_epay_satim_password: e.target.value })
                                }
                                type={satimPasswordVisible ? "text" : "password"}
                            />

                            <Button
                                type="primary"
                                style={{ boxShadow: "none" }}
                                icon={satimPasswordVisible ? <EyeSlash /> : <Eye />}
                                onClick={() => setSatimPasswordVisible((prev) => !prev)}
                            />
                        </div>
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_satim_terminal_id: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_satim_json_params: e.target.value })
                            }
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_currency")}
                        </Typography>
                        <Input
                            disabled
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_satim_currency}
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_satim_currency: e.target.value })
                            }
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
                        ) : (
                            <Select
                                defaultValue={formValues.ttk_epay_satim_language}
                                disabled={data.application_status == "processing"}
                                options={[
                                    { value: "EN", label: "EN" },
                                    { value: "FR", label: "FR" },
                                    { value: "AR", label: "AR" },
                                ]}
                                onChange={(value) => setFormValues({ ...formValues, ttk_epay_satim_language: value })}
                                style={{ width: "100%", color: "white" }}
                                allowClear
                                placeholder="e.g. EN"
                            />
                        )}
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_satim_description: e.target.value })
                            }
                        />
                    </div>
                </DivCard>
                <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                    {tSubscription("satimApiUrl")}
                </Typography>
                <DivCard>
                    <div style={{ marginTop: 10 }}>
                        <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                            {tSubscription("satim_base_url")}
                        </Typography>
                        <Input
                            placeholder="e.g. https://satim.dz/api"
                            disabled={data.application_status == "processing"}
                            style={{ width: "fit", color: "white" }}
                            value={formValues.ttk_epay_satim_base_url}
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_satim_base_url: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_satim_fail_url: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_satim_confirm_url: e.target.value })
                            }
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
                            onChange={(e) =>
                                setFormValues({ ...formValues, ttk_epay_satim_client_server_url: e.target.value })
                            }
                        />
                    </div>
                </DivCard>
                {/* <DivCard>

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

                </DivCard> */}
                <div style={{ display: "flex", justifyContent: "end", gap: 10 }}>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: "#D85912",
                            border: "none",
                            boxShadow: "none",
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
                    {data.required_restart && (
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: "#D85912",
                                border: "none",
                                boxShadow: "none",
                            }}
                            onClick={() =>
                                dispatch(updateTtkEpay({ id: data.id, data: { application_status: "processing" } }))
                            }
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
                    )}
                </div>
            </DivCard>
        </>
    );
}
