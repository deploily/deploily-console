'use client';
import { DetailsCollapse } from 'deploily-ui-components';

export default function ApplicationDetailsCollapseContainer({ ssh, description, monitoring }: { ssh: string, description: string, monitoring: string }) {
    return (
        <DetailsCollapse
            items={
                [
                    {
                        label: 'Description',
                        children: description
                    },
                    {
                        label: 'SSH access',
                        children: ssh,
                    },
                    {
                        label: 'Monitoring',
                        children: monitoring,
                    },
                ]
            }
        />

    );
}
