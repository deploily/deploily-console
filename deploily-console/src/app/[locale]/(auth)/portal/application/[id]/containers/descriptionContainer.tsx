'use client';
import { ApplicationDescription } from 'deploily-ui-components';

export default function ApplicationDescriptionContainer() {
    const applicationInfo = {
        title: `TTK Epay`,
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=1`,
        description:
            'TTK epay is a payment gateway that allows you to accept payments online.'
    }

    return (
        <div style={{ padding: 24 }}>
            <ApplicationDescription
                title={applicationInfo.title}
                description={applicationInfo.description}
                logo={applicationInfo.avatar}
            />
        </div>
    );
}
