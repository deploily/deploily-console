'use client';

import { useNewApplicationSubscription } from '@/lib/features/application/applicationServiceSelectors';
import { ResourceServicePlan } from '@/lib/features/resourceServicePlans/resourceServicesPlansInterface';
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


interface SelectVpsPlanTableProps {
  onVpsPlanSelect?: (plan: ResourceServicePlan) => void;
  selectedVpsPlan?: ResourceServicePlan | null;
}

export default function SelectVpsPlanTable({
  onVpsPlanSelect,
  selectedVpsPlan
}: SelectVpsPlanTableProps = {}) {
  const dispatch = useAppDispatch();
  const tApplications = useScopedI18n('applications');

  const { servicePlansList } = useServicePlansByType();
  const { resource_service_plan } = useNewApplicationSubscription();

  useEffect(() => {
    dispatch(fetchResourceServicesPlans());
  }, []);

  const handlePlanChange = (selectedPlan: any) => {
    const foundPlan = servicePlansList?.result.find((element) => element.id == selectedPlan);

    if (foundPlan) {
      // Update Redux state (keep existing functionality)
      dispatch(updateSelectedPlan(foundPlan));

      // Call parent component callback if provided
      if (onVpsPlanSelect) {
        onVpsPlanSelect(foundPlan);
      }
    }
  };

  // Determine selected row ID - use prop if provided, otherwise use Redux state
  const getSelectedRowId = () => {
    if (selectedVpsPlan) {
      return selectedVpsPlan.id;
    }
    return resource_service_plan?.id;
  };

  console.log(servicePlansList?.result ? servicePlansList?.result.map((plan) => {
    if (plan.provider_info !== undefined) {
      return {
        key: plan.id,
        resource: plan,
        options: plan.options.filter(option =>
          ["ram", "cpu", "disque"].includes(option.option_type)
        ),
        price: plan.price,
      }
    }
  }
  ) : []);


  return (
    <div>
      {servicePlansList !== undefined &&
        <TableComponentWithSelection
          selectedRowId={getSelectedRowId()}
          onChange={handlePlanChange}
          data={
            servicePlansList?.result ? servicePlansList?.result.map((plan) => {
              if (plan.provider_info !== undefined) {
                return {
                  key: plan.id,
                  resource: plan,
                  options: plan.options.filter(option =>
                    ["ram", "cpu", "disque"].includes(option.option_type)
                  ),
                  price: plan.price,
                  preparation_time: plan.preparation_time,
                  // serviceId:plan.service_id,//TODO NEED TO BE ADDED IN THE BACKEND
                }
              }
            }
            ) as [] : []}
          columns={[
            {
              title: tApplications('resource'),
              dataIndex: "resource",
              render: (plan) => plan != undefined ? <div style={{ color: 'white' }}>
                {`${plan.provider_info?.name}`}
                {/* <a href={plan.provider_info?.website}>
                   {`/portal/cloud-resources/${plan.}`}
                </a> */}
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
              render: (preparation_time) => <Typography.Text>
                {preparation_time} {tApplications('hours')}
              </Typography.Text>,
            },
            {
              title: tApplications('price'),
              dataIndex: "price",
              fixed: 'right',
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