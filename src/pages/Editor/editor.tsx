import { EditorComponent } from "./components";

export default function EditorPage() {
  return (
    <article className="w-full h-full border rounded p-4">
      <h1 className="font-bold uppercase">Editor</h1>

      <EditorComponent />
    </article>
  );
}
