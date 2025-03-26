import Card from "antd/es/card/Card";
import styled from "styled-components";
import { theme } from "../theme";

export const CustomDrawerCard = styled(Card)` &&
 {  
    display: flex;
    flex-direction: column;
    margin: 20px;
    border-color: ${theme.token.gray_1};
    box-shadow: none;
}
`;

export const RadioCard = styled(Card)` &&
 {  
   display: flex;
    flex-direction: column;
    margin: 20px;
    border-color: ${theme.token.gray_1};
    box-shadow: none;
}
`;