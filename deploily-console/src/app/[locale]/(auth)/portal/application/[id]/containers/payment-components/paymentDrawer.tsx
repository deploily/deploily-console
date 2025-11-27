"use client";
import {
  useApplicationServiceById,
  useNewApplicationSubscription,
} from "@/lib/features/application/applicationServiceSelectors";
import {updateNewAppSubscriptionState} from "@/lib/features/application/applicationServiceSlice";
import {applicationSubscribe} from "@/lib/features/application/applicationServiceThunks";
import {useNotDefaultPaymentProfiles} from "@/lib/features/payment-profiles/paymentProfilesSelectors";
import {fetchNotDefaultPaymentProfiles} from "@/lib/features/payment-profiles/paymentProfilesThunks";
import {useAppDispatch} from "@/lib/hook";
import {Col, Drawer} from "antd";
import NewSubscriptionInfo from "deploily-ui-components/components/payment/newSubscriptionInfo";
import SelectProfileComponent from "deploily-ui-components/components/payment/selectProfile";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useScopedI18n} from "../../../../../../../../../locales/client";
import CreateProfileButton from "../../../../api-services/[id]/components/subscriptionDrawer/containers/createProfileButton";
import ApplicationPaymentComponent from "../applicationPaymentComponent";
import IsBalanceSufficientComponent from "./isBalanceSufficientComponent";

export default function PaymentDrawer({openDrawer, onClose}: {openDrawer: any; onClose: any}) {
  const router = useRouter();
  const tApplications = useScopedI18n("applications");
  const tSubscription = useScopedI18n("subscription");

  const dispatch = useAppDispatch();
  const {applicationServiceById} = useApplicationServiceById();
  const {paymentProfilesList} = useNotDefaultPaymentProfiles();
  const {
    promoCode,
    totalAmount,
    duration,
    selected_version,
    app_service_plan,
    managed_ressource_details,
    selectedProfile,
    isBalanceSufficient,
  } = useNewApplicationSubscription();

  const handleSelectPaymentProfile = (value: any) => {
    const newSelectedProfile = paymentProfilesList?.result.find((profile) => profile.id === value);
    dispatch(updateNewAppSubscriptionState({selectedProfile: newSelectedProfile}));
  };

  const handleSubscribe = async () => {
    if (
      app_service_plan != undefined &&
      managed_ressource_details != undefined &&
      selectedProfile != undefined
    ) {
      const newSubscriptionObject = {
        duration: Number.parseInt(`${duration}`),
        promo_code: promoCode,
        payment_method: "cloud_credit",
        service_plan_selected_id: app_service_plan.id,
        ...(managed_ressource_details.isManaged
          ? {managed_ressource_id: managed_ressource_details.managed_ressource_id}
          : {ressource_service_plan_selected_id: managed_ressource_details.id}),
        profile_id: selectedProfile.id,
        version_selected_id: selected_version?.id,
        managed_ressource_id: managed_ressource_details.id,
      };
      dispatch(
        applicationSubscribe({
          service_slug: applicationServiceById?.service_slug,
          data: newSubscriptionObject,
        }),
      ).then((response: any) => {
        if (response.meta.requestStatus === "fulfilled") {
          router.push(`/portal/my-applications`);
        }
      });
    }
  };

  useEffect(() => {
    dispatch(fetchNotDefaultPaymentProfiles());
  }, []);
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
            borderBottom: "none",
            background: "#202227",
          },
          body: {
            padding: 0,
            background: "#202227",
          },
        }}
      >
        <Col style={{padding: 20}}>
          <NewSubscriptionInfo
            title={`${tApplications("order")}`}
            newSubscriptionInfo={{
              applicationName: {
                label: tApplications("svc"),
                value: `${applicationServiceById?.name}`,
              },
              options: {
                label: tApplications("plan"),
                value: `${app_service_plan?.plan.name}`,
              },
              prepaTime: {
                label: tApplications("prepaTime"),
                value: `${managed_ressource_details?.preparation_time} h` || "",
              },
              duration: {
                label: tApplications("duration"),
                value: `${duration}`,
              },
              version: {
                label: tApplications("version"),
                value: `${selected_version?.name}`,
              },
              providerName: {
                label: tApplications("provider"),
                value: `${managed_ressource_details?.provider_info?.name}`,
              },
              resourceType: {
                label: tApplications("vpsType"),
                value: `${managed_ressource_details?.service_name ?? ""}`,
              },
              resourcePlanOptions: {
                label: tApplications("resourcePlan"),
                value: `${managed_ressource_details?.plan_name ?? ""}`,
              },
              totalAmount: {
                label: tApplications("total"),
                value: `${totalAmount}`,
              },
            }}
          />
          {paymentProfilesList?.count != undefined && paymentProfilesList?.count > 0 && (
            <SelectProfileComponent
              translations={{
                title: tSubscription("selectProfile"),
                profile: tSubscription("profile"),
                balance: tSubscription("balance"),
              }}
              selectedProfile={selectedProfile}
              paymentProfilesList={paymentProfilesList}
              onSelectProfile={handleSelectPaymentProfile}
            />
          )}
          {
            <div style={{padding: "5px 0px"}}>
              {isBalanceSufficient === true ? (
                <IsBalanceSufficientComponent
                  onClose={onClose}
                  handleSubscribe={() => handleSubscribe()}
                />
              ) : paymentProfilesList?.count === 0 ? (
                <CreateProfileButton
                  planSelected={undefined}
                  openDrawer={openDrawer}
                  onClose={onClose}
                />
              ) : (
                <ApplicationPaymentComponent />
              )}
            </div>
          }
        </Col>
      </Drawer>
    </>
  );
}
