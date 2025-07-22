import { Table } from "antd";
import styled from "styled-components";
import { theme } from "../theme";

export const CustomStyledTable = styled(Table)` && {
  .ant-table {
    background-color: ${theme.token.gray300};
    border: none;
    border-radius: 0 !important;
  }

  .ant-table-container {
    border: none;
    border-radius: 0 !important;
  }

  .ant-table-content {
    border-radius: 0 !important;
  }

  .ant-table-content::before {
    display: none !important; /* removes top border line */
  }

  /* Table header style */
  .ant-table-thead > tr > th {
    background-color: ${theme.token.gray300} !important;
    color: #FFFFFF !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
     border-bottom: 1px solid ${theme.token.gray50} !important; /* or your desired color */
  }

  .ant-table-thead > tr > th::before {
    display: none !important; /* removes vertical separators */
  }

  .ant-table-thead > tr {
    border: none !important;
  }

  /* Table body style */
  .ant-table-tbody > tr > td {
    background-color: ${theme.token.gray300} !important;
    color: #FFFFFF !important;
    border: none !important;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: ${theme.token.gray300} !important;
  }
}
`;

