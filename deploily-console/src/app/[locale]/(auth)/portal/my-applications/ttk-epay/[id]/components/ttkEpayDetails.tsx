"use client";
import { useTtkEpayById, useTtkEpayUpdate } from "@/lib/features/ttk-epay/ttkEpaySelector";
import { fetchTtkEpayById } from "@/lib/features/ttk-epay/ttkEpayThunks";
import { useAppDispatch } from "@/lib/hook";
import {
  Result,
  Skeleton,
  Space} from "antd";
import { useEffect } from "react";
import { useI18n } from "../../../../../../../../../locales/client";
import AppServiceSubscriptionSettingContent from "../../../containers/AppServiceSubscriptionSettingContent";
import TtkepayParamsComponent from "./ttkepayParamsComponent";

export default function TtkEpayDetails({ my_app_id }: { my_app_id: string }) {
  const t = useI18n();

  const dispatch = useAppDispatch();
  const { ttkEpayById, isLoading, loadingError } = useTtkEpayById();
  const { updateTtkEpay } = useTtkEpayUpdate();

  useEffect(() => {
    dispatch(fetchTtkEpayById(my_app_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTtkEpay]);

  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "40px 24px",
        minHeight: "100vh",
      }}
    >
      {isLoading && ttkEpayById === undefined && (
        <>
          <Skeleton.Image active style={{ width: 300, height: 300 }} />
          <Skeleton active paragraph={{ rows: 6 }} style={{ marginTop: 24 }} />
        </>
      )}

      {!isLoading && ttkEpayById !== undefined && (
        <Space direction="vertical" size={32} style={{ width: "100%" }}>
          <AppServiceSubscriptionSettingContent appServiceSubscription={ttkEpayById} isLoading={isLoading} paramsComponent={<TtkepayParamsComponent ttkEpayById={ttkEpayById}/>}/>
        </Space>
      )}

      {!isLoading && loadingError && (
        <Result
          status="500"
          title={t("errorMessage")}
          subTitle={t("subTitleErrorMessage")}
        />
      )}
    </div>
  );
}