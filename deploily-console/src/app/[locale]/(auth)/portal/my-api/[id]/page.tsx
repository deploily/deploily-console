import SubscriptionSettingContent from "./components/subscriptionSettingContent";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <SubscriptionSettingContent apiServiceSubscription_id={id} />
    </>
  );
}
