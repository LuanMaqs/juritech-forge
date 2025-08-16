import { 
  MessageSquare, 
  Users, 
  PiggyBank, 
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { ModuleCard } from "@/components/dashboard/ModuleCard";
import { StatsCard } from "@/components/dashboard/StatsCard";

const modules = [
  {
    title: "Chatbot Jurídico",
    description: "Assistente virtual inteligente para consultas legais e atendimento ao cliente.",
    icon: MessageSquare,
    href: "/chatbot",
    gradient: "gradient-primary",
    features: [
      "Respostas automáticas 24/7",
      "Base de conhecimento jurídico",
      "Integração com WhatsApp",
      "Relatórios de interações"
    ]
  },
  {
    title: "Agente Interno",
    description: "Gestão inteligente de equipes e processos internos do escritório.",
    icon: Users,
    href: "/agente-interno",
    gradient: "gradient-secondary",
    features: [
      "Gestão de equipes",
      "Distribuição de tarefas",
      "Controle de produtividade",
      "Dashboard analítico"
    ]
  },
  {
    title: "Organização Financeira",
    description: "Controle completo das finanças do escritório com automação inteligente.",
    icon: PiggyBank,
    href: "/organizacao-financeira",
    gradient: "gradient-primary",
    features: [
      "Fluxo de caixa automático",
      "Controle de honorários",
      "Relatórios financeiros",
      "Gestão de recebíveis"
    ]
  },
  {
    title: "Documentos Automáticos",
    description: "Geração automatizada de contratos e documentos jurídicos.",
    icon: FileText,
    href: "/documentos-automaticos",
    gradient: "gradient-secondary",
    features: [
      "Templates personalizáveis",
      "Geração automática",
      "Assinatura digital",
      "Controle de versões"
    ]
  }
];

const stats = [
  {
    title: "Casos Ativos",
    value: "124",
    description: "Este mês",
    icon: TrendingUp,
    trend: "up" as const,
    trendValue: "12%"
  },
  {
    title: "Documentos Gerados",
    value: "1,847",
    description: "Este mês",
    icon: FileText,
    trend: "up" as const,
    trendValue: "8%"
  },
  {
    title: "Tempo Médio de Resposta",
    value: "2.4h",
    description: "Chatbot",
    icon: Clock,
    trend: "down" as const,
    trendValue: "15%"
  },
  {
    title: "Taxa de Resolução",
    value: "94.2%",
    description: "Casos resolvidos",
    icon: CheckCircle,
    trend: "up" as const,
    trendValue: "3%"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Bem-vindo ao{" "}
              <span className="gradient-primary bg-clip-text text-transparent">
                JuriTech
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Plataforma jurídica integrada com inteligência artificial para 
              otimizar todos os processos do seu escritório de advocacia.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Automação Inteligente</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Segurança LGPD</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Módulos da Plataforma
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore nossos módulos especializados para transformar a gestão do seu escritório
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <ModuleCard key={index} {...module} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Pronto para revolucionar seu escritório?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comece a usar nossa plataforma e veja como a tecnologia pode 
              otimizar todos os processos do seu escritório de advocacia.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>Configure os módulos de acordo com suas necessidades</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}