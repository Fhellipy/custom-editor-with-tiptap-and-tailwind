import { Routes as AllRoutes, Route } from "react-router-dom";
import { ColorPalette, Editor } from "@/pages";

export function Routes() {
  return (
    <AllRoutes>
      <Route path="/" element={<Editor />} />
      <Route path="/colors-palette" element={<ColorPalette />} />
    </AllRoutes>
  );
}
