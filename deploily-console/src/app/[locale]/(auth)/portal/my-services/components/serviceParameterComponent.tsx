"use client";
import { generateTokenThunk } from "@/lib/features/cartLine/cartLineThunks";
import { Col, Row, Button, Input, message, Tooltip } from "antd";
import { useEffect } from "react";
import { Copy } from "@phosphor-icons/react";
import { fetchServiceParameters } from "@/lib/features/serviceParameters/serviceParametersThunks";
import { useAppDispatch } from "@/lib/hook";
import { useServiceParameters } from "@/lib/features/serviceParameters/serviceParametersSelectors";
import { useI18n } from "../../../../../../../locales/client";
import { fetchServiceParametersValues } from "@/lib/features/myServiceParameterValues/myServiceParameterValuesThunks";
import { useServiceParametersValues } from "@/lib/features/myServiceParameterValues/myServiceParameterValuesSelectors";

interface ServiceParameterProps {
    cartLine_id: string;
    service_id: number;
}

export default function ServiceParameterComponent({ cartLine_id, service_id }: ServiceParameterProps) {
    const dispatch = useAppDispatch();
    const { serviceParametersList } = useServiceParameters();
    const { serviceParameterValuesList } = useServiceParametersValues();
    const t = useI18n();

    useEffect(() => {
        dispatch(fetchServiceParameters(service_id));
        dispatch(fetchServiceParametersValues(cartLine_id));
    }, [service_id, cartLine_id]);

    const generateApiKey = () => {
        dispatch(generateTokenThunk(cartLine_id));
    };

    const handleCopy = (value: string) => {
        if (value) {
            navigator.clipboard.writeText(value);
            message.success("Copied to clipboard!");
        }
    };

    return (
        <>
            {serviceParametersList?.result.map((parameter) => {
                const parameterValue = serviceParameterValuesList?.result.find(param => param.id === parameter.id)?.value || "";

                return (
                    <div key={parameter.id}>
                        {parameter.type !== 'token' ? (
                            <Row gutter={10}>
                                <Col span={16}>
                                    <Input defaultValue={parameterValue} style={{ marginBottom: 10 }} />
                                </Col>
                                <Col span={8}>
                                    <Tooltip title="Copy">
                                        <Button
                                            type="primary"
                                            style={{ boxShadow: "none" }}
                                            icon={<Copy />}
                                            onClick={() => handleCopy(parameterValue)}
                                        />
                                    </Tooltip>
                                </Col>
                            </Row>
                        ) : (
                            <Row gutter={10}>
                                <Col span={16}>
                                    <Input defaultValue={parameterValue} style={{ marginBottom: 10 }} />
                                </Col>
                                <Col span={8}>
                                    {parameterValue ? (
                                        <Tooltip title="Copy">
                                            <Button
                                                type="primary"
                                                style={{ boxShadow: "none" }}
                                                icon={<Copy />}
                                                onClick={() => handleCopy(parameterValue)}
                                            />
                                        </Tooltip>
                                    ) : (
                                        <Button onClick={generateApiKey} style={{ marginTop: 20, backgroundColor: "#1890ff", color: "#fff" }}>
                                                    {t("ganerateKey")}
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        )}
                    </div>
                );
            })}
        </>
    );
}
