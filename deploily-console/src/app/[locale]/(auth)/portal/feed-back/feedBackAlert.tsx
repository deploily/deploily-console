"use client";

import {useContactUs} from "@/lib/features/contact-us/contactUsSelectors";
import {postFeedBack} from "@/lib/features/contact-us/contactUsThunks";
import {useAppDispatch} from "@/lib/hook";
import {Button, notification, Popover} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useEffect, useState} from "react";
import {useScopedI18n} from "../../../../../../locales/client";
import {openNotification} from "../cloud-resources/utils/notification";

export default function FeedbackAlert() {
  const t = useScopedI18n("feedback");
  const dispatch = useAppDispatch();

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const {contactUsResponse, isError} = useContactUs();
  const [api, contextHolder] = notification.useNotification();
  const toastTranslate = useScopedI18n("toast");

  const handleSendFeedback = () => {
    if (!feedbackMessage) {
      alert("error");
      return;
    }
    dispatch(postFeedBack(feedbackMessage));
    setFeedbackMessage(""); // Clear input after sending
  };
  useEffect(() => {
    if (contactUsResponse !== undefined && contactUsResponse !== null) {
      openNotification(api, true, toastTranslate);
    } else if (isError) {
      openNotification(api, false, toastTranslate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactUsResponse]);

  const content = (
    <div style={{maxWidth: "300px"}}>
      <TextArea
        rows={4}
        placeholder="Message"
        value={feedbackMessage}
        onChange={(e) => setFeedbackMessage(e.target.value)}
      />
      <div style={{marginTop: "10px", textAlign: "right"}}>
        <Button
          type="primary"
          style={{
            width: "100%",
            backgroundColor: "#D85912",
            border: "none",
            boxShadow: "none",
          }}
          onClick={handleSendFeedback}
        >
          {t("send")}
        </Button>
      </div>
    </div>
  );

  return (
    <Popover content={content} trigger="click">
      {contextHolder}
      <Button
        type="primary"
        style={{
          backgroundColor: "#D85912",
          border: "none",
          boxShadow: "none",
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
