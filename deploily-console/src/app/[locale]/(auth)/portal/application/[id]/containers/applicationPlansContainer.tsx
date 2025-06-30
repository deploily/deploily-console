'use client';
import { useNewApplicationSubscription } from '@/lib/features/application/applicationServiceSelectors';
import { updateNewAppSubscriptionState } from '@/lib/features/application/applicationServiceSlice';
import { useServicePlan } from '@/lib/features/service-plans/servicePlanSelector';
import { useAppDispatch } from '@/lib/hook';
import { theme } from '@/styles/theme';
import { Col, Row } from 'antd';
import { PlanCard } from 'deploily-ui-components';

export default function ApplicationPlansContainer() {
    //TODO : ADD TRANSLATION
    const dispatch = useAppDispatch();
    const { servicePlanResponse } = useServicePlan()
    const { app_service_plan } = useNewApplicationSubscription()


    return (
        <Row gutter={[16, 24]} justify="start">
            {servicePlanResponse !== undefined &&
                servicePlanResponse.result.map(plan => {
                    return <Col xs={24} sm={24} md={12} lg={12} xl={10} xxl={8}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "0.5rem",
                        }}
                        span={Math.floor(24 / servicePlanResponse.result.length)}
                        key={plan.id.toString()}
                    // style={{ maxWidth: '280px' }}
                    >
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", maxWidth: 350, }}>

                            <PlanCard
                                id={plan.id}
                                price={plan.price}
                                styles={{
                                    color: app_service_plan != undefined && app_service_plan.id == plan.id ? theme.token.orange600 : undefined,
                                }}
                                options={
                                    plan.options.map(opt => ({
                                        id: opt.id,
                                        icon: opt.icon,
                                        html_content: opt.html_content
                                    }))
                                }
                                title={plan.plan.name}
                                onClick={() => dispatch(updateNewAppSubscriptionState({ app_service_plan: plan }))}
                            />
                        </div>
                    </Col>
                }
                )
            }

        </Row>
    );
}
