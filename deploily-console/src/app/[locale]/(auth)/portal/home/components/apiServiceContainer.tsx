"use client";
import {useApiService} from "@/lib/features/apiService/apiServiceSelectors";
import {Row} from "antd";
import ApiServiceCard from "./apiServiceCard";
import {ApiServiceInterface} from "@/lib/features/apiService/apiServiceInterface";

export default function ApiServiceContainer() {
  const {isLoading, apiServiceResponse} = useApiService();
  // console.log(apiServiceResponse);

  return (
    <>
      {" "}
      {!isLoading && apiServiceResponse !== undefined && (
        <Row gutter={16}>
          {apiServiceResponse?.result?.map((row: ApiServiceInterface) => (
            <ApiServiceCard key={row.id} data={row} />
          ))}
        </Row>
      )}
    </>
  );
}
