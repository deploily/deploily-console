'use client';
import {  Typography } from 'antd';
import { OptionsCollapse } from 'deploily-ui-components';
import { useState } from 'react';

export default function SelectVpsTypeContainer() {
    // TODO : Replace the options with real data from the API
    //TODO : ADD TRANSLATION
    const options = [
        {
            id: 1,
            title: "FleXCompute - Starter",
            range: " (2 900 DZD - 4900 DZD)"
        },
        {
            id: 2,
            title: "FleXCompute - Performance",
            range: " (7 100 DZD - 15 500 DZD)",
        }];
    const [selectedVpsType, setSelectedVpsType] = useState("")
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
                selectedOption={`${selectedVpsType}`}
                onChange={(value) => {
                    setSelectedVpsType(`${value}`);
                    console.log("Selected provider ID:", value);
                }} />

        </div>
    );
}
