import ResourceDetailsContentPage from "./components/resourceDetailsContent";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <ResourceDetailsContentPage resource_id={id} />
    </>
  );
}
