"use client";

import ProfileDetailsContainer from "./components/profileDetailsContainer";

type Props = {
    params: { id: string };
  };
export default function Page({ params: { id } }: Props) {
    return(
        <>
        <ProfileDetailsContainer profile_id={id} />
        </>
    )
}