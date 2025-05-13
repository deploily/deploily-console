"use client";

import { Typography } from "antd";





export default function ResourceDetailsContentPage({ resourceId }: { resourceId: string }) {

    return (
        <>
            <Typography.Title>{resourceId}</Typography.Title>

        </>
    )

}