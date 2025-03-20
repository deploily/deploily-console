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




