// components/AffiliationDrawer/itemsHelp.ts
import {CollapseProps, Typography} from "antd";
import Image from "next/image";

export const getItemsHelp = (t: any): CollapseProps["items"] => [
  {
    key: "1",
    label: t("label1"),
    children: <Typography.Text>{t("children1")}</Typography.Text>,
  },
  {
    key: "2",
    label: t("label2"),
    children: <Typography.Text>{t("children2")}</Typography.Text>,
  },
  {
    key: "3",
    label: t("label3"),
    children: <Typography.Text> {t("children3")} </Typography.Text>,
  },
  {
    key: "4",
    label: t("label4"),
    children: <Typography.Text>{t("children4")}</Typography.Text>,
  },
  {
    key: "5",
    label: t("label5"),
    children: <Typography.Text>{t("children5")}</Typography.Text>,
  },
  {
    key: "6",
    label: t("label6"),
    children: (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        {" "}
        <Image
          src="/images/Api-services-process-vertical.png"
          alt="Api-services-process-vertical"
          width={380}
          height={700}
        />
      </div>
    ),
  },
];
