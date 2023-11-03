import { cn } from "@/shared/lib";
import { Dialog, Transition } from "@headlessui/react";
import { ImageIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { useDropzone } from "react-dropzone";
import { convertToBase64 } from "../UploadImage/utils";

type Props = {
  title: string;
  icon: React.ReactNode;
  onChange: (src: string) => void;
  variant?: boolean;
};

export function ButtonMenuUploadImage(props: Props) {
  const { title, icon, onChange, variant } = props;

  const [open, setOpen] = useState(false);

  const { getRootProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/png": [".png"],
    },
    onDrop: async acceptedFiles => {
      const base64 = (await convertToBase64(acceptedFiles[0])) as string;

      if (base64) {
        setOpen(false);
        onChange(base64);
      }
    },
  });

  return (
    <>
      <div className="flex flex-col justify-between">
        <button
          title={title}
          className={cn(
            "w-fit h-10 bg-surface text-surface-foreground py-2 px-4 border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out cursor-pointer",
            {
              "border px-4 py-2 text-xs font-bold text-primary-foreground bg-primary rounded hover:bg-surface hover:text-surface-foreground transition-colors duration-200 ease-in-out":
                variant,
            },
          )}
          onClick={() => setOpen(true)}
        >
          {icon}
        </button>
      </div>

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-50"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-fit flex items-center justify-center transform overflow-hidden border rounded bg-background p-6 shadow-2xl transition-all">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <button className="w-52 h-52 flex flex-col items-center justify-center text-foreground hover:text-foreground hover:border-foreground border-2 border-dashed cursor-pointer gap-2 transition-colors duration-200 ease-in-out">
                      <ImageIcon size={50} />
                      <span>Selecione uma imagem</span>
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
