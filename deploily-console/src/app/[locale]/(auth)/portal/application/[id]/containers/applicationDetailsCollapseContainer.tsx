'use client';
import { DetailsCollapse } from 'deploily-ui-components';
import { useScopedI18n } from '../../../../../../../../locales/client';

export default function ApplicationDetailsCollapseContainer({  description }: {description: string}) {
    const tApplications = useScopedI18n('applications')
    return (
        <DetailsCollapse
            items={
                [
                    {
                        label: tApplications('description'),
                        children: description
                    },
                    {
                        label: tApplications("features"),
                        children: "",//TODO GET FEATURE FROM APP MODEL 
                    },
                    // {
                    //     label: 'Monitoring',
                    //     children: monitoring,
                    // },
                ]
            }
        />

    );
}
