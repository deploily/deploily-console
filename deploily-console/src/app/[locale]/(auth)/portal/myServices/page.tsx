import {Row} from "antd";
import ComingSoonPage from "../containers/comingSoonContainer";

export default function Page() {
  return (
    <>
      <Row style={{padding: 20}}>
        <span
          style={{
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          My services
        </span>
      </Row>
      <ComingSoonPage />
    </>
  );
}
