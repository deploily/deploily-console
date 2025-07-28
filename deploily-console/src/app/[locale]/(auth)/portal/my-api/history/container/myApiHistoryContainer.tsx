
import { useAppDispatch } from "@/lib/hook";
import { Card, Col, Result, Row, Skeleton, Table, Tag } from "antd";
import { useEffect, useMemo } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import { fetchSubscriptionHistory } from "@/lib/features/subscriptions/subscriptionThunks";
import { useSubscriptionHistoryList } from "@/lib/features/subscriptions/subscriptionSelectors";
import { SubscriptionHistory } from "@/lib/features/subscriptions/subscriptionInterface";
import getStatusStyle from "../../../utils/getStatusStyle";
import { theme } from "@/styles/theme";

export default function MyApiHistoryContainerr() {
    const dispatch = useAppDispatch();
    const { subscriptionHistoryLoading, subscriptionHistoryList, subscriptionHistoryLoadingError } = useSubscriptionHistoryList();
    const t = useI18n();
    const tHistory = useScopedI18n('history');
    useEffect(() => {
      dispatch(fetchSubscriptionHistory("subscription_api_service"));
    }, []);

    const columns = useMemo(() => {
        return [
            {
                title: tHistory("name"),
                dataIndex: "name",
                key: "name",
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
                title: tHistory("status"),
                dataIndex: "status",
                key: "status",
                render: (status: string) => {

                    const { backgroundColor, color, label } = getStatusStyle(status, theme, t);

                    return (
                        <Tag style={{
                            backgroundColor, color, border: "none",
                            padding: "4px 0",
                            fontWeight: 600,
                            fontSize: 13,
                            borderRadius: "18px",
                            width: "100px",
                            textAlign: "center",
                            display: "inline-block"
                        }}>
                            {label}
                        </Tag>
                    );
                },
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
