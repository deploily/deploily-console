import { message } from "antd";

export const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    message.success("Copied to clipboard!");
};