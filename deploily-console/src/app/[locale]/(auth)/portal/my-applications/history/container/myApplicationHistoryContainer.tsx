
import { useAppDispatch } from "@/lib/hook";
import { Card, Col, Result, Row, Skeleton, Table, Tag } from "antd";
import { useEffect, useMemo } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import { fetchSubscriptionHistory } from "@/lib/features/subscriptions/subscriptionThunks";
import { useSubscriptionHistoryList } from "@/lib/features/subscriptions/subscriptionSelectors";
import { SubscriptionHistory } from "@/lib/features/subscriptions/subscriptionInterface";
import getStatusStyle from "../../../utils/getStatusStyle";
import { theme } from "@/styles/theme";
import ImageFetcher from "@/lib/utils/imageFetcher";

export default function MyApplicationHistoryContainerr() {
    const dispatch = useAppDispatch();
    const { subscriptionHistoryLoading, subscriptionHistoryList, subscriptionHistoryLoadingError } = useSubscriptionHistoryList();
    const t = useI18n();
    const tHistory = useScopedI18n('history');
    useEffect(() => {
        dispatch(fetchSubscriptionHistory("subscription_app_service"));
    }, []);

    const columns = useMemo(() => {
        return [
            {
                dataIndex: ["service_details", "image_service"],
                key: "service_details.image_service",
                render: (image: string | null | undefined) =>
                    image ? (
                        <ImageFetcher
                            imagePath={image}
                            width={40}
                            height={40}
                        />
                    ) : (
                        "-"
                    ),
            }, {
                title: tHistory("name"),
                dataIndex: ["service_details", "name"],
                key: "service_details.name",
                render: (name: string | null | undefined) =>
                    name ? name.charAt(0).toUpperCase() + name.slice(1) : "-"
            },


            {
                title: tHistory("amount"),
                dataIndex: "total_amount",
                key: "total_amount",
                render: (total_amount: number) =>
                    total_amount ? total_amount.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " DZD " : "-",
            },
            {
                title: tHistory("start_date"),
                dataIndex: "start_date",
                key: "start_date",
                render: (created_on: Date) =>
                    created_on ? new Date(created_on).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    }) : "-",
            },

        ];
    }, [tHistory]);

    const skeletonColumns = useMemo(() => (
        subscriptionHistoryLoading
            ? columns.map((col) => ({
                ...col,
                render: () => <Skeleton.Input active />,
            }))
            : columns
    ), [subscriptionHistoryLoading, columns]);


    return (
        <>

            {/*  {!subscriptionHistoryLoading && subscriptionHistoryList && subscriptionHistoryList?.length > 0 && (
        <Row gutter={[24, 24]} justify="start" style={{ margin: 0 }}>
          {subscriptionHistoryList?.map((row) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={8}
              style={{ display: "flex", justifyContent: "center" }}
            >
             <MyAppCard data={row} /> 
            </Col>
          ))}
        </Row>
      )}*/}

            {!subscriptionHistoryLoadingError && subscriptionHistoryList &&
                <Table<SubscriptionHistory>
                    columns={skeletonColumns}
                    dataSource={subscriptionHistoryLoading ? Array(3).fill({ key: Math.random() }) : subscriptionHistoryList}
                    size="middle"
                    className="custom-table"
                    style={{ marginTop: 40, borderRadius: 0 }}
                    rowKey={(record) => record.id || `row-${Math.random()}`}

                />}
            {subscriptionHistoryLoading && subscriptionHistoryList === undefined &&
                <Col
                    xs={24}
                    sm={12}
                    md={10}
                    lg={8}
                    xl={8}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Card loading={true} style={{ minWidth: 300 }} />
                </Col>
            }
            {!subscriptionHistoryLoading && subscriptionHistoryLoadingError &&
                <Result
                    status="500"
                    title={t('error')}
                    subTitle={t('subTitleError')}
                />}
        </>
    );
}
