import TtkEpayDetails from "./components/ttkEpayDetails";

type Props = {
  params: {id: string};
};
export default function Page({params: {id}}: Props) {
  return (
    <>
      <TtkEpayDetails my_app_id={id} />
    </>
  );
}
