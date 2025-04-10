const getStatusStyle = (status: string, theme: any, t: any) => {
    switch (status) {
      case "completed":
        return { backgroundColor: theme.token.green, color: theme.token.colorWhite, label: t("done") };
      case "pending":
        return { backgroundColor: theme.token.orange300, color: theme.token.colorWhite, label: t("pending") };
      case "failed":
        return { backgroundColor: theme.token.Error100, color: theme.token.colorWhite, label: t("failed") };
      default:
        return { backgroundColor: theme.token.gray200, color: theme.token.colorWhite, label: status };
    }
  };

  export default getStatusStyle;