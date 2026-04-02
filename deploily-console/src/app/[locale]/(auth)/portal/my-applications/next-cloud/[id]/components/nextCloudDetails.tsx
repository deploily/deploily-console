"use client";

import {useNextCloudAppById} from "@/lib/features/next-cloud/nextCloudSelector";
import {fetchNextCloudAppById} from "@/lib/features/next-cloud/nextCloudThunks";
import {useAppDispatch} from "@/lib/hook";
import {Result, Skeleton, Space} from "antd";
import {useEffect} from "react";
import {useI18n} from "../../../../../../../../../locales/client";
import AppServiceSubscriptionSettingContent from "../../../containers/AppServiceSubscriptionSettingContent";
import NextCloudParamsComponent from "./componentsNextCloudDetails/nextCloudParamsComponent";

export default function MyAppDetails({my_app_id}: {my_app_id: string}) {
  const t = useI18n();
  const dispatch = useAppDispatch();
  const {nextCloudAppById, isLoading, loadingError} = useNextCloudAppById();
  useEffect(() => {
    dispatch(fetchNextCloudAppById(my_app_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Space
        direction="vertical"
        size="large"
        style={{
          paddingInline: 40,
          marginBlock: 10,
          width: "100%",
          marginBottom: 50,
          paddingTop: 20,
        }}
      >
        {isLoading && nextCloudAppById === undefined && (
          <>
            <Skeleton.Image active style={{marginBottom: 10}} />
            <Skeleton active paragraph={{rows: 2}} />
          </>
        )}
        {!isLoading && nextCloudAppById !== undefined && (
          <>
            <AppServiceSubscriptionSettingContent appServiceSubscription={nextCloudAppById} isLoading={isLoading} paramsComponent={<NextCloudParamsComponent nextCloudAppById={nextCloudAppById}/>}/>
          </>
        )}
        {!isLoading && loadingError && (
          <Result status="500" title={t("error")} subTitle={t("subTitleError")} />
        )}
      </Space>
    </>
  );
}
