import { theme } from "@/styles/theme";
import { Drawer, Flex } from "antd";
import { useScopedI18n } from "../../../../../../../../locales/client";
import { BodyMedium, InterRegular16 } from "@/styles/components/typographyStyle";

import type { CheckboxGroupProps } from 'antd/es/checkbox';
import { CustomRadioGroup } from "@/styles/components/radioStyle";
import { CustomDrawerCard } from "@/styles/components/cardStyle";

const options: CheckboxGroupProps<string>['options'] = [
    { label: 'Card', value: 'card' },
    { label: 'Bank transfer', value: 'bankTransfer' },
];

export default function FundBalanceDrawer({ openDrawer, onClose }: { openDrawer: any, onClose: any }) {
    const t = useScopedI18n("profilePayment");

    return (
        <Drawer
            title={t('fundBalance')}
            placement="right"
            onClose={onClose}
            open={openDrawer}
            getContainer={false}
            width={600}
            styles={{
                header: { backgroundColor: theme.token.darkGray_1, borderBottom: `1px solid ${theme.token.gray_2}` },
                body: { padding: 20, backgroundColor: theme.token.darkGray_1 },
            }}
        >
            <BodyMedium>{t('choosePaymentMethod')}</BodyMedium>
            <Flex style={{ marginTop: "20px", paddingBlock: 10, backgroundColor: theme.token.colorBlack, borderRadius: 5 }} vertical gap="middle">
                <CustomRadioGroup block options={options} defaultValue="card" />
            </Flex>
            <CustomDrawerCard style={{ borderRadius: 0, marginBottom:0 }} >
                <BodyMedium>CIB/ E-Dahabia</BodyMedium>
            </CustomDrawerCard>
            <CustomDrawerCard style={{ borderRadius: 0, borderTop:"none", marginTop:0 }} >
                <InterRegular16> {t('balanceRecharge')} : </InterRegular16>
            </CustomDrawerCard>
        </Drawer>
    )
}