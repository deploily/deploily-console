"use client";

import { useApplicationServiceById, useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";
import { updateNewAppSubscriptionState } from "@/lib/features/application/applicationServiceSlice";
import { fetchApplicationServiceById } from "@/lib/features/application/applicationServiceThunks";
import { fetchResourceServicesPlans } from "@/lib/features/resourceServicePlans/resourceServicesPlansThunk";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { HomeOutlined } from '@ant-design/icons';
import { Card, Col, Grid, Input, Row, Select, Skeleton, Space, Typography } from "antd";
import { PaymentSideBar } from "deploily-ui-components";
import { PaymentAppBar } from "deploily-ui-components/components/applications/paymentSideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import { options } from "../utils/applicationConst";
import ApplicationDetailsCollapseContainer from "./containers/applicationDetailsCollapseContainer";
import ApplicationPlansContainer from "./containers/applicationPlansContainer";
import ApplicationDescriptionContainer from "./containers/descriptionContainer";
import AppPromoCodeTextField from "./containers/payment-components/appPromoCodeTextField";
import PaymentDrawer from "./containers/payment-components/paymentDrawer";
import SelectVpsPlanCard from "./containers/selectVpsPlanCard";
import SelectVpsPlanTable from "./containers/selectVpsPlanTable";


export default function ApplicationDetailsPageContent({ applicationId }: { applicationId: any }) {
    const dispatch = useAppDispatch();
    const screens = Grid.useBreakpoint();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const onClose = () => setOpenDrawer(false);
    const [subscriptionCategory, setSubscriptionCategory] = useState("yearly");
    const [hover, setHover] = useState(false);
    const router = useRouter();
    const [fromPage, setFromPage] = useState<"seeAll" | "home" | null>(null);


    const { applicationServiceById, isLoading, loadingError } = useApplicationServiceById();
    const { totalAmount, duration, selected_version, app_service_plan, managed_ressource_details, byor, provider_name } = useNewApplicationSubscription();


    const tApplications = useScopedI18n('applications');
    const t = useI18n();

    const handleChangeDuration = (value: number) => {
        setSubscriptionCategory(value === options[0].value ? "yearly" : "monthly");
        dispatch(fetchResourceServicesPlans({ serviceId: applicationId, subscriptionCategory }));
        dispatch(updateNewAppSubscriptionState({ duration: value }));
    };
    const handleChangeVersion = (value: number) => {
        dispatch(updateNewAppSubscriptionState({ selected_version: applicationServiceById?.app_versions?.find((version) => version.id === value) }));
    };

    useEffect(() => {
        if (subscriptionCategory) {
            dispatch(fetchResourceServicesPlans({ serviceId: applicationId, subscriptionCategory }));
        }

    }, [subscriptionCategory]);

    useEffect(() => {
        if (managed_ressource_details?.isManaged && byor === false) {
            dispatch(updateNewAppSubscriptionState({ duration: managed_ressource_details?.time_remaining }));
        }
    }, [managed_ressource_details?.isManaged]);

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
    useEffect(() => {
        const storedFrom = sessionStorage.getItem("fromPage");

        if (storedFrom === "home" || storedFrom === "seeAll") {
            setFromPage(storedFrom);
        }
    }, []);


    console.log('manged resource');
    console.log(managed_ressource_details);


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

                <Col xs={24} sm={24} md={24} lg={12}>
                    <Row>
                        <Col span={24} style={{ marginBottom: 12 }}>
                            <span style={{ color: "white", fontSize: "24px", fontWeight: 800, }}>

                                <span
                                    style={{ cursor: "pointer", color: hover ? "orange" : "white" }}
                                    onClick={() => router.back()}
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                >
                                    {fromPage === "home" ? (
                                        <HomeOutlined style={{ marginRight: 4 }} />
                                    ) : (
                                        t("application")
                                    )}
                                </span>  / {"\t"}
                                {applicationServiceById !== undefined && applicationServiceById.name}
                            </span>


                        </Col>
                    </Row>
                </Col>
                <Row gutter={[24, 24]} wrap style={{ justifyContent: "center", margin: '0px' }}>
                    {/* Main Content */}
                    <Col xs={24} md={24} lg={16} style={{ padding: '0px', margin: '0px' }}>
                        <ApplicationDescriptionContainer
                            title={applicationServiceById.name}
                            price={applicationServiceById.unit_price}
                            description={applicationServiceById.short_description || ""}
                            logo={
                                <div style={{ border: "1px solid #4E4E4E", borderRadius: "10px", padding: "1px" }}>
                                    <ImageFetcher imagePath={applicationServiceById.image_service || ""} width={190} height={190} />
                                </div>
                            }
                            is_subscribed={applicationServiceById.is_subscribed}
                        />

                        <div style={{ padding: '8px 0' }}>
                            <ApplicationPlansContainer screens={screens} />
                        </div>

                        {!screens.lg && !(applicationServiceById.is_subscribed) && app_service_plan && !app_service_plan.is_custom && (
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

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '14px 20px',
                                borderRadius: '14px',
                                border: `1.5px solid ${byor ? theme.token.colorPrimary : theme.token.gray300}`,
                                backgroundColor: byor
                                    ? `${theme.token.colorPrimary}14`
                                    : theme.token.colorBgBase,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                marginBottom: '10px'
                            }}
                            onClick={() => dispatch(updateNewAppSubscriptionState({ byor: !byor }))}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = theme.token.colorPrimary;
                                e.currentTarget.style.backgroundColor = `${theme.token.colorPrimary}08`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = byor ? theme.token.colorPrimary : theme.token.gray300;
                                e.currentTarget.style.backgroundColor = byor
                                    ? `${theme.token.colorPrimary}14`
                                    : theme.token.colorBgBase;
                            }}
                        >
                            <div
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '6px',
                                    border: `2px solid ${byor ? theme.token.colorPrimary : theme.token.gray300}`,
                                    backgroundColor: byor ? theme.token.colorPrimary : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.18s ease',
                                    flexShrink: 0,
                                }}
                            >
                                {byor && (
                                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                                        <path
                                            d="M1 4L4 7.5L10 1"
                                            stroke="white"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <Typography.Text
                                    style={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: byor ? theme.token.colorPrimary : theme.token.colorWhite,
                                        lineHeight: 1.2,
                                        transition: 'color 0.18s',
                                        display: 'block',
                                    }}
                                >
                                    {tApplications("useOwnServer")}
                                </Typography.Text>
                                <Typography.Text
                                    style={{
                                        fontSize: '0.75rem',
                                        color: theme.token.gray100,
                                        marginTop: '2px',
                                        display: 'block',
                                    }}
                                >
                                    {/* //TODO */}
                                </Typography.Text>
                            </div>
                        </div>
                        {byor && <>
                            <Typography.Title level={4} style={{ paddingTop: 20, paddingBottom: 10 }}>
                                {tApplications("enterProviderName")}
                            </Typography.Title>
                            <Input
                                placeholder={tApplications("enterProviderName")}
                                value={provider_name}
                                onChange={(e) => {
                                    dispatch(updateNewAppSubscriptionState({ phone: e.target.value }));
                                }}
                                onPressEnter={() => {
                                    dispatch(updateNewAppSubscriptionState({ phone: provider_name }));
                                }
                                }
                                style={{ marginBottom: 0 }}
                            />
                        </>}
                        {!byor && app_service_plan && !app_service_plan.is_custom &&
                            <>
                                <Col xs={0} sm={0} md={24} lg={24}>
                                    <Card styles={{ body: { padding: 0 } }}>
                                        <SelectVpsPlanTable applicationId={applicationId} subscriptionCategory={subscriptionCategory} />
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={0} lg={0}>
                                    <SelectVpsPlanCard applicationId={applicationId} subscriptionCategory={subscriptionCategory} />
                                </Col>
                            </>
                        }

                        <div style={{ padding: '8px 0' }}>
                            <ApplicationDetailsCollapseContainer description={applicationServiceById.description} specifications={applicationServiceById.specifications} documentationUrl={applicationServiceById.documentation_url}
                            // demoUrl={applicationServiceById.demo_url}
                            />
                        </div>
                    </Col>

                    {/* Payment Sidebar - Only for Desktop */}
                    {screens.lg && !(applicationServiceById.is_subscribed) && app_service_plan && !app_service_plan.is_custom && (
                        <Col xs={24} lg={8} style={{ position: 'sticky', top: 16, alignSelf: 'flex-start' }}>
                            <PaymentSideBar
                                price={totalAmount}
                                buttonText={tApplications('confirm')}
                                items={[
                                    { label: tApplications('svc'), value: applicationServiceById.name },
                                    { label: tApplications("plan"), value: app_service_plan?.plan.name || "" },
                                    ...!byor ? [
                                        { label: tApplications('provider'), value: managed_ressource_details?.provider_info?.name || "" },
                                        { label: tApplications("vpsType"), value: managed_ressource_details?.service_name || "" },
                                        { label: tApplications('resourcePlan'), value: managed_ressource_details?.plan_name || "" },
                                        { label: tApplications('prepaTime'), value: `${managed_ressource_details?.preparation_time} h` || "" }
                                    ] : []
                                    ,
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
                                                {...(managed_ressource_details?.isManaged && !byor
                                                    ? { value: managed_ressource_details?.time_remaining }
                                                    : { defaultValue: duration })}
                                                style={{ width: 150, borderRadius: "10px" }}
                                                onChange={handleChangeDuration}
                                                dropdownStyle={{
                                                    backgroundColor: theme.token.gray50,
                                                    border: `2px solid ${theme.token.gray100}`,
                                                }}
                                                options={managed_ressource_details?.isManaged && !byor ?
                                                    [{
                                                        value: managed_ressource_details?.time_remaining,
                                                        label: `${managed_ressource_details?.time_remaining} Months`
                                                    }]
                                                    : options}

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