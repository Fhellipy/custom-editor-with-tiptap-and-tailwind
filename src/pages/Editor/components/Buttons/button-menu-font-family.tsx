import { Editor } from "@tiptap/react";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonMenu } from ".";

type Props = {
  editor: Editor | null;
};

type Font = {
  name: string;
  fontFamily: string;
};

export function ButtonMenuFontFamily({ editor }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [font, setFont] = useState("Padrão");

  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!editor) {
    return null;
  }

  const fonts: Font[] = [
    { name: "Arial", fontFamily: "sans-serif" },
    { name: "Times New Roman", fontFamily: "serif" },
    { name: "Courier New", fontFamily: "monospace" },
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
        title="Fonte"
        type="button"
        onClick={toggleDropdown}
        className="w-40 h-full flex justify-center items-center bg-surface text-surface-foreground font-bold text-sm rounded shadow-sm px-3 gap-1"
      >
        <span className="block truncate">{font}</span>

        <ChevronDownIcon
          size={20}
          className={`text-surface-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute flex flex-col z-10 mt-1 rounded bg-background shadow-lg ring-2 dark:ring-1 ring-surface focus:outline-none sm:text-sm">
          <li className="relative p-1" role="option">
            <ButtonMenu
              title="Padrão"
              onClick={() => {
                editor.chain().focus().unsetFontFamily().run();

                setIsOpen(false);
                setFont("Padrão");
              }}
              active={font === "Padrão"}
            />
          </li>

          {fonts.map(({ name, fontFamily }) => (
            <li
              key={fontFamily}
              id={fontFamily}
              className="relative p-1"
              role="option"
            >
              <ButtonMenu
                title={name}
                onClick={() => {
                  editor.chain().focus().setFontFamily(fontFamily).run();

                  setIsOpen(false);
                  setFont(name);
                }}
                active={editor.isActive("textStyle", { fontFamily })}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
