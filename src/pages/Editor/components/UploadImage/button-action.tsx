import { forwardRef } from "react";

type ButtonActionProps = {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
};

function Button(props: ButtonActionProps, ref: React.Ref<HTMLButtonElement>) {
  const { icon, title, onClick } = props;

  return (
    <button
      ref={ref}
      title={title}
      className="border px-4 py-2 text-xs font-bold text-primary-foreground bg-primary rounded hover:bg-surface hover:text-surface-foreground transition-colors duration-200 ease-in-out"
      onClick={onClick}
    >
      {icon ?? title}
    </button>
  );
}

export const ButtonAction = forwardRef(Button);
