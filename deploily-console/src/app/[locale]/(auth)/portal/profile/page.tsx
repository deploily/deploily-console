"use client";
import {Row} from "antd";
import ProfileContentDetails from "./components/profileContentDetails";

export default function Page() {
  return (
    <>
      <Row style={{padding: 20}}>
        <span
          style={{
            color: "white",

            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          Profile
        </span>
      </Row>
      <ProfileContentDetails />
    </>
  );
}
