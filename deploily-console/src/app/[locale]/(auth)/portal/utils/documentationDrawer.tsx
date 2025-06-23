import { theme } from "@/styles/theme";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { Collapse, Drawer, Row } from "antd";

import { subscriptionDetails } from "./subscriptionDetails";
import { ApiServiceSubscriptionInterface } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionInterface";

export default function DocumentationDrawer({ openDrawer, onClose, currentApiServiceSubscription, t }: { openDrawer: any, onClose: any, currentApiServiceSubscription: ApiServiceSubscriptionInterface, t: any }) {
    return (
        <Drawer
            title="Documentation"
            placement="right"
            onClose={onClose}
            open={openDrawer}
            getContainer={false}
            width={600}

        >
            <Row gutter={[16, 10]} key={currentApiServiceSubscription.id}  >
                <Collapse
                    bordered={false}
                    defaultActiveKey={["1", "2"]}
                    expandIcon={({ isActive }) => (isActive ? <CaretUp /> : <CaretDown />)}
                    expandIconPosition="end"
                    style={{
                        background: theme.token.darkGray, border: "1px solid",
                        borderColor: theme.token.gray100, width: "100%"
                    }}
                    items={subscriptionDetails(currentApiServiceSubscription, t)}
                />
            </Row>
        </Drawer>
    )
}