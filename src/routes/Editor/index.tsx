import { lazy } from "react";
export const LazyEditorPage = lazy(() => import("@/pages/Editor/editor"));

export function Editor() {
  return <LazyEditorPage />;
}
