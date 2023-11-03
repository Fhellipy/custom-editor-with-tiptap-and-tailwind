import { Dialog, Transition } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { LinkIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { ButtonMenu } from ".";

type Props = {
  editor: Editor | null;
};

export function ButtonMenuUploadLink({ editor }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [target, setTarget] = useState("_self");

  if (!editor) {
    return null;
  }

  function closeModal() {
    setIsOpen(false);
    setUrl("");
    setTarget("_self");
  }

  return (
    <>
      <ButtonMenu
        title="Link Externo"
        icon={<LinkIcon size={18} />}
        onClick={() => setIsOpen(true)}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    Informações do Link
                  </Dialog.Title>

                  <div className="h-full flex flex-col text-sm mt-2">
                    <label htmlFor="url" className="mt-2 mb-0.5 text-base">
                      Link
                    </label>
                    <input
                      id="url"
                      type="text"
                      value={url}
                      className="h-10 border rounded p-2 bg-background"
                      placeholder="Informe o link"
                      onChange={ev => setUrl(ev.target.value)}
                    />

                    <div className="flex items-center gap-1 mt-4">
                      <input
                        id="target"
                        value={`${target}`}
                        type="checkbox"
                        className="h-4 w-4 text-primary-foreground focus:ring-primary-foreground checked:border-red-500 border rounded"
                        onChange={ev => {
                          if (ev.target.checked) {
                            setTarget("_blank");
                          } else {
                            setTarget("_self");
                          }
                        }}
                      />
                      <label htmlFor="">Abrir em uma nova aba</label>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    {editor.isActive("link") && (
                      <button
                        className="w-full inline-flex justify-center rounded border border-transparent bg-secondary px-4 py-2 text-sm font-semibold text-foreground hover:bg-primary"
                        onClick={() => {
                          closeModal();
                          editor.chain().focus().unsetLink().run();
                        }}
                      >
                        Remover efeito de link
                      </button>
                    )}

                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded border border-transparent bg-secondary px-4 py-2 text-sm font-semibold text-foreground hover:bg-primary"
                      onClick={() => {
                        closeModal();

                        editor
                          .chain()
                          .focus()
                          .extendMarkRange("link")
                          .setLink({ href: url, target })
                          .run();
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
