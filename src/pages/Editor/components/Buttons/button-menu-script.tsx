import { Menu } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { SubscriptIcon, SuperscriptIcon } from "lucide-react";
import { useState } from "react";
import { ButtonMenu, MenuDropdown } from ".";

type Props = {
  editor: Editor | null;
};

export function ButtonMenuScript({ editor }: Props) {
  const [script, setScript] = useState<React.ReactNode>(
    <SuperscriptIcon size={18} />,
  );

  if (!editor) {
    return null;
  }

  return (
    <MenuDropdown title="Escrito" label={script}>
      <Menu.Item>
        <button
          title="Limpar"
          className="bg-surface font-semibold text-surface-foreground p-1.5 border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out"
          onClick={() => {
            editor.chain().focus().unsetSuperscript().run();
            editor.chain().focus().unsetSubscript().run();
            setScript(<SuperscriptIcon size={18} />);
          }}
        >
          Limpar
        </button>
      </Menu.Item>

      <Menu.Item>
        <ButtonMenu
          title="Sobrescrito"
          className="w-full"
          icon={<SuperscriptIcon size={18} />}
          onClick={() => {
            editor.chain().focus().unsetSubscript().run();
            editor.chain().focus().toggleSuperscript().run();

            setScript(<SuperscriptIcon size={18} />);
          }}
          active={editor.isActive("superscript")}
        />
      </Menu.Item>

      <Menu.Item>
        <ButtonMenu
          title="Subscrito"
          className="w-full"
          icon={<SubscriptIcon size={18} />}
          onClick={() => {
            editor.chain().focus().unsetSuperscript().run();
            editor.chain().focus().toggleSubscript().run();

            setScript(<SubscriptIcon size={18} />);
          }}
          active={editor.isActive("subscript")}
        />
      </Menu.Item>
    </MenuDropdown>
  );
}
