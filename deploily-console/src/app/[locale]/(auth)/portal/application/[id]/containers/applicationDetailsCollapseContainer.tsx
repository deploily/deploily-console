'use client';
import {DetailsCollapse } from 'deploily-ui-components';

export default function ApplicationDetailsCollapseContainer() {    
    return (
        <div style={{ padding: 24 }}>
            <DetailsCollapse
            items={
                [
                    {
                        label: 'Description',
                        children: 'TTK ePay is a secure and reliable payment gateway that enables businesses to accept online payments seamlessly. Whether you\'re running an e- commerce store, a subscription service, or any digital platform, TTK ePay provides a fast, user - friendly solution for processing payments through multiple channels, including credit cards, debit cards, and net banking.',
                    },
                    {
                        label: 'SSH access',
                        children: '',
                    },
                    {
                        label: 'Monitoring',
                        children: '',
                    },
                ]
            }
            />

        </div>
    );
}
