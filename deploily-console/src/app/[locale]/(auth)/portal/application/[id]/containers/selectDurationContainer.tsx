'use client';
import { useNewApplicationSubscription } from '@/lib/features/application/applicationServiceSelectors';
import { updateNewAppSubscriptionState } from '@/lib/features/application/applicationServiceSlice';
import { useAppDispatch } from '@/lib/hook';
import { SubscriptionOption, SubscriptionDurationSelector } from 'deploily-ui-components';
const options: SubscriptionOption[] = [ 
    { label: '1 month', value: '1' },
    { label: '3 month', value: '3' },
    { label: '6 month',  value: '6' },
    { label: '12 month',  value: '12' },
];

export default function SelectDurationContainer() {
    const dispatch = useAppDispatch();
    const handleDurationChange = (val: string) => {
        dispatch(updateNewAppSubscriptionState({duration:val}))
    };
    const {duration} = useNewApplicationSubscription()

    return (
            <SubscriptionDurationSelector
                title="Subscription duration"//TODO TRANSLATE 
                options={options}
                initialValue={`${duration}`}
                onChange={handleDurationChange}
            />
    );
}
