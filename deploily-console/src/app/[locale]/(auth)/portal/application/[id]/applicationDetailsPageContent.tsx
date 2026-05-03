"use client";

import { useApplicationServiceById, useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";
import { updateNewAppSubscriptionState } from "@/lib/features/application/applicationServiceSlice";
import { fetchApplicationServiceById } from "@/lib/features/application/applicationServiceThunks";
import { fetchResourceServicesPlans } from "@/lib/features/resourceServicePlans/resourceServicesPlansThunk";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { CloudServerOutlined, DatabaseOutlined, DesktopOutlined, HomeOutlined } from '@ant-design/icons';
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Card, Col, Divider, Grid, Input, Row, Select, Skeleton, Space, Typography } from "antd";
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
import SelectManagedRessourcePlanCard from "./containers/selectManagedRessourcePlanCard";
import SelectManagedRessourceTable from "./containers/selectManagedRessourceTable";
import SelectVpsPlanCard from "./containers/selectVpsPlanCard";
import SelectVpsPlanTable from "./containers/selectVpsPlanTable";

const { Text, Title } = Typography;


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

    console.log(duration);

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


    const [ressourceType, setRessourceType] = useState("cloud");



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
                        {/* <Divider style={{ borderColor: '#4b4a4a', marginBottom:"5px" }}></Divider> */}
                        <div style={{ padding: '2px 2px 2px 2px', marginTop: '3px', marginBottom: '5px', }}>
                            <Title
                                level={3}
                                style={{
                                    marginBottom: 10,
                                    fontWeight: 500,
                                    color: 'primary',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                }}
                            >
                                {tApplications("choosePlan")}
                            </Title>
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
                        <Divider style={{ borderColor: '#4b4a4a', marginBottom: "5px" }}></Divider>
                        <div style={{ padding: '2px 2px 2px 2px', marginTop: '3px', marginBottom: '5px', }}>
                            <Title
                                level={3}
                                style={{
                                    marginBottom: 10,
                                    fontWeight: 500,
                                    color: 'primary',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                }}
                            >
                                {tApplications("chooseResource")}
                            </Title>
                            <div style={{ marginBottom: '32px', width: '100%' }}>
                                <ToggleButtonGroup
                                    value={ressourceType}
                                    exclusive
                                    onChange={(event, newValue) => {
                                        if (newValue !== null) {
                                            switch (newValue) {
                                                case "own":
                                                    setRessourceType("own");
                                                    dispatch(updateNewAppSubscriptionState({ byor: true }));
                                                    dispatch(updateNewAppSubscriptionState({ duration: 12 }));
                                                    dispatch(updateNewAppSubscriptionState({ managed_ressource_details: undefined }));
                                                    break;
                                                case "cloud":
                                                    setRessourceType("cloud");
                                                    dispatch(updateNewAppSubscriptionState({ byor: false }));
                                                    break;
                                                case "managed":
                                                    setRessourceType("managed");
                                                    dispatch(updateNewAppSubscriptionState({ byor: false }));
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }
                                    }}
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#2d2520',
                                        padding: '4px',
                                        borderRadius: '8px',
                                        border: '1px solid #3d3530',
                                        gap: '4px',
                                        flexWrap: 'wrap',
                                        '& .MuiToggleButtonGroup-grouped': {
                                            border: '1px solid transparent',
                                            borderRadius: '6px !important',
                                            flex: '1 1 220px',
                                            minWidth: '180px',
                                            margin: 0,
                                            color: '#a67c52',
                                            textTransform: 'none',
                                            padding: '10px 16px',
                                            transition: 'all 0.3s ease',
                                            '&:not(:first-of-type)': {
                                                borderLeft: '1px solid transparent',
                                                marginLeft: 0,
                                            },
                                            '&:hover': {
                                                backgroundColor: 'rgba(166, 124, 82, 0.05)',
                                                color: '#c49365',
                                                border: '1px solid transparent',
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: 'rgba(255, 140, 66, 0.12)',
                                                color: '#ff8c42',
                                                border: '1px solid #ff8c42',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 140, 66, 0.15)',
                                                    color: '#ff8c42',
                                                },
                                                elevation: 2,
                                            },
                                        },
                                        '@media (max-width: 768px)': {
                                            '& .MuiToggleButtonGroup-grouped': {
                                                flex: '1 1 100%',
                                                minWidth: '100%',
                                            },
                                        },
                                    }}
                                >
                                    <ToggleButton value="cloud">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.4, wordBreak: 'break-word' }}>
                                            <CloudServerOutlined />
                                            <span>{tApplications("selectRes")}</span>
                                        </div>
                                    </ToggleButton>
                                    <ToggleButton value="managed">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.4, wordBreak: 'break-word' }}>
                                            <DatabaseOutlined />
                                            <span>{tApplications("selectManagedRes")}</span>
                                        </div>
                                    </ToggleButton>
                                    <ToggleButton value="own">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.4, wordBreak: 'break-word' }}>
                                            <DesktopOutlined />
                                            <span>{tApplications("useOwnServer")}</span>
                                        </div>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            {byor && <>

                                <div
                                    style={{
                                        borderRadius: 12,
                                        padding: '2px',
                                    }}
                                >
                                    {/* Description */}
                                    <Text
                                        style={{
                                            display: 'block',
                                            marginBottom: 8,
                                            color: 'grey',
                                            fontSize: 16,
                                            lineHeight: '1.6',
                                            fontWeight: 500,
                                            WebkitBackgroundClip: 'text',
                                            backgroundClip: 'text',
                                        }}
                                    >
                                        {tApplications("providerIdentification.description")}
                                    </Text>

                                    {/* Input */}
                                    <Input
                                        size="large"
                                        placeholder={tApplications("providerIdentification.placeholder")}
                                        value={provider_name}
                                        onChange={(e) => {
                                            dispatch(updateNewAppSubscriptionState({ provider_name: e.target.value }));
                                        }}
                                        onPressEnter={() => {
                                            dispatch(updateNewAppSubscriptionState({ provider_name: provider_name }));
                                        }}
                                    />
                                </div>

                            </>}
                            {!byor && ressourceType === "cloud" && app_service_plan && !app_service_plan.is_custom &&
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
                            {ressourceType === "managed" && !byor && (
                                <>
                                    <Col xs={0} sm={0} md={24} lg={24}>
                                        <Card styles={{ body: { padding: 0 } }}>
                                            <SelectManagedRessourceTable applicationId={applicationId} subscriptionCategory={subscriptionCategory} />
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={24} md={0} lg={0}>
                                        <SelectManagedRessourcePlanCard applicationId={applicationId} subscriptionCategory={subscriptionCategory} />
                                    </Col>
                                </>
                            )
                            }
                        </div>
                        <Divider style={{ borderColor: '#4b4a4a', marginBottom: "5px" }}></Divider>
                        <div style={{ padding: '8px 0' }}>
                            <ApplicationDetailsCollapseContainer description={applicationServiceById.description} specifications={applicationServiceById.specifications} documentationUrl={applicationServiceById.documentation_url}
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
                                                    : { value: duration })}
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