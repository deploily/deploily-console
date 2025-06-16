
import SubscriptionSettingContent from "./components/subscriptionSettingContent";


type Props = {
  params: { id: string };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <SubscriptionSettingContent subscription_id={id} />
    </>
  );
}
