import PaymentDetailsPage from "./components/paymentDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <PaymentDetailsPage paymentId={id} />
    </>
  );
}
