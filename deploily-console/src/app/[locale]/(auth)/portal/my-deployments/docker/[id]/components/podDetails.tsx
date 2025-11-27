import { DivCard } from "@/styles/components/divStyle";
import { Copy, LinkSimple } from "@phosphor-icons/react";
import { Button, Input, Typography } from 'antd'; // Assuming you are using Ant Design for UI components
import { useState } from "react";
import { useScopedI18n } from "../../../../../../../../../locales/client";

//TODO enable commented line when backend is ready
const PodsDetails = ({ dockerById, planNames, theme, handleCopy }: { dockerById: any, planNames: any, theme: any, handleCopy: (text: string) => void }) => {
    const plan = dockerById.get_plan_details.plan.name;
    const t = useScopedI18n("deployment");

    const podCount = plan === planNames.BASIC ? 2 :
        plan === planNames.PRO ? 4 :
            plan === planNames.PREMIUM ? 6 : 0;

    const [podNames, setPodNames] = useState(dockerById.pods?.map((pod: any) => pod.name ?? 'name') ?? []);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedNames = [...podNames];
        updatedNames[index] = event.target.value;
        setPodNames(updatedNames);
    };
    const renderPodDetails = (pod: any, podNumber: number) => (
        <>
            <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                {t("podDetails", { podNumber })}
            </Typography>
            <DivCard key={podNumber}>
                <Typography style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                    {t("name")}
                </Typography>
                <Input
                    // value={pod.name ?? 'name'}
                    onChange={(e) => handleNameChange(e, podNumber - 1)}
                    style={{
                        cursor: "default",
                        userSelect: "text",
                        caretColor: "transparent",
                        width: "fit",
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
                            // value={pod.url ?? 'url'}
                            value={''}
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
                            onClick={() => window.open(dockerById.argocd_url, "_blank")}
                        />
                        <Button
                            type="primary"
                            style={{ boxShadow: "none" }}
                            icon={<Copy />}
                            // onClick={() => handleCopy(pod.url ?? 'url')}
                            onClick={() => handleCopy('url')}
                        />
                    </div>
                </div>
            </DivCard>
        </>
    );

    return (
        <div>
            {/* {Array.from({ length: podCount }, (_, index) => renderPodDetails(index + 1))} */}
            {Array.from({ length: dockerById.pods?.length ?? podCount }, (_, index) =>
                renderPodDetails(dockerById.pods, dockerById.pods?.[index + 1] ?? index + 1)
            )}        </div>
    );
};

export default PodsDetails;
