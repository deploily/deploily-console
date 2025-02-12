"use client";
import {CollapseProps, Typography} from "antd";

const text = `
    Description Description Description Description Description Description Description 
 Description DescriptionDescription Description Description Description 
 Description Description Description DescriptionDescription Description Description Description
 DescriptionDescription Description Description Description Description
`;

export const getItems: CollapseProps["items"] = [
  {
    key: "1",
    label: "Description",
    children: (
      <Typography.Title level={5} style={{fontWeight: 400}}>
        {text}
      </Typography.Title>
    ),
  },
  {
    key: "2",
    label: "Features and specifications",
    children: (
      <Typography.Title level={5} style={{fontWeight: 400}}>
        {text}
      </Typography.Title>
    ),
  },
  {
    key: "3",
    label: "Documentation",
    children: (
      <Typography.Title level={5} style={{fontWeight: 400}}>
        {text}
      </Typography.Title>
    ),
  },
];
