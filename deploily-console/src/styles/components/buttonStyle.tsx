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

export const DeleteButton = styled(Button)` &&
 {  
    color: ${theme.token.colorWhite};
    background-color: ${theme.token.red500};
    border: none;
    border-raduis:10px;
    padding: 4px 8px;
    transition: background-color 0.3s ease;
    box-shadow: none !important;

     &:hover {
      background-color: ${theme.token.red500} !important;
      color: ${theme.token.colorWhite} !important;
      border: none !important;
      box-shadow: none !important;
    }
}
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




