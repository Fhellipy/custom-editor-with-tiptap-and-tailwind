import { cn } from "@/shared/lib";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { EditorMenu } from "./editor-menu";
import css from "./editor.module.css";

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  TextStyle,
  FontFamily.configure({
    types: ["textStyle"],
  }),
  Color.configure({
    types: ["textStyle"],
  }),
  Underline,
];

export function EditorComponent() {
  const contentDefault = "<p>Content</p>";

  const editor = useEditor({
    extensions,
    content: contentDefault,
  });

  return (
    <div className="w-full flex flex-col border rounded p-4 mt-4 gap-6">
      <EditorMenu editor={editor} />

      <EditorContent
        editor={editor}
        className={cn(
          "prose prose-p:m-0 prose-ul:m-0 prose-ol:m-0 prose-li:m-0 prose-blockquote:m-0 prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-h4:m-0 prose-h5:m-0 prose-h6:m-0 prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-h4:text-foreground prose-h5:text-foreground prose-h6:text-foreground max-w-none w-full h-full",
          css.editor,
        )}
      />

      <pre className="w-full border rounded-lg p-2 bg-card-foreground text-card dark:bg-background dark:text-foreground overflow-auto">
        {JSON.stringify(editor?.getJSON(), null, 2)}
      </pre>
    </div>
  );
}
