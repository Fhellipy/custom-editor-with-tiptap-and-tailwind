import { Header } from "@/shared";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-full w-full overflow-auto p-4">
      <Header />
      {children}
    </div>
  );
}
