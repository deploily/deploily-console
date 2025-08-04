# 🚀 FULL PROCESS: Add New App in Deploily Frontend (e.g., MyApp)

---

### ✅ STEP 1: Add API URL of your app

📁 **Path:** `/deploily-console/src/deploilyWebsiteUrls.ts`

```ts
ODOO_APP_SUBSCRIPTION_URL: `${API_BASE_URL}/odoo-app-service-subscription`,
```

In the same file add the slug service:

```ts
export const TTK_EPAY_SLUG = "ttk-epay";
export const ODOO_SLUG = "odoo";
export const SUPABASE_SLUG = "supabase";
```

---

### ✅ STEP 2: Add `service_slug` of your app

📁 **Path:** `/deploily-console/src/lib/features/application/getSubscribeToAppUrl.tsx`

```ts
import { deploilyApiUrls, ODOO_SLUG, SUPABASE_SLUG, TTK_EPAY_SLUG } from "@/deploilyWebsiteUrls";

export const getSubscribeToAppUrl = (service_slug?: string) => {
    switch (service_slug) {
        case TTK_EPAY_SLUG:
            return deploilyApiUrls.APP_TTK_EPAY_SUBSCRIBE_URL;
        case ODOO_SLUG:
            return deploilyApiUrls.APP_ODOO_SUBSCRIBE_URL;
        case SUPABASE_SLUG:
            return deploilyApiUrls.SUPABASE_APP_SUBSCRIBE_URL;
        default:
            break;
    }
}
```

---

### ✅ STEP 3: Create a folder app inside the `my-applications` directory

📁 **Path:** `/deploily-console/src/app/[locale]/(auth)/portal/my-applications`

- Create a folder named with the **service slug** of your app (e.g., `odoo`)
- Inside it, create a folder `[id]`

---

### ✅ STEP 4: Create a page and import the details page

📁 **Path:** `/deploily-console/src/app/[locale]/(auth)/portal/my-applications/odoo/[id]/page.tsx`

```tsx
import MyAppDetails from "./components/odooDetails";

type Props = {
  params: { id: string };
};

export default function Page({ params: { id } }: Props) {
  return (
    <>
      <MyAppDetails my_app_id={id} />
    </>
  );
}
```
### ✅ STEP 5: Create a page of details 

📁 **Path:** `/deploily-console/src/app/[locale]/(auth)/portal/my-applications/odoo/[id]/components/odooDetails`

```tsx
"use client"
import { useOdooAppById } from "@/lib/features/odoo/odooSelector";
import { useAppDispatch } from "@/lib/hook";
import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { Badge, Button, Col, Input, Result, Row, Skeleton, Space, Typography } from "antd"
import Paragraph from "antd/es/typography/Paragraph";
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../locales/client";
import { fetchOdooAppById } from "@/lib/features/odoo/odooThunks";
import { Copy, EyeSlash, Eye } from "@phosphor-icons/react";
import { handleCopy } from "@/lib/utils/handleCopy";
import StatusComponents from "./componentsOdooDetails/statusComponent";
import DurationComponent from "./componentsOdooDetails/durationComponent";
import DocumentationDrawer from "../../../../utils/documentationDrawer";
import DocumentationComponents from "./componentsOdooDetails/documentationComponent";
import Link from "antd/es/typography/Link";

export default function MyAppDetails({ my_app_id }: { my_app_id: string }) {
    const t = useI18n();

    const tSubscription = useScopedI18n('subscription');
    const tOdoo = useScopedI18n("odooApp");
    const [visible, setVisible] = useState(false);

    const dispatch = useAppDispatch();
    const { odooAppById, isLoading, loadingError } = useOdooAppById()
    const [openDrawer, setOpenDrawer] = useState(false);
    const onClose = () => {
        setOpenDrawer(false);
    };
    useEffect(() => {
        dispatch(fetchOdooAppById(my_app_id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <Space direction="vertical" size="large" style={{ paddingInline: 40, marginBlock: 10, width: "100%", marginBottom: 50, paddingTop: 20 }}>
            {isLoading && odooAppById === undefined &&
                <>
                    <Skeleton.Image active style={{ marginBottom: 10 }} />
                    <Skeleton active paragraph={{ rows: 2 }} />
                </>
            }
            {!isLoading && odooAppById !== undefined &&
                <>
                    <Row gutter={16}  >
                        <Col md={16} xs={24} >
                            <Badge offset={[-20, 20]}>
                                {odooAppById.service_details && <ImageFetcher
                                    imagePath={odooAppById.service_details.image_service}
                                    width={220}
                                    height={220}
                                />}
                            </Badge>
                        </Col>

                        <Col md={8} xs={24}>

                            <Row>
                                <Col span={24} style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    alignSelf: "start"
                                }}>
                                    <Typography.Title level={2} style={{ color: theme.token.orange400 }}>
                                        {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(odooAppById.price)} DZD / {odooAppById.service_plan.subscription_category === "monthly" ? t("month") : t("year")}

                                    </Typography.Title>
                                </Col>
                            <DocumentationComponents odooAppById={odooAppById} setOpenDrawer={setOpenDrawer} />
                            </Row>
                        </Col>
                    </Row>

                    <StatusComponents odooAppById={odooAppById} />


                    {odooAppById.service_details && <Row gutter={16} style={{ marginTop: 0 }} >
                        <Paragraph style={{ fontSize: 14 }} >
                            {odooAppById.service_details.description}

                        </Paragraph>
                    </Row>}

                    <DurationComponent odooAppById={odooAppById} />
                    <div>
                    <Typography style={{ fontWeight: 700, fontSize: 20, color: theme.token.orange600 }}>
                        {tSubscription("accessUrl")}
                    </Typography>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingBottom: "15px",
                            alignItems: "center",
                        }}
                    >
                        <Link
                            href={odooAppById.access_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                marginRight: "5px",
                                wordBreak: "break-all",
                                color: theme.token.gray100,
                                fontWeight: 500,
                                fontSize: 18
                            }}
                        >
                            {odooAppById.access_url}
                        </Link>

                        <Button
                            type="primary"
                            style={{ boxShadow: "none" }}
                            icon={<Copy />}
                            onClick={() => handleCopy(odooAppById.access_url)}
                        />
                    </div>

                        <Typography style={{ fontWeight: 700, fontSize: 20, color: theme.token.orange600 }}>
                            {tOdoo("password")}
                        </Typography>

                        <div style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingBottom: "15px"
                        }}>
                            <Input.Password
                                value={odooAppById.odoo_password}
                                readOnly
                                visibilityToggle={{
                                    visible,
                                    onVisibleChange: setVisible,
                                }}
                                iconRender={visible => visible ? <Eye /> : <EyeSlash />}
                                style={{
                                    cursor: 'default',
                                    userSelect: 'text',
                                    caretColor: 'transparent',
                                    marginRight: "5px"
                                }}
                            />
                            <Button
                                type="primary"
                                style={{ boxShadow: "none" }}
                                icon={<Copy />}
                                onClick={() => handleCopy(odooAppById.odoo_password)}
                            />
                    </div>
                    </div>
                    <DocumentationDrawer openDrawer={openDrawer} onClose={onClose} currentSubscription={odooAppById} t={t} />

                </>}
            {!isLoading && loadingError &&
                <Result
                    status="500"
                    title={t('error')}
                    subTitle={t('subTitleError')}
                />}
        </Space >
    )
}
```

