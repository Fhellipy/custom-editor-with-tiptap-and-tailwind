import { Editor } from "@tiptap/react";
import { ChevronDownIcon, PaletteIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChromePicker } from "react-color";

type Props = {
  editor: Editor | null;
};

export function ButtonMenuTextColor({ editor }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!editor) {
    return null;
  }

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
        onClick={toggleDropdown}
        type="button"
        className="w-fit h-full flex justify-center items-center bg-surface text-surface-foreground font-bold text-sm rounded shadow-sm px-3 gap-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Fonte"
      >
        <span className="block truncate">{<PaletteIcon size={20} />}</span>

        <ChevronDownIcon
          size={20}
          className={`text-surface-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute flex flex-col z-10 mt-1 rounded bg-background shadow-lg ring-2 dark:ring-1 ring-surface focus:outline-none sm:text-sm">
          <ChromePicker
            color={color}
            onChange={ev => {
              setColor(ev.hex);

              editor.chain().focus().setColor(ev.hex).run();
            }}
          />
        </div>
      )}
    </div>
  );
}
