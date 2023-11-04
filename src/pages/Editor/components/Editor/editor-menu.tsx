import { Editor } from "@tiptap/react";
import {
  BoldIcon,
  CodeIcon,
  ImageIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  RemoveFormattingIcon,
  RotateCcwIcon,
  RotateCwIcon,
  SplitSquareHorizontalIcon,
  StrikethroughIcon,
  UnderlineIcon,
  WrapTextIcon,
  YoutubeIcon,
} from "lucide-react";
import {
  ButtonMenu,
  ButtonMenuFontFamily,
  ButtonMenuHeading,
  ButtonMenuScript,
  ButtonMenuTable,
  ButtonMenuTextAlign,
  ButtonMenuTextColor,
  ButtonMenuUploadImage,
  ButtonMenuUploadLink,
  ButtonMenuUploadVideo,
} from "../Buttons";

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
        active={editor.isActive("orderedList")}
      />

      <ButtonMenu
        title="Lista Não Ordenada"
        icon={<ListIcon size={20} />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      />

      <ButtonMenuHeading editor={editor} />
      <ButtonMenuFontFamily editor={editor} />
      <ButtonMenuTextColor editor={editor} />

      <ButtonMenuTextAlign editor={editor} />

      <ButtonMenuUploadImage
        title="Adicionar Imagem"
        icon={<ImageIcon size={20} />}
        onChange={src => {
          editor?.chain().focus().setCustomImage({ src }).run();
        }}
      />

      <ButtonMenuUploadVideo
        icon={<YoutubeIcon size={20} />}
        onSave={video => editor?.chain().focus().setCustomYoutube(video).run()}
      />
      <ButtonMenuUploadLink editor={editor} />

      <ButtonMenuTable editor={editor} />
      <ButtonMenuScript editor={editor} />

      <ButtonMenu
        title="Quebra de Linha"
        icon={<WrapTextIcon size={20} />}
        onClick={() => editor.chain().focus().setHardBreak().run()}
      />

      <ButtonMenu
        title="Linha Horizontal"
        icon={<SplitSquareHorizontalIcon size={20} />}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />

      <ButtonMenu
        title="Citação"
        icon={<QuoteIcon size={18} />}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      />

      <ButtonMenu
        title="Código"
        icon={<CodeIcon size={18} />}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
      />

      <ButtonMenu
        onClick={() => {
          editor.chain().focus().clearNodes().run();
          editor.chain().focus().unsetAllMarks().run();
        }}
        icon={<RemoveFormattingIcon size={18} />}
        title="Remover Formatação"
      />

      <ButtonMenu
        title="Desfazer"
        icon={<RotateCcwIcon size={18} />}
        onClick={() => editor.chain().focus().undo().run()}
      />

      <ButtonMenu
        title="Refazer"
        icon={<RotateCwIcon size={18} />}
        onClick={() => editor.chain().focus().redo().run()}
      />
    </div>
  );
}
