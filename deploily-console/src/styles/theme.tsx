
const primaryColor = "#D85912";

export const theme = {
  token: {
    colorPrimary: primaryColor,
    colorWhite:"white",
    colorBlack:"black",
    colorInfo: "#206fba",
    colorSuccess: "#2b7904",
    colorWarning: "#fadb14",
    colorError: "#f40e11",
    colorLink: "#63a9ea",
    colorTextBase: "#ffff",
    colorBgBase: "#0c0d0f",
    blue100: "#5394CC",
    blue200: "rgba(83, 148, 204, 1)",
    blue300: "#0057D8",
    orange300: "#F77605",
    orange400: "#DD8859",
    orange600: "#D85912",
    darkGray: "#202227",
    gray50: "#4E4E4E",
    gray100: "#D0CECE",   
    gray200:"rgba(125, 125, 125, 1)",
    Error100:"#EA1919",
    red500:"#C63131",
    green:"#28b609",
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
    Select: {
     
      optionSelectedBg: "#D85912",
      optionActiveBg: "#DD8859",
    },

    Radio: {
      colorBgContainer: "#ffffff",
      colorPrimary: "#28b609",
      
    },
    Checkbox:{
      colorBgContainer: "#ffffff", 
      colorPrimary: "#28b609",
    }
   
  },
  
};
