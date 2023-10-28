import { Editor } from "@tiptap/react";
import {
  ChevronDownIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  HeadingIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonMenu } from ".";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingType = {
  level: Level;
  icon: React.ReactNode;
};

type Props = {
  editor: Editor | null;
};

export function ButtonMenuHeading({ editor }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [levelHeading, setLevelHeading] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    const dropdown = dropdownRef.current;
    if (dropdown && !dropdown.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        title="Cabeçalho"
        onClick={toggleDropdown}
        className="w-fit h-full flex justify-between items-center bg-surface text-surface-foreground font-bold text-sm rounded shadow-sm px-3 gap-1"
      >
        <span className="block truncate">
          {levelHeading > 0 ? `H${levelHeading}` : "Normal"}
        </span>

        <ChevronDownIcon
          size={20}
          className={`text-surface-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute flex flex-col lg:flex-row z-10 mt-1 rounded bg-background shadow-lg ring-2 dark:ring-1 ring-surface focus:outline-none sm:text-sm">
          <li className="relative p-1" role="option">
            <ButtonMenu
              title={`Normal`}
              icon={<HeadingIcon size={18} />}
              onClick={() => {
                editor.chain().focus().setParagraph().run();

                setIsOpen(false);
                setLevelHeading(0);
              }}
              active={levelHeading === 0}
            />
          </li>

          {headings.map(({ level, icon }) => (
            <li
              key={level}
              id={level.toString()}
              className="relative p-1"
              role="option"
            >
              <ButtonMenu
                title={`H${level}`}
                icon={icon}
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level }).run();

                  setIsOpen(false);
                  setLevelHeading(level);
                }}
                active={editor.isActive("heading", { level })}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
