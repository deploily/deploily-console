"use client";
import { webApplicationDepInterface } from "@/lib/features/webApplication/webApplicationInterface";
import { UpdateWebApplicationdata } from "@/lib/features/webApplication/webApplicationThunks";
import { useAppDispatch } from "@/lib/hook";
import { handleCopy } from "@/lib/utils/handleCopy";
import { DivCard } from "@/styles/components/divStyle";
import { theme } from "@/styles/theme";
import { Copy, Eye, EyeSlash, LinkSimple } from "@phosphor-icons/react";
import { Button, Input, Typography } from "antd";
import { useState } from "react";
import { useScopedI18n } from "../../../../../../../../../../locales/client";
import AccessUrlComponent from "../../../../containers/accessUrlComponent";
import planNames from "../../../../utils/planNames";
import PodsDetails from "../podDetails";

export default function WebApplicationParamsComponent({ webApplicationById }: { webApplicationById: webApplicationDepInterface }) {

  const tSubscription = useScopedI18n("subscription");
  

  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);


  const handleSavePodNames = (updatedPodNames: string[]) => {

    const podNameUpdates = updatedPodNames.reduce<Record<string, string>>((acc, name, index) => {
      acc[`pod_name_${index + 1}`] = name;

      return acc;
    }, {});

    dispatch(UpdateWebApplicationdata({ webApplicationById: webApplicationById?.id, webApplicationdataUpdated: podNameUpdates }));
  };

  return (
    <div
      style={{ paddingTop: 20 }}
    >
      <div>
        <AccessUrlComponent access_url={webApplicationById.access_url} />

        <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
          {("ArgoCD")}
        </Typography>
        <DivCard>

          <div>
            <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
              {tSubscription("argocdUrl")}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                paddingBottom: "15px",
              }}
            >
              <Input
                value={webApplicationById.argocd_url}
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
                style={{ boxShadow: "none", marginRight: "5px" }}
                icon={<LinkSimple size={20} />}
                onClick={() => window.open(webApplicationById.argocd_url, "_blank")}
              />
              <Button
                type="primary"
                style={{ boxShadow: "none" }}
                icon={<Copy />}
                onClick={() => handleCopy(webApplicationById.argocd_url)}
              />
            </div>
          </div>
          <div>
            <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
              {tSubscription("argocduserName")}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                paddingBottom: "15px",
              }}
            >
              <Input
                value={webApplicationById.argocd_user_name}
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
                onClick={() => handleCopy(webApplicationById.argocd_user_name)}
              />
            </div>
          </div>
          <div>
            <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
              {tSubscription("argocdPassword")}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                paddingBottom: "15px",
              }}
            >
              {/* <Input
                                       value={webApplicationById.argocd_password}
                                       readOnly
                                       style={{ cursor: "default", userSelect: "text", caretColor: "transparent", width: "fit", marginRight: "5px" }}
                                   /> */}
              <Input.Password
                value={webApplicationById.argocd_password}
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
                onClick={() => handleCopy(webApplicationById.argocd_password)}
              />
            </div>
          </div>
          <div>
            <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
              {tSubscription("argocdReadonlyUser")}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                paddingBottom: "15px",
              }}
            >
              <Input
                value={webApplicationById.argocd_readOnly_user}
                readOnly

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
                onClick={() => handleCopy(webApplicationById.argocd_readOnly_user)}
              />
            </div>
          </div>

          <div>
            <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
              {tSubscription("argocdReadonlyPassword")}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                paddingBottom: "15px",
              }}
            >
              <Input.Password
                value={webApplicationById.argocd_readOnly_password}
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
                onClick={() => handleCopy(webApplicationById.argocd_readOnly_password)}
              />
            </div>
          </div>

        </DivCard>
        <PodsDetails
          webApplicationById={webApplicationById}
          planNames={planNames}
          theme={theme}
          handleCopy={handleCopy}
          onSave={handleSavePodNames}
        />
        {/*  */}
        {/* <DivCard style={{ marginTop: 20 }}>
                   <Input
                     value={webApplicationById.access_url}
                     readOnly
                     style={{
                       cursor: "default",
                       userSelect: "text",
                       caretColor: "transparent",
                       width: "fit",
                       marginRight: "5px",
                     }}
                   />
                   <div>
                     <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                       {tSubscription("frontendUrl")}
                     </Typography>
                     <div
                       style={{
                         display: "flex",
                         justifyContent: "space-between",
                         width: "100%",
                         paddingBottom: "15px",
                       }}
                     >
                       <Input
                         value={webApplicationById.frontend_url}
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
                         onClick={() => handleCopy(webApplicationById.frontend_url)}
                       />
                     </div>
                   </div>
                   <ParametersSection webApplicationById={webApplicationById} />
                 </DivCard> */}
        {/* 
                 <div style={{ display: "flex", justifyContent: "end", gap: 10 }}>
                   <Button
                     type="primary"
                     style={{
                       backgroundColor: "#D85912",
                       border: "none",
                       boxShadow: "none",
                     }}
                     onClick={() => {}}
                   >
                     <span
                       style={{
                         color: "rgba(220, 233, 245, 0.88)",
                         fontSize: "16px",
                         fontWeight: 600,
                       }}
                     >
                       {t("save")}
                     </span>
                   </Button>
                 </div> */}


      </div>
    </div>
  );
}
