import { Menu } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  HeadingIcon,
} from "lucide-react";
import { useState } from "react";
import { ButtonMenu, MenuDropdown } from ".";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingType = {
  level: Level;
  icon: React.ReactNode;
};

type Props = {
  editor: Editor | null;
};

export function ButtonMenuHeading({ editor }: Props) {
  const [levelHeading, setLevelHeading] = useState(0);

  if (!editor) {
    return null;
  }

  const headings: HeadingType[] = [
    { level: 1, icon: <Heading1Icon size={20} /> },
    { level: 2, icon: <Heading2Icon size={20} /> },
    { level: 3, icon: <Heading3Icon size={20} /> },
    { level: 4, icon: <Heading4Icon size={20} /> },
    { level: 5, icon: <Heading5Icon size={20} /> },
    { level: 6, icon: <Heading6Icon size={20} /> },
  ];

  return (
    <MenuDropdown
      title="Cabeçalho"
      label={levelHeading > 0 ? `H${levelHeading}` : "H"}
    >
      <Menu.Item>
        <ButtonMenu
          title={`Padrão`}
          icon={<HeadingIcon size={18} />}
          onClick={() => {
            editor.chain().focus().setParagraph().run();

            setLevelHeading(0);
          }}
          active={levelHeading === 0}
        />
      </Menu.Item>

      {headings.map(({ level, icon }) => (
        <Menu.Item key={level}>
          <ButtonMenu
            title={`H${level}`}
            icon={icon}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level }).run();

              setLevelHeading(level);
            }}
            active={editor.isActive("heading", { level })}
          />
        </Menu.Item>
      ))}
    </MenuDropdown>
  );
}
