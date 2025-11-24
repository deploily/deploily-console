import {ServicePlan, ServicePlanOption} from "@/lib/features/service-plans/servicePlanInterface";

import {ResourceInterface} from "@/lib/features/cloud-resource/cloudResourceInterface";
import {useContactUs} from "@/lib/features/contact-us/contactUsSelectors";
import {postFeedBack} from "@/lib/features/contact-us/contactUsThunks";
import {useAppDispatch} from "@/lib/hook";
import {theme} from "@/styles/theme";
import {keyframes} from "@emotion/react";
import styled from "@emotion/styled";
import {Check} from "@phosphor-icons/react";
import {Button, Card, Col, Input, Modal, notification, Row, Tag, Typography} from "antd";
import {useEffect, useState} from "react";
import {useI18n, useScopedI18n} from "../../../../../../../../locales/client";
import {openNotification} from "../../utils/notification";

const {Text} = Typography;

export default function RessourcePlanCard({
  resourcePlan,
  currentResource,
  showDrawer,
}: {
  resourcePlan: ServicePlan;
  currentResource: ResourceInterface;
  showDrawer: any;
}) {
  const pulseBorder = keyframes`
    0% {
    box-shadow: 0 0 0 0 rgba(0, 87, 216, 0.7);
  }
  50% {
    box-shadow: 0 0 10px 6px rgba(0, 87, 216, 1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 87, 216, 0);
  }
  `;

  const StyledTag = styled(Tag)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-weight: bold;
    border-radius: 8px;
    border: 2px solid orange;
    animation: ${pulseBorder} 2s infinite ease-in-out;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  `;
  const t = useScopedI18n("apiServiceSubscription");
  const toastTranslate = useScopedI18n("toast");
  const translate = useI18n();
  const {contactUsResponse, isError} = useContactUs();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const dispatch = useAppDispatch();
  const handleCancel = () => {
    setIsModalOpen(false);
    setComment("");
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleContactUs = () => {
    setIsModalOpen(false);
    dispatch(
      postFeedBack(`${translate("interstedCustomPlan")} ${currentResource.name} :  ${comment}`),
    );
    setComment("");
  };

  useEffect(() => {
    if (contactUsResponse !== undefined && contactUsResponse !== null) {
      openNotification(api, true, toastTranslate);
    } else if (isError) {
      openNotification(api, false, toastTranslate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactUsResponse]);

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderColor: theme.token.gray50,
        boxShadow: "none",
        minWidth: 250,
        maxWidth: 300,
      }}
      styles={{
        body: {flex: 1, display: "flex", flexDirection: "column", paddingBottom: 0},
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = theme.token.orange600;
        e.currentTarget.style.boxShadow = `4px 4px 10px 0px ${theme.token.orange600}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme.token.gray50;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {contextHolder}
      <Typography.Title level={3} style={{textAlign: "center"}}>
        {resourcePlan.is_custom
          ? translate("resourceOnDemand")
          : resourcePlan.plan !== null
            ? resourcePlan.plan.name
            : ""}
      </Typography.Title>
      {!resourcePlan.is_custom && (
        <div>
          {currentResource.discount !== null && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <StyledTag color={theme.token.blue300}>
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                    lineHeight: 1,
                    marginRight: 4,
                  }}
                >
                  {currentResource.discount}%
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    lineHeight: 1.2,
                  }}
                >
                  {t("specialOffer")}
                </Text>
              </StyledTag>
              <Text
                delete
                style={{
                  color: "#999999",
                  fontSize: 16,
                  display: "block",
                  textAlign: "center",
                  marginBottom: 0,
                  lineHeight: 1.2,
                  marginTop: 20,
                }}
              >
                {Intl.NumberFormat("fr-FR", {useGrouping: true}).format(resourcePlan!.price)}
                <span style={{fontSize: 16, fontWeight: 400}}>
                  {" "}
                  DZD/
                  {resourcePlan!.subscription_category === "monthly"
                    ? t("month")
                    : resourcePlan!.subscription_category === "yearly"
                      ? t("year")
                      : t("month")}
                </span>
              </Text>
            </div>
          )}

          <Typography.Paragraph
            style={{
              fontSize: 25,
              fontWeight: 600,
              color: theme.token.orange400,
              textAlign: "center",
            }}
          >
            {Intl.NumberFormat("fr-FR", {useGrouping: true}).format(
              applyDiscount(resourcePlan!.price, currentResource.discount),
            )}
            <span style={{fontSize: 16, fontWeight: 400}}>
              {" "}
              DZD/
              {resourcePlan!.subscription_category === "monthly"
                ? t("month")
                : resourcePlan!.subscription_category === "yearly"
                  ? t("year")
                  : t("month")}
            </span>
          </Typography.Paragraph>
        </div>
      )}
      <div style={{flex: 1, paddingBottom: "16px"}}>
        {resourcePlan.options.map((row: ServicePlanOption) => (
          <Row gutter={16} key={row.id} align="middle">
            <Col span={3}>
              {row.icon ? row.icon : <Check size={24} color={theme.token.gray100} />}
            </Col>
            <Col span={21}>
              <Typography.Paragraph
                style={{
                  fontSize: 16,
                  color: theme.token.gray100,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  minHeight: 24,
                }}
              >
                <div
                  dangerouslySetInnerHTML={{__html: row.html_content}}
                  style={{margin: 0, lineHeight: "24px"}}
                />
              </Typography.Paragraph>
            </Col>
          </Row>
        ))}
      </div>
      <div
        style={{
          padding: "16px",
          display: "inline-block",
        }}
      >
        <Button
          onClick={resourcePlan.is_custom ? showModal : showDrawer}
          style={{
            color: theme.token.colorWhite,
            backgroundColor: theme.token.orange600,
            border: "none",
            width: "100%",
            paddingBlock: 20,
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          {resourcePlan.is_custom ? translate("requestQuote") : translate("details")}
        </Button>
        <Modal
          title="Contactez-nous"
          open={isModalOpen}
          onOk={handleContactUs}
          okText="Send"
          onCancel={handleCancel}
          footer={[
            <Button
              style={{
                color: theme.token.colorWhite,
                backgroundColor: theme.token.orange600,
                border: "none",
                paddingBlock: 20,
                fontWeight: 600,
                fontSize: 20,
              }}
              key="submit"
              onClick={handleContactUs}
            >
              {translate("send")}
            </Button>,
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder={translate("whriteMessage")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Modal>
      </div>
    </Card>
  );
}
function applyDiscount(price: number, percentage: number): number {
  return Math.round(price * (1 - percentage / 100));
}
