'use client'
import { Input, Typography } from "antd";
import { theme } from "@/styles/theme";
import { ttkEpayInterface } from "@/lib/features/ttk-epay/ttkEpayInterface";
import { useScopedI18n } from "../../../../../../../../../locales/client";

export default function TtkEpayParams({ data }: { data: ttkEpayInterface }) {
    const tSubscription = useScopedI18n('ttkEpay');

    return (
        <>
            <div >
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("client_site_name")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.client_site_name}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("client_site_address")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.client_site_address}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("client_site_email")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.client_site_email}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("client_site_logo_url")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.client_site_logo_url}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("client_site_phone_number")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.client_site_phone_number}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("client_site_privacy")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.client_site_privacy}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("client_site_terms")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.client_site_terms}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("client_site_url")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.client_site_url}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("mvc_satim_fail_url")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.mvc_satim_fail_url}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("mvc_satim_server_url")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.mvc_satim_server_url}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_base_url")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_base_url}
                />
            </div>

            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_confirm_url")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_confirm_url}
                />
            </div>

            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_currency")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_currency}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_client_server_url")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_client_server_url}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_description")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_description}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_client_server_url")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_client_server_url}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_fail_url")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_fail_url}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_json_params")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_json_params}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_language")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_language}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_password")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_password}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_server_url")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_server_url}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_terminal_id")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_terminal_id}
                />
            </div>
            <div style={{marginTop:10}}>
                <Typography style={{ fontWeight: 700, fontSize: 16, color: theme.token.orange600 }}>
                    {tSubscription("satim_user_name")}
                </Typography>
                <Input
                    disabled
                    style={{ width: "fit" }}
                    value={data.satim_user_name}
                />
            </div>


        </>
    )
}