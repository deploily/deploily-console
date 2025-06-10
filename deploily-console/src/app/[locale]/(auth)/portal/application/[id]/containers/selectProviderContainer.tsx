'use client';
import { Image, Typography } from 'antd';
import { OptionsCollapse } from 'deploily-ui-components';
import { useState } from 'react';

export default function SelectProviderContainer() {
    const options = [
        {
            id: 1,
            title: "Issal",
            image: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
            link: "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
        },
        {
            id: 2,
            title: "Adex",
            image: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
            link: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
        },
        {
            id: 3,
            title: "Icosnet",
            image: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
            link: "https://api.dicebear.com/7.x/miniavs/svg?seed=3"
        }
    ];
    const [selectedProvider, setSelectedProvider] = useState("")
    return (
        <div style={{ padding: 24 }}>
            <OptionsCollapse title={
                "Select a provider"
            }
                options={
                    options.map(option => ({
                        key: option.id.toString(),
                        value: option.id.toString(),
                        leading: (
                            < Image loading="lazy" src={option.image} width={40}
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
                                {option.title}
                            </Typography.Text>
                        ),
                        trailing: (
                            <a
                                href={option.link}
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
                selectedOption={`${selectedProvider}`}
                onChange={(value) => {
                    setSelectedProvider(`${value}`);
                    console.log("Selected provider ID:", value);
                }} />

        </div>
    );
}
