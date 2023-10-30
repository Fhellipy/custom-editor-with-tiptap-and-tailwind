import { cn } from "@/shared/lib";
import { Menu } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { MenuDropdown } from ".";

type Props = {
  editor: Editor | null;
};

export function ButtonMenuTextColor({ editor }: Props) {
  const [color, setColor] = useState("");
  const [background, setBackground] = useState("");
  const [activated, setActivated] = useState("text");

  if (!editor) {
    return null;
  }

  return (
    <MenuDropdown title="Paleta de cores" label={<PaletteIcon size={20} />}>
      <div className="w-full flex justify-between gap-1">
        <button
          className={cn("border rounded p-1.5 w-full", {
            "bg-primary text-primary-foreground": activated === "text",
          })}
          onClick={() => setActivated("text")}
        >
          Texto
        </button>
        <button
          className={cn("border rounded p-1.5 w-full", {
            "bg-primary text-primary-foreground": activated === "background",
          })}
          onClick={() => setActivated("background")}
        >
          Fundo
        </button>
      </div>

      <div>
        {activated === "text" && (
          <ChromePicker
            className="shadow bg-background"
            color={color}
            onChange={ev => {
              setColor(ev.hex);

              editor.chain().focus().setColor(ev.hex).run();
            }}
          />
        )}

        {activated === "background" && (
          <ChromePicker
            className="shadow"
            color={background}
            onChange={ev => {
              setBackground(ev.hex);

              editor.chain().focus().setHighlight({ color: ev.hex }).run();
            }}
          />
        )}
      </div>

      <div className="flex w-full gap-1">
        <button
          className="w-full h-8 bg-background shadow border rounded hover:bg-primary hover:text-primary-foreground"
          onClick={() => {
            editor.commands.unsetColor();
            editor.commands.unsetHighlight();
            setBackground("");
            setColor("");
          }}
        >
          Limpar
        </button>

        <Menu.Item>
          <button className="w-full h-8 bg-background shadow border rounded hover:bg-primary hover:text-primary-foreground">
            Pronto
          </button>
        </Menu.Item>
      </div>
    </MenuDropdown>
  );
}
