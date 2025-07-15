'use client';

import { useNewApplicationSubscription } from '@/lib/features/application/applicationServiceSelectors';
import { useServicePlansByType } from '@/lib/features/resourceServicePlans/resourceServicesPlansSelectors';
import { updateSelectedPlan } from '@/lib/features/resourceServicePlans/resourceServicesPlansSlice';
import { fetchResourceServicesPlans } from '@/lib/features/resourceServicePlans/resourceServicesPlansThunk';
import { useAppDispatch } from '@/lib/hook';
import { Typography } from 'antd';
import { TableComponentWithSelection } from 'deploily-ui-components';
import { useEffect } from 'react';
import { useScopedI18n } from '../../../../../../../../locales/client';
import { ResourceServicePlan } from '@/lib/features/resourceServicePlans/resourceServicesPlansInterface';


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
                  options: [plan.options.map((opt) => ([opt.html_content]))],
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
                <>
                  <Typography.Text>
                    {options != undefined ? options.join(' / ') : ""}
                  </Typography.Text>
                </>
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