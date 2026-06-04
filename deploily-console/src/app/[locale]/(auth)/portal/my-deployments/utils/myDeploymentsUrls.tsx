export const myDeploymentsUrls = (url: string) => {
  switch (url) {
    case "web-application":
      return "web-applications";   
    case "mobile-application":
      return "mobile-applications";
    default:
      return "";
  }
};
