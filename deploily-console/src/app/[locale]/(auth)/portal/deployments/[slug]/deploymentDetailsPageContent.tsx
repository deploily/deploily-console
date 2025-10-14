"use client";

import {
  useDeploymentServiceBySlug,
  useNewDeploymentSubscription
} from "@/lib/features/deployment/deploymentServiceSelectors";
import { updateNewDeploymentSubscriptionState } from "@/lib/features/deployment/deploymentServiceSlice";
import { fetchDeploymentServiceBySlug } from "@/lib/features/deployment/deploymentsServiceThunks";
import { fetchResourceServicesPlans } from "@/lib/features/resourceServicePlans/resourceServicesPlansThunk";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { HomeOutlined } from "@ant-design/icons";
import { Card, Col, Grid, Row, Select, Skeleton, Space } from "antd";
import PaymentSideBar, {
  PaymentAppBar,
} from "deploily-ui-components/components/Deployments/paymentSideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import { options } from "../utils/deploymentConst";
import DeploymentDetailsCollapseContainer from "./containers/deploymentDetailsCollapseContainer";
import DeploymentPlansContainer from "./containers/deploymentPlansContainer";
import DeploymentPromoCodeTextField from "./containers/deploymentPromoCodeTextField";
import DeployementDescriptionContainer from "./containers/descriptionContainer";
import PaymentDrawer from "./containers/payment-components/paymentDrawer";
import SelectVpsPlanTable from "./containers/selectVpsPlanTable";

export default function DeploymentDetailsPageContent({
  deploymentSlug,
}: {
  deploymentSlug: any;
}) {
  const tdeployment = useScopedI18n("deployment");
  const t = useI18n();
  const dispatch = useAppDispatch();
  const screens = Grid.useBreakpoint();
  const [isScrolled, setIsScrolled] = useState(false);
  const [subscriptionCategory, setSubscriptionCategory] = useState("yearly");
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [fromPage, setFromPage] = useState<"seeAll" | "home" | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const onClose = () => setOpenDrawer(false);

  const { isLoading, deploymentServiceBySlug, loadingError } = useDeploymentServiceBySlug();
  const {
    totalAmount,
    duration,
    // selected_version,
    deployment_service_plan,
    managed_ressource_details,
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
    // dispatch(fetchServicePlans(deploymentServiceId));

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


  if (isLoading) return <Skeleton active />;
  if (loadingError) return <div>Error: {loadingError}</div>;
  if (!deploymentServiceBySlug) return <div>No Deployment found</div>;

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
            {deployment_service_plan && !deployment_service_plan.is_custom && (
              <Card styles={{ body: { padding: 0 } }}>
                <SelectVpsPlanTable
                  deploymentId={deploymentServiceBySlug.id}
                  subscriptionCategory={subscriptionCategory}
                />
              </Card>
            )}
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

                    {
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
                    {
                      label: tdeployment("prepaTime"),
                      value: `${managed_ressource_details?.preparation_time} h` || "",
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
                    //       style={{ width: 150, borderRadius: "10px" }}
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
                      label: tdeployment("duration"),
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
