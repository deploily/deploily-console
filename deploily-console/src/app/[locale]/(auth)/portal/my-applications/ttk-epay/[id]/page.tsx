import TtkEpayDetails from "./components/ttkEpayDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <TtkEpayDetails my_app_id={id} />
    </>
  );
}
