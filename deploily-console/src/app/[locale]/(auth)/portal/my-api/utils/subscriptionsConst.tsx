export const subscriptionStatusStyle = (status: string) => {
    switch (status) {
        case "active":
            return "green";
        case "inactive":
            return "grey";
        default:
            return 'grey';
    }
};
export const applicationStatusStyle = (status: string) => {
    switch (status) {
        case "deployed":
            return "green";
        case "processing":
            return "orange";
        case "error":
            return "red";
        default:
            return 'grey';
    }
};