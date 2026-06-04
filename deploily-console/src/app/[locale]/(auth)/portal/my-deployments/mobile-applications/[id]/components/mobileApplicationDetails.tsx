"use client";
import { useMobileApplicationById, useMobileApplicationDataUpdated } from "@/lib/features/mobileApplication/mobileApplicationSelector";
import { fetchMobileApplicationById } from "@/lib/features/mobileApplication/mobileApplicationThunks";
import { useAppDispatch } from "@/lib/hook";
import { notification, Result, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import DocumentationDrawer from "../../../../utils/documentationDrawer";
import MyDeploymentSettingContent from "../../../containers/myDeploymentSettingContent";
import { openNotification } from "../../../utils/notification";
import MobileApplicationParamsComponent from "./mobileApplicationDetailsComponents/mobileApplicationParamsComponent";

export default function MyMobileApplicationDetails({ my_dep_id }: { my_dep_id: number }) {
  const t = useI18n();
  const toastTranslate = useScopedI18n("toast");

  const dispatch = useAppDispatch();
  const { mobileApplicationById, isLoading, loadingError } = useMobileApplicationById();
  const { mobileApplicationUpdated, loadingError: mobileApplicationDataLoadingError } = useMobileApplicationDataUpdated();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    dispatch(fetchMobileApplicationById(my_dep_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openDrawer, setOpenDrawer] = useState(false);
  const onClose = () => setOpenDrawer(false);


  useEffect(() => {
    if (mobileApplicationUpdated) {
      openNotification(api, true, toastTranslate);
    } else if (mobileApplicationDataLoadingError) {
      openNotification(api, false, toastTranslate);
    }

  }, [mobileApplicationUpdated, mobileApplicationDataLoadingError, api, toastTranslate]);
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}
    >
      {isLoading && mobileApplicationById === undefined && (
        <>
          <Skeleton.Image active style={{ marginBottom: 10 }} />
          <Skeleton active paragraph={{ rows: 2 }} />
        </>
      )}

      {!isLoading && mobileApplicationById !== undefined && (
        <>
          {contextHolder}
          <MyDeploymentSettingContent myDeployment={mobileApplicationById} isLoading={isLoading} paramsComponent={<MobileApplicationParamsComponent mobileApplicationById={mobileApplicationById} />} />

          <DocumentationDrawer
            openDrawer={openDrawer}
            onClose={onClose}
            currentSubscription={mobileApplicationById}
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
