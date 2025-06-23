"use client";
import { useApplicationServiceById, useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";
import { fetchApplicationServiceById } from "@/lib/features/application/applicationServiceThunks";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { Card, Col, Row, Select, Skeleton } from "antd";
import { PaymentDrawer, PaymentSideBar } from "deploily-ui-components";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";
import ApplicationDetailsCollapseContainer from "./containers/applicationDetailsCollapseContainer";
import ApplicationPlansContainer from "./containers/applicationPlansContainer";
import ApplicationDescriptionContainer from "./containers/descriptionContainer";
import SelectVpsPlanTable from "./containers/selectVpsPlanTable";
import { theme } from "@/styles/theme";
import { options } from "../../api-services/utils/apiServicesConst";
import { updateNewAppSubscriptionState } from "@/lib/features/application/applicationServiceSlice";

export default function ApplicationDetailsPageContent({ applicationId }: { applicationId: any }) {
    const dispatch = useAppDispatch();
    const [openDrawer, setOpenDrawer] = useState(false);
    const onClose = () => {
        setOpenDrawer(false);
    };
    const { applicationServiceById, isLoading, loadingError} = useApplicationServiceById();

    const { totalAmount, duration, app_service_plan, resource_service_plan, } = useNewApplicationSubscription();
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
            {isLoading ? <div> <Skeleton active /></div> :
                loadingError ? <div>Error: {loadingError}</div> :
                    !applicationServiceById ? <div>No application found</div> :
                        <Row style={{ justifyContent: 'center' }} gutter={[16, 16]}>
                            <Col style={{ justifyContent: 'space-between', alignItems: 'center' }} span={16}>
                                <div >
                                    <ApplicationDescriptionContainer
                                        title={applicationServiceById.name}
                                        description={applicationServiceById.short_description} logo={
                                            <div style={{
                                                border: "1px solid #4E4E4E",
                                                borderRadius: "10px",
                                                padding: "1px"
                                            }}>
                                                <ImageFetcher
                                                    imagePath={applicationServiceById.image_service}
                                                    width={220}
                                                    height={220}
                                                />
                                            </div>
                                        } />
                                </div>
                                <div style={{ padding: '8px 0' }}>
                                    <ApplicationPlansContainer />
                                </div>
                                <Card styles={{body:{ padding: 0 }}}>
                                <SelectVpsPlanTable />
                                </Card>
                                <div style={{ padding: '8px 0' }}>
                                    <ApplicationDetailsCollapseContainer
                                        description={applicationServiceById.description}
                                   />
                                </div>
                            </Col>
                            <Col span={6} >
                                <PaymentSideBar
                                    price={totalAmount}
                                    buttonText={tApplications('confirm')}
                                    items={
                                        [
                                            {
                                                label: tApplications('svc'),
                                                value: applicationServiceById.name
                                            },
                                            {
                                                label: tApplications("plan"),
                                                value: `${app_service_plan ? app_service_plan?.plan.name : ""}`
                                            },
                                            {
                                                label: tApplications('duration'),
                                                value: <Select
                                                    defaultValue={duration}
                                                    style={{
                                                        width: 150,
                                                        borderRadius: "10px",
                                                    }}
                                                    onChange={handleChangeDuration}
                                                    dropdownStyle={{
                                                        backgroundColor: theme.token.gray50,
                                                        border: `2px solid ${theme.token.gray100}`
                                                    }}
                                                    options={options}
                                              />
                                            }, {
                                                label: tApplications('provider'),
                                                value: `${resource_service_plan && resource_service_plan?.plan ? resource_service_plan?.provider_info?.name : ""}`
                                            },
                                            {
                                                label: tApplications("vpsType"),
                                                value: `${resource_service_plan && resource_service_plan?.plan ? resource_service_plan?.service.name : ""}`

                                            },
                                            {
                                                label: tApplications('resourcePlan'),
                                                value: `${resource_service_plan && resource_service_plan?.plan ? resource_service_plan?.plan.name : ""}`
                                            }
                                        ]
                                    }
                                    onClick={() => setOpenDrawer(true)}
                                />
                            </Col>
                        </Row>}
            <PaymentDrawer
                openDrawer={openDrawer} onClose={onClose} />


        </>
    );
}
