import { ImageType } from "react-images-uploading";
import { openDefaultEditor } from "../assets/pintura";

// export type FileWithPreview = File & ImageType;
export type FileWithPreview = File &
  ImageType & { preview?: string; pintura?: ImageType };

type EditorObjectType = {
  handleEvent: (...t: any[]) => void;
  modal: any;
  on: (event: string, callback: Function) => void;
};

export const editImage = async (
  image: File,
  done: (dest: FileWithPreview) => void,
) => {
  const editor = openDefaultEditor({ src: image }) as EditorObjectType;

  editor.on("process", ({ dest }: { dest: FileWithPreview }) => {
    done(dest);
  });
};
