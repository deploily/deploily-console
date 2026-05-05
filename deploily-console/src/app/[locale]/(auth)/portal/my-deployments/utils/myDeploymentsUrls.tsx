export const myDeploymentsUrls = (url: string) => {
  switch (url) {
    case "docker":
      return "docker"; 
    case "web-application":
      return "web-applications";
    default:
      return "";
  }
};
