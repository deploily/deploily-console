'use client';
import { useProvider } from '@/lib/features/provider/providerSelectors';
import { updateSelectedValues } from '@/lib/features/provider/providerSlice';
import { useAppDispatch } from '@/lib/hook';
import {  Skeleton, Typography } from 'antd';
import { OptionsCollapse } from 'deploily-ui-components';

export default function SelectVpsPlanContainer() {

    //TODO : ADD TRANSLATION
        const dispatch = useAppDispatch();
    const { selectedValues, servicePlanIsloading, servicePlanloadingError, servicePlansByResourceId } = useProvider()
    return (    <>
        {
            servicePlanIsloading ?
                <Skeleton active /> :
                servicePlanloadingError ?
                    <Typography.Text type="danger">Error loading resources</Typography.Text> :
                    servicePlansByResourceId &&
            <OptionsCollapse title={
                "Select Plan"
            }
                options={
                    servicePlansByResourceId.result.map(option => ({
                        key: option.id.toString(),
                        value: option.id.toString(),
                        title: (
                            <Typography.Text
                                style={{
                                    color: "white",
                                    fontSize: "14px",
                                    fontWeight: 300,
                                    fontFamily: "Inter, sans-serif",
                                }}
                            >
                                {option.options.map((opt) => opt.html_content).join("/")}
                            </Typography.Text>
                        ),
                        trailing: (
                            <Typography.Text
                                style={{
                                    color: "white",
                                    fontSize: "14px",
                                    fontWeight: 300,
                                    fontFamily: "Inter, sans-serif",
                                }}
                            >
                                {option.price}
                            </Typography.Text>
                        )
                    })
                    )}
                        selectedOption={selectedValues.planId ? `${selectedValues.planId}`:undefined}
                        onChange={(value) => {
                            dispatch(updateSelectedValues({ planId:`${value}`}));
                            console.log("Selected plan ID:", value);
                }} />
        }
    </>
    );
}
