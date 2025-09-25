import DeploymentDetailsPageContent from "./deploymentDetailsPageContent";

type Props = {
  params: { slug: string };
};
export default function Page({ params: { slug } }: Props) {
  return <DeploymentDetailsPageContent deploymentSlug={slug} />;
}
