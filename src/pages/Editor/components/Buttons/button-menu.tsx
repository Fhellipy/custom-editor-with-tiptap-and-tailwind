import { cn } from "@/shared/lib";
import { ClassValue } from "clsx";

type ButtonMenuProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  title: string;
  disabled?: boolean;
  active?: boolean;
  className?: ClassValue;
};

export function ButtonMenu(props: ButtonMenuProps) {
  const { icon, title, active, disabled, onClick } = props;

  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-fit h-[40px] bg-surface text-surface-foreground py-2 px-4 border rounded",
        { "bg-primary text-primary-foreground": active },
        { "w-full h-fit": !icon && title },
        props.className,
      )}
    >
      {icon ?? title}
    </button>
  );
}
