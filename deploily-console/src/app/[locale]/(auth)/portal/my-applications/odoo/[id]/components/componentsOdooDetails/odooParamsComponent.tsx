"use client";
import { handleCopy } from "@/lib/utils/handleCopy";
import { theme } from "@/styles/theme";
import {
    Copy,
    Eye,
    EyeSlash,
} from "@phosphor-icons/react";
import {
    Button,
    Input,
    Typography
} from "antd";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import { OdooAppInterface } from "@/lib/features/odoo/odooInterface";
import { useState } from "react";
import AccessUrlComponent from "../../../../containers/accessUrlComponent";

export default function OdooParamsComponent({ odooAppById }: { odooAppById: OdooAppInterface }) {
  const tOdoo = useScopedI18n("odooApp");
  const [visible, setVisible] = useState(false);

    return (
        <div
            style={{
                paddingTop: "20px"
            }}
        >
            <div>
                <AccessUrlComponent access_url={odooAppById.access_url}/>
            
                <Typography style={{ fontWeight: 700, fontSize: 20, color: theme.token.orange600 }}>
                    {tOdoo("password")}
                </Typography>

                <div
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        paddingBottom: "15px",
                    }}
                >
                    <Input.Password
                        value={odooAppById.odoo_password}
                        readOnly
                        visibilityToggle={{
                            visible,
                            onVisibleChange: setVisible,
                        }}
                        iconRender={(visible) => (visible ? <Eye /> : <EyeSlash />)}
                        style={{
                            cursor: "default",
                            userSelect: "text",
                            caretColor: "transparent",
                            marginRight: "5px",
                        }}
                    />
                    <Button
                        type="primary"
                        style={{ boxShadow: "none" }}
                        icon={<Copy />}
                        onClick={() => handleCopy(odooAppById.odoo_password)}
                    />
                </div>
            </div>
        </div>
    );
}