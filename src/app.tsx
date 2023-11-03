import { Routes } from "@/routes";
import { Layout } from "@/shared/layouts";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
}
