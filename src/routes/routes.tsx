import { ColorPalette, EditorPage } from "@/pages";
import { Routes as AllRoutes, Route } from "react-router-dom";

export function Routes() {
  return (
    <AllRoutes>
      <Route path="/" element={<EditorPage />} />
      <Route path="/colors-palette" element={<ColorPalette />} />
    </AllRoutes>
  );
}
