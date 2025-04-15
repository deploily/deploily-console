import { Button } from "antd";
import styled from "styled-components";
import { theme } from "../theme";

export const CustomBlueButton = styled(Button)` &&
 {  
    color: ${theme.token.colorWhite};
    background-color: ${theme.token.blue200};
    border: none;
    border-raduis:10px;
    padding: 4px 8px;
    transition: background-color 0.3s ease;

     &:hover {
      background-color: ${theme.token.blue200} !important;
      color: ${theme.token.colorWhite} !important;
      border: none !important;
      box-shadow: none !important;
    }
}
`;

export const CustomBlueRoundedButton = styled(Button)` &&
 {  
    color: ${theme.token.colorWhite};
    background-color:${theme.token.blue100};
    padding: 10px;
    border-radius: 25px;
    fontsize: 15px;
    height: 45px;

     &:hover {
      color: ${theme.token.colorWhite} !important;
      background-color:${theme.token.blue100} !important;
      border: none !important;
      box-shadow: none !important;
    }
}
`;

export const CustomTransparentOrangeButton = styled(Button)`
  && {
    color: ${theme.token.orange400};
    background-color: transparent;
    text-decoration: underline;
    border: none;
    border-radius: 10px;
    padding: 10px 30px;
    transition: none;
    box-shadow: none;

    &:hover,
    &:active,
    &:focus {
      background-color: transparent !important;
      // color: ${theme.token.orange400} !important;
      border: none !important;
      box-shadow: none !important;
    }
  }
`;



export const CustomErrorButton = styled(Button)` &&
 {  
    color: ${theme.token.colorWhite};
    background-color: ${theme.token.Error100};
    border: none;
    border-raduis:10px;
    padding: 10px 20px;
    transition: background-color 0.3s ease;

     &:hover {
      background-color: ${theme.token.Error100} !important;
      border: none !important;
      box-shadow: none !important;
}}`;

export const CustomUploadButton = styled(Button)`&& {
  color: ${theme.token.colorPrimary};
  border: 1px solid ${theme.token.gray50};
  &:hover {
    color: ${theme.token.colorPrimary} !important;
    border: 1px solid ${theme.token.gray50} !important;
}}
`;

export const PayButton = styled(Button)` &&
 {  
      color: ${theme.token.colorWhite};
      background-color:  ${theme.token.blue300};
      border: none;
      padding: 25px 10px;
      display: flex;
      align-items: center;
      gap:10px;

     &:hover {
      color: ${theme.token.colorWhite} !important;
      background-color: ${theme.token.blue300} !important;
      border: none !important;
      box-shadow: none !important;
    }
}
`;

export const CustomOrangeButton = styled(Button)` &&
 {  
    color: ${theme.token.colorWhite};
    background-color: ${theme.token.orange400};
    border: none;
    border-raduis:10px;
    padding: 10px 30px;
    transition: background-color 0.3s ease;

     &:hover {
      background-color: ${theme.token.orange400} !important;
      color: ${theme.token.colorWhite} !important;
      border: none !important;
      box-shadow: none !important;
    }
}
`;



