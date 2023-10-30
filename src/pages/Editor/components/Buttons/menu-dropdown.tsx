import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { Fragment } from "react";

type MenuProps = {
  title: string;
  label: React.ReactNode;
  children: React.ReactNode;
};

export function MenuDropdown({ title, label, children }: MenuProps) {
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-flex justify-center text-left">
        <Menu.Button
          className="group w-fit h-10 inline-flex justify-center items-center bg-surface text-surface-foreground font-bold text-sm rounded shadow-sm px-3 gap-1  hover:bg-primary hover:text-primary-foreground transition-colors duration-200 ease-in-out"
          title={title}
        >
          {label}

          <ChevronDownIcon
            size={20}
            className="text-surface-foreground group-hover:text-primary-foreground"
            aria-hidden="true"
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="flex flex-col items-center gap-1.5 z-10 absolute mt-12 p-1 w-fit rounded bg-background shadow-lg ring-2 dark:ring-1 ring-surface focus:outline-none sm:text-sm">
            {children}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
