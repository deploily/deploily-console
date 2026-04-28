"use client";
import {theme} from "@/styles/theme";
import {Col, Drawer, Input, Typography} from "antd";
import CreateProfileButton from "./containers/createProfileButton";
import IsBalanceSufficientComponent from "./containers/isBalanceSufficientComponent";
import PaymentComponent from "./containers/paymentComponent";
import SelectProfileComponent from "./containers/selectProfileComponent";
import {useApiServiceSubscriptionStates} from "@/lib/features/api-service-subscription-states/apiServiceSubscriptionSelectors";
import NewApiServiceSubscriptionInfo from "./containers/newApiServiceSubscriptionInfo";
import NewUpgradeApiServiceSubscriptionInfo from "./containers/newUpgradeApiServiceSubscriptionInfo";
import { updateApiServiceSubscriptionStates } from "@/lib/features/api-service-subscription-states/apiServiceSubscriptionSlice";
import { useAppDispatch } from "@/lib/hook";

export default function ApiServiceSubscriptionDrawer({
  openDrawer,
  onClose,
  planSelected,
  IsSubscribed,
  subscriptionOldId,
  drawerType,
}: {
  openDrawer: any;
  onClose: any;
  planSelected: any;
  IsSubscribed: any;
  subscriptionOldId: any;
  drawerType?: any;
}) {
  const dispatch=useAppDispatch();
  const {isBalanceSufficient, selectedProfile , phone} = useApiServiceSubscriptionStates();
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
          header: {borderBottom: "none", backgroundColor: theme.token.darkGray},
          body: {padding: 0, backgroundColor: theme.token.darkGray},
        }}
      >
        <Col style={{padding: 20}}>
          {IsSubscribed ? (
            <NewUpgradeApiServiceSubscriptionInfo planSelected={planSelected} />
          ) : (
            <NewApiServiceSubscriptionInfo planSelected={planSelected} />
          )}
          <Typography.Title level={4} style={{ paddingTop: 20, paddingBottom: 10 }}>
            {/* {translate("selectProfile")} */}
            Enter your phone number
          </Typography.Title>
          <Input
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => {
                        dispatch(updateApiServiceSubscriptionStates({phone: e.target.value}));
                      }}
                      onPressEnter={() => {
                        dispatch(updateApiServiceSubscriptionStates({phone: phone}));
                        }
                        }
                      style={{marginBottom: 0}}
          />
          <SelectProfileComponent />
          {selectedProfile !== undefined && (
            <div style={{padding: "5px 0px"}}>
              {isBalanceSufficient === true ? (
                <IsBalanceSufficientComponent
                  onClose={onClose}
                  planSelected={planSelected}
                  IsSubscribed={IsSubscribed}
                  subscriptionOldId={subscriptionOldId}
                  drawerType={drawerType}
                />
              ) : selectedProfile?.is_default_profile === true ? (
                <CreateProfileButton
                  planSelected={planSelected}
                  openDrawer={openDrawer}
                  onClose={onClose}
                />
              ) : (
                <PaymentComponent
                  selectedPlan={planSelected}
                  subscriptionOldId={subscriptionOldId}
                  IsSubscribed={IsSubscribed}
                  drawerType={drawerType}
                />
              )}
            </div>
          )}
        </Col>
      </Drawer>
    </>
  );
}
