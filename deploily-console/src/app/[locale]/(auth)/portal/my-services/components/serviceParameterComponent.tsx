"use client";
import { generateTokenThunk } from "@/lib/features/cartLine/cartLineThunks";
import { Col, Row, Button, Input, message, Tooltip } from "antd";
import { useEffect } from "react";
import { Copy } from "@phosphor-icons/react";
import { useAppDispatch } from "@/lib/hook";
import { useI18n } from "../../../../../../../locales/client";
import { fetchServiceParametersValues } from "@/lib/features/myServiceParameterValues/myServiceParameterValuesThunks";
import { useServiceParametersValues } from "@/lib/features/myServiceParameterValues/myServiceParameterValuesSelectors";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useCartLine } from "@/lib/features/cartLine/cartLineSelectors";


export default function ServiceParameterComponent({ cartLine_id }: { cartLine_id: string }) {

    const dispatch = useAppDispatch();
    const { serviceParameterValuesList } = useServiceParametersValues();
    const { currentCartLine } = useCartLine();
    const { generatedToken } = useCartLine()
    useEffect(() => {
        dispatch(fetchServiceParametersValues(cartLine_id));
    }, [generatedToken]);

    const t = useI18n();

    const generateApiKey = () => { dispatch(generateTokenThunk(cartLine_id)) }

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        message.success("Copied to clipboard!");
    };

    return (
        <>
            {serviceParameterValuesList != undefined && serviceParameterValuesList?.result != undefined &&
                <>
                    {serviceParameterValuesList?.result?.map((parameterValue) => (
                        <div key={parameterValue.id} >
                            <Row gutter={10}>
                                <Col span={16}>
                                    <Input defaultValue={parameterValue.value} style={{ marginBottom: 10 }} disabled /></Col>
                                <Col span={8}>
                                    <Tooltip title="Copy">
                                        <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(parameterValue.value)} />
                                    </Tooltip>
                                </Col>
                            </Row>
                        </div>
                    ))}
                    {serviceParameterValuesList?.result?.find(paramVal => paramVal.parameter != undefined && paramVal.parameter.type === "token") == null ?
                        < Row gutter={24}>
                            <Col md={16} xs={24}>
                                <Input defaultValue={""} placeholder={t('placeholderGenerate')} disabled /></Col>
                            <Col md={8} xs={24}>
                                <Button
                                    onClick={generateApiKey}
                                    style={{ backgroundColor: "#1890ff", color: "#fff" }}>
                                    {t('ganerateKey')}
                                </Button>
                            </Col>
                        </Row > :
                        < Row gutter={12}>
                            <Col span={16}>
                                <SyntaxHighlighter language="bash" style={dracula}>
                                    {currentCartLine?.service.curl_command}
                                </SyntaxHighlighter>
                            </Col>
                            <Col span={8} style={{  display:"flex", alignItems :"center"}}>
                                <Tooltip title="Copy">
                                    <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(currentCartLine?.service.curl_command)} />
                                </Tooltip>
                            </Col>
                        </Row>
                    }
                </>
            }
        </>
    );
}
