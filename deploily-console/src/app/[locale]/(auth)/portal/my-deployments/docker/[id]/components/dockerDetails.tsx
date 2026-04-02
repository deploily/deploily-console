"use client";
import { useDockerById, useDockerDataUpdated } from "@/lib/features/docker/dockerSelector";
import { fetchDockerById } from "@/lib/features/docker/dockerThunks";
import { useAppDispatch } from "@/lib/hook";
import { notification, Result, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import DocumentationDrawer from "../../../../utils/documentationDrawer";
import MyDeploymentSettingContent from "../../../containers/myDeploymentSettingContent";
import { openNotification } from "../../../utils/notification";
import DockerParamsComponent from "./componentsDockerDetails/dockerParamsComponent";

export default function MyDockerDetails({ my_dep_id }: { my_dep_id: number }) {
  const t = useI18n();
  const toastTranslate = useScopedI18n("toast");

  const dispatch = useAppDispatch();
  const { dockerById, isLoading, loadingError } = useDockerById();
  const { dockerUpdated, loadingError: dockerDataLoadingError } = useDockerDataUpdated();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    dispatch(fetchDockerById(my_dep_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openDrawer, setOpenDrawer] = useState(false);
  const onClose = () => setOpenDrawer(false);


  useEffect(() => {
    if (dockerUpdated) {
      openNotification(api, true, toastTranslate);
    } else if (dockerDataLoadingError) {
      openNotification(api, false, toastTranslate);
    }

  }, [dockerUpdated, dockerDataLoadingError, api, toastTranslate]);
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}
    >
      {isLoading && dockerById === undefined && (
        <>
          <Skeleton.Image active style={{ marginBottom: 10 }} />
          <Skeleton active paragraph={{ rows: 2 }} />
        </>
      )}

      {!isLoading && dockerById !== undefined && (
        <>
          {contextHolder}
          <MyDeploymentSettingContent myDeployment={dockerById} isLoading={isLoading} paramsComponent={<DockerParamsComponent dockerById={dockerById} />} />

          <DocumentationDrawer
            openDrawer={openDrawer}
            onClose={onClose}
            currentSubscription={dockerById}
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
