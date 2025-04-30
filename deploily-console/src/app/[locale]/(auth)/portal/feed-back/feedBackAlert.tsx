"use client";

import { Button, Popover } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useScopedI18n } from "../../../../../../locales/client";
import { useAppDispatch } from "@/lib/hook";
import { useState } from "react";
import { postFeedBack } from "@/lib/features/contact-us/contactUsThunks";

export default function FeedbackAlert() {
    const t = useScopedI18n("Feedback");
    const dispatch = useAppDispatch();

    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleSendFeedback = () => {
        if (!feedbackMessage) {
            alert(("error"));
            return;
        }
        dispatch(postFeedBack(feedbackMessage));
        setFeedbackMessage(""); // Clear input after sending
    };

    const content = (
        <div style={{ maxWidth: "300px" }}>
            <TextArea
                rows={4}
                placeholder="Message"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
            />
            <div style={{ marginTop: "10px", textAlign: "right" }}>
                <Button
                    type="primary"
                    style={{
                        width: "100%",
                        backgroundColor: "#D85912",
                        border: "none",
                        boxShadow: "none"
                    }}
                    onClick={handleSendFeedback}
                >
                    {t("send")}
                </Button>
            </div>
        </div>
    );

    return (
        <Popover content={content}trigger="click">
            <Button
                type="primary"
                style={{
                    backgroundColor: "#D85912",
                    border: "none",
                    boxShadow:"none"
                }}
            >
                <span
                    style={{
                        color: "rgba(220, 233, 245, 0.88)",
                        fontSize: "16px",
                        fontWeight: 600,
                    }}
                >
                    {t("title")}
                </span>
            </Button>
        </Popover>
    );
}
