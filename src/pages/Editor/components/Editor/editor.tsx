import { cn } from "@/shared/lib";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { Highlight } from "@tiptap/extension-highlight";
import { Link } from "@tiptap/extension-link";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Typography } from "@tiptap/extension-typography";
import { Underline } from "@tiptap/extension-underline";
import { Youtube } from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { CustomImageExtensionNode } from "../UploadImage";
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
  Underline,
  TextStyle,
  FontFamily.configure({
    types: ["textStyle"],
  }),
  Color.configure({
    types: ["textStyle"],
  }),
  Highlight.configure({
    multicolor: true,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Typography,
  Superscript,
  Subscript,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  CustomImageExtensionNode,
  Youtube.configure({
    inline: true,
    nocookie: true,
    ccLanguage: "pt-BR",
    controls: true,
  }),
  Link.configure({
    openOnClick: true,
    linkOnPaste: true,
    HTMLAttributes: {
      class: "text-primary hover:underline cursor-pointer",
    },
  }),
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
          "prose-table:border prose-table:max-w-full prose-col:border prose prose-hr:my-2 prose-p:m-0 prose-ul:m-0 prose-ol:m-0 prose-li:m-0 prose-blockquote:m-0 prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-h4:m-0 prose-h5:m-0 prose-h6:m-0 prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-h4:text-foreground prose-h5:text-foreground prose-h6:text-foreground max-w-none w-full h-full text-foreground dark:text-foreground",
          css.editor,
        )}
      />

      <pre className="w-full border rounded-lg p-2 bg-card-foreground text-card dark:bg-background dark:text-foreground overflow-auto">
        {JSON.stringify(editor?.getJSON(), null, 2)}
      </pre>
    </div>
  );
}
