"use client";
import { handleCopy } from "@/lib/utils/handleCopy";
import { theme } from "@/styles/theme";
import { Copy } from "@phosphor-icons/react";
import { Button, Input, Typography } from "antd";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import { SupabaseAppInterface } from "@/lib/features/supabase/supabaseInterface";
import AccessUrlComponent from "../../../../containers/accessUrlComponent";

export default function SupabaseParamsComponent({ supabaseAppById }: { supabaseAppById: SupabaseAppInterface }) {

  const tSupabase = useScopedI18n("supabase");
 
  return (
    <div
      style={{ paddingTop: 20 }}
    >
          <div>
                   <AccessUrlComponent access_url={supabaseAppById.access_url}/>
       
            <Typography style={{ fontWeight: 700, fontSize: 20, color: theme.token.orange600 }}>
              {tSupabase("supabase_anonKey")}
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
              <Input
                value={supabaseAppById.supabase_anonKey}
                readOnly
                style={{
                  cursor: "default",
                  userSelect: "text",
                  caretColor: "transparent",
                  width: "fit",
                  marginRight: "5px",
                }}
              />
              <Button
                type="primary"
                style={{ boxShadow: "none" }}
                icon={<Copy />}
                onClick={() => handleCopy(supabaseAppById.supabase_anonKey)}
              />
            </div>
          </div>
          
        </div>
  );
}
