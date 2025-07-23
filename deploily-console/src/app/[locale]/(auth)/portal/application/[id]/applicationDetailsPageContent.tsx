"use client";

import { useApplicationServiceById, useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";
import { updateNewAppSubscriptionState } from "@/lib/features/application/applicationServiceSlice";
import { fetchApplicationServiceById } from "@/lib/features/application/applicationServiceThunks";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { Card, Col, Grid, Row, Select, Skeleton, Space } from "antd";
import { PaymentSideBar } from "deploily-ui-components";
import { PaymentAppBar } from "deploily-ui-components/components/applications/paymentSideBar";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import ApplicationDetailsCollapseContainer from "./containers/applicationDetailsCollapseContainer";
import ApplicationPlansContainer from "./containers/applicationPlansContainer";
import ApplicationDescriptionContainer from "./containers/descriptionContainer";
import AppPromoCodeTextField from "./containers/payment-components/appPromoCodeTextField";
import PaymentDrawer from "./containers/payment-components/paymentDrawer";
import SelectVpsPlanTable from "./containers/selectVpsPlanTable";
import { options } from "../utils/applicationConst";


export default function ApplicationDetailsPageContent({ applicationId }: { applicationId: any }) {
    const dispatch = useAppDispatch();
    const screens = Grid.useBreakpoint();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const onClose = () => setOpenDrawer(false);

    const { applicationServiceById, isLoading, loadingError } = useApplicationServiceById();
    const { totalAmount, duration, selected_version, app_service_plan, resource_service_plan } = useNewApplicationSubscription();

    const tApplications = useScopedI18n('applications');
    const t = useI18n();

    const handleChangeDuration = (value: number) => {
        dispatch(updateNewAppSubscriptionState({ duration: value }));
    };
    const handleChangeVersion = (value: number) => {
        dispatch(updateNewAppSubscriptionState({ selected_version: applicationServiceById?.app_versions?.find((version) => version.id === value) }));
    };

    const optionsVersion = applicationServiceById?.app_versions?.map((version) => ({
        value: version.id,
        label: version.name,
    }));

    useEffect(() => {
        dispatch(fetchApplicationServiceById(applicationId));
        dispatch(fetchServicePlans(applicationId));
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    if (isLoading) return <Skeleton active />;
    if (loadingError) return <div>Error: {loadingError}</div>;
    if (!applicationServiceById) return <div>No application found</div>;

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
                    justifyContent: "center",
                }}
            >
                <Row gutter={[24, 24]} wrap style={{ justifyContent: "center", margin: '0px' }}>
                    {/* Main Content */}
                    <Col xs={24} md={24} lg={16} style={{ padding: '0px', margin: '0px' }}>
                        <ApplicationDescriptionContainer
                            title={applicationServiceById.name}
                            price={applicationServiceById.min_app_price}
                            description={applicationServiceById.short_description + t('learnMore')}
                            documentationUrl={applicationServiceById.documentation_url}
                            logo={
                                <div style={{ border: "1px solid #4E4E4E", borderRadius: "10px", padding: "1px" }}>
                                    <ImageFetcher imagePath={applicationServiceById.image_service || ""} width={190} height={190} />
                                </div>
                            }
                            is_subscribed={applicationServiceById.is_subscribed}
                        />

                        <div style={{ padding: '8px 0' }}>
                            <ApplicationPlansContainer />
                        </div>

                        {!screens.lg && !(applicationServiceById.is_subscribed) && (
                            <div
                                style={{
                                    position: isScrolled ? "fixed" : "relative",
                                    bottom: isScrolled ? 0 : "auto",
                                    left: 0,
                                    right: 0,
                                    width: "100%",
                                    zIndex: 1000,
                                    paddingBottom: '24px',
                                    display: 'flex',
                                    justifyContent: "center",
                                    backgroundColor: isScrolled ? "#202227" : "transparent",
                                    transition: "all 0.3s ease-in-out",
                                }}

                            >
                                <PaymentAppBar
                                    price={totalAmount}
                                    buttonText={tApplications('confirm')}
                                    items={[

                                        {
                                            label: tApplications('duration'),
                                            value: (
                                                <Select
                                                    defaultValue={duration}
                                                    style={{
                                                        width: '100%',
                                                        maxWidth: 700, // Adjust this based on your layout
                                                        borderRadius: '10px',
                                                    }}
                                                    onChange={handleChangeDuration}
                                                    dropdownStyle={{
                                                        backgroundColor: theme.token.gray50,
                                                        border: `2px solid ${theme.token.gray100}`,
                                                    }}
                                                    options={options}
                                                />
                                            ),
                                        },
                                        {
                                            label: tApplications('version'),
                                            value: (
                                                <Select
                                                    defaultValue={typeof selected_version?.id === "number" ? selected_version.id : undefined}
                                                    style={{
                                                        width: '100%',
                                                        maxWidth: 700,
                                                        borderRadius: '10px',
                                                    }}
                                                    onChange={handleChangeVersion}
                                                    dropdownStyle={{
                                                        backgroundColor: theme.token.gray50,
                                                        border: `2px solid ${theme.token.gray100}`,
                                                    }}
                                                    options={optionsVersion}
                                                />

                                            ),
                                        },
                                        {
                                            label: tApplications('promoCode'),
                                            value: (
                                                <AppPromoCodeTextField />
                                            ),
                                        },

                                    ]}
                                    onClick={() => setOpenDrawer(true)}
                                />
                            </div>
                        )}
                        <Card styles={{ body: { padding: 0 } }}>
                            <SelectVpsPlanTable />
                        </Card>

                        <div style={{ padding: '8px 0' }}>
                            <ApplicationDetailsCollapseContainer description={applicationServiceById.description} specifications={applicationServiceById.specifications} />
                        </div>
                    </Col>

                    {/* Payment Sidebar - Only for Desktop */}
                    {screens.lg && !(applicationServiceById.is_subscribed) && (
                        <Col xs={24} lg={8} style={{ position: 'sticky', top: 16, alignSelf: 'flex-start' }}>
                            <PaymentSideBar
                                price={totalAmount}
                                buttonText={tApplications('confirm')}
                                items={[
                                    { label: tApplications('svc'), value: applicationServiceById.name },
                                    { label: tApplications("plan"), value: app_service_plan?.plan.name || "" },

                                    { label: tApplications('provider'), value: resource_service_plan?.provider_info?.name || "" },
                                    { label: tApplications("vpsType"), value: resource_service_plan?.service_name || "" },
                                    { label: tApplications('resourcePlan'), value: resource_service_plan?.plan_name || "" },
                                    { label: tApplications('prepaTime'), value: `${resource_service_plan?.preparation_time} h` || "" },
                                    {
                                        label: tApplications('version'),
                                        value: (
                                            <Select
                                                defaultValue={typeof selected_version?.id === "number" ? selected_version.id : undefined}
                                                style={{ width: 150, borderRadius: "10px" }}
                                                onChange={handleChangeVersion}
                                                dropdownStyle={{
                                                    backgroundColor: theme.token.gray50,
                                                    border: `2px solid ${theme.token.gray100}`,
                                                }}
                                                options={optionsVersion}
                                            />

                                        ),
                                    },
                                    {
                                        label: tApplications('duration'),
                                        value: (
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
                                        ),
                                    },

                                    {
                                        label: tApplications('promoCode'),
                                        value: (
                                            <AppPromoCodeTextField />
                                        ),
                                    },
                                ]}
                                onClick={() => setOpenDrawer(true)}
                            />
                        </Col>
                    )}
                </Row>


            </Space>

            <PaymentDrawer openDrawer={openDrawer} onClose={onClose} />
        </>
    );
}