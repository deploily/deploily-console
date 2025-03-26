import { Button } from "antd";
import styled from "styled-components";
import { theme } from "../theme";

export const CustomBlueButton = styled(Button)` &&
 {  
    color: ${theme.token.colorWhite};
    background-color: ${theme.token.blue_200};
    border: none;
    border-raduis:10px;
    padding: 4px 8px;
    transition: background-color 0.3s ease;

     &:hover {
      background-color: ${theme.token.blue_200} !important;
      color: ${theme.token.colorWhite} !important;
      border: none !important;
      box-shadow: none !important;
    }
}
`;

export const CustomOrangeButton = styled(Button)` &&
 {  
    color: ${theme.token.colorWhite};
    background-color: ${theme.token.orange_6 };
    border: none;
    border-raduis:10px;
    padding: 10px 30px;
    transition: background-color 0.3s ease;

     &:hover {
      background-color: ${theme.token.orange_6 } !important;
      color: ${theme.token.colorWhite} !important;
      border: none !important;
      box-shadow: none !important;
    }
}
`;
export const CustomErrorButton = styled(Button)` &&
 {  
    color: ${theme.token.colorWhite};
    background-color: ${theme.token.Error_100};
    border: none;
    border-raduis:10px;
    padding: 10px 20px;
    transition: background-color 0.3s ease;

     &:hover {
      background-color: ${theme.token.Error_100} !important;
         border: none !important;
      box-shadow: none !important;
}}`;

export const DeleteButton = styled(Button)` &&
 {  
    color: ${theme.token.colorWhite};
    background-color: ${theme.token.red_5};
    border: none;
    border-raduis:10px;
    padding: 4px 8px;
    transition: background-color 0.3s ease;
    box-shadow: none !important;

     &:hover {
      background-color: ${theme.token.red_5} !important;
      color: ${theme.token.colorWhite} !important;
      border: none !important;
      box-shadow: none !important;
    }
}
`;




