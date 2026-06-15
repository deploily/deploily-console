"use client";

import { MOBILE_APPLICATION_SLUG } from "@/deploilyWebsiteUrls";
import { useVpsManagedResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { getManagedResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import {
  useDeploymentServiceBySlug,
  useNewDeploymentSubscription,
} from "@/lib/features/deployment/deploymentServiceSelectors";
import { updateNewDeploymentSubscriptionState } from "@/lib/features/deployment/deploymentServiceSlice";
import { fetchDeploymentServiceBySlug } from "@/lib/features/deployment/deploymentsServiceThunks";
import { fetchResourceServicesPlans } from "@/lib/features/resourceServicePlans/resourceServicesPlansThunk";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { CloudServerOutlined, DatabaseOutlined, DesktopOutlined, HomeOutlined } from "@ant-design/icons";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Card, Col, Divider, Grid, Input, Row, Select, Skeleton, Space, Typography } from "antd";
import PaymentSideBar, {
  PaymentAppBar,
} from "deploily-ui-components/components/Deployments/paymentSideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import { options } from "../utils/deploymentConst";
import DeploymentDetailsCollapseContainer from "./containers/deploymentDetailsCollapseContainer";
import DeploymentPlansContainer from "./containers/deploymentPlansContainer";
import DeploymentPromoCodeTextField from "./containers/deploymentPromoCodeTextField";
import DeployementDescriptionContainer from "./containers/descriptionContainer";
import PaymentDrawer from "./containers/payment-components/paymentDrawer";
import SelectManagedRessourcePlanCard from "./containers/selectManagedRessourcePlanCard";
import SelectManagedRessourceTable from "./containers/selectManagedRessourceTable";
import SelectVpsPlanCard from "./containers/selectVpsPlanCard";
import SelectVpsPlanTable from "./containers/selectVpsPlanTable";
const { Text, Title } = Typography;

export default function DeploymentDetailsPageContent({ deploymentSlug }: { deploymentSlug: any }) {
  const tdeployment = useScopedI18n("deployment");
  const tApplications = useScopedI18n('applications');
  const dispatch = useAppDispatch();
  const screens = Grid.useBreakpoint();
  const [isScrolled, setIsScrolled] = useState(false);
  const [subscriptionCategory, setSubscriptionCategory] = useState("yearly");
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [fromPage, setFromPage] = useState<"seeAll" | "home" | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const onClose = () => setOpenDrawer(false);

  const [ressourceType, setRessourceType] = useState("cloud");
  const { isLoading, deploymentServiceBySlug, loadingError } = useDeploymentServiceBySlug();
  const {
    totalAmount,
    duration,
    // selected_version,
    deployment_service_plan,
    managed_ressource_details,
    byor, provider_name
  } = useNewDeploymentSubscription();
  // const optionsVersion = deploymentServiceBySlug?.deployment_versions?.map((version) => ({
  //   value: version.id,
  //   label: version.name,
  // }));

  const handleChangeDuration = (value: number) => {
    setSubscriptionCategory(value === options[0].value ? "yearly" : "monthly");
    dispatch(fetchResourceServicesPlans({ subscriptionCategory }));
    dispatch(updateNewDeploymentSubscriptionState({ duration: value }));
  };
  // const handleChangeVersion = (value: number) => {
  //   dispatch(
  //     updateNewDeploymentSubscriptionState({
  //       selected_version: deploymentServiceBySlug?.deployment_versions?.find(
  //         (version) => version.id === value,
  //       ),
  //     }),
  //   );
  // };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    dispatch(fetchDeploymentServiceBySlug(deploymentSlug));
    dispatch(getManagedResources());
  }, []);




  useEffect(() => {
    const storedFrom = sessionStorage.getItem("fromPage");

    if (storedFrom === "home" || storedFrom === "seeAll") {
      setFromPage(storedFrom);
    }
  }, []);

  useEffect(() => {
    if (deploymentServiceBySlug) {
      dispatch(fetchServicePlans(`${deploymentServiceBySlug.id}`));
    }
  }, [deploymentServiceBySlug]);

  useEffect(() => {
    if (managed_ressource_details?.isManaged) {

      dispatch(updateNewDeploymentSubscriptionState({ duration: managed_ressource_details?.time_remaining }));
    }
  }, [managed_ressource_details?.isManaged]);

  useEffect(() => {
    if (deploymentServiceBySlug && deploymentServiceBySlug.service_slug == MOBILE_APPLICATION_SLUG) {
      dispatch(updateNewDeploymentSubscriptionState({ managed_ressource_details: undefined }));
    }
  }, [deploymentServiceBySlug]);

  const { vpsManagedResourceResponse } = useVpsManagedResource();


  if (isLoading) return <Skeleton active />;
  if (loadingError) return <div>Error: {loadingError}</div>;
  if (!deploymentServiceBySlug) return <div>No Deployment found</div>;
  console.log("|||||||||||||||||||||||||||||||||||||||||||");

  console.log(deployment_service_plan?.preparation_time);

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
              <span style={{ color: "white", fontSize: "24px", fontWeight: 800 }}>
                <span
                  style={{ cursor: "pointer", color: hover ? "orange" : "white" }}
                  onClick={() => router.back()}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  {fromPage === "home" ? (
                    <HomeOutlined style={{ marginRight: 4 }} />
                  ) : (
                    tdeployment("deployments")
                  )}
                </span>{" "}
                / {"\t"}
                {deploymentServiceBySlug !== undefined && deploymentServiceBySlug.name}
              </span>
            </Col>
          </Row>
        </Col>
        <Row gutter={[24, 24]} wrap style={{ justifyContent: "center", margin: "0px" }}>
          {/* Main Content */}
          <Col xs={24} md={24} lg={16} style={{ padding: "0px", margin: "0px" }}>
            <DeployementDescriptionContainer
              title={deploymentServiceBySlug.name}
              price={deploymentServiceBySlug.unit_price}
              description={deploymentServiceBySlug.short_description || ""}
              documentationUrl={deploymentServiceBySlug.documentation_url}
              logo={
                <div style={{ border: "1px solid #4E4E4E", borderRadius: "10px", padding: "1px" }}>
                  <ImageFetcher
                    imagePath={deploymentServiceBySlug.image_service || ""}
                    width={190}
                    height={190}
                  />
                </div>
              }
              is_subscribed={deploymentServiceBySlug.is_subscribed}
            />
            <div style={{ padding: "8px 0" }}>
              <DeploymentPlansContainer />
            </div>

            {!screens.lg &&
              !deploymentServiceBySlug.is_subscribed &&
              deployment_service_plan &&
              !deployment_service_plan.is_custom && (
                <div
                  style={{
                    position: isScrolled ? "fixed" : "relative",
                    bottom: isScrolled ? 0 : "auto",
                    left: 0,
                    right: 0,
                    width: "100%",
                    zIndex: 1000,
                    paddingBottom: "24px",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: isScrolled ? "#202227" : "transparent",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <PaymentAppBar
                    price={totalAmount}
                    buttonText={tdeployment("confirm")}
                    items={[
                      {
                        label: tdeployment("duration"),
                        value: (
                          <Select
                            defaultValue={duration}
                            style={{
                              width: "100%",
                              maxWidth: 700, // Adjust this based on your layout
                              borderRadius: "10px",
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
                      // {
                      //   label: tdeployment("version"),
                      //   value: (
                      //     <Select
                      //       defaultValue={
                      //         typeof selected_version?.id === "number"
                      //           ? selected_version.id
                      //           : undefined
                      //       }
                      //       style={{
                      //         width: "100%",
                      //         maxWidth: 700,
                      //         borderRadius: "10px",
                      //       }}
                      //       onChange={handleChangeVersion}
                      //       dropdownStyle={{
                      //         backgroundColor: theme.token.gray50,
                      //         border: `2px solid ${theme.token.gray100}`,
                      //       }}
                      //       options={optionsVersion}
                      //     />
                      //   ),
                      // },
                      {
                        label: tdeployment("promoCode"),
                        value: <DeploymentPromoCodeTextField />,
                      },
                    ]}
                    onClick={() => setOpenDrawer(true)}
                  />
                </div>
              )}

            {!(deploymentServiceBySlug.service_slug == MOBILE_APPLICATION_SLUG) &&
              <>
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
                              dispatch(updateNewDeploymentSubscriptionState({ byor: true }));
                              dispatch(updateNewDeploymentSubscriptionState({ duration: 12 }));
                              dispatch(updateNewDeploymentSubscriptionState({ managed_ressource_details: undefined }));
                              break;
                            case "cloud":
                              setRessourceType("cloud");
                              dispatch(updateNewDeploymentSubscriptionState({ byor: false }));
                              break;
                            case "managed":
                              setRessourceType("managed");
                              dispatch(updateNewDeploymentSubscriptionState({ byor: false }));
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
                      <ToggleButton value="own">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.4, wordBreak: 'break-word' }}>
                          <DesktopOutlined />
                          <span>{tApplications("useOwnServer")}</span>
                        </div>
                      </ToggleButton>
                      {vpsManagedResourceResponse && vpsManagedResourceResponse?.length >= 1 && <ToggleButton value="managed">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.4, wordBreak: 'break-word' }}>
                          <DatabaseOutlined />
                          <span>{tApplications("selectManagedRes")}</span>
                        </div>
                      </ToggleButton>}
                    </ToggleButtonGroup>
                  </div>
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
                        dispatch(updateNewDeploymentSubscriptionState({ provider_name: e.target.value }));
                      }}
                      onPressEnter={() => {
                        dispatch(updateNewDeploymentSubscriptionState({ provider_name: provider_name }));
                      }}
                    />
                  </div>

                </>}
                {!byor && ressourceType === "cloud" && deployment_service_plan && !deployment_service_plan.is_custom &&
                  <>
                    <Col xs={0} sm={0} md={24} lg={24}>
                      <Card styles={{ body: { padding: 0 } }}>
                        <SelectVpsPlanTable deploymentId={deploymentServiceBySlug.id} subscriptionCategory={subscriptionCategory} />
                      </Card>
                    </Col>
                    <Col xs={24} sm={24} md={0} lg={0}>
                      <SelectVpsPlanCard deploymentId={deploymentServiceBySlug.id} subscriptionCategory={subscriptionCategory} />
                    </Col>
                  </>
                }
                {ressourceType === "managed" && !byor && (
                  <>
                    <Col xs={0} sm={0} md={24} lg={24}>
                      <Card styles={{ body: { padding: 0 } }}>
                        <SelectManagedRessourceTable />
                      </Card>
                    </Col>
                    <Col xs={24} sm={24} md={0} lg={0}>
                      <SelectManagedRessourcePlanCard deploymentId={deploymentServiceBySlug.id} subscriptionCategory={subscriptionCategory} />
                    </Col>
                  </>
                )
                }
              </>}
            <div style={{ padding: "8px 0" }}>
              <DeploymentDetailsCollapseContainer
                description={deploymentServiceBySlug.description}
                specifications={deploymentServiceBySlug.specifications}
              />
            </div>
          </Col>
          {/* Payment Sidebar - Only for Desktop */}
          {screens.lg &&
            !deploymentServiceBySlug.is_subscribed &&
            deployment_service_plan &&
            !deployment_service_plan.is_custom && (
              <Col xs={24} lg={8} style={{ position: "sticky", top: 16, alignSelf: "flex-start" }}>
                <PaymentSideBar
                  price={totalAmount}
                  buttonText={tdeployment("confirm")}
                  items={[
                    { label: tdeployment("svc"), value: deploymentServiceBySlug.name },
                    { label: tdeployment("plan"), value: deployment_service_plan?.plan.name || "" },

                    ...(managed_ressource_details ? [{
                      label: tdeployment("provider"),
                      value: managed_ressource_details?.provider_info?.name || "",
                    },
                    {
                      label: tdeployment("vpsType"),
                      value: managed_ressource_details?.service_name || "",
                    },
                    {
                      label: tdeployment("resourcePlan"),
                      value: managed_ressource_details?.plan_name || "",
                    },
                    ] : []),
                    {
                      label: tdeployment("prepaTime"),
                      value: deployment_service_plan?.preparation_time ?
                        `${deployment_service_plan?.preparation_time} ${deploymentServiceBySlug.service_slug == MOBILE_APPLICATION_SLUG ? tdeployment("days") : tdeployment("hours")}`
                        : "",
                    },
                    {
                      label: tdeployment("duration"),
                      value: (
                        <Select
                          {...(managed_ressource_details?.isManaged
                            ? { value: managed_ressource_details?.time_remaining }
                            : { value: duration })}
                          style={{ width: 150, borderRadius: "10px" }}
                          onChange={handleChangeDuration}
                          dropdownStyle={{
                            backgroundColor: theme.token.gray50,
                            border: `2px solid ${theme.token.gray100}`,
                          }}
                          options={
                            managed_ressource_details?.isManaged
                              ? [
                                {
                                  value: managed_ressource_details?.time_remaining,
                                  label: `${managed_ressource_details?.time_remaining} Months`,
                                },
                              ]
                              : options
                          }
                        />
                      ),
                    },
                    {
                      label: tdeployment("promoCode"),
                      value: <DeploymentPromoCodeTextField />,
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
