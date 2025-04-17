"use client";
import { useSubscriptionStates } from "@/lib/features/subscription-states/subscriptionSelectors";
import { theme } from "@/styles/theme";
import { Col, Drawer } from "antd";
import CreateProfileButton from "./containers/createProfileButton";
import IsBalanceSufficientComponent from "./containers/isBalanceSufficientComponent";
import NewSubscriptionInfo from "./containers/newSubscriptionInfo";
import PaymentComponent from "./containers/paymentComponent";
import SelectProfileComponent from "./containers/selectProfileComponent";

export default function SubscriptionDrawer({ openDrawer, onClose, planSelected }: { openDrawer: any, onClose: any, planSelected: any }) {
  const { isBalanceSufficient, selectedProfile } = useSubscriptionStates()
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
          header: { borderBottom: "none", backgroundColor: theme.token.darkGray },
          body: { padding: 0, backgroundColor: theme.token.darkGray },
        }}
      >
        <Col style={{ padding: 20 }}>
          <NewSubscriptionInfo planSelected={planSelected} />
          <SelectProfileComponent></SelectProfileComponent>
          {selectedProfile !== undefined && <div style={{ padding: '5px 0px' }}>
            {isBalanceSufficient === true ?
              (<IsBalanceSufficientComponent onClose={onClose} planSelected={planSelected} />)
              : selectedProfile?.is_default_profile === true ?
                <CreateProfileButton planSelected={planSelected} openDrawer={openDrawer} onClose={onClose} />
                :
                <PaymentComponent selectedPlan={planSelected} />
            }
          </div>}
        </Col>
      </Drawer>
    </>
  )
}
