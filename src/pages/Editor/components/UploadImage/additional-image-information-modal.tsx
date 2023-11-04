import { Dialog, Transition } from "@headlessui/react";
import { PenSquareIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { ListBoxPosition } from "../ui";
import { ButtonAction } from "../ui/button-action";
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
                    <ListBoxPosition
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
