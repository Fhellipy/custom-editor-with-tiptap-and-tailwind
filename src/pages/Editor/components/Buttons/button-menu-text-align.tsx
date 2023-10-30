import { Menu } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { useState } from "react";
import { ButtonMenu, MenuDropdown } from ".";

type Props = {
  editor: Editor | null;
};

type AlignType = {
  title: string;
  position: string;
  icon: React.ReactNode;
};

export function ButtonMenuTextAlign({ editor }: Props) {
  const [align, setAlign] = useState<React.ReactNode>(
    <AlignLeftIcon size={18} />,
  );

  if (!editor) {
    return null;
  }

  const aligns: AlignType[] = [
    {
      title: "Centralizar",
      position: "center",
      icon: <AlignCenterIcon size={18} />,
    },
    {
      title: "Alinhar à Esquerda",
      position: "left",
      icon: <AlignLeftIcon size={18} />,
    },
    {
      title: "Alinhar à Direita",
      position: "right",
      icon: <AlignRightIcon size={18} />,
    },
    {
      title: "Justificar",
      position: "justify",
      icon: <AlignJustifyIcon size={18} />,
    },
  ];

  return (
    <MenuDropdown title="Alinhamento" label={align}>
      {aligns.map(({ title, position, icon }) => (
        <Menu.Item key={position}>
          <ButtonMenu
            title={title}
            icon={icon}
            onClick={() => {
              editor.chain().focus().setTextAlign(position).run();

              setAlign(icon);
            }}
            active={editor.isActive({ textAlign: position })}
          />
        </Menu.Item>
      ))}
    </MenuDropdown>
  );
}
