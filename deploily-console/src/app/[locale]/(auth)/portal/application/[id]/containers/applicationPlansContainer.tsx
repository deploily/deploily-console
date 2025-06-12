'use client';
import { useServicePlan } from '@/lib/features/service-plans/servicePlanSelector';
import { useAppDispatch } from '@/lib/hook';
import { Col, Row } from 'antd';
import { PlanCard } from 'deploily-ui-components';

export default function ApplicationPlansContainer() {
    //TODO : ADD TRANSLATION
    const dispatch = useAppDispatch();
    const { servicePlanResponse, servicePlanLoading, servicePlanError } = useServicePlan()

    return (
        <Row gutter={[16, 16]}>
            {servicePlanResponse !== undefined &&
                servicePlanResponse.result.map(plan => {
                    console.log("Rendering plan:", plan);
                    return <Col span={Math.floor(24 / servicePlanResponse.result.length)} key={plan.id.toString()}>
                        <PlanCard
                            options={
                                plan.options.map(opt => ({
                                    id: opt.id,
                                    icon: opt.icon,
                                    html_content: opt.html_content
                                }))
                            }
                            title={plan.plan.name}
                        />
                    </Col>
                }
                )
            }

        </Row>
    );
}
