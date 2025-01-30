import {Row} from "antd";
import ApiServiceContainer from "./components/apiServiceContainer";

export default function Page() {
  return (
    <>
      {/* <Row style={{padding: 20}}>
        <span
          style={{
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          Home Page
        </span>
      </Row> */}
      <ApiServiceContainer />
    </>
  );
}
