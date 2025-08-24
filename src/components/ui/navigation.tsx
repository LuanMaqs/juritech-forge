import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { 
  Scale, 
  MessageSquare, 
  Users, 
  FileText, 
  PiggyBank,
  Menu,
   ClipboardList,
  CircleUserRound,
  X
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Scale,
  },
   {
     name: "Slack",
     href: "/agente-interno",
     icon: MessageSquare,
   },
  {
    name: "Formulario",
    href: "/formulario",
    icon:  ClipboardList,
  },
  {
     name: "Organização Financeira",
     href: "/organizacao-financeira",
     icon: PiggyBank,
  },
  {
    name: "Documentos Automáticos",
    href: "/documentos-automaticos",
    icon: FileText,
  },
];

const iconUser = [{icon: CircleUserRound}]

const navigationUser = [
  {
    name: "Configurações",
    href: "",
  },
  {
    name: "Perfil",
    href: "",
  },
  {
    name: "Sair",
    href: "",
  }
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownUserOpen, setisDropdownUserOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setisDropdownUserOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth",
                "hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <nav id="1" className="relative">
        {iconUser.map((item, index) => {
          const IconUser = item.icon;
          const dropdownRef = useRef(null);

          useEffect(() => {
            function handleClickOutside(event) {
              if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
              ) {
                setisDropdownUserOpen(false);
              }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
              document.removeEventListener("mousedown", handleClickOutside);
            };
          }, []);

          return (
            <div key={index} className="relative" ref={dropdownRef}>
              <IconUser
                className="h-10 w-10 cursor-pointer text-muted-foreground hover:text-primary transition"
                onClick={() => setisDropdownUserOpen(!isDropdownUserOpen)}
              />

              {isDropdownUserOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-card border p-2 z-50">
                  {navigationUser.map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
                      onClick={() => {
                        if(item.name === 'Sair'){
                          localStorage.clear();
                          window.location.href = "/login"
                        }
                        else if(item.name === "Configurações"){
                          window.location.href = "/configuracao"
                        }else if(item.name === "Perfil") {
                          window.location.href = "/Perfil"
                        }
                        console.log(`${item.name} clicado`);
                      }}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Mobile Navigation Button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="fixed right-0 top-0 h-full w-3/4 max-w-sm bg-card border-l shadow-elegant p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="space-y-4 "> {/* Aqui */}
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}