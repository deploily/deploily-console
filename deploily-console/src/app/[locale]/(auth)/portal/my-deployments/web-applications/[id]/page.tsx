import MyWebApplicationDetails from "./components/webApplicationDetails";

type Props = {
  params: Promise<{ id: number }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <MyWebApplicationDetails my_dep_id={id} />
    </>
  );
}
