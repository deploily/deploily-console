import { Tag } from "antd";
import getStatusStyle from "../../utils/getStatusStyle";

const paymentDetailsData = (t: any, currentPayment: any, theme:any)=> currentPayment
    ? [
      { key: "1", label: t("nOrder"), value: currentPayment.id },
      {
        key: "2",
        label: t("status"),
        value: (() => {
            const { backgroundColor, color, label } = getStatusStyle(currentPayment.status, theme, t);
          return (
            <Tag style={{
              backgroundColor,
              color,
              border: "none",
              padding: "4px 0",
              fontWeight: 600,
              fontSize: 13,
              borderRadius: "18px",
              width: "100px",
              textAlign: "center",
              display: "inline-block",}}>
              {label}
            </Tag>
          );
        })()
      },      { key: "3", label: t("profile"), value: currentPayment.profile?.name || "-" },
      { key: "4", label: t("serviceName"), value: currentPayment.subscription?.name || "-" },
      { key: "5", label: t("amount"), value: currentPayment.amount?.toLocaleString("fr-FR", { minimumFractionDigits: 0 }) + " DZD " || "-" },
      { key: "6", label: t("startDate"), value: new Date(currentPayment.start_date).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }) },
      { key: "7", label: t("hour"), value: new Date(currentPayment.start_date).toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" }) },
      { key: "8", label: t("paymentMethod"), value: currentPayment.payment_method === "bank_transfer" ? t("bank") : t("card") },
    ]
    : [];


export default paymentDetailsData;