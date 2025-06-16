'use client';
import { useCloudResource } from '@/lib/features/cloud-resource/cloudResourceSelectors';
import { fetchCloudResources } from '@/lib/features/cloud-resource/cloudResourceThunks';
import { useAppDispatch } from '@/lib/hook';
import { TableComponentWithSelection } from 'deploily-ui-components';
import { useEffect } from 'react';

export default function SelectVpsPlanTable() {
    const dispatch = useAppDispatch();
    

    useEffect(() => {
        dispatch(fetchCloudResources(10));
    }, [])


    const { cloudResourceResponse } = useCloudResource()
    // console.log('Cloud Resource Response:', cloudResourceResponse);
    


    const handlePlanChange = (val: any) => {
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#1f1f1f', borderRadius: '8px' }}>
            <TableComponentWithSelection
                onChange={handlePlanChange}
                data={[]}
                columns={[
                    // {
                    //     title: 'Plan Name',
                    //     dataIndex: 'name',
                    //     render: (text: string) => <span style={{ color: 'white' }}>{text}</span>,
                    // }
                ]}

            />
        </div>
    );
}
