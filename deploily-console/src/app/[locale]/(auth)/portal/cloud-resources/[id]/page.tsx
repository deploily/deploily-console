import ResourceDetailsContentPage from "./components/resourceDetailsContent";

type Props = {
  params: {id: string};
};
export default function Page({params: {id}}: Props) {
  return (
    <>
      <ResourceDetailsContentPage resource_id={id} />
    </>
  );
}
