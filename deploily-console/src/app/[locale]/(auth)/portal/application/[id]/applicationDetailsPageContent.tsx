"use client";
import { useApplicationServiceById, useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";
import { fetchApplicationServiceById } from "@/lib/features/application/applicationServiceThunks";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { Col, Row } from "antd";
import { MediasCarousel, PaymentSideBar, Rating } from "deploily-ui-components";
import { useEffect } from "react";
import ApplicationDetailsCollapseContainer from "./containers/applicationDetailsCollapseContainer";
import ApplicationPlansContainer from "./containers/applicationPlansContainer";
import ApplicationDescriptionContainer from "./containers/descriptionContainer";
import SelectDurationContainer from "./containers/selectDurationContainer";
import SelectVpsPlanTable from "./containers/selectVpsPlanTable";

export default function ApplicationDetailsPageContent({ applicationId }: { applicationId: any }) {

    const dispatch = useAppDispatch();

    const { applicationServiceById,
        isLoading,
        loadingError, } = useApplicationServiceById();
    const { totalAmount,service_plan_selected_id,duration } = useNewApplicationSubscription();

    // Fetch application service by ID and service plans when the component mounts
    useEffect(() => {
        dispatch(fetchApplicationServiceById(applicationId));
        dispatch(fetchServicePlans(applicationId));
    }, [])


    return (
        <>
            {isLoading ? <div>Loading...</div> :
                loadingError ? <div>Error: {loadingError}</div> :
                    !applicationServiceById ? <div>No application found</div> :
                        <Row style={{ justifyContent: 'center' }} gutter={[16, 16]}>
                            <Col style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: '120px' }} span={10}>
                                <div style={{ padding: '8px 0' }}>
                                    <MediasCarousel medias={applicationServiceById.medias} />
                                </div>
                                <div style={{ padding: '8px 0' }}>

                                    <Rating ratingValue={3.5} />
                                </div>
                                <div style={{ padding: '8px 0' }}>
                                    <ApplicationDetailsCollapseContainer
                                        ssh={applicationServiceById.ssh_access}
                                        description={applicationServiceById.description}
                                        monitoring={applicationServiceById.monitoring} />
                                </div>

                                <SelectVpsPlanTable />
                            </Col>
                            <Col span={10} >
                                <div style={{ padding: '8px 0' }}>
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
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>
                                        } />
                                </div>
                                <div style={{ padding: '8px 0' }}>
                                    <SelectDurationContainer />
                                </div>
                                <div style={{ padding: '8px 0' }}>
                                    <ApplicationPlansContainer />
                                </div>
                                {/* //TODO : RECOMENDATIONs CONTAINER */}

                            </Col>
                            <Col span={4} >
                                <PaymentSideBar 
                                    price={totalAmount}
                                    buttonText={'confirm'}//TODO ADD TRANSLATION
                                    items={//TODO ADD TRANSLATION
                                        [
                                            {   
                                                label:"service_name",
                                                value: applicationServiceById.name
                                            }, 
                                            {
                                                label:"options",
                                                value: `${service_plan_selected_id}`
                                            },
                                            {
                                                label:"duration",
                                                value: `${duration} month`
                                            },                                            {
                                                label:"Resource provider :",
                                                value: `issal`
                                            },
                                            {
                                                label:"vps type :",
                                                value: `FleXCompute - Starter `
                                            },
                                            {
                                                label:"plan :",
                                                value: `2 vCPU / 4Go`
                                            },
                                        ]
                                    }
                                    onClick={()=>{} }/>
                            </Col>
                        </Row>}

        </>
    );
}
