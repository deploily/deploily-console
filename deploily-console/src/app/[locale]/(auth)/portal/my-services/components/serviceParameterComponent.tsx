"use client";
import { generateTokenThunk } from "@/lib/features/cartLine/cartLineThunks";
import { Col, Row, Button, Input, message, Tooltip } from "antd";
import { useEffect } from "react";
import { Copy } from "@phosphor-icons/react";
import { fetchServiceParameters } from "@/lib/features/serviceParameters/serviceParametersThunks";
import { useAppDispatch } from "@/lib/hook";
import { useServiceParameters } from "@/lib/features/serviceParameters/serviceParametersSelectors";
import { useI18n } from "../../../../../../../locales/client";


export default function ServiceParameterComponent({ cartLine_id, service_id, parameterValues }: { cartLine_id: string, service_id: number, parameterValues: any[] }) {

    const dispatch = useAppDispatch();
    const { serviceParametersList } = useServiceParameters();

    useEffect(() => {
        dispatch(fetchServiceParameters(service_id));
    }, []);


    const t = useI18n();

    const generateApiKey = () => { dispatch(generateTokenThunk(cartLine_id)) }

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        message.success("Copied to clipboard!");
    };
    return (
        <>
            {serviceParametersList?.result.map((parameter) => (

                <div key={parameter.id} >
                    {parameter.type != 'token' ?
                        <Row gutter={10}>
                            <Col span={16}>
                                <Input defaultValue={
                                    parameterValues.find(param => param.id === parameter.id) != null ?
                                        parameterValues.find(param => param.id === parameter.id).value : ""}
                                    style={{ marginBottom: 10 }} /></Col>
                            <Col span={8}>
                                <Tooltip title="Copy">
                                    <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(parameterValues.find(param => param.id === parameter.id) != null ?
                                        parameterValues.find(param => param.id === parameter.id).value : "")} />
                                </Tooltip>
                            </Col>
                        </Row>
                        :
                        <Row gutter={10}>
                            <Col span={16}>
                                <Input defaultValue={
                                    parameterValues.find(param => param.id === parameter.id) != null ?
                                        parameterValues.find(param => param.type === 'token').value : ""}
                                    style={{ marginBottom: 10 }} /></Col>
                            <Col span={8}>
                                {parameterValues.find(param => param.id === parameter.id) != null ?
                                    <Tooltip title="Copy">
                                        <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(parameterValues.find(param => param.id === parameter.id).value)} />
                                    </Tooltip>
                                    :
                                    <Button
                                        onClick={generateApiKey}
                                        style={{ marginTop: 20, backgroundColor: "#1890ff", color: "#fff" }}>
                                        {t('ganerateKey')}
                                    </Button>
                                }
                            </Col>
                        </Row>
                    }
                </div>
            ))}
        </>
    );
}
