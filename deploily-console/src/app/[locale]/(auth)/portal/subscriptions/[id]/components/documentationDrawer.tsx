import { theme } from "@/styles/theme";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import {  Collapse, Drawer, Row } from "antd";
import { SubscribeInterface } from "@/lib/features/subscribe/subscribeInterface";

import { subscriptionDetails } from "./subscriptionDetails";

export default function DocumentationDrawer({ openDrawer, onClose, currentSubscribe, t }: { openDrawer: any, onClose: any, currentSubscribe: SubscribeInterface, t: any }) {
    return (
        <Drawer
            title="Documentation"
            placement="right"
            onClose={onClose}
            open={openDrawer}
            getContainer={false}
            width={600}

        >
            <Row gutter={[16, 10]} key={currentSubscribe.id}  >
                <Collapse
                    bordered={false}
                    defaultActiveKey={["1", "2"]}
                    expandIcon={({ isActive }) => (isActive ? <CaretUp /> : <CaretDown />)}
                    expandIconPosition="end"
                    style={{
                        background: theme.token.darkGray, border: "1px solid",
                        borderColor: theme.token.gray100, width: "100%"
                    }}
                    items={subscriptionDetails(currentSubscribe, t)}
                />
            </Row>
        </Drawer>
    )
}