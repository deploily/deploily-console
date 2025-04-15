import { CustomOrangeButton } from "@/styles/components/buttonStyle";
import { Col, Form, Radio, Result, Row, Skeleton, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import { usePaymentProfiles } from "@/lib/features/payment-profiles/paymentProfilesSelectors";
import { CustomPayementInput } from "@/styles/components/inputStyle";
import FundBalanceDrawer from "../../components/fundBalanceDrawer";
import { theme } from "@/styles/theme";
import { getPaymentProfileById } from "@/lib/features/payment-profiles/paymentProfilesThunks";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { Coins } from "@phosphor-icons/react";

export default function ProfileDetailsContainer({ profile_id }: { profile_id: string }) {
    const t = useScopedI18n("profilePayment");
    const traslate = useI18n();
    const [openDrawer, setOpenDrawer] = useState(false);
    const dispatch = useAppDispatch();
    const { currentProfile, currentProfileLoading, currentProfileError } = usePaymentProfiles()

    useEffect(() => {
        dispatch(getPaymentProfileById(profile_id));
    }, []);

    const onClose = () => {
        setOpenDrawer(false);
    };

    return (
        <div style={{ paddingInline: 10 }}>
            <Row gutter={16} style={{ marginTop: 30 }}>
                <Col span={14}>
                    <Title level={3} style={{ fontWeight: 700, color: '#ffff' }}>
                        {t("profilePayment")}
                        {currentProfile?.company_name &&
                            <Tag color="magenta" bordered={false} style={{ marginLeft: 20, fontSize: 16, fontWeight: 500 }}>
                                {currentProfile.company_name}
                            </Tag>
                        }
                    </Title>
                </Col>
                <Col span={10} style={{ display: "flex", justifyContent: "end" }}>
                    
                    <CustomOrangeButton onClick={() => setOpenDrawer(true)}>
                        {t('fundBalance')}
                    </CustomOrangeButton>
                </Col>
            </Row>

            {currentProfileLoading && !currentProfile &&
                <Row gutter={[10, 10]}>
                    <Col span={2}><Skeleton active paragraph={{ rows: 0.5 }} /></Col>
                    <Col span={22}><Skeleton.Input active={true} /></Col>
                </Row>
            }

            {!currentProfileLoading && currentProfile &&
                <>
                <Row style={{ padding: 20, alignItems: "center" }} gutter={8}>
                    <Col>
                        <Coins size={24} color={"white"} />
                    </Col>
                    <Col>
                        <span style={{ color: "white", fontWeight: 700 }}>
                            {t("balance")}:
                        </span>
                    </Col>
                    <Col>
                        <CustomTypography style={{ color: "#D85912" }}>
                            {Intl.NumberFormat("fr-FR", { useGrouping: true }).format(currentProfile?.balance)} DZD
                        </CustomTypography>
                    </Col>
                </Row>

                    <Radio.Group value={currentProfile.is_company} >
                        <Radio value={false}>{t("isIndividual")}</Radio>
                        <Radio value={true}>{t("isCompany")}</Radio>
                    </Radio.Group>
                    <Row style={{ padding: 20 }}>
                        <span style={{
                            color: "white",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "18px",
                            fontWeight: 800,
                        }}>
                            {t("profileInformation")}
                        </span>
                    </Row>

                    <Form
                        name="wrap"
                        labelCol={{ flex: '110px' }}
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{ flex: 0 }}
                        colon={false}
                        style={{ paddingInline: 20 }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col md={12} xs={24}>
                                <Form.Item label={t('firstName')} name="name">
                                    <CustomPayementInput defaultValue={currentProfile.name} style={{ color: theme.token.colorWhite }} disabled />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item label={t('lastName')} name="lastName">
                                    <CustomPayementInput defaultValue={currentProfile.last_name} style={{ color: theme.token.colorWhite }} disabled />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label={t('address')} name="address">
                            <CustomPayementInput defaultValue={currentProfile.address} style={{ color: theme.token.colorWhite }} disabled />
                        </Form.Item>

                        <Row gutter={[16, 16]}>
                            <Col md={16} xs={24}>
                                <Form.Item label={t('city')} name="city">
                                    <CustomPayementInput defaultValue={currentProfile.city} style={{ color: theme.token.colorWhite }} disabled />
                                </Form.Item>
                            </Col>
                            <Col md={8} xs={24}>
                                <Form.Item label={t('codePostal')} name="codePostal">
                                    <CustomPayementInput defaultValue={currentProfile.postal_code} style={{ color: theme.token.colorWhite }} disabled />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label={t('wilaya')} name="wilaya">
                            <CustomPayementInput defaultValue={currentProfile.wilaya} style={{ color: theme.token.colorWhite }} disabled />
                        </Form.Item>
                        <Form.Item label={t('country')} name="country">
                            <CustomPayementInput defaultValue={currentProfile.country} style={{ color: theme.token.colorWhite }} disabled />
                        </Form.Item>
                        <Form.Item label={t('phone')} name="phone">
                            <CustomPayementInput defaultValue={currentProfile.phone} style={{ color: theme.token.colorWhite }} disabled />
                        </Form.Item>

                        {currentProfile.is_company && (
                            <>
                                <Row style={{ padding: 20 }}>
                                    <span style={{
                                        color: "white",
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "18px",
                                        fontWeight: 800,
                                    }}>
                                        {t('taxCoordinate')}
                                    </span>
                                </Row>

                                <Form.Item label={t('etreprise')} name="company_name">
                                    <CustomPayementInput defaultValue={currentProfile.company_name} style={{ color: theme.token.colorWhite }} disabled />
                                </Form.Item>
                                <Row gutter={[16, 16]}>
                                    <Col md={12} xs={24}>
                                        <Form.Item label={t('commercialRegister')} name="commercialRegister">
                                            <CustomPayementInput defaultValue={currentProfile.company_registration_number} style={{ color: theme.token.colorWhite }} disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12} xs={24}>
                                        <Form.Item label={t('taxArticle')} name="taxArticle">
                                            <CustomPayementInput defaultValue={currentProfile.tax_article} style={{ color: theme.token.colorWhite }} disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[16, 16]}>
                                    <Col md={12} xs={24}>
                                        <Form.Item label={t('nif')} name="nif">
                                            <CustomPayementInput defaultValue={currentProfile.nif} style={{ color: theme.token.colorWhite }} disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12} xs={24}>
                                        <Form.Item label={t('nis')} name="nis">
                                            <CustomPayementInput defaultValue={currentProfile.nis} style={{ color: theme.token.colorWhite }} disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Form>
                </>
            }

            {!currentProfileLoading && currentProfileError &&
                <Result
                    status="500"
                    title={traslate('error')}
                    subTitle={traslate('subTitleError')}
                />
            }
            <FundBalanceDrawer openDrawer={openDrawer} onClose={onClose} />
        </div>

    )
}