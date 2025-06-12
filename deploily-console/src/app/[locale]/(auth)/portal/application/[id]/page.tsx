import ApplicationDetailsPageContent from "./applicationDetailsPageContent";

type Props = {
    params: { id: string };
};
export default function Page({ params: { id } }: Props) {
    console.log("Application details page rendered with ID:", id);
    console.log("Application details page rendered with ID:", { params: { id } });
    
    return (
        <ApplicationDetailsPageContent applicationId={id}/>
    );
}
