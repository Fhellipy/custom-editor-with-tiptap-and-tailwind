import { Editor } from "@tiptap/react";
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import {
  ButtonMenu,
  ButtonMenuFontFamily,
  ButtonMenuHeading,
} from "../Buttons";
import { ButtonMenuTextColor } from "../Buttons/button-menu-text-color";

type EditorMenuProps = {
  editor: Editor | null;
};

export function EditorMenu({ editor }: EditorMenuProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap border rounded p-4 gap-1">
      <ButtonMenu
        title="Negrito"
        icon={<BoldIcon size={18} />}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      />

      <ButtonMenu
        title="Itálico"
        icon={<ItalicIcon size={18} />}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      />

      <ButtonMenu
        title="Tachado"
        icon={<StrikethroughIcon size={18} />}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
      />

      <ButtonMenu
        title="Sublinhado"
        icon={<UnderlineIcon size={18} />}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
      />

      <ButtonMenu
        title="Lista Ordenada"
        icon={<ListOrderedIcon size={20} />}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
      />

      <ButtonMenu
        title="Lista Não Ordenada"
        icon={<ListIcon size={20} />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      />

      <ButtonMenuHeading editor={editor} />
      <ButtonMenuFontFamily editor={editor} />
      <ButtonMenuTextColor editor={editor} />

      <ButtonMenu
        title="Código"
        icon={<CodeIcon size={18} />}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
      />

      <ButtonMenu
        title="Citação"
        icon={<QuoteIcon size={18} />}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      />
    </div>
  );
}
