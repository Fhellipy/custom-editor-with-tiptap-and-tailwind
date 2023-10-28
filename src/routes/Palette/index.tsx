import { lazy } from "react";
export const LazyPalettePage = lazy(
  () => import("@/pages/ColorPalette/color-palette"),
);

export function Palette() {
  return <LazyPalettePage />;
}
