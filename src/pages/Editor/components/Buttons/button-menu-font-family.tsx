import { Menu } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { ButtonMenu, MenuDropdown } from ".";

type Props = {
  editor: Editor | null;
};

type Font = {
  name: string;
  fontFamily: string;
};

export function ButtonMenuFontFamily({ editor }: Props) {
  const [font, setFont] = useState("Padrão");

  if (!editor) {
    return null;
  }

  const fonts: Font[] = [
    { name: "Arial", fontFamily: "sans-serif" },
    { name: "Times New Roman", fontFamily: "serif" },
    { name: "Courier New", fontFamily: "monospace" },
  ];

  return (
    <MenuDropdown title="Fonte" label={font}>
      <Menu.Item>
        <ButtonMenu
          title="Padrão"
          onClick={() => {
            editor.chain().focus().unsetFontFamily().run();

            setFont("Padrão");
          }}
          active={font === "Padrão"}
        />
      </Menu.Item>

      {fonts.map(({ name, fontFamily }) => (
        <Menu.Item key={fontFamily}>
          <ButtonMenu
            title={name}
            onClick={() => {
              editor.chain().focus().setFontFamily(fontFamily).run();

              setFont(name);
            }}
            active={editor.isActive("textStyle", { fontFamily })}
          />
        </Menu.Item>
      ))}
    </MenuDropdown>
  );
}
