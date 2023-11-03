import { openDefaultEditor } from "../assets/pintura";

export type FileWithPreview = {
  data_url?: string;
  file: File;
};

type EditorObjectType = {
  handleEvent: (...t: any[]) => void;
  modal: any;
  on: (event: string, callback: Function) => void;
};

export const editImage = async (
  image: FileWithPreview,
  done: (dest: FileWithPreview) => void,
) => {
  const editor = openDefaultEditor({ src: image.data_url }) as EditorObjectType;

  editor.on("process", ({ dest }: { dest: FileWithPreview }) => {
    done(dest);
  });
};
