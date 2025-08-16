import { FileText, Download, Edit, Copy, Settings, Plus, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StatsCard } from "@/components/dashboard/StatsCard";

const documentStats = [
  {
    title: "Documentos Gerados",
    value: "1,247",
    description: "Este mês",
    icon: FileText,
    trend: "up" as const,
    trendValue: "18%"
  },
  {
    title: "Templates Ativos",
    value: "34",
    description: "Disponíveis",
    icon: Copy,
    trend: "up" as const,
    trendValue: "3"
  },
  {
    title: "Tempo Médio",
    value: "2.3min",
    description: "Por documento",
    icon: Download,
    trend: "down" as const,
    trendValue: "25%"
  },
  {
    title: "Taxa de Sucesso",
    value: "98.7%",
    description: "Geração automática",
    icon: Edit,
    trend: "up" as const,
    trendValue: "1%"
  }
];

const documentTemplates = [
  { name: "Contrato de Prestação de Serviços", category: "Contratos", uses: 156, lastUsed: "Hoje" },
  { name: "Petição Inicial Trabalhista", category: "Petições", uses: 89, lastUsed: "Ontem" },
  { name: "Procuração Ad Judicia", category: "Procurações", uses: 234, lastUsed: "Hoje" },
  { name: "Contestação Cível", category: "Peças Processuais", uses: 67, lastUsed: "2 dias" },
  { name: "Acordo Extrajudicial", category: "Acordos", uses: 45, lastUsed: "3 dias" },
];

const recentDocuments = [
  { name: "Contrato - Empresa XYZ", client: "Empresa XYZ Ltda", status: "finalizado", date: "16/01" },
  { name: "Petição - João Silva", client: "João Silva", status: "revisao", date: "16/01" },
  { name: "Procuração - Maria Santos", client: "Maria Santos", status: "finalizado", date: "15/01" },
  { name: "Contestação - ABC Corp", client: "ABC Corp", status: "rascunho", date: "15/01" },
];

export default function DocumentosAutomaticos() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-secondary">
                <FileText className="h-6 w-6 text-white" />
              </div>
              Documentos Automáticos
            </h1>
            <p className="text-muted-foreground mt-2">
              Geração automatizada de contratos e documentos jurídicos
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo Template
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {documentStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar templates ou documentos..." 
              className="pl-10"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Templates */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle>Templates de Documentos</CardTitle>
              <CardDescription>
                Templates disponíveis para geração automática
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentTemplates.map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-smooth">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {template.category} • Usado {template.uses} vezes • {template.lastUsed}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button size="sm">
                        <Copy className="h-4 w-4 mr-1" />
                        Usar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Gerar Documento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Criar Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicar Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Documentos
                </Button>
              </CardContent>
            </Card>

            {/* Recent Documents */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Documentos Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDocuments.map((doc, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center mt-1">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {doc.client} • {doc.date}
                        </p>
                        <Badge 
                          variant={
                            doc.status === "finalizado" ? "default" :
                            doc.status === "revisao" ? "secondary" :
                            "outline"
                          }
                          className="mt-1"
                        >
                          {doc.status === "finalizado" ? "Finalizado" :
                           doc.status === "revisao" ? "Em Revisão" :
                           "Rascunho"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Categorias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Contratos", count: 12 },
                    { name: "Petições", count: 8 },
                    { name: "Procurações", count: 6 },
                    { name: "Peças Processuais", count: 5 },
                    { name: "Acordos", count: 3 }
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}