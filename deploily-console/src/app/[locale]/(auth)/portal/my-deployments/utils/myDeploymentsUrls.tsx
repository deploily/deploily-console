export const myDeploymentsUrls = (url: string) => {
  switch (url) {
    case "web-application":
      return "web-applications";
    default:
      return "";
  }
};
