export const myApplicationsUrls = (url: string) => {
    switch (url) {
        case "ttk-epay":
            return "ttk-epay";
        case "odoo":
            return "odoo";
        case "supabase":
            return "supabase";
        default:
            return '';
    }
};