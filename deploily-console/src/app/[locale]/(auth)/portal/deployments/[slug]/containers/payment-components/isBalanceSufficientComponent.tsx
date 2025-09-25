import {theme} from "@/styles/theme";
import {Button, Typography} from "antd";
import {useScopedI18n} from "../../../../../../../../../locales/client";

export default function IsBalanceSufficientComponent({
  onClose,
  handleSubscribe,
}: {
  onClose: any;
  handleSubscribe: () => void;
}) {
  const translate = useScopedI18n("subscription");

  return (
    <>
      <Typography.Text
        style={{
          color: theme.token.green,
          paddingTop: 30,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {translate("sufficientBalance")}
      </Typography.Text>
      <div
        style={{
          paddingTop: "50px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "20px",
        }}
      >
        <Button
          style={{
            color: theme.token.colorWhite,
            backgroundColor: theme.token.blue100,
            border: "none",
            paddingBlock: 15,
            fontWeight: 600,
            fontSize: 18,
            display: "flex",
            justifyContent: "flex-end",
            borderRadius: "15px",
            height: "40px",
          }}
          onClick={() => onClose()}
        >
          {translate("cancel")}
        </Button>
        <Button
          style={{
            color: theme.token.colorWhite,
            backgroundColor: theme.token.orange600,
            border: "none",
            paddingBlock: 15,
            fontWeight: 600,
            fontSize: 18,
            display: "flex",
            justifyContent: "flex-end",
            borderRadius: "15px",
            height: "40px",
          }}
          onClick={() => handleSubscribe()}
        >
          {translate("confirm")}
        </Button>
      </div>
    </>
  );
}
