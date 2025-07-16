'use client';
import { useNewApplicationSubscription } from '@/lib/features/application/applicationServiceSelectors';
import { useServicePlansByType } from '@/lib/features/resourceServicePlans/resourceServicesPlansSelectors';
import { updateSelectedPlan } from '@/lib/features/resourceServicePlans/resourceServicesPlansSlice';
import { fetchResourceServicesPlans } from '@/lib/features/resourceServicePlans/resourceServicesPlansThunk';
import { ServicePlanOption } from '@/lib/features/service-plans/servicePlanInterface';
import { useAppDispatch } from '@/lib/hook';
import { theme } from '@/styles/theme';
import { Check } from '@phosphor-icons/react';
import { Col, Row, Typography } from 'antd';
import { TableComponentWithSelection } from 'deploily-ui-components';
import { useEffect } from 'react';
import { useScopedI18n } from '../../../../../../../../locales/client';

export default function SelectVpsPlanTable() {
  const dispatch = useAppDispatch();
  const tApplications = useScopedI18n('applications')

  const { servicePlansList } = useServicePlansByType()
  const { resource_service_plan } = useNewApplicationSubscription()

  useEffect(() => {
    dispatch(fetchResourceServicesPlans());
  }, []);


  const handlePlanChange = (selectedPlan: any) => {
    dispatch(updateSelectedPlan(servicePlansList?.result.find((element) => element.id == selectedPlan)))
  };

  console.log(servicePlansList);


  return (
    <div>
      {servicePlansList !== undefined &&
        <TableComponentWithSelection
          selectedRowId={resource_service_plan != undefined ? resource_service_plan.id : undefined}
          onChange={handlePlanChange}
          data={
            servicePlansList?.result ? servicePlansList?.result.map((plan) => {
              if (plan.provider_info !== undefined) {
                return {
                  key: plan.id,
                  resource: plan,
                  options: plan.options,
                  price: plan.price,

                }
              }
            }
            ) as [] : []}
          columns={[
            {
              title: tApplications('resource'),
              dataIndex: "resource",
              render: (plan) => plan != undefined ? <div style={{ color: 'white' }}>
                <a href={plan.provider_info?.website}>
                  {`${plan.provider_info?.name}`}
                </a>
                {`/ ${plan.plan_name}`}
              </div> : undefined,
            },

            {
              title: tApplications('options'),
              dataIndex: "options",
              render: (options) => (
                <div style={{ flex: 1, paddingBottom: "16px" }}>
                  {options.map((row: ServicePlanOption) => (
                    <Row gutter={16} key={row.id} align="middle">
                      <Col span={3}>
                        {row.icon ? row.icon : <Check size={24} color={theme.token.gray100} />}
                      </Col>
                      <Col span={21}>
                        <Typography.Paragraph
                          style={{
                            fontSize: 16,
                            color: "white",
                            margin: 0,
                            display: "flex",
                            alignItems: "center",
                            minHeight: 24,
                          }}
                        >
                          {/* <div
                            dangerouslySetInnerHTML={{ __html: }}
                            style={{ margin: 0, lineHeight: "24px" }}
                          />  */}
                          {row.html_content}
                        </Typography.Paragraph>
                      </Col>
                    </Row>
                  ))}
                </div>
              ),
            },
            {
              title: tApplications('preparation_time'),
              dataIndex: "preparation_time",
              render: (resource) => <Typography.Text>
                {resource}
              </Typography.Text>,
            },
            {
              title: tApplications('price'),
              dataIndex: "price",
              fixed: 'right', // ✅ Keeps the column pinned
              width: 100,
              render: (price) => (
                <Typography.Text>{`${price} DZD`}</Typography.Text>
              ),
            },
          ]
          }
        />}
    </div>
  );
}
