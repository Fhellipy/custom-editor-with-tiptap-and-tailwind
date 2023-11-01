import { useEffect, useState } from "react";

import { Editor } from "@tiptap/react";
import {
  ImageIcon,
  PenSquareIcon,
  RefreshCcwIcon,
  TrashIcon,
} from "lucide-react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import "./assets/pintura.css";
import { ButtonAction } from "./button-action";
import { FileWithPreview, convertToBase64, editImage } from "./utils";

type UploadImageProps = {
  editor: Editor | null;
  onClose: () => void;
};

export function UploadImage({ editor, onClose }: UploadImageProps) {
  const [images, setImages] = useState<ImageType[]>([]);
  const [att, setAtt] = useState(false);
  const [upload, setUpload] = useState(false);

  const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    if (!addUpdateIndex) return;

    setImages(imageList);
  };

  useEffect(() => {
    if (upload) {
      editor?.chain().focus().setCustomImage({ src: images[0].data_url }).run();
      // editor?.chain().focus().setImage({ src: images[0].data_url }).run();
      onClose();
    }
  }, [images]);

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      dataURLKey="data_url"
    >
      {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
        <div className="flex flex-col justify-between w-full">
          <button
            className="w-52 h-52 flex flex-col items-center justify-center text-foreground hover:text-foreground hover:border-foreground border-2 border-dashed cursor-pointer gap-2 transition-colors duration-200 ease-in-out"
            onClick={() => {
              onImageUpload();
              setUpload(true);
            }}
            {...dragProps}
          >
            <ImageIcon size={50} />
            <span>Selecione uma imagem</span>
          </button>

          <div className=" flex border gap-4 p-4 mt-2">
            {imageList.map((image, index) => (
              <div
                key={index}
                className="relative h-fit flex flex-col items-center flex-wrap border overflow-hidden cursor-pointer group"
              >
                <img src={image["data_url"]} alt="" />

                <div className="w-full invisible group-hover:visible absolute h-10 transform -translate-y-full transition-transform duration-200 backdrop-blur-md bg-primary flex items-center justify-between group-hover:translate-y-0 animate-scale-up px-4 gap-2">
                  <ButtonAction
                    title="Atualizar Imagem"
                    icon={<RefreshCcwIcon size={16} />}
                    onClick={() => onImageUpdate(index)}
                  />

                  <ButtonAction
                    title="Editar"
                    icon={<PenSquareIcon size={16} />}
                    onClick={() => {
                      editImage(image as FileWithPreview, async newFile => {
                        const file = new File([newFile], newFile.name, {
                          type: newFile.type,
                        });

                        const dataUrl = await convertToBase64(file);

                        setImages(images => {
                          images[index] = {
                            data_url: dataUrl,
                            file,
                          };

                          setAtt(!att);
                          return images;
                        });
                      });
                    }}
                  />

                  <ButtonAction
                    title="Deletar"
                    icon={<TrashIcon size={16} />}
                    onClick={() => {
                      setImages(images => {
                        images.splice(index, 1);

                        setAtt(!att);
                        return images;
                      });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ImageUploading>
  );
}
