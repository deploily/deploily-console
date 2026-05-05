import MyWebApplicationDetails from "./components/webApplicationDetails";

type Props = {
  params: { id: number };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <MyWebApplicationDetails my_dep_id={id} />
    </>
  );
}
