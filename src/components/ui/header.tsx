import { Scale } from "lucide-react";
import { Navigation } from "./navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-primary">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">JuriTech</h1>
              <p className="text-xs text-muted-foreground">Plataforma Jurídica</p>
            </div>
          </div>

          {/* Navigation */}
          <Navigation />
        </div>
      </div>
    </header>
  );
}