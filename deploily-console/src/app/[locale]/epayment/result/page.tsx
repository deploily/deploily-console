"use client";
import { Layout } from "antd";
import ResultPageContent from "./resultContent";

export default function page() {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <ResultPageContent />
      </Layout>
    </>
  );
}