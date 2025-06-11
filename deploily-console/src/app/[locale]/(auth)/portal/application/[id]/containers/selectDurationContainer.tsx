'use client';
import { SubscriptionOption, SubscriptionDurationSelector } from 'deploily-ui-components';
const options: SubscriptionOption[] = [//TODO GET FROM BACKEND 
    { label: '1 month', price: '1 000 DZD', value: '1' },
    { label: '3 month', price: '2 900 DZD', value: '3' },
    { label: '6 month', price: '5 800 DZD', value: '6' },
    { label: '12 month', price: '11 000 DZD', value: '12' },
];

export default function SelectDurationContainer() {
    const handleDurationChange = (val: string) => {
        console.log('Selected duration:', val);
    };

    return (
            <SubscriptionDurationSelector
                title="Subscription duration"//TODO TRANSLATE 
                options={options}
                initialValue="6"
                onChange={handleDurationChange}
            />
    );
}
