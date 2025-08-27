"use client";

import { checkEpaymentStatus } from "@/lib/features/epayment/epaymentThunks";
import { useEpayment } from "@/lib/features/epayment/paymentSelector";
import { useAppDispatch } from "@/lib/hook";
import { Result } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "../../../../../locales/client";
import ConfirmContentPage from "../components/confirmContent";
import FailContentPage from "../components/failContent";

import { Layout } from "antd";
import { AppAppBarDesktop, AppAppBarMobile } from "../../(auth)/portal/components/appBar";
import { MainSideBar } from "../../(auth)/portal/components/sideBar";

const { Content } = Layout;

export default function ResultPageContent() {
    const t = useI18n();

    const { paymentStatus, isLoading, isError } = useEpayment();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (paymentStatus) {
        }
        if (orderId !== null) {

            dispatch(checkEpaymentStatus(orderId));
        }
    }, [orderId]);

    const [shouldShowDesktop, setShouldShowDeskttop] = useState(true);
    const updateDesktopVisibility = () => {
        if (window != undefined) {
            setShouldShowDeskttop(window.innerWidth > 880);
        }
    };
    useEffect(() => {

        if (window != undefined) {
            updateDesktopVisibility();
            window.addEventListener("resize", updateDesktopVisibility);
            return () => {
                window.removeEventListener("resize", updateDesktopVisibility);
            };
        }

    }, []);

    return (
        <>
            <Layout style={{ overflow: "hidden", height: "100vh" }}>
                {shouldShowDesktop && <AppAppBarDesktop />}
                {!shouldShowDesktop && <AppAppBarMobile />}
                <Layout>
                    {shouldShowDesktop && <MainSideBar />}

                    <Content
                        style={{
                            overflow: "auto",
                            padding: 0,
                            backgroundRepeat: "no-repeat, no-repeat",
                            backgroundPosition: "bottom left, top right",
                            backgroundAttachment: "fixed",
                            marginTop: "64px",
                        }}
                    >
                        {paymentStatus !== undefined ?
                            ((paymentStatus?.RESPONSE_CODE === "00" && paymentStatus.ERROR_CODE === "0" && paymentStatus.ORDER_STATUS === 2) ?
                                <ConfirmContentPage paymentResult={paymentStatus} />

                                :
                                <FailContentPage paymentResult={paymentStatus} />

                            ) : (
                                (isLoading === false &&
                                    isError !== null) &&
                                <Result status="500"
                                    title={t('error')}
                                    subTitle={t('subTitleError')} />
                            )
                        }
                    </Content>

                </Layout>
            </Layout>
        </>
    );
}