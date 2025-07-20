"use client";

import { Button } from "antd";
import { useScopedI18n } from "../../../../../../../../../locales/client";


export default function RenewTtkEpaySubscriptionComponents() {
    const tSubscription = useScopedI18n("subscription");
    
    return (
        <Button
            type="primary"
            // onClick={showDrawer}
            style={{
                backgroundColor: "#D85912",
                border: "none",
                boxShadow: "none",

            }}
        >
            <span
                style={{
                    color: "rgba(220, 233, 245, 0.88)",
                    fontSize: "16px",
                    fontWeight: 600,
                }}
            >
                {tSubscription("renew")}
            </span>
        </Button>
    );
}
