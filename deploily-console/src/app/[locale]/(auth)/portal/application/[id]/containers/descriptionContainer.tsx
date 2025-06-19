'use client';
import { ApplicationDescriptionForConsole } from 'deploily-ui-components';
import React from 'react';

export default function ApplicationDescriptionContainer({ title,
    description,
    logo, }: {
        title: string;
        description: string;
        logo: React.ReactNode;
    }) {
    return (
        <div style={{ padding: 24 }}>
            <ApplicationDescriptionForConsole
                title={title}
                description={description}
                avatar={logo}
            />
        </div>
    );
}
