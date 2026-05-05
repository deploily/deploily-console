"use client";
import { useWebApplicationById, useWebApplicationDataUpdated } from "@/lib/features/webApplication/webApplicationSelector";
import { fetchWebApplicationById } from "@/lib/features/webApplication/webApplicationThunks";
import { useAppDispatch } from "@/lib/hook";
import { notification, Result, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import DocumentationDrawer from "../../../../utils/documentationDrawer";
import MyDeploymentSettingContent from "../../../containers/myDeploymentSettingContent";
import { openNotification } from "../../../utils/notification";
import WebApplicationParamsComponent from "./webApplicationDetailsComponents/webApplicationParamsComponent";

export default function MyWebApplicationDetails({ my_dep_id }: { my_dep_id: number }) {
  const t = useI18n();
  const toastTranslate = useScopedI18n("toast");

  const dispatch = useAppDispatch();
  const { webApplicationById, isLoading, loadingError } = useWebApplicationById();
  const { webApplicationUpdated, loadingError: webApplicationDataLoadingError } = useWebApplicationDataUpdated();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    dispatch(fetchWebApplicationById(my_dep_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openDrawer, setOpenDrawer] = useState(false);
  const onClose = () => setOpenDrawer(false);


  useEffect(() => {
    if (webApplicationUpdated) {
      openNotification(api, true, toastTranslate);
    } else if (webApplicationDataLoadingError) {
      openNotification(api, false, toastTranslate);
    }

  }, [webApplicationUpdated, webApplicationDataLoadingError, api, toastTranslate]);
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}
    >
      {isLoading && webApplicationById === undefined && (
        <>
          <Skeleton.Image active style={{ marginBottom: 10 }} />
          <Skeleton active paragraph={{ rows: 2 }} />
        </>
      )}

      {!isLoading && webApplicationById !== undefined && (
        <>
          {contextHolder}
          <MyDeploymentSettingContent myDeployment={webApplicationById} isLoading={isLoading} paramsComponent={<WebApplicationParamsComponent webApplicationById={webApplicationById} />} />

          <DocumentationDrawer
            openDrawer={openDrawer}
            onClose={onClose}
            currentSubscription={webApplicationById}
            t={t}
          />
        </>
      )}

      {!isLoading && loadingError && (
        <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
      )}
    </Space>
  );
}
