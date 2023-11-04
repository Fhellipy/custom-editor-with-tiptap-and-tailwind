import { cn } from "@/shared/lib";
import { NodeViewProps, mergeAttributes } from "@tiptap/core";
import Youtube from "@tiptap/extension-youtube";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { ButtonsCustomYoutube } from "./buttons-custom-youtube";
import { createYoutubeEmbedUrl, isValidYoutubeUrl } from "./utils";

export type CustomYoutubeNodeAttributes = {
  src: string;
  width?: number;
  height?: number;
  justify?: "center" | "flex-start" | "flex-end";
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customYoutube: {
      setCustomYoutube: (options: CustomYoutubeNodeAttributes) => ReturnType;
    };
  }
}

type YoutubeVisualizationProps = NodeViewProps;

function YoutubeNodeVisualization(props: YoutubeVisualizationProps) {
  const getAlignment = () => {
    let justify = "flex-start";

    switch (props.node.attrs.justify) {
      case "center":
        justify = "justify-center";
        break;
      case "flex-end":
        justify = "justify-end";
        break;
      default:
        justify = "justify-start";
        break;
    }

    return justify;
  };

  const url = props.node.attrs.src || "";
  const embedUrl = isValidYoutubeUrl(url) ? createYoutubeEmbedUrl(url) : "";

  const video = {
    src: embedUrl,
    height: props.node.attrs.height,
    width: props.node.attrs.width,
    justify: props.node.attrs.justify,
  };

  return (
    <NodeViewWrapper className={cn("flex w-full", getAlignment())}>
      <div className="w-fit relative h-fit flex flex-col items-center flex-wrap border overflow-hidden cursor-pointer group">
        <iframe
          src={embedUrl}
          height={props.node.attrs.height}
          width={props.node.attrs.width}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />

        <ButtonsCustomYoutube
          defaultValues={video}
          deleteNode={() => props.deleteNode()}
          onSave={video => {
            props.updateAttributes(video);
          }}
        />
      </div>
    </NodeViewWrapper>
  );
}

export const CustomYoutubeExtensionNode = Youtube.extend({
  name: "custom-youtube",
  group: "block",
  draggable: true,

  addOptions() {
    return {
      addPasteHandler: true,
      allowFullscreen: true,
      autoplay: false,
      ccLanguage: undefined,
      ccLoadPolicy: undefined,
      controls: true,
      disableKBcontrols: false,
      enableIFrameApi: false,
      endTime: 0,
      height: 480,
      interfaceLanguage: undefined,
      ivLoadPolicy: 0,
      loop: false,
      modestBranding: false,
      HTMLAttributes: {},
      inline: false,
      nocookie: false,
      origin: "",
      playlist: "",
      progressBarColor: undefined,
      width: 640,
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: 560,
      },
      height: {
        default: 315,
      },
      justify: {
        default: "flex-start",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "iframe",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(YoutubeNodeVisualization);
  },

  addCommands() {
    return {
      setCustomYoutube:
        options =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
