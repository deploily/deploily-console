'use client';
import { useProvider } from '@/lib/features/provider/providerSelectors';
import { updateSelectedValues } from '@/lib/features/provider/providerSlice';
import { useAppDispatch } from '@/lib/hook';
import {  Skeleton, Typography } from 'antd';
import { OptionsCollapse } from 'deploily-ui-components';

export default function SelectVpsTypeContainer() {
    //TODO : ADD TRANSLATION


        const dispatch = useAppDispatch();
        const {selectedValues, resourcesIsloading,resourcesloadingError,resourcesListByProviderId } = useProvider()
    return (
        <>
            {
                resourcesIsloading ?
                    <Skeleton active /> :
                    resourcesloadingError ?
                        <Typography.Text type="danger">Error loading resources</Typography.Text> :
                        resourcesListByProviderId &&
            <OptionsCollapse title={
                "Select a vps type"
            }
                options={
                    resourcesListByProviderId.result.map(option => ({
                        key: option.id.toString(),
                        value: option.id.toString(),
                        title: (
                            <Typography.Text
                                style={{
                                    color: "white",
                                    fontSize: "14px",
                                    fontWeight: 300,
                                }}
                            >
                                {option.name}
                            </Typography.Text>
                        ),
                        trailing: (
                            <Typography.Text
                                style={{
                                    color: "white",
                                    fontSize: "14px",
                                    fontWeight: 300,
                                }}
                            >
                                {option.price} DZD / month
                            </Typography.Text>
                        )
                    })
                    )}
                    selectedOption={selectedValues.resourceId ?`${selectedValues.resourceId}`:undefined}
                    onChange={(value) => {dispatch(updateSelectedValues({ resourceId:`${value}`}));
                }} />
            }
        </>
    );
}
