import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { PlusIcon, SheetIcon, TrashIcon } from "lucide-react";
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
        className="h-8 w-40 bg-background text-foreground border rounded mx-1.5 py-1 px-2"
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
        className="h-8 w-40 bg-background text-foreground border rounded mx-1.5 py-1 px-2"
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
          Adicionar Tabela
        </button>
      </Menu.Item>

      <DisclosureButtons editor={editor} />
    </MenuDropdown>
  );
}

function DisclosureButtons({ editor }: Props) {
  const [openPlus, setOpenPlus] = useState(false);
  const [openTrash, setOpenTrash] = useState(false);

  if (!editor) {
    return null;
  }

  return (
    <Disclosure>
      <div className="w-full inline-flex justify-between gap-1.5">
        <Disclosure.Button
          className="w-full h-8 flex items-center justify-center bg-surface rounded p-1 text-surface-foreground"
          onClick={() => setOpenPlus(!openPlus)}
        >
          <PlusIcon size={20} />
        </Disclosure.Button>

        <Disclosure.Button
          className="w-full h-8 flex items-center justify-center bg-surface rounded p-1 text-surface-foreground"
          onClick={() => setOpenTrash(!openTrash)}
        >
          {<TrashIcon size={18} />}
        </Disclosure.Button>
      </div>

      <Transition
        show={openPlus}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel>
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
              title="Nova Coluna"
              className="w-full mt-2 bg-surface font-semibold text-surface-foreground p-2 border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-surface disabled:text-surface-foreground"
              onClick={() => {
                editor.chain().focus().addColumnAfter().run();
              }}
            >
              Nova Coluna
            </button>
          </Menu.Item>
        </Disclosure.Panel>
      </Transition>

      <Transition
        show={openTrash}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel>
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
              title="Deletar Coluna"
              className="w-full mt-2 bg-surface font-semibold text-surface-foreground p-2 border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-surface disabled:text-surface-foreground"
              onClick={() => {
                editor.chain().focus().deleteColumn().run();
              }}
            >
              Deletar Coluna
            </button>
          </Menu.Item>

          <Menu.Item>
            <button
              title="Deletar Tabela"
              className="w-full mt-2 bg-surface font-semibold text-surface-foreground p-2 border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:bg-surface disabled:text-surface-foreground"
              onClick={() => {
                editor.chain().focus().deleteTable().run();
              }}
            >
              Deletar Tabela
            </button>
          </Menu.Item>
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
}
