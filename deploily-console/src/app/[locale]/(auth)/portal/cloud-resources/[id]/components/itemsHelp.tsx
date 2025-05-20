// components/AffiliationDrawer/itemsHelp.ts
import { CollapseProps } from "antd";

export const getItemsHelp = (t: any): CollapseProps['items'] => [
    {
        key: '1',
        label: t('label1'),
        children: t('children1'),
    },
    {
        key: '2',
        label: t('label2'),
        children: t('children2'),
    },
    {
        key: '3',
        label: t('label3'),
        children: t('children3'),
    },
    {
        key: '4',
        label: t('label4'),
        children: t('children4'),
    },
    {
        key: '5',
        label: t('label5'),
        children: t('children5'),
    },
];