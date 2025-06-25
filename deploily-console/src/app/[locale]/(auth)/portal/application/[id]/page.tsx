import ApplicationDetailsPageContent from "./applicationDetailsPageContent";

type Props = {
    params: { id: string };
};
export default function Page({ params: { id } }: Props) {
    
    return (
        <ApplicationDetailsPageContent applicationId={id}/>
    );
}
