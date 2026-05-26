import ServiceDetailsContentPage from "./components/serviceDetailsContent";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <ServiceDetailsContentPage serviceId={id} />
    </>
  );
}