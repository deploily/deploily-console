'use client';
import { useNewApplicationSubscription } from '@/lib/features/application/applicationServiceSelectors';
import { useServicePlansByType } from '@/lib/features/resourceServicePlans/resourceServicesPlansSelectors';
import {  updateSelectedPlan } from '@/lib/features/resourceServicePlans/resourceServicesPlansSlice';
import { useAppDispatch } from '@/lib/hook';
import { Typography } from 'antd';
import { TableComponentWithSelection } from 'deploily-ui-components';
import { useEffect } from 'react';
import { useScopedI18n } from '../../../../../../../../locales/client';
import { fetchResourceServicesPlans } from '@/lib/features/resourceServicePlans/resourceServicesPlansThunk';

export default function SelectVpsPlanTable() {
  const dispatch = useAppDispatch();
  const tApplications = useScopedI18n('applications')

  const { servicePlansList } = useServicePlansByType()

  const { resource_service_plan } = useNewApplicationSubscription()

  useEffect(() => {
    dispatch(fetchResourceServicesPlans());
  },[]);


  const handlePlanChange = (selectedPlan: any) => {
    dispatch(updateSelectedPlan(servicePlansList?.result.find((element) => element.id == selectedPlan)))
  };

  return (
    <div>
      {servicePlansList !== undefined &&
        <TableComponentWithSelection
          selectedRowId={resource_service_plan != undefined ? resource_service_plan.id : undefined}
          onChange={handlePlanChange}
          data={
            servicePlansList?.result ? servicePlansList?.result.map((plan) => {
              if (plan.provider_info !== undefined && plan.service != undefined) {
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
                {`/ ${plan.plan.name}`}
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
