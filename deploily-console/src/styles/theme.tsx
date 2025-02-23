const primaryColor = "#D85912";

export const theme = {
  token: {
    colorPrimary: primaryColor,
    colorInfo: "#206fba",
    colorSuccess: "#2b7904",
    colorWarning: "#fadb14",
    colorError: "#f40e11",
    colorLink: "#63a9ea",
    colorTextBase: "#ffff",
    colorBgBase: "#0c0d0f",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "Inter, sans-serif",
    headingFontSize: {
      h1: 35,
      h2: 30,
      h3: 28,
      h4: 24,
      h5: 20,
      h6: 16,
    },
  },
  components: {
    Typography: {
      fontFamily: "Inter, sans-serif",
      titleMarginBottom: 8,
    },
    Rate: {
      starColor: "rgb(252,50,50)",
    },
    Collapse: {
      colorTextHeading: primaryColor,
      fontFamily: "Inter, sans-serif",
      fontSizeIcon: 20,
      fontSize: 20,
      borderRadiusLG: 10,
      colorBorder: "rgb(78,78,78)",
    },
    algorithm: "dark",
    Button: {
      borderColorDisabled: "rgb(76,150,215)",
      defaultActiveBorderColor: "rgb(76,150,215)",
      colorText: "rgba(0,0,0,0)",
    },
  },
};
