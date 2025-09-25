'use client';
import React from 'react';
import { useI18n } from '../../../../../../../../locales/client';
import ApplicationDescriptionForConsole from 'deploily-ui-components/components/applications/applicationDescriptionForConsole';

export default function ApplicationDescriptionContainer(
    {title,description, documentationUrl, is_subscribed,logo, price }: {
        title: string;
        description: string;
        documentationUrl: string;
        logo: React.ReactNode;
        price: number;
        is_subscribed?: boolean;
    }) {
          const t = useI18n();
        //TODO add demoUrl and demoLabel check
    return (
        <div>
            <ApplicationDescriptionForConsole
                title={title}
                price={price}
                description={description}
                avatar={logo}
                documentationUrl={documentationUrl}
                demoUrl={''}
                demoLabel={('demo')}
                documentationLabel={t('documentation')}
                is_subscribed_tag={is_subscribed?t("subscribed"):undefined}
            />
        </div>
    );
}
