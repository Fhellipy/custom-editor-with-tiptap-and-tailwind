import { Node, mergeAttributes, type NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import "./assets/pintura.css";
import { ButtonsCustomImage } from "./buttons-custom-image";

export type CustomsImageNodeAttributes = {
  src?: string;
  alt?: string;
  title?: string;
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
  return (
    <NodeViewWrapper className="counterNode">
      <div className="relative h-fit flex flex-col items-center flex-wrap border overflow-hidden cursor-pointer group">
        <img
          src={props.node.attrs.src}
          alt={props.node.attrs.alt}
          title={props.node.attrs.title}
          className="m-0"
        />

        <ButtonsCustomImage
          defaultValues={props.node.attrs}
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
        default: null,
      },
      title: {
        default: null,
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
