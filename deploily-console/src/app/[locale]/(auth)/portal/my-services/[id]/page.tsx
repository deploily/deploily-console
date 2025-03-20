"use client";

import MyServiceSettingContant from "./components/myServiceSettingContent";

type Props = {
  params: { id: string };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <MyServiceSettingContant subscribe_id={id} />
    </>
  );
}
