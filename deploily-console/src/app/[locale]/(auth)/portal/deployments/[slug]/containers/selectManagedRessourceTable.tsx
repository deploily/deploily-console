"use client";

import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Check } from "@phosphor-icons/react";
import { Col, Row, Typography } from "antd";
import { TableComponentWithSelection } from "deploily-ui-components";
import { useScopedI18n } from "../../../../../../../../locales/client";

import { useVpsManagedResource } from "@/lib/features/cloud-resource/cloudResourceSelectors";
import { ManagedRessourceDetails } from "@/lib/features/resourceServicePlans/resourceServicesPlansInterface";
import { updateSelectedPlan } from "@/lib/features/resourceServicePlans/resourceServicesPlansSlice";
import { ServicePlanOption } from "@/lib/features/service-plans/servicePlanInterface";
import { useNewDeploymentSubscription } from "@/lib/features/deployment/deploymentServiceSelectors";

interface SelectVpsPlanTableProps {
  onVpsPlanSelect?: (plan: ManagedRessourceDetails) => void;
}
export default function SelectManagedRessourceTable({
  onVpsPlanSelect,
}: SelectVpsPlanTableProps = {}) {
  const dispatch = useAppDispatch();
  const tApplications = useScopedI18n("applications");

  const { vpsManagedResourceResponse } = useVpsManagedResource();
  const { managed_ressource_details } = useNewDeploymentSubscription();

  const handlePlanChange = (selectedKey: string | number) => {
    const foundPlan = vpsManagedResourceResponse?.find(
      (element) => element.id == selectedKey,
    );

    if (foundPlan) {
      dispatch(updateSelectedPlan({
        ...foundPlan,
        isManaged: true,
        isAlreadyPaid: true,
      }));

      // Call the callback if provided
      onVpsPlanSelect?.(foundPlan);
    }
  };

  // Ensure we're using the correct ID for selection
  const selectedRowKey = managed_ressource_details?.isManaged
    ? `${managed_ressource_details.id}`
    : undefined;

  return (
    <div>
      {vpsManagedResourceResponse && (
        <TableComponentWithSelection
          selectedRowId={selectedRowKey}
          onChange={handlePlanChange}
          data={vpsManagedResourceResponse.map((plan) => ({
            key: `${plan.id}`,
            resource: plan,
            options: Array.isArray(plan.options)
              ? plan.options.filter((option: ServicePlanOption) =>
                ["ram", "cpu", "disque"].includes(option.option_type),
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
              title: tApplications("price"),
              dataIndex: "price",
              fixed: "right",
              width: 100,
              render: (price, record) =>
                record.isManaged && record.isAlreadyPaid ? (
                  <Typography.Text style={{ color: theme.token.gray300 }}>—</Typography.Text>
                ) : (
                  <Typography.Text>{`${price?.toLocaleString()} DZD`}</Typography.Text>
                ),
            },
          ]}
        />
      )}
    </div>
  );
}
