"use client";

import SubscriptionSettingContent from "./components/subscriptionSettingContent";


type Props = {
  params: { id: string };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <SubscriptionSettingContent subscribe_id={id} />
    </>
  );
}
