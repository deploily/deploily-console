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