import { cn } from "@/shared/lib";
import { ClassValue } from "clsx";
import { forwardRef } from "react";

type ButtonMenuProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  title: string;
  disabled?: boolean;
  active?: boolean;
  className?: ClassValue;
};

function Button(props: ButtonMenuProps, ref: React.Ref<HTMLButtonElement>) {
  const { icon, title, active, disabled, onClick } = props;

  return (
    <button
      ref={ref}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-fit h-10 bg-surface text-surface-foreground py-2 px-4 border rounded hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out",
        { "bg-primary text-primary-foreground": active },
        { "w-full h-fit": !icon && title },
        props.className,
      )}
    >
      {icon ?? title}
    </button>
  );
}

export const ButtonMenu = forwardRef(Button);
