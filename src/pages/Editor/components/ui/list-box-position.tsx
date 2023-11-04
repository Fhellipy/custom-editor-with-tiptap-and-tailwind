import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Fragment, useState } from "react";

type PositionOptions = "flex-start" | "center" | "flex-end";

type ListBoxPositionProps = {
  position: string;
  setPosition: (position: PositionOptions) => void;
};

const positions = [
  { id: 1, name: "Esquerda", value: "flex-start" },
  { id: 2, name: "Centro", value: "center" },
  { id: 3, name: "Direita", value: "flex-end" },
];

export function ListBoxPosition({
  setPosition,
  position,
}: ListBoxPositionProps) {
  const defaultPosition = positions.find(pos => pos.value === position);
  const [selected, setSelected] = useState(defaultPosition ?? positions[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <label htmlFor="position" className="text-base mb-0.5">
          Posição
        </label>
        <Listbox.Button
          id="position"
          className="relative w-full cursor-pointer rounded bg-background py-2 pl-3 pr-10 text-left sm:text-sm border"
        >
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-30 w-full rounded bg-background py-1 text-base shadow-lg border sm:text-sm">
            {positions.map((position, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground"
                  }`
                }
                value={position}
                onClick={() => {
                  setPosition(position.value as PositionOptions);
                }}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {position.name}
                    </span>

                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-foreground">
                        <CheckIcon size={16} aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
