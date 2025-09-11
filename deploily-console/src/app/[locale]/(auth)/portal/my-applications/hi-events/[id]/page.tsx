import MyAppDetails from "./components/hiEventsDetails";

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