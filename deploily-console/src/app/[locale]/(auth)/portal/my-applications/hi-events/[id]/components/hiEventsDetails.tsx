"use client";
import { useHiEventsAppById } from "@/lib/features/hi-events/hiEventsSelector";
import { fetchHiEventsAppById } from "@/lib/features/hi-events/hiEventsThunks";
import { useAppDispatch } from "@/lib/hook";
import { Result, Skeleton, Space } from "antd";
import { useEffect } from "react";
import { useI18n } from "../../../../../../../../../locales/client";
import AppServiceSubscriptionSettingContent from "../../../containers/AppServiceSubscriptionSettingContent";
import HiEventsParamsComponent from "./componentsHiEventsDetails/hiEventsParamsComponent";

export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
  const t = useI18n();


  const dispatch = useAppDispatch();
  const { hiEventsAppById, isLoading, loadingError } = useHiEventsAppById();
 
  useEffect(() => {
    dispatch(fetchHiEventsAppById(my_app_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}
    >
      {isLoading && hiEventsAppById === undefined && (
        <>
          <Skeleton.Image active style={{ marginBottom: 10 }} />
          <Skeleton active paragraph={{ rows: 2 }} />
        </>
      )}
      {!isLoading && hiEventsAppById !== undefined && (
        <>
          <AppServiceSubscriptionSettingContent appServiceSubscription={hiEventsAppById} isLoading={isLoading} paramsComponent={<HiEventsParamsComponent hiEventsAppById={hiEventsAppById}/>}/>
        </>
      )}
      {!isLoading && loadingError && (
        <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
      )}
    </Space>
  );
}
