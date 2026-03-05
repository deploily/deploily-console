const getStatusStyle = (status: string, theme: any, t: any) => {
  switch (status) {
    case "confirmed":
      return {
        backgroundColor: theme.token.green,
        color: theme.token.colorWhite,
        label: t("confirmed"),
      };
    case "pending":
      return {
        backgroundColor: theme.token.orange300,
        color: theme.token.colorWhite,
        label: t("pending"),
      };
    default:
      return {backgroundColor: theme.token.gray200, color: theme.token.colorWhite, label: status};
  }
};

export default getStatusStyle;
