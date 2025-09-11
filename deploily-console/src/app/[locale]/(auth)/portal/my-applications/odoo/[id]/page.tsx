import MyAppDetails from "./components/odooDetails";


type Props = {
  params: { id: string };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <MyAppDetails my_app_id={id} />
    </>
  );
}