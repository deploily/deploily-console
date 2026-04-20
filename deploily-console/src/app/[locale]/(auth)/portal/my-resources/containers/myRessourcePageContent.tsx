"use client";
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useI18n } from "../../../../../../../locales/client";
import ManagedRessourcesComponent from './managedRessourceSection';
import MyResourcesContainer from './myResourcesSection';

export default function MyRessourcesPageContent() {
  const t = useI18n();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onChange = (key: string) => {
    };
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t("myManagedResources"),
            children: <ManagedRessourcesComponent/>,
        },
        {
            key: '2',
            label: t("myResources"),
            children: <MyResourcesContainer/>,
        }
    ];

  return (
    <div style={{ padding: 24}}>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
