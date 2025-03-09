import MyServiceParameterPage from "../components/myServiceParameter";
type Props = {
  params: { id: string };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <MyServiceParameterPage cartLine_id={id} />
    </>
  );
}
