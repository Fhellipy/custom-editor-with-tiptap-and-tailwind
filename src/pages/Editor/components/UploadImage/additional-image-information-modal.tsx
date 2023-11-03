import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon, PenSquareIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { ButtonAction } from "./button-action";
import { CustomsImageNodeAttributes } from "./custom-image";

type Props = {
  defaultValues: CustomsImageNodeAttributes;
  onSave: (image: CustomsImageNodeAttributes) => void;
};

export function AdditionalImageInformationModal({
  defaultValues,
  onSave,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [alt, setAlt] = useState(defaultValues.alt ?? "");
  const [title, setTitle] = useState(defaultValues.title ?? "");

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <ButtonAction
        title="Editar informações da imagem"
        icon={<PenSquareIcon size={16} />}
        onClick={() => setIsOpen(true)}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            closeModal();
            setAlt(defaultValues.alt ?? "");
            setTitle(defaultValues.title ?? "");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-50"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-0"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden border rounded bg-background p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-foreground"
                  >
                    Informações da imagem
                  </Dialog.Title>

                  <div className="h-full flex flex-col text-sm mt-2">
                    <JustifyImage
                      position={defaultValues.justify ?? "flex-start"}
                      setPosition={position => {
                        onSave({
                          ...defaultValues,
                          justify:
                            position ?? defaultValues.justify ?? "flex-start",
                        });
                      }}
                    />

                    <label htmlFor="title" className="mt-2 mb-0.5 text-base">
                      Título
                    </label>
                    <input
                      id="title"
                      value={title}
                      className="h-10 border rounded p-2 bg-background"
                      placeholder="Digite o título da imagem..."
                      onChange={ev => setTitle(ev.target.value)}
                    />

                    <label htmlFor="alt" className="mt-2 mb-0.5 text-base">
                      Texto alternativo
                    </label>
                    <input
                      id="alt"
                      value={alt}
                      className="h-10 border rounded p-2 bg-background"
                      placeholder="Digite o texto alternativo da imagem..."
                      onChange={ev => setAlt(ev.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded border border-transparent bg-secondary px-4 py-2 text-sm font-semibold text-foreground hover:bg-primary"
                      onClick={() => {
                        closeModal();

                        onSave({
                          ...defaultValues,
                          alt,
                          title,
                        });
                      }}
                    >
                      Salvar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

type PositionOptions = "flex-start" | "center" | "flex-end";

type JustifyImageProps = {
  position: string;
  setPosition: (position: PositionOptions) => void;
};

const positions = [
  { id: 1, name: "Esquerda", value: "flex-start" },
  { id: 2, name: "Centro", value: "center" },
  { id: 3, name: "Direita", value: "flex-end" },
];

export function JustifyImage({ setPosition, position }: JustifyImageProps) {
  const defaultPosition = positions.find(pos => pos.value === position);
  const [selected, setSelected] = useState(defaultPosition ?? positions[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <label htmlFor="position" className="text-base mb-0.5">
          Posição
        </label>
        <Listbox.Button
          id="position"
          className="relative w-full cursor-pointer rounded bg-background py-2 pl-3 pr-10 text-left sm:text-sm border"
        >
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-30 w-full rounded bg-background py-1 text-base shadow-lg border sm:text-sm">
            {positions.map((position, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground"
                  }`
                }
                value={position}
                onClick={() => {
                  setPosition(position.value as PositionOptions);
                }}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {position.name}
                    </span>

                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-foreground">
                        <CheckIcon size={16} aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
