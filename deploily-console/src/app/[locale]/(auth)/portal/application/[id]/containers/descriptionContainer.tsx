'use client';
import { ApplicationDescriptionForConsole } from 'deploily-ui-components';
import React from 'react';

export default function ApplicationDescriptionContainer({ title,
    description,
    logo, price}: {
        title: string;
        description: string;
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
            />
        </div>
    );
}
