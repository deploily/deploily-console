"use client";
import { useApplicationServiceById } from "@/lib/features/application/applicationServiceSelectors";
import { fetchApplicationServiceById } from "@/lib/features/application/applicationServiceThunks";
import { useUpgradeRenewMyApplicationDataState } from "@/lib/features/my-applications/myApplicationSelector";
import { updateUpgradeRenewMyAppState } from "@/lib/features/my-applications/myApplicationSlice";
import { renewMyApplication, upgradeMyApplication } from "@/lib/features/my-applications/myApplicationThunks";
import { useNotDefaultPaymentProfiles } from "@/lib/features/payment-profiles/paymentProfilesSelectors";
import { fetchNotDefaultPaymentProfiles } from "@/lib/features/payment-profiles/paymentProfilesThunks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Card, Col, ConfigProvider, Drawer, Row, Select, Typography } from "antd";
import SelectProfileComponent from "deploily-ui-components/components/payment/selectProfile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import CreateProfileButton from "../../api-services/[id]/components/subscriptionDrawer/containers/createProfileButton";
import ApplicationPaymentComponent from "../../application/[id]/containers/applicationPaymentComponent";
import AppPromoCodeTextField from "../../application/[id]/containers/payment-components/appPromoCodeTextField";
import IsBalanceSufficientComponent from "../../application/[id]/containers/payment-components/isBalanceSufficientComponent";
import { options } from "../../application/utils/applicationConst";

