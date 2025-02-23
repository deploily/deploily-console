import ServiceDetailsContentPage from "./components/serviceDetailsContent";
type Props = {
  params: {id: string};
};
export default function Page({params: {id}}: Props) {
  return (
    <>
      <ServiceDetailsContentPage serviceId={id} />
    </>
  );
}
