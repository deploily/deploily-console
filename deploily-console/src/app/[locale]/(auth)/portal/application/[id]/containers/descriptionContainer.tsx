'use client';
import { ApplicationDescriptionForConsole } from 'deploily-ui-components';
import React from 'react';
import { useI18n } from '../../../../../../../../locales/client';

export default function ApplicationDescriptionContainer(
    {title,description, documentationUrl, demoUrl, is_subscribed,logo, price }: {
        title: string;
        description: string;
        documentationUrl: string;
        demoUrl: string;
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
                documentationUrl={documentationUrl}
                demoUrl={demoUrl}
                documentationLabel={t('see_documentation')}
                demoLabel={t('requist_demo')}
                is_subscribed_tag={is_subscribed?t("subscribed"):undefined}
            />
        </div>
    );
}
