import { PenSquareIcon, RefreshCcwIcon, TrashIcon } from "lucide-react";
import { ButtonMenuUploadImage } from "../Buttons/button-menu-upload-image";
import { ButtonAction } from "./button-action";
import { CustomsImageNodeAttributes } from "./custom-image";
import { convertToBase64, editImage } from "./utils";

type ButtonsCustomImageProps = {
  defaultValues: CustomsImageNodeAttributes;
  onSave: (image: CustomsImageNodeAttributes) => void;
};

export function ButtonsCustomImage({
  defaultValues,
  onSave,
}: ButtonsCustomImageProps) {
  return (
    <div className="w-full invisible group-hover:visible absolute h-10 transform -translate-y-full transition-transform duration-200 backdrop-blur-md bg-primary flex items-center justify-between group-hover:translate-y-0 animate-scale-up px-4 gap-2">
      <ButtonAction
        title="Atualizar Imagem"
        icon={<RefreshCcwIcon size={16} />}
        onClick={() => {
          onSave({
            ...defaultValues,
            alt: "mudamos o trem",
            title: "mudamos o trem",
          });
        }}
      />

      <ButtonMenuUploadImage
        variant
        title="Atualizar Imagem"
        icon={<RefreshCcwIcon size={16} />}
        onChange={src => {
          onSave({ ...defaultValues, src });
        }}
      />

      <ButtonAction
        title="Editar"
        icon={<PenSquareIcon size={16} />}
        onClick={() => {
          const image = new File(
            [new Blob([defaultValues.src ?? ""])],
            defaultValues.title ?? "image",
            {
              type: defaultValues.src?.split(";")[0].split(":")[1] ?? "",
            },
          );

          editImage(image, async newFile => {
            const file = new File([newFile], newFile.name, {
              type: newFile.type,
            });

            const dataUrl = await convertToBase64(file);

            console.log(dataUrl);
          });
        }}
      />

      <ButtonAction
        title="Deletar"
        icon={<TrashIcon size={16} />}
        onClick={() => {}}
      />
    </div>
  );
}
