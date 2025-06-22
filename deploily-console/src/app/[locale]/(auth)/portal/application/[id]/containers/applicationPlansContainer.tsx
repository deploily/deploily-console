'use client';
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


    return (
        <Row gutter={[16, 16]}>
            {servicePlanResponse !== undefined &&
                servicePlanResponse.result.map(plan => {
                    return <Col span={Math.floor(24 / servicePlanResponse.result.length)} key={plan.id.toString()} style={{maxWidth:'280px'}}>
                        <PlanCard
                            id={plan.id}
                            price={plan.price}
                            styles={{
                                color: theme.token.orange600,
                                boxShadow :`1px 1px 1px 1px ${theme.token.orange600}`
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
                    </Col>
                }
                )
            }

        </Row>
    );
}
