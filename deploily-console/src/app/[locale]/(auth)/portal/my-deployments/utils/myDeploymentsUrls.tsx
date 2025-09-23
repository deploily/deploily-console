export const myDeploymentsUrls = (url: string) => {
    switch (url) {
        case "docker":
            return "docker";
        default:
            return '';
    }
};