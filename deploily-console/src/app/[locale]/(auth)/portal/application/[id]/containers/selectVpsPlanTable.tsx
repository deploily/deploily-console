'use client';
import { useServicePlansByType } from '@/lib/features/resourceServicePlans/resourceServicesPlansSelectors';
import { updateSelectedPlan } from '@/lib/features/resourceServicePlans/resourceServicesPlansSlice';
import { fetchServicePlansByType } from '@/lib/features/resourceServicePlans/resourceServicesPlansThunk';
import { useAppDispatch } from '@/lib/hook';
import { Typography } from 'antd';
import { TableComponentWithSelection } from 'deploily-ui-components';
import { useEffect } from 'react';

export default function SelectVpsPlanTable() {
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchServicePlansByType({ page: 0, page_size: 10, service_plan_type: 'ressource' }));
  }, [])


  const { servicePlansList, servicePlansIsloading, servicePlansloadingError } = useServicePlansByType()
  // console.log('Cloud Resource Response:', cloudResourceResponse);



  const handlePlanChange = (selectedPlan: any) => {
    console.log(selectedPlan);

    dispatch(updateSelectedPlan(servicePlansList?.result.find((element) => element.id > selectedPlan.key)))
  };

  return (
    <div>
      {servicePlansList !== undefined && <TableComponentWithSelection
        onChange={handlePlanChange}
        data={
          servicePlansList?.result ? servicePlansList?.result.map((plan) => {
            if (plan.provider_info !== undefined && plan.service != undefined) {
              return {
                key: plan.id,
                provider: plan.provider_info,
                resource: plan.service.name,
                options: [plan.options.map((opt) => ([opt.html_content]))],
              }
            }
          }
          ) as [] : []}
        //TODO TRANSLATE 
        columns={[
          {
            title: 'provider',
            dataIndex: "provider",
            render: (provider) => provider != undefined ? <div style={{ color: 'white' }}><a href={provider.website}>{provider.name}</a></div> : undefined,
          },
          {
            title: 'resource',
            dataIndex: "resource",
            render: (resource) => <Typography.Text>
              {resource}
            </Typography.Text>,
          },
          {
            title: 'options',
            dataIndex: "options",
            render: (options) => (
              <>
                <Typography.Text>
                  {options != undefined && options.join(' / ')}
                </Typography.Text>
              </>
            ),
          }
        ]
        }
      />}
    </div>
  );
}
