import MyMobileApplicationDetails from "./components/mobileApplicationDetails";

type Props = {
  params: Promise<{ id: number }>;
};
export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <MyMobileApplicationDetails my_dep_id={id} />
    </>
  );
}
