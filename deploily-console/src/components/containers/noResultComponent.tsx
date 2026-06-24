import React from "react";
import { Result, Button } from "antd";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@phosphor-icons/react";

interface NoResultProps {
    title?: string;
    subTitle?: string;
    redirectUrl?: string;
    redirectLabel?: string;
    icon?: React.ReactNode;
    extra?: React.ReactNode;
}

const GenericEmptyIcon = () => (
    <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="40" cy="40" r="40" fill="#FFF7E6" />
        <rect x="22" y="20" width="36" height="44" rx="4" fill="#FFD591" />
        <rect x="28" y="30" width="24" height="3" rx="1.5" fill="#FA8C16" />
        <rect x="28" y="37" width="18" height="3" rx="1.5" fill="#FA8C16" />
        <rect x="28" y="44" width="20" height="3" rx="1.5" fill="#FA8C16" />
        <circle cx="53" cy="53" r="12" fill="#FFF7E6" />
        <circle cx="53" cy="53" r="10" fill="white" stroke="#FA8C16" strokeWidth="2" />
        <line x1="50" y1="50" x2="56" y2="56" stroke="#FA8C16" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="56" y1="50" x2="50" y2="56" stroke="#FA8C16" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

const NoResult: React.FC<NoResultProps> = ({
    title = "No results found",
    subTitle = "Nothing to display here. Try adjusting your filters or browse the list to get started.",
    redirectUrl = "/services",
    redirectLabel = "Go to list",
    icon = <GenericEmptyIcon />,
    extra,
}) => {
    const router = useRouter();

    return (
        <Result
            icon={icon}
            title={title}
            subTitle={subTitle}
            extra={
                extra ?? (
                    <Button type="primary" size="large" onClick={() => router.push(redirectUrl)}>
                        {redirectLabel}
                         <ArrowRightIcon
                                    size={20}
                                    style={{
                                      transition: "color 0.3s ease",
                                    }}
                                  />
                    </Button>
                )
            }
        />
    );
};

export default NoResult;