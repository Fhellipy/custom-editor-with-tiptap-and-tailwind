import { CropIcon, RefreshCcwIcon, TrashIcon } from "lucide-react";
import { ButtonMenuUploadImage } from "../Buttons";
import { ButtonAction } from "../ui";
import { AdditionalImageInformationModal } from "./additional-image-information-modal";
import { CustomsImageNodeAttributes } from "./custom-image";
import { convertToBase64, editImage } from "./utils";

type ButtonsCustomImageProps = {
  defaultValues: CustomsImageNodeAttributes;
  deleteNode: () => void;
  onSave: (image: CustomsImageNodeAttributes) => void;
};

export function ButtonsCustomImage({
  defaultValues,
  deleteNode,
  onSave,
}: ButtonsCustomImageProps) {
  return (
    <div className="w-full flex-wrap invisible group-hover:visible absolute mix-h-10 h-fit transform -translate-y-full transition-transform duration-200 backdrop-blur-md bg-primary flex items-center justify-between group-hover:translate-y-0 animate-scale-up px-4 py-2 gap-2">
      <ButtonMenuUploadImage
        variant
        title="Atualizar Imagem"
        icon={<RefreshCcwIcon size={16} />}
        onChange={src => {
          onSave({
            ...defaultValues,
            src,
            alt: defaultValues.alt ?? "Essa imagem não tem texto alternativo.",
            title: defaultValues.title ?? "Essa imagem não tem titulo.",
          });
        }}
      />

      <ButtonAction
        title="Editar imagem"
        icon={<CropIcon size={16} />}
        onClick={() => {
          const file = new File(
            [new Blob([defaultValues.src ?? ""])],
            defaultValues.title ?? "image",
            {
              type: defaultValues.src?.split(";")[0].split(":")[1] ?? "",
            },
          );

          const image = {
            data_url: defaultValues.src ?? "",
            file,
          };

          editImage(image, async newFile => {
            const file = newFile as unknown as File;

            const dataUrl = (await convertToBase64(file)) as string;

            onSave({
              ...defaultValues,
              src: dataUrl ?? "",
              alt:
                defaultValues.alt ?? "Essa imagem não tem texto alternativo.",
              title: defaultValues.title ?? "Essa imagem não tem titulo.",
            });
          });
        }}
      />

      <AdditionalImageInformationModal
        defaultValues={defaultValues}
        onSave={onSave}
      />

      <ButtonAction
        title="Deletar"
        icon={<TrashIcon size={16} />}
        onClick={deleteNode}
      />
    </div>
  );
}
