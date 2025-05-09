import { DatePicker } from "antd";
import styled from "styled-components";
import { theme } from "../theme";

export const DatePickerStyle = styled(DatePicker)` &&
 {  
    border: 1px solid rgba(68, 66, 66, 1);
    border-radius: 0px;
    background: #212020;
    &:hover { 
        border: 1px solid rgba(68, 66, 66, 1);
        background: #212020;
    }

    input:disabled {
    color: ${theme.token.colorWhite};
    opacity: 1; 
  }
    
}
`;