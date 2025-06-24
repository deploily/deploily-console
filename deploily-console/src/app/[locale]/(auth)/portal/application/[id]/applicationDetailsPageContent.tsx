"use client";

import { useApplicationServiceById, useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";
import { fetchApplicationServiceById } from "@/lib/features/application/applicationServiceThunks";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { Card, Col, Row, Select, Skeleton, Space } from "antd";
import { PaymentSideBar } from "deploily-ui-components";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import ApplicationDetailsCollapseContainer from "./containers/applicationDetailsCollapseContainer";
import ApplicationPlansContainer from "./containers/applicationPlansContainer";
import ApplicationDescriptionContainer from "./containers/descriptionContainer";
import SelectVpsPlanTable from "./containers/selectVpsPlanTable";
import { theme } from "@/styles/theme";
import { options } from "../../api-services/utils/apiServicesConst";
import { updateNewAppSubscriptionState } from "@/lib/features/application/applicationServiceSlice";
import PaymentDrawer from "./containers/payment-components/paymentDrawer";

export default function ApplicationDetailsPageContent({ applicationId }: { applicationId: any }) {
    const dispatch = useAppDispatch();
    const [openDrawer, setOpenDrawer] = useState(false);
    const onClose = () => setOpenDrawer(false);

    const { applicationServiceById, isLoading, loadingError } = useApplicationServiceById();
    const { totalAmount, duration, app_service_plan, resource_service_plan } = useNewApplicationSubscription();
    const tApplications = useScopedI18n('applications');

    const handleChangeDuration = (value: number) => {
        dispatch(updateNewAppSubscriptionState({ duration: value }));
    };

    useEffect(() => {
        dispatch(fetchApplicationServiceById(applicationId));
        dispatch(fetchServicePlans(applicationId));
    }, []);

    return (
        <>
            {isLoading ? (
                <div><Skeleton active /></div>
            ) : loadingError ? (
                <div>Error: {loadingError}</div>
            ) : !applicationServiceById ? (
                <div>No application found</div>
            ) : (

                <Space direction="vertical" size="large" 
                    style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20, justifyContent: "center" }}>

                                <Row gutter={[24, 24]} wrap style={{ justifyContent: "center" }}>
                                    {/* Main Content */}
                                    <Col xs={24} md={24} lg={16} style={{ overflowY: 'auto', paddingRight: '8px' }}>
                                        <ApplicationDescriptionContainer
                                            title={applicationServiceById.name}
                                            description={applicationServiceById.short_description}
                                            logo={
                                                <div style={{ border: "1px solid #4E4E4E", borderRadius: "10px", padding: "1px" }}>
                                                    <ImageFetcher imagePath={applicationServiceById.image_service} width={220} height={220} />
                                                </div>
                                            }
                                        />

                                        <div style={{ padding: '8px 0' }}>
                                            <ApplicationPlansContainer />
                                        </div>

                                        <Card styles={{ body: { padding: 0 } }}>
                                            <SelectVpsPlanTable />
                                        </Card>

                                        <div style={{ padding: '8px 0' }}>
                                            <ApplicationDetailsCollapseContainer description={applicationServiceById.description} />
                                        </div>
                                    </Col>

                                    {/* Payment Sidebar */}
                                    <Col xs={24} lg={8} md={0} style={{
                                        position: 'sticky', top: 16, alignSelf: 'flex-start',
                                        // justifyContent: 'center', display: 'flex'
                                    }}>
                                        <PaymentSideBar
                                            price={totalAmount}
                                            buttonText={tApplications('confirm')}
                                            items={[
                                                { label: tApplications('svc'), value: applicationServiceById.name },
                                                { label: tApplications("plan"), value: app_service_plan?.plan.name || "" },
                                                {
                                                    label: tApplications('duration'),
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
                                                { label: tApplications('provider'), value: resource_service_plan?.provider_info?.name || "" },
                                                { label: tApplications("vpsType"), value: resource_service_plan?.service?.name || "" },
                                                { label: tApplications('resourcePlan'), value: resource_service_plan?.plan?.name || "" },
                                            ]}
                                            onClick={() => setOpenDrawer(true)}
                                        />
                                    </Col>
                                </Row>

                </Space>
            )}

            <PaymentDrawer openDrawer={openDrawer} onClose={onClose} />
        </>
    );
}
