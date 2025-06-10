'use client';
import {  Typography } from 'antd';
import { OptionsCollapse } from 'deploily-ui-components';
import { useState } from 'react';

export default function SelectVpsPlanContainer() {
    // TODO : Replace the options with real data from the API
    //TODO : ADD TRANSLATION
    const options = [
        {
            id: 1,
            title: " 2 vCPU / 4Go",
            range: "2 900 DZD"
        },
        {
            id: 2,
            title: " 4 vCPU / 8Go",
            range: " 7 100 DZD",
        }];
    const [selectedVpsPlan, setSelectedVpsPlan] = useState("")
    return (
        <div style={{ padding: 24 }}>
            <OptionsCollapse title={
                "Select a vps type"
            }
                options={
                    options.map(option => ({
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
                                {option.title}
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
                                {option.range}
                            </Typography.Text>
                        )
                    })
                    )}
                selectedOption={`${selectedVpsPlan}`}
                onChange={(value) => {
                    setSelectedVpsPlan(`${value}`);
                    console.log("Selected provider ID:", value);
                }} />

        </div>
    );
}
