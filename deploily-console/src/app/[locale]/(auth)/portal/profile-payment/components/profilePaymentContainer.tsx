

import { Button, Col, Result, Row, Skeleton, Table, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import { Coins, Plus } from "@phosphor-icons/react";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileServiceInterface } from "@/lib/features/profileService/profileServiceInterface";
import { useProfileServices } from "@/lib/features/profileService/profileServiceSelectors";
import { fetchProfilesServices } from "@/lib/features/profileService/profileServiceThunks";
import { CustomOrangeButton } from "@/styles/components/buttonStyle";
import { theme } from "@/styles/theme";
import { CustomTypography } from "@/styles/components/typographyStyle";
import FundBalanceDrawer from "./fundBalanceDrawer";

export default function ProfilePayementContainer() {
    const dispatch = useAppDispatch();
    // const t = useScopedI18n('supportTicket')
    const t = useScopedI18n("profilePayment");
    const traslate = useI18n();
    const [openDrawer, setOpenDrawer] = useState(false);


    const [columns] = useState([]);
    const { profileServicesList, isLoading, profileServicesLoadingError } = useProfileServices()
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchProfilesServices());

    }, []);

    const onClose = () => {
        setOpenDrawer(false);
    };
    const keysToColumn = () => {
        const list = ["name", "balance"]

        let columns = list.map((element: any) => {
            if (element === "balance") {
                return {
                    title: <CustomTypography>{t(element)}</CustomTypography>,
                    dataIndex: element,
                    key: element,
                    render: (balance: any) =>
                        <CustomTypography>
                            {balance}
                        </CustomTypography>

                };
            }

            else
                return {
                    title: <CustomTypography>{t(element)}</CustomTypography>,
                    dataIndex: "",
                    key: element,
                    render: (element: any) =>
                        <CustomTypography>
                            {element.name}
                            {element.company_name !== null && element.company_name !== "" &&
                                <Tag color={"magenta"} bordered={false} style={{ marginLeft: 20, fontSize: 16, fontWeight: 500 }} >
                                    {element.company_name}
                                </Tag>
                            }
                        </CustomTypography>

                };
        });

        columns = [
            ...columns,
            {
                title: <CustomTypography>{""}</CustomTypography>,
                dataIndex: "",
                key: "val",
                render: () =>

                    <CustomTypography style={{ display: "flex", justifyContent: "start", paddingInline: 5, alignItems: "center" }}>
                        DZD
                        <Coins size={"28px"} style={{ color: theme.token.colorWhite, marginLeft: 4 }} />
                    </CustomTypography>

            }, {
                title: <CustomTypography>{""}</CustomTypography>,
                dataIndex: "",
                key: "actions",
                render: (element) =>

                    <div style={{ display: "flex", justifyContent: "end", paddingInline: 5 }}>
                        <CustomOrangeButton onClick={() => setOpenDrawer(true)}>
                            {t('fundBalance')}
                        </CustomOrangeButton>
                    </div>

            },
        ];

        return columns;
    };
    const skeletonColumns = columns.length
        ? columns.map((col: any, index) => ({
            ...col,
            render: () => <Skeleton.Input active={true} key={index} />,
        }))
        : Array(3).fill({}).map((_, index) => ({
            title: <Skeleton.Input active={true} size="small" />,
            dataIndex: `col${index}`,
            key: `col${index}`,
            render: () => <Skeleton.Input active={true} />,
        }));


    return (
        <>
            <Row gutter={16} style={{ marginTop: 30 }}>
                <Col span={14}>
                    <Title level={3} style={{ fontWeight: 700, color: '#ffff' }}>
                        {t("profilePayment")}
                    </Title>
                </Col>
                <Col span={10} style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                        style={{
                            color: "#ffff",
                            backgroundColor: "#5394CC",
                            padding: 10,
                            borderRadius: 25,
                            fontSize: 15,
                            height: 45
                        }}
                        onClick={() => router.push(`/portal/profile-payement/add`)}
                    >
                        <Plus size={20} style={{ color: "rgba(220, 233, 245, 0.88)" }} />
                        {t("createProfile")}
                    </Button>
                </Col>
            </Row>

            {!profileServicesLoadingError &&
                <Table<ProfileServiceInterface>
                columns={
                    isLoading
                        ? skeletonColumns
                        : profileServicesList &&
                        keysToColumn().map((col, index, arr) => ({
                            ...col,
                            onCell: () => ({
                                onClick: index === arr.length - 1 ? (e: React.MouseEvent) => e.stopPropagation() : undefined,
                            }),
                        }))
                }
                    dataSource={isLoading ? Array(1).fill({ key: Math.random() }) : profileServicesList?.result}
                    size="middle"
                    className="custom-table"
                    style={{ marginTop: 40, borderRadius: 0 }}
                    scroll={{ y: 55 * 5 }}
                    onRow={(element) => ({
                        onClick: () => router.push(`/portal/profile-payment/${element.id}`),
                        style: { cursor: "pointer" },
                    })}
                />
            }
            {!isLoading && profileServicesLoadingError &&
                <Result
                    status="500"
                    title={traslate('error')}
                    subTitle={traslate('subTitleError')}
                />}
            <FundBalanceDrawer openDrawer={openDrawer} onClose={onClose} />

        </>
    )
}