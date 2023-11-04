import { ColorPalette, EditorPage } from "@/pages";
import { Routes as AllRoutes, Route } from "react-router-dom";

export function Routes() {
  // Remove pqina link
  const a = document.querySelector("a");
  const isPqina = a?.innerHTML === "for use on pqina.nl only";

  if (isPqina) a?.remove();

  return (
    <AllRoutes>
      <Route path="/" element={<EditorPage />} />
      <Route path="/colors-palette" element={<ColorPalette />} />
    </AllRoutes>
  );
}
