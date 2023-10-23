import { BrowserRouter } from "react-router-dom";
import { Routes } from "@/routes";
import { Layout } from "@/shared";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
}
