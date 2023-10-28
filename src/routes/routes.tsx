import { ColorPalette } from "@/pages";
import { Routes as AllRoutes, Route } from "react-router-dom";
import { Editor } from "./Editor";

export function Routes() {
  return (
    <AllRoutes>
      <Route path="/" element={<Editor />} />
      <Route path="/colors-palette" element={<ColorPalette />} />
    </AllRoutes>
  );
}
