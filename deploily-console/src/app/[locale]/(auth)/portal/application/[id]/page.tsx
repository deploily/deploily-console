import ApplicationDetailsPageContent from "./applicationDetailsPageContent";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ApplicationDetailsPageContent applicationId={id} />;
}
