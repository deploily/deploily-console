import { CustomOrangeButton } from "@/styles/components/buttonStyle";
import { Col, Form, Radio, Result, Row, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import { useI18n, useScopedI18n } from "../../../../../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { useEffect, useState } from "react";
import { getProfileById } from "@/lib/features/profileService/profileServiceThunks";
import { useProfileServices } from "@/lib/features/profileService/profileServiceSelectors";
import { CustomPayementInput } from "@/styles/components/inputStyle";
import FundBalanceDrawer from "./fundBalanceDrawer";

export default function ProfileDetailsContainer({ profile_id }: { profile_id: string }) {
    const t = useScopedI18n("profilePayment");
    const traslate = useI18n();
    const [openDrawer, setOpenDrawer] = useState(false);
    const dispatch = useAppDispatch();
    const { currentProfile, currentProfileLoading, currentProfileError } = useProfileServices()

    useEffect(() => {
        dispatch(getProfileById(profile_id));
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
                    </Title>
                </Col>
                <Col span={10} style={{ display: "flex", justifyContent: "end" }}>
                    <CustomOrangeButton
                    onClick={() => setOpenDrawer(true)} 
                    >
                        {t('fundBalance')}
                    </CustomOrangeButton>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <span
                    style={{
                        color: "white",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "18px",
                        fontWeight: 800,
                    }}
                >
                    {t("profileInformation")}
                </span>
            </Row>

            {currentProfileLoading && currentProfile === undefined &&
                <Row gutter={[10, 10]} >
                    <Col span={2} ><Skeleton active paragraph={{ rows: 0.5 }} /></Col>
                    <Col span={22}><Skeleton.Input active={true} /></Col>

                </Row>}
            {console.log("currentProfile?.result== ", currentProfile)}
            {!currentProfileLoading && currentProfile !== undefined &&
                <>
                    <Form
                        name="wrap"
                        labelCol={{ flex: '110px' }}
                        labelAlign="left"
                        labelWrap={true}
                        wrapperCol={{ flex: 0 }}
                        colon={false}
                        style={{ paddingInline: 20 }}
                    >
                        <Row gutter={[16, 16]} >
                            <Col md={12} xs={24} >
                                <Form.Item label={t('firstName')} name="firstName" >
                                    <CustomPayementInput defaultValue={currentProfile.user.first_name} />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24} >
                                <Form.Item label={t('lastName')} name="lastName" >
                                    <CustomPayementInput defaultValue={currentProfile.user.last_name} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label={t('etreprise')} name="etreprise" >
                            <CustomPayementInput defaultValue={currentProfile.company_name} />
                        </Form.Item>
                        <Form.Item label={t('address')} name="address" >
                            <CustomPayementInput />
                        </Form.Item>
                        <Row gutter={[16, 16]} >
                            <Col md={16} xs={24} >
                                <Form.Item label={t('city')} name="city" >
                                    <CustomPayementInput />
                                </Form.Item>
                            </Col>
                            <Col md={8} xs={24} >
                                <Form.Item label={t('codePostal')} name="codePostal">
                                    <CustomPayementInput />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label={t('wilaya')} name="wilaya" >
                            <CustomPayementInput />
                        </Form.Item>
                        <Form.Item label={t('country')} name="country">
                            <CustomPayementInput />
                        </Form.Item>
                        <Form.Item label={t('phone')} name="phone" >
                            <CustomPayementInput defaultValue={currentProfile.phone} />
                        </Form.Item>

                        <Radio checked={currentProfile.user.active} > {t('isCompany')} </Radio>

                        <Row style={{ padding: 20 }}>
                            <span
                                style={{
                                    color: "white",
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: "18px",
                                    fontWeight: 800,
                                }}
                            >
                                {t('taxCoordinate')}
                            </span>
                        </Row>

                        <Row gutter={[16, 16]} >
                            <Col md={12} xs={24} >
                                <Form.Item label={t('commercialRegister')} name="commercialRegister" >
                                    <CustomPayementInput defaultValue={currentProfile.company_registration_number} />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24} >
                                <Form.Item label={t('taxArticle')} name="taxArticle" >
                                    <CustomPayementInput />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]} >
                            <Col md={12} xs={24} >
                                <Form.Item label={t('nif')} name="nif" >
                                    <CustomPayementInput />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24} >
                                <Form.Item label={t('nis')} name="nis" >
                                    <CustomPayementInput />
                                </Form.Item>
                            </Col>
                        </Row>
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