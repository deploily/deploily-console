'use client';
import { useProvider } from '@/lib/features/provider/providerSelectors';
import { updateSelectedValues } from '@/lib/features/provider/providerSlice';
import { getProvidersList } from '@/lib/features/provider/providerThunk';
import { useAppDispatch } from '@/lib/hook';
import { Image, Skeleton, Typography } from 'antd';
import { OptionsCollapse } from 'deploily-ui-components';
import { useEffect } from 'react';

export default function SelectProviderContainer() {
    const dispatch = useAppDispatch();
    const { providersIsloading, providersloadingError, providersList,selectedValues } = useProvider()
    useEffect(() => {
        dispatch(getProvidersList())
    }, [])

    return (
        <>
            {
                providersIsloading ?
                    <Skeleton active /> :
                    providersloadingError ?
                        <Typography.Text type="danger">Error loading providers</Typography.Text> :
                        providersList &&
                        <OptionsCollapse title={
                            "Select a provider"
                        }
                            options={
                                providersList.result.map(option => ({
                                    key: option.id.toString(),
                                    value: option.id.toString(),
                                    leading: (
                                        < Image loading="lazy" src={option.logo} width={40}
                                            height={40} alt={`${option.id}`} preview={false}
                                        />
                                    ),
                                    title: (
                                        <Typography.Text
                                            style={{
                                                color: "white",
                                                fontSize: "16px",
                                                fontWeight: 400,
                                                marginLeft: 15,
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            {option.name}
                                        </Typography.Text>
                                    ),
                                    trailing: (
                                        <a
                                            href={option.website}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            target="_blank"
                                            style={{
                                                color: "#1677ff",
                                                textDecoration: "underline",
                                                fontSize: "16px",
                                                fontWeight: 400,
                                                marginLeft: 8,
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            Link
                                            {/* //TODO TRANSLATE */}
                                        </a>
                                    )
                                })
                                )}
                            selectedOption={selectedValues.providerId ?`${selectedValues.providerId}`:undefined}
                            onChange={(value) => {
                                dispatch(updateSelectedValues({providerId:`${value}`}));
                                console.log("Selected provider ID:", value);
                            }} />}
        </>
    );
}
