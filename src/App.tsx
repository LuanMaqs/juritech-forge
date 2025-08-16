import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/ui/header";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import AgenteInterno from "./pages/AgenteInterno";
import OrganizacaoFinanceira from "./pages/OrganizacaoFinanceira";
import DocumentosAutomaticos from "./pages/DocumentosAutomaticos";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/agente-interno" element={<AgenteInterno />} />
            <Route path="/organizacao-financeira" element={<OrganizacaoFinanceira />} />
            <Route path="/documentos-automaticos" element={<DocumentosAutomaticos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
