'use client';
import { ApplicationDescriptionForConsole } from 'deploily-ui-components';
import React from 'react';

export default function ApplicationDescriptionContainer({ title,
    description, documentationUrl,
    logo, price}: {
        title: string;
        description: string;
        documentationUrl: string;
        logo: React.ReactNode;
        price: number;
    }) {
    return (
        <div style={{  }}>
            <ApplicationDescriptionForConsole
                title={title}
                price={price}
                description={description}
                avatar={logo}
                documentationUrl={documentationUrl}
            />
        </div>
    );
}
