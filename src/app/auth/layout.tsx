import { Soup } from "lucide-react";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="container relative hidden min-h-screen flex-col items-center justify-center antialiased md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden bg-zinc-950/95 h-full flex-col border-r border-zinc-700 p-10 text-zinc-400 lg:flex">
        <div className="flex items-center gap-3 text-lg font-medium">
          <Soup className="h-5 w-5" />
          <span className="font-medium">Nouveau</span>
        </div>
        <div className="mt-auto">
          <footer className="text-sm">
            Todos os direitos reservados &copy; Nouveau - {new Date().getFullYear()}
          </footer>
        </div>
      </div>

      <div className="relative flex min-h-screen bg-zinc-950 flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
