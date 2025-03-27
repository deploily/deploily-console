"use client";

import SubscriptionSettingContant from "./components/subscriptionSettingContant";


type Props = {
  params: { id: string };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <SubscriptionSettingContant subscribe_id={id} />
    </>
  );
}
