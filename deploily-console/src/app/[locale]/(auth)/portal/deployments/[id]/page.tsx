import DeploymentDetailsPageContent from "./deploymentDetailsPageContent";

type Props = {
    params: { id: string };
};
export default function Page({ params: { id } }: Props) {
    
    return (
        <DeploymentDetailsPageContent deploymentServiceId={id}/>
    );
}
