"use client";
import {Provider, ResourceInterface} from "@/lib/features/cloud-resource/cloudResourceInterface";
import {useCloudResource} from "@/lib/features/cloud-resource/cloudResourceSelectors";
import {postAffiliation} from "@/lib/features/cloud-resource/cloudResourceThunks";
import {useAppDispatch} from "@/lib/hook";
import {theme} from "@/styles/theme";
import {CloseCircleTwoTone, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {Button, Card, Col, Collapse, Drawer, notification, Row, Space, Typography} from "antd";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useScopedI18n} from "../../../../../../../../locales/client";
import {getItemsHelp} from "./itemsHelp";

export default function AffiliationDrawer({
  openDrawer,
  onClose,
  planSelected,
  currentResource,
}: {
  openDrawer: any;
  onClose: any;
  planSelected: any;
  currentResource: ResourceInterface;
}) {
  const t = useScopedI18n("itemsHelp");
  const translate = useScopedI18n("affiliation");
  const toastTranslate = useScopedI18n("toast");
  const itemsHelp = getItemsHelp(t);
  const {isAffiliationCreatedSuccess, isAffiliationCreatedFailed} = useCloudResource();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [affiliation, setAffiliation] = useState<any>(null);
  const [provider, setProvider] = useState<Provider>();
  const [showTerms, setShowTerms] = useState(false);
  const [isAgree, setAgree] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const customExpandIcon = (panelProps: any) =>
    panelProps.isActive ? <MinusOutlined /> : <PlusOutlined />;

  function applyDiscount(price: number, percentage: number): number {
    return Math.round(price * (1 - percentage / 100));
  }

  const openNotification = () => {
    api.open({
      message: (
        <div style={{display: "flex", alignItems: "center", gap: 8}}>
          <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{fontSize: 20}} />
          <span style={{color: "#000", fontWeight: 600}}> {toastTranslate("titleFailed")}</span>
        </div>
      ),
      description: <div style={{color: "#888"}}>{toastTranslate("failed")}</div>,
      duration: 4,
      style: {
        backgroundColor: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      },
    });
  };

  useEffect(() => {
    if (isAffiliationCreatedSuccess) {
      router.replace("/portal/my-resources");
    }
    if (isAffiliationCreatedFailed) {
      openNotification();
    }

    setProvider(currentResource.provider);

    if (planSelected) {
      setAffiliation({
        service_plan_selected_id: planSelected.id,
        total_price: applyDiscount(planSelected!.price, currentResource.discount),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentResource.discount,
    currentResource.provider,
    planSelected,
    isAffiliationCreatedSuccess,
    isAffiliationCreatedFailed,
  ]);

  const handleConfirm = () => {
    setShowTerms(true);
    setIsConfirmed(true);
  };

  const handleAccept = () => {
    dispatch(postAffiliation(affiliation));
  };

  return (
    <>
      {contextHolder}
      <Drawer
        placement="right"
        closable={true}
        onClose={onClose}
        open={openDrawer}
        getContainer={false}
        width={600}
        styles={{
          header: {borderBottom: "none", backgroundColor: theme.token.darkGray},
          body: {padding: 0, backgroundColor: theme.token.darkGray},
        }}
      >
        <Col style={{padding: 20}}>
          <Typography.Title level={4} style={{paddingBottom: 30}}>
            {translate("orderResource")}
          </Typography.Title>

          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              borderColor: theme.token.gray50,
              boxShadow: "none",
            }}
          >
            {planSelected && provider && (
              <Space direction="vertical" style={{width: "100%"}}>
                <Row gutter={16} align="top">
                  <Col span={14}>
                    <Typography.Text strong>{translate("providerName")}</Typography.Text>
                  </Col>
                  <Col span={10}>
                    <Typography.Text>{provider.name}</Typography.Text>
                  </Col>
                </Row>
                <Row gutter={16} align="top">
                  <Col span={14}>
                    <Typography.Text strong>{translate("email")}</Typography.Text>
                  </Col>
                  <Col span={10}>
                    <Typography.Text>{provider.mail_sales}</Typography.Text>
                  </Col>
                </Row>
                <Row gutter={16} align="top">
                  <Col span={14}>
                    <Typography.Text strong>{translate("phone")}</Typography.Text>
                  </Col>
                  <Col span={10}>
                    <Typography.Text>{provider.phone_support}</Typography.Text>
                  </Col>
                </Row>
                <Row gutter={16} align="top">
                  <Col span={14}>
                    <Typography.Text strong>{translate("website")}</Typography.Text>
                  </Col>
                  <Col span={10}>
                    <Typography.Text>{provider.website}</Typography.Text>
                  </Col>
                </Row>
                <Row gutter={16} align="top">
                  <Col span={14}>
                    <Typography.Text strong>{translate("servicePlanSelected")}</Typography.Text>
                  </Col>
                  <Col span={10}>
                    <Typography.Text>{planSelected.plan.name}</Typography.Text>
                  </Col>
                </Row>
                <Row gutter={16} align="top">
                  <Col span={14}>
                    <Typography.Text strong>{translate("price")}</Typography.Text>
                  </Col>
                  <Col span={10}>
                    <Typography.Text>
                      {Intl.NumberFormat("fr-FR", {useGrouping: true}).format(
                        applyDiscount(planSelected!.price, currentResource.discount),
                      )}
                      <span style={{fontSize: 12, fontWeight: 400}}> DZD/{translate("month")}</span>
                    </Typography.Text>
                  </Col>
                </Row>
              </Space>
            )}
          </Card>

          {!isConfirmed && (
            <div
              style={{display: "flex", justifyContent: "flex-end", marginTop: 24, marginBottom: 24}}
            >
              <Button
                onClick={handleConfirm}
                disabled={isConfirmed}
                style={{
                  color: theme.token.colorWhite,
                  backgroundColor: theme.token.orange600,
                  border: "none",
                  paddingInline: 24,
                  paddingBlock: 12,
                  fontWeight: 600,
                  fontSize: 16,
                  opacity: isConfirmed ? 0.5 : 1,
                  cursor: isConfirmed ? "not-allowed" : "pointer",
                }}
              >
                {translate("confirm&OrderNow")}
              </Button>
            </div>
          )}

          {showTerms && (
            <div style={{margin: "5px", paddingTop: "10px", paddingBottom: "10px"}}>
              <div
                style={{
                  backgroundColor: "#4c4d52",
                  borderRadius: 2,
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  padding: "10px",
                }}
              >
                <Typography.Title
                  level={5}
                  style={{
                    color: "#fff",
                    marginBottom: 12,
                    fontWeight: 500,
                  }}
                >
                  {translate("confirmAffiliation", {
                    providerName: (
                      <strong style={{fontWeight: 600, fontSize: "19px", color: "white"}}>
                        {provider?.name}
                      </strong>
                    ),
                  })}
                </Typography.Title>

                <Space
                  direction="vertical"
                  size="middle"
                  style={{marginBottom: 2, marginLeft: "10px"}}
                >
                  <Typography.Text style={{color: "#fff"}}>
                    &nbsp; ✅ &nbsp;{translate("userName")}
                  </Typography.Text>
                  <Typography.Text style={{color: "#fff"}}>
                    &nbsp; ✅ &nbsp;{translate("email")}
                  </Typography.Text>

                  {/* Phone Field */}
                  <div>
                    <Typography.Text style={{color: "#fff", display: "block", marginBottom: 4}}>
                      &nbsp; ✅ &nbsp;{translate("phone")}
                    </Typography.Text>

                    <input
                      type="text"
                      placeholder={translate("phone")}
                      inputMode="numeric"
                      maxLength={10}
                      style={{
                        width: "100%",
                        padding: "8px",
                        backgroundColor: "#1f1f1f",
                        color: "#fff",
                        border: "1px solid #333",
                        borderRadius: "6px",
                        marginTop: 10,
                      }}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                        setAffiliation({...affiliation, phone_number: value});
                        if (/^\d{9,10}$/.test(value)) {
                          setAgree(true);
                        } else {
                          setAgree(false);
                        }
                      }}
                      value={affiliation.phone_number}
                    />
                  </div>
                </Space>

                <div style={{display: "flex", justifyContent: "flex-end"}}>
                  <Button
                    type="primary"
                    onClick={handleAccept}
                    disabled={!isAgree}
                    style={{
                      backgroundColor: isAgree ? theme.token.orange600 : theme.token.gray200,
                      paddingInline: 20,
                      paddingBlock: 10,
                      fontWeight: 600,
                      fontSize: 14,
                      color: theme.token.colorWhite,
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    {translate("iAgree")}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Collapse
            accordion
            expandIcon={customExpandIcon}
            expandIconPosition="end"
            style={{
              backgroundColor: theme.token.darkGray,
              color: theme.token.blue100,
              borderRadius: 12,
              overflow: "hidden",
            }}
            items={(itemsHelp ?? []).map(({key, label, children}) => ({
              key,
              label: (
                <Typography.Text style={{color: "#fff", fontWeight: 600}}>{label}</Typography.Text>
              ),
              children,
              style: {
                backgroundColor: "#0B0D10",
                borderBottom: `1px solid ${theme.token.gray50}`,
              },
            }))}
          />
        </Col>
      </Drawer>
    </>
  );
}
