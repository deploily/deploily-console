"use client";
import { useOdooAppById } from "@/lib/features/odoo/odooSelector";
import { fetchOdooAppById } from "@/lib/features/odoo/odooThunks";
import { useAppDispatch } from "@/lib/hook";
import { Result, Skeleton, Space } from "antd";
import { useEffect } from "react";
import { useI18n } from "../../../../../../../../../locales/client";
import AppServiceSubscriptionSettingContent from "../../../containers/AppServiceSubscriptionSettingContent";
import OdooParamsComponent from "./componentsOdooDetails/odooParamsComponent";

export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
  const t = useI18n();


  const dispatch = useAppDispatch();
  const { odooAppById, isLoading, loadingError } = useOdooAppById();
  useEffect(() => {
    dispatch(fetchOdooAppById(my_app_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}
    >
      {isLoading && odooAppById === undefined && (
        <>
          <Skeleton.Image active style={{ marginBottom: 10 }} />
          <Skeleton active paragraph={{ rows: 2 }} />
        </>
      )}
      {!isLoading && odooAppById !== undefined && (
        <>
          <AppServiceSubscriptionSettingContent appServiceSubscription={odooAppById} isLoading={isLoading} paramsComponent={<OdooParamsComponent odooAppById={odooAppById}/>}/>
        </>
      )}
      {!isLoading && loadingError && (
        <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
      )}
    </Space>
  );
}