export default function MyAppPaymentDrawer({ serviceId, openDrawer, onClose, subscriptionOldId, isSubscribed, drawerType }:
    { serviceId: any, openDrawer: any, onClose: any, subscriptionOldId: any, isSubscribed?: boolean, drawerType?: any }) {
    const router = useRouter()

    const tApplications = useScopedI18n('applications');
    const tSubscription = useScopedI18n('subscription');

    const dispatch = useAppDispatch();
    const { applicationServiceById } = useApplicationServiceById()

    const { paymentProfilesList } = useNotDefaultPaymentProfiles();
    const { totalamount, duration, selected_version, app_service_plan, managed_ressource_details, selectedProfile, isBalanceSufficient } = useUpgradeRenewMyApplicationDataState();

    const handleSelectPaymentProfile = (value: any) => {
        const newSelectedProfile = paymentProfilesList?.result.find(
            (profile) => profile.id === value
        );
        dispatch(updateUpgradeRenewMyAppState({ "selectedProfile": newSelectedProfile }))
    };

    useEffect(() => {
        dispatch(fetchApplicationServiceById(serviceId));
        dispatch(fetchNotDefaultPaymentProfiles());
    }, []);

    useEffect(() => {
        dispatch(updateUpgradeRenewMyAppState({ selected_version: applicationServiceById?.app_versions[0] }));
    }, [applicationServiceById])

    
    const handleUpgradeSubscribe = async () => {
        if (app_service_plan != undefined && managed_ressource_details != undefined && selectedProfile != undefined) {

            if (drawerType === "upgrade") {
                return dispatch(upgradeMyApplication(
                    {
                        service_slug: applicationServiceById?.service_slug,
                        payment_method: "cloud_credit",
                        subscriptionOldId: subscriptionOldId,
                    })).then((response: any) => {
                        if (response.meta.requestStatus === "fulfilled") {
                            router.push(`/portal/my-applications`);
                        }
                    }
                    );
            }
            if (drawerType === "renew") {
                return dispatch(renewMyApplication(
                    {
                        service_slug: applicationServiceById?.service_slug,
                        payment_method: "cloud_credit",
                        subscriptionOldId: subscriptionOldId,
                    }
                )).then((response: any) => {
                    if (response.meta.requestStatus === "fulfilled") {
                        router.push(`/portal/my-applications`);
                    }
                }
                );
            }

        }
    };
    const optionsVersion = applicationServiceById?.app_versions?.map((version) => ({
        value: version.id,
        label: version.name,
    }));


    const handleChangeDuration = (value: number) => {
        dispatch(updateUpgradeRenewMyAppState({ duration: value }));
    };
    const handleChangeVersion = (value: number) => {
        dispatch(updateUpgradeRenewMyAppState({ selected_version: applicationServiceById?.app_versions?.find((version) => version.id === value) }));
    };

    return (
        <>
            <Drawer
                placement="right"
                closable={true}
                onClose={onClose}
                open={openDrawer}
                getContainer={false}
                width={600}
                styles={{
                    header: {
                        borderBottom: "none", background: '#202227'
                    },
                    body: {
                        padding: 0, background: '#202227'
                    },
                }}
            >

                <Col style={{ padding: 20 }}>

                    <Card
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            borderColor: theme.token.gray50,
                            boxShadow: "none",
                            padding: 16,
                        }}
                    >
                        {[
                            { label: tApplications("svc"), value: applicationServiceById?.name },
                            { label: tApplications("plan"), value: app_service_plan?.plan.name },
                            {
                                label: tApplications("duration"),
                                value: (
                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Select: {
                                                    colorBgContainer: theme.token.gray50,
                                                },
                                            },
                                        }}
                                    >
                                        <Select
                                            defaultValue={duration}
                                            style={{ width: 150, borderRadius: "10px" }}
                                            onChange={handleChangeDuration}
                                            dropdownStyle={{
                                                backgroundColor: theme.token.gray50,
                                                border: `2px solid ${theme.token.gray100}`,
                                            }}
                                            options={options}
                                        />
                                    </ConfigProvider>
                                ),
                            },
                            {
                                label: tApplications("version"),
                                value: (
                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Select: {
                                                    colorBgContainer: theme.token.gray50,
                                                },
                                            },
                                        }}
                                    >
                                        <Select
                                            defaultValue={
                                                typeof selected_version?.id === "number"
                                                    ? selected_version.id
                                                    : undefined
                                            }
                                            style={{ width: 150, borderRadius: "10px" }}
                                            onChange={handleChangeVersion}
                                            dropdownStyle={{
                                                backgroundColor: theme.token.gray50,
                                                border: `2px solid ${theme.token.gray100}`,
                                            }}
                                            options={optionsVersion}
                                            getPopupContainer={(trigger) => trigger.parentNode}
                                            disabled={drawerType === "renew"}
                                        />
                                    </ConfigProvider>
                                ),
                            },
                            {
                                label: tApplications("provider"),
                                value: managed_ressource_details?.provider_info?.name,
                            },
                            {
                                label: tApplications("vpsType"),
                                value: managed_ressource_details?.service_name ?? "",
                            },
                            {
                                label: tApplications("resourcePlan"),
                                value: managed_ressource_details?.plan_name ?? "",
                            },
                            {
                                label: tApplications("promoCode"),
                                value: <AppPromoCodeTextField />,
                            },
                            {
                                label: tSubscription("totalAmount"),
                                value: (
                                    <Typography.Text
                                        strong
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 500,
                                            color: theme.token.orange400,
                                        }}
                                    >
                                        {Intl.NumberFormat("fr-FR", { useGrouping: true }).format(
                                            totalamount
                                        )}
                                        <span style={{ fontSize: 12, fontWeight: 400 }}> DZD</span>
                                    </Typography.Text>
                                ),
                            },
                        ].map((item, index) => (
                            <Row
                                gutter={16}
                                align="top"
                                style={{ marginBottom: index === 8 ? 0 : 12 }}
                                key={index}
                            >
                                <Col span={14}>
                                    <Typography.Text strong>{item.label}</Typography.Text>
                                </Col>
                                <Col span={10}>{item.value}</Col>
                            </Row>
                        ))}
                    </Card>

                    {paymentProfilesList?.count != undefined && paymentProfilesList?.count > 0 && <SelectProfileComponent
                        translations={{ title: tSubscription("selectProfile"), profile: tSubscription("profile"), balance: tSubscription("balance") }}
                        selectedProfile={selectedProfile}
                        paymentProfilesList={paymentProfilesList} onSelectProfile={handleSelectPaymentProfile} />}
                    {<div style={{ padding: '5px 0px' }}>
                        {isBalanceSufficient === true ?
                            <IsBalanceSufficientComponent onClose={onClose} handleSubscribe={() => handleUpgradeSubscribe()} />
                            : ((paymentProfilesList?.count === 0)) ?
                                <CreateProfileButton planSelected={undefined} openDrawer={openDrawer} onClose={onClose} />
                                :
                                <ApplicationPaymentComponent isSubscribed={isSubscribed} subscriptionOldId={subscriptionOldId} drawerType={drawerType} />
                        }
                    </div>}
                </Col>
            </Drawer>
        </>
    )
}
