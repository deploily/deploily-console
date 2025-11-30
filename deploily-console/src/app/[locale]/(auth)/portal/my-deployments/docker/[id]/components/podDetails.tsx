import { DivCard } from "@/styles/components/divStyle";
import { Copy, LinkSimple } from "@phosphor-icons/react";
import { Button, Input, Typography } from 'antd';
import { useState } from "react";
import { useScopedI18n } from "../../../../../../../../../locales/client";

const PodsDetails = ({ dockerById, planNames, theme, handleCopy, onSave }: {
    dockerById: any,
    planNames: any,
    theme: any,
    handleCopy: (text: string) => void,
    onSave: (updatedPodNames: string[]) => void
}) => {
    const plan = dockerById.get_plan_details.plan.name;
    const t = useScopedI18n("deployment");

    const podCount = plan === planNames.BASIC ? 2 :
        plan === planNames.PRO ? 4 :
            plan === planNames.PREMIUM ? 6 : 0;

    const podNamesAndUrls = Array.from({ length: podCount }, (_, index) => ({
        name: dockerById[`pod_name_${index + 1}`] ?? 'name',
        url: dockerById[`pod_url_${index + 1}`] ?? 'url'
    }));

    const [podNames, setPodNames] = useState(podNamesAndUrls.map(pod => pod.name));

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedNames = [...podNames];
        updatedNames[index] = event.target.value;
        setPodNames(updatedNames);
    };

    const renderPodDetails = (pod: { name: string, url: string }, podNumber: number) => (
        <>
            <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                {t("podDetails", { podNumber })}
            </Typography>
            <DivCard key={podNumber}>
                <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                    {t("name")}
                </Typography>
                <Input
                    value={podNames[podNumber - 1]}
                    onChange={(e) => handleNameChange(e, podNumber - 1)}
                    style={{
                        cursor: "text",
                        userSelect: "text",
                        marginRight: "5px",
                    }}
                />
                <div>
                    <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                        {t("url")}
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingBottom: "15px",
                        }}
                    >
                        <Input
                            value={pod.url}
                            readOnly
                            style={{
                                cursor: "default",
                                userSelect: "text",
                                caretColor: "transparent",
                                width: "fit",
                                marginRight: "5px",
                            }}
                        />
                        <Button
                            type="primary"
                            style={{ boxShadow: "none", marginRight: "5px" }}
                            icon={<LinkSimple size={20} />}
                            onClick={() => window.open(pod.url, "_blank")}
                        />
                        <Button
                            type="primary"
                            style={{ boxShadow: "none" }}
                            icon={<Copy />}
                            onClick={() => handleCopy(pod.url)}
                        />
                    </div>
                </div>
            </DivCard>
        </>
    );

    const handleSave = () => {
        onSave(podNames);
    };

    return (
        <div>
            {podNamesAndUrls.map((pod, index) => renderPodDetails(pod, index + 1))}
            <div style={{ display: "flex", justifyContent: "end", gap: 10 }}>
                <Button
                    type="primary"
                    style={{
                        backgroundColor: "#D85912",
                        border: "none",
                        boxShadow: "none",
                    }}
                    onClick={handleSave}
                >
                    <span
                        style={{
                            color: "rgba(220, 233, 245, 0.88)",
                            fontSize: "16px",
                            fontWeight: 600,
                        }}
                    >
                        Save
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default PodsDetails;
