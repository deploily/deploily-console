import MyDockerDetails from "./components/dockerDetails";

type Props = {
  params: { id: number };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <MyDockerDetails my_dep_id={id} />
    </>
  );
}