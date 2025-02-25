import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { useCartLine } from "@/lib/features/cartLine/cartLineSelectors";
import { useAppDispatch } from "@/lib/hook";
import MyServiceCard from "./myServicesCard";
import { fetchCartLines } from "@/lib/features/cartLine/cartLineThunks";

export default function MyServiceContentPage() {
  const { isLoading, cartLineResponse } = useCartLine();
  const dispatch = useAppDispatch();
  const [justify, setJustify] = useState<"start" | "center">(
    window.innerWidth < 992 ? "center" : "start"
  );

  // Fetch cart lines on mount (only once)
  useEffect(() => {
    dispatch(fetchCartLines());
  }, [dispatch]);

  // Handle screen resize event
  useEffect(() => {
    const updateJustify = () => {
      setJustify(window.innerWidth < 992 ? "center" : "start");
    };

    window.addEventListener("resize", updateJustify);
    return () => window.removeEventListener("resize", updateJustify);
  }, []);

  return (
    <>
      {!isLoading && cartLineResponse !== undefined && (
        <Row gutter={[14, 14]} justify={justify} style={{ margin: 0 }}>
          {cartLineResponse?.result?.map((row) => (
            <Col
              key={row.id}
              xs={24}
              sm={12}
              md={10}
              lg={8}
              xl={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <MyServiceCard data={row} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
