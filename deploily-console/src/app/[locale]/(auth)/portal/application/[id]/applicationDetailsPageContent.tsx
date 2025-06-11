"use client";
import { Col, Row } from "antd";
import { MediasCarousel, Rating } from "deploily-ui-components";
import ApplicationDetailsCollapseContainer from "./containers/applicationDetailsCollapseContainer";
import ApplicationDescriptionContainer from "./containers/descriptionContainer";
import SelectDurationContainer from "./containers/selectDurationContainer";
import SelectProviderContainer from "./containers/selectProviderContainer";
import SelectVpsPlanContainer from "./containers/selectVpsPlanContainer";
import SelectVpsTypeContainer from "./containers/selectVpsTypeContainer";

export default function ApplicationDetailsPageContent() {
    return (
        <>
            <Row style={{ justifyContent: 'center' }} gutter={[16, 16]}>
                <Col style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: '120px' }} span={12}>
                    <div style={{ padding: '8px 0' }}>
                        <MediasCarousel medias={[
                            {
                                id: 1,
                                image: "/images/app-car.png",
                                title: "TTK Epay"
                            },
                            {
                                id: 2,
                                image: "/images/app-car.png",
                                title: "TTK Epay"
                            },
                            {
                                id: 3,
                                image: "/images/app-car.png",
                                title: "TTK Epay"
                            }
                        ]} />
                    </div>
                    <div style={{ padding: '8px 0' }}>

                        <Rating ratingValue={3.5} />      </div>
                    <div style={{ padding: '8px 0' }}>
                        <ApplicationDetailsCollapseContainer />      </div>
                </Col>
                <Col span={12} >
                    <div style={{ padding: '8px 0' }}>
                        <ApplicationDescriptionContainer />
                    </div>
                    <div style={{ padding: '8px 0' }}>
                        <SelectDurationContainer />
                    </div>
                    <div style={{ padding: '8px 0' }}>
                        {/* //TODO : OPTIONSCONTAINER */}
                        <SelectProviderContainer />
                    </div>
                    <div style={{ padding: '8px 0' }}>
                        <SelectVpsTypeContainer />
                    </div>
                    <div style={{ padding: '8px 0' }}>
                        <SelectVpsPlanContainer />
                    </div>
                    {/* //TODO : RECOMENDATIONs CONTAINER */}

                </Col>
            </Row>

        </>
    );
}
