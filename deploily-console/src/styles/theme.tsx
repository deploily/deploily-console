
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
    blue_100: "#5394CC",
    blue_200: "rgba(83, 148, 204, 1)",
    blue_1: "#3696EA",
    blue_2: "#0057D8",
    orange_6: "#DD8859",
    orange_7: "#D85912",
    darkGray_1:"#202227",
    gray_0: "#D0CECE",
    gray_1:"#4E4E4E",
    gray_2:"rgba(125, 125, 125, 1)",
    Error_100:"#EA1919",
    red_5:"#C63131",
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
    Dropdown: {
     
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
