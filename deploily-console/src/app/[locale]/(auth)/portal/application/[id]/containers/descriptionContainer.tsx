'use client';
import { ApplicationDescriptionForConsole } from 'deploily-ui-components';
import React from 'react';
import { useI18n } from '../../../../../../../../locales/client';

export default function ApplicationDescriptionContainer(
    {title,description, is_subscribed,logo, price }: {
        title: string;
        description: string;
        logo: React.ReactNode;
        price: number;
        is_subscribed?: boolean;
    }) {
          const t = useI18n();
        
    return (
        <div>
            <ApplicationDescriptionForConsole
                title={title}
                price={price}
                description={description}
                avatar={logo}
                is_subscribed_tag={is_subscribed?t("subscribed"):undefined}
            />
        </div>
    );
}
