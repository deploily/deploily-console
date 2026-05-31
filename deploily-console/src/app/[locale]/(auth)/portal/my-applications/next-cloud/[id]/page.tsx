import MyAppDetails from "./components/nextCloudDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <MyAppDetails my_app_id={id} />
    </>
  );
}
