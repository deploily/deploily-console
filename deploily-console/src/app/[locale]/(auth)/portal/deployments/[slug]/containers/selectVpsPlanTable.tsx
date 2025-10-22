"use client";

import { useMemo } from "react";
import { useAppDispatch } from "@/lib/hook";
import { Col, Row, Typography } from "antd";
import { Check } from "@phosphor-icons/react";
import { theme } from "@/styles/theme";
import { TableComponentWithSelection } from "deploily-ui-components";
import { useScopedI18n } from "../../../../../../../../locales/client";

import { useNewApplicationSubscription } from "@/lib/features/application/applicationServiceSelectors";
import { useServicePlansByType } from "@/lib/features/resourceServicePlans/resourceServicesPlansSelectors";
import { updateSelectedPlan } from "@/lib/features/resourceServicePlans/resourceServicesPlansSlice";
import { fetchResourceServicesPlans } from "@/lib/features/resourceServicePlans/resourceServicesPlansThunk";
import { getManagedResources } from "@/lib/features/cloud-resource/cloudResourceThunks";
import { ManagedRessourceDetails } from "@/lib/features/resourceServicePlans/resourceServicesPlansInterface";
import { ServicePlanOption } from "@/lib/features/service-plans/servicePlanInterface";
import { useManagedResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { useEffect } from "react";

interface SelectVpsPlanTableProps {
  onVpsPlanSelect?: (plan: ManagedRessourceDetails) => void;
  selectedVpsPlan?: ManagedRessourceDetails | null;
  deploymentId?: any;
  subscriptionCategory?: any;
}

export default function SelectVpsPlanTable({
  onVpsPlanSelect,
  selectedVpsPlan,
  deploymentId,
  subscriptionCategory,
}: SelectVpsPlanTableProps = {}) {
  const dispatch = useAppDispatch();
  const tApplications = useScopedI18n("applications");

  const { servicePlansList } = useServicePlansByType();
  const { managedResourceResponse } = useManagedResource();
  const { managed_ressource_details } = useNewApplicationSubscription();

  useEffect(() => {
    dispatch(fetchResourceServicesPlans({  subscriptionCategory }));
    dispatch(getManagedResources());
  }, [deploymentId, subscriptionCategory, dispatch]);

  // ✅ Combine managed resources + service plans (unique keys)
  const allPlans = useMemo(() => {
    const managed =
      (managedResourceResponse || []).map((plan) => ({
        ...plan,
        isManaged: true,
        isAlreadyPaid: true, // ✅ Managed resources are already paid
        options: Array.isArray(plan.options) ? plan.options : [],
      })) || [];

    const service =
      (servicePlansList?.result || []).map((plan) => ({
        ...plan,
        isManaged: false,
        isAlreadyPaid: false, // ✅ New service plans need payment
        options: Array.isArray(plan.options) ? plan.options : [],
      })) || [];

    return [...managed, ...service];
  }, [managedResourceResponse, servicePlansList]);

  // ✅ Use string keys to avoid collision
  const handlePlanChange = (selectedKey: string | number) => {
    const keyStr = String(selectedKey);
    const foundPlan = allPlans.find(
      (element) =>
        `${element.isManaged ? "managed" : "service"}-${element.id}` === keyStr
    );

    if (foundPlan) {
      dispatch(updateSelectedPlan(foundPlan));
      onVpsPlanSelect?.(foundPlan);
    }
  };

  const getSelectedRowKey = (): string | undefined => {
    if (selectedVpsPlan)
      return `${selectedVpsPlan.isManaged ? "managed" : "service"}-${selectedVpsPlan.id}`;
    if (managed_ressource_details){
      return `managed-${managed_ressource_details.id}`;
    }
    return undefined;
  };

  return (
    <div>
      {allPlans.length > 0 && (
        <TableComponentWithSelection
          selectedRowId={getSelectedRowKey()}
          onChange={handlePlanChange}
          data={allPlans.map((plan) => ({
            key: `${plan.isManaged ? "managed" : "service"}-${plan.id}`,
            resource: plan,
            options: Array.isArray(plan.options)
              ? plan.options.filter((option: ServicePlanOption) =>
                ["ram", "cpu", "disque"].includes(option.option_type)
              )
              : [],
            price: plan.price,
            preparation_time: plan.preparation_time,
            isManaged: plan.isManaged,
          }))}
          columns={[
            {
              title: tApplications("resource"),
              dataIndex: "resource",
              render: (plan: any) =>
                plan ? (
                  <div style={{ color: "white" }}>
                    <a href={`/portal/cloud-resources/${plan.service_id}`}>
                      {plan.isManaged && (
                        <span
                          style={{
                            color: theme.token.colorSuccess,
                            fontWeight: "bold",
                            marginRight: 8,
                          }}
                        >
                          {tApplications("managed")}
                        </span>
                      )}
                      {`${plan.provider_info?.name || ""} / ${plan.plan_name}`}
                    </a>
                  </div>
                ) : null,
            },
            {
              title: tApplications("options"),
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
                          {row.html_content} 
                        </Typography.Paragraph>
                      </Col>
                    </Row>
                  ))}
                </div>
              ),
            },
            {
              title: tApplications("preparation_time"),
              dataIndex: "preparation_time",
              render: (preparation_time) => (
                <Typography.Text>
                  {preparation_time} {tApplications("hours")}
                </Typography.Text>
              ),
            },
            {
              title: tApplications('price'),
              dataIndex: 'price',
              fixed: 'right',
              width: 100,
              render: (price, record) =>
                record.isManaged && record.isAlreadyPaid ? (
                  <Typography.Text style={{ color: theme.token.gray300 }}>—</Typography.Text>
                ) : (
                  <Typography.Text>{`${price?.toLocaleString()} DZD`}</Typography.Text>
                ),
            }
          ]}
        />
      )}
    </div>
  );
}

