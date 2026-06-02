import MyMobileApplicationDetails from "./components/mobileApplicationDetails";

type Props = {
  params: { id: number };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <MyMobileApplicationDetails my_dep_id={id} />
    </>
  );
}
