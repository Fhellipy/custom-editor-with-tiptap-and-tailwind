import { Menu } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { SheetIcon } from "lucide-react";
import { useState } from "react";
import { MenuDropdown } from ".";

type Props = {
  editor: Editor | null;
};

export function ButtonMenuTable({ editor }: Props) {
  const [columns, setColumns] = useState(1);
  const [rows, setRows] = useState(1);

  if (!editor) {
    return null;
  }

  return (
    <MenuDropdown title="Tabela" label={<SheetIcon size={18} />}>
      <label htmlFor="column" className="mt-2 self-start px-1.5">
        Nº Colunas
      </label>
      <input
        min={1}
        id="column"
        type="number"
        value={columns}
        className="h-8 w-40 border rounded mx-1.5 py-1 px-2"
        onChange={ev => setColumns(Number(ev.target.value))}
      />

      <label htmlFor="row" className="mt-2 self-start px-1.5">
        Nº Linhas
      </label>
      <input
        min={1}
        id="row"
        type="number"
        value={rows}
        className="h-8 w-40 border rounded mx-1.5 py-1 px-2"
        onChange={ev => setRows(Number(ev.target.value))}
      />

      <Menu.Item>
        <button
          title="Pronto"
          className="w-full bg-surface font-semibold text-surface-foreground p-2 border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-surface disabled:text-surface-foreground"
          onClick={() => {
            editor
              .chain()
              .focus()
              .insertTable({ rows, cols: columns, withHeaderRow: true })
              .run();

            setColumns(1);
            setRows(1);
          }}
          disabled={columns < 1 || rows < 1}
        >
          Adicionar
        </button>
      </Menu.Item>

      <Menu.Item>
        <button
          title="Nova Coluna"
          className="w-full bg-surface font-semibold text-surface-foreground p-2 border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-surface disabled:text-surface-foreground"
          onClick={() => {
            editor.chain().focus().addColumnAfter().run();
          }}
        >
          Nova Coluna
        </button>
      </Menu.Item>

      <Menu.Item>
        <button
          title="Nova Linha"
          className="w-full bg-surface font-semibold text-surface-foreground p-2 border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-surface disabled:text-surface-foreground"
          onClick={() => {
            editor.chain().focus().addRowBefore().run();
          }}
        >
          Nova Linha
        </button>
      </Menu.Item>

      <Menu.Item>
        <button
          title="Deletar Coluna"
          className="w-full bg-surface font-semibold text-surface-foreground p-2 border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-surface disabled:text-surface-foreground"
          onClick={() => {
            editor.chain().focus().deleteColumn().run();
          }}
        >
          Deletar Coluna
        </button>
      </Menu.Item>

      <Menu.Item>
        <button
          title="Deletar Linha"
          className="w-full bg-surface font-semibold text-surface-foreground p-2 border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-surface disabled:text-surface-foreground"
          onClick={() => {
            editor.chain().focus().deleteRow().run();
          }}
        >
          Deletar Linha
        </button>
      </Menu.Item>

      <Menu.Item>
        <button
          title="Deletar Tabela"
          className="w-full bg-surface font-semibold text-surface-foreground p-2 border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-surface disabled:text-surface-foreground"
          onClick={() => {
            editor.chain().focus().deleteTable().run();
          }}
        >
          Deletar Tabela
        </button>
      </Menu.Item>
    </MenuDropdown>
  );
}
