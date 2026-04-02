"use client";
import { useSupabaseAppById } from "@/lib/features/supabase/supabaseSelector";
import { fetchSupabaseAppById } from "@/lib/features/supabase/supabaseThunks";
import { useAppDispatch } from "@/lib/hook";
import { Result, Skeleton, Space } from "antd";
import { useEffect } from "react";
import { useI18n } from "../../../../../../../../../locales/client";
import AppServiceSubscriptionSettingContent from "../../../containers/AppServiceSubscriptionSettingContent";
import SupabaseParamsComponent from "./componentsSupabaseDetails/supabaseParamsComponent";

export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
  const t = useI18n();

  const dispatch = useAppDispatch();
  const { supabaseAppById, isLoading, loadingError } = useSupabaseAppById();

  useEffect(() => {
    dispatch(fetchSupabaseAppById(my_app_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}
    >
      {isLoading && supabaseAppById === undefined && (
        <>
          <Skeleton.Image active style={{ marginBottom: 10 }} />
          <Skeleton active paragraph={{ rows: 2 }} />
        </>
      )}
      {!isLoading && supabaseAppById !== undefined && (
                 <AppServiceSubscriptionSettingContent appServiceSubscription={supabaseAppById} isLoading={isLoading} paramsComponent={<SupabaseParamsComponent supabaseAppById={supabaseAppById}/>}/>
      )}
      {!isLoading && loadingError && (
        <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
      )}
    </Space>
  );
}
