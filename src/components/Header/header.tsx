import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    setTheme(theme => (theme === "light" ? "dark" : "light"));
  };

  return (
    <header className="flex items-center justify-end p-4 mb-4 border rounded">
      <button
        type="button"
        role="switch"
        data-state={theme}
        value="off"
        className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=${theme}]:bg-input border`}
        id="theme-switch"
        aria-label="theme"
        onClick={toggle}
      >
        <span
          data-state={theme}
          className="flex justify-center items-center pointer-events-none block h-5 w-5 rounded-full data-[state=light]:bg-white data-[state=dark]:bg-card-foreground shadow-lg ring-0 transition-transform data-[state=dark]:translate-x-5 data-[state=light]:translate-x-0"
        >
          {theme === "light" ? (
            <Sun width={16} strokeWidth={1.5} />
          ) : (
            <Moon width={16} strokeWidth={1.25} color="white" />
          )}
        </span>
      </button>
    </header>
  );
}
