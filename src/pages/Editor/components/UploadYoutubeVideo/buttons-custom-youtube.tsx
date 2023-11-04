import { PenSquareIcon, TrashIcon } from "lucide-react";
import { CustomYoutubeNodeAttributes } from ".";
import { ButtonMenuUploadVideo } from "../Buttons";
import { ButtonAction } from "../ui";

type ButtonsCustomYoutubeProps = {
  defaultValues: CustomYoutubeNodeAttributes;
  deleteNode: () => void;
  onSave: (video: CustomYoutubeNodeAttributes) => void;
};

export function ButtonsCustomYoutube({
  defaultValues,
  deleteNode,
  onSave,
}: ButtonsCustomYoutubeProps) {
  const initialValue = {
    src: defaultValues.src,
    height: defaultValues.height ?? 200,
    width: defaultValues.width ?? 300,
    justify: defaultValues.justify ?? "flex-start",
  };

  return (
    <div className="bottom-0 w-full flex-wrap invisible group-hover:visible absolute mix-h-10 h-fit transform translate-y-full transition-transform duration-200 backdrop-blur-md bg-primary flex items-center justify-between group-hover:-translate-y-0 animate-scale-down px-4 py-2 gap-2">
      <ButtonMenuUploadVideo
        variant
        initialValue={initialValue}
        icon={<PenSquareIcon size={16} />}
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
