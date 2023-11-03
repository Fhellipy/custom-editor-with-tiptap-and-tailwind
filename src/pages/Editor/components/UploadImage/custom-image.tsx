import { cn } from "@/shared/lib";
import { Node, mergeAttributes, type NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import "./assets/pintura.css";
import { ButtonsCustomImage } from "./buttons-custom-image";

export type CustomsImageNodeAttributes = {
  src?: string;
  alt?: string;
  title?: string;
  justify?: "center" | "flex-start" | "flex-end";
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customImage: {
      setCustomImage: (options: CustomsImageNodeAttributes) => ReturnType;
    };
  }
}

type ImageVisualizationProps = NodeViewProps;

function ImageNodeVisualization(props: ImageVisualizationProps) {
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

  return (
    <NodeViewWrapper className={cn("flex w-full", getAlignment())}>
      <div className="w-fit relative h-fit flex flex-col items-center flex-wrap border overflow-hidden cursor-pointer group">
        <img
          src={props.node.attrs.src}
          alt={props.node.attrs.alt}
          title={props.node.attrs.title}
          className="m-0"
        />

        <ButtonsCustomImage
          defaultValues={props.node.attrs}
          deleteNode={() => props.deleteNode()}
          onSave={image => {
            props.updateAttributes(image);
          }}
        />
      </div>
    </NodeViewWrapper>
  );
}

export default Node.create({
  name: "custom-image",
  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: "Essa imagem não tem texto alternativo.",
      },
      title: {
        default: "Essa imagem não tem titulo.",
      },
      justify: {
        default: "flex-start",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64
          ? "img[src]"
          : 'img[src]:not([src^="data:"])',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeVisualization);
  },

  addCommands() {
    return {
      setCustomImage:
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
