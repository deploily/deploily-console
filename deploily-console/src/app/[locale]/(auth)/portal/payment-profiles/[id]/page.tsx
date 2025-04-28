
import ProfileDetailsContainer from "./components/paymentProfileDetailsContainer";

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