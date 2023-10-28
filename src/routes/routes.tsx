import { Routes as AllRoutes, Route } from "react-router-dom";
import { Editor } from "./Editor";
import { Palette } from "./Palette";

export function Routes() {
  return (
    <AllRoutes>
      <Route path="/" element={<Editor />} />
      <Route path="/colors-palette" element={<Palette />} />
    </AllRoutes>
  );
}
