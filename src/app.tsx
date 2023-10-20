import { ColorPalette, Header } from "./components";

export default function App() {
  return (
    <div className="h-full w-full overflow-auto p-4">
      <Header />

      <ColorPalette />
    </div>
  );
}
