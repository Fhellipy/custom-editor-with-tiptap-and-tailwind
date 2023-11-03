import { Dialog, Transition } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import { YoutubeIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { ButtonMenu } from ".";

type Props = {
  editor: Editor | null;
};

export function ButtonMenuUploadVideo({ editor }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(300);

  if (!editor) {
    return null;
  }

  function closeModal() {
    setIsOpen(false);
    setUrl("");
    setHeight(200);
    setWidth(300);
  }

  return (
    <>
      <ButtonMenu
        title="Link do Youtube"
        icon={<YoutubeIcon size={20} />}
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
                    Informações do Video
                  </Dialog.Title>

                  <div className="h-full flex flex-col text-sm mt-2">
                    <label htmlFor="url" className="mt-2 mb-0.5 text-base">
                      Link do Youtube
                    </label>
                    <input
                      id="url"
                      type="text"
                      value={url}
                      className="h-10 border rounded p-2 bg-background"
                      placeholder="Informe o link do youtube"
                      onChange={ev => setUrl(ev.target.value)}
                    />

                    <label htmlFor="height" className="mt-2 mb-0.5 text-base">
                      Altura do video
                    </label>
                    <input
                      id="height"
                      value={height}
                      type="number"
                      min={200}
                      className="h-10 border rounded p-2 bg-background"
                      placeholder="Informe a altura do video"
                      onChange={ev => setHeight(Number(ev.target.value))}
                    />

                    <label htmlFor="width" className="mt-2 mb-0.5 text-base">
                      Largura do video
                    </label>
                    <input
                      id="width"
                      type="number"
                      min={300}
                      value={width}
                      className="h-10 border rounded p-2 bg-background"
                      placeholder="Informe a largura do video"
                      onChange={ev => setWidth(Number(ev.target.value))}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded border border-transparent bg-secondary px-4 py-2 text-sm font-semibold text-foreground hover:bg-primary"
                      onClick={() => {
                        closeModal();

                        editor
                          ?.chain()
                          .focus()
                          .setYoutubeVideo({
                            src: url,
                            height,
                            width,
                          })
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
