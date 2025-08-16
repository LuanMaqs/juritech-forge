import { Users, UserCheck, Clock, Target, Settings, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/StatsCard";

const teamStats = [
  {
    title: "Equipe Ativa",
    value: "12",
    description: "Membros online",
    icon: Users,
    trend: "neutral" as const
  },
  {
    title: "Tarefas Concluídas",
    value: "89",
    description: "Esta semana",
    icon: UserCheck,
    trend: "up" as const,
    trendValue: "15%"
  },
  {
    title: "Produtividade",
    value: "94.2%",
    description: "Média da equipe",
    icon: Target,
    trend: "up" as const,
    trendValue: "7%"
  },
  {
    title: "Tempo Médio",
    value: "3.2h",
    description: "Por tarefa",
    icon: Clock,
    trend: "down" as const,
    trendValue: "10%"
  }
];

const teamMembers = [
  { name: "Ana Silva", role: "Advogada Sênior", status: "online", tasks: 8, productivity: 96 },
  { name: "Carlos Santos", role: "Advogado Júnior", status: "online", tasks: 12, productivity: 89 },
  { name: "Maria Oliveira", role: "Paralegal", status: "offline", tasks: 6, productivity: 92 },
  { name: "João Costa", role: "Estagiário", status: "online", tasks: 4, productivity: 85 },
];

export default function AgenteInterno() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-secondary">
                <Users className="h-6 w-6 text-white" />
              </div>
              Agente Interno
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestão inteligente da equipe e processos internos
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo Membro
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {teamStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team Overview */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle>Equipe</CardTitle>
              <CardDescription>
                Visão geral da equipe e status atual de cada membro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-medium text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-medium">{member.tasks}</p>
                        <p className="text-xs text-muted-foreground">Tarefas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{member.productivity}%</p>
                        <p className="text-xs text-muted-foreground">Produtividade</p>
                      </div>
                      <Badge variant={member.status === "online" ? "default" : "secondary"}>
                        {member.status === "online" ? "Online" : "Offline"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Task Distribution */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Nova Tarefa
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Gerenciar Equipe
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Definir Metas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Relatório de Horas
                </Button>
              </CardContent>
            </Card>

            {/* Task Distribution */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Distribuição de Tarefas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Casos Novos", count: 8, color: "bg-primary" },
                    { category: "Em Andamento", count: 15, color: "bg-secondary" },
                    { category: "Revisão", count: 6, color: "bg-warning" },
                    { category: "Concluídas", count: 23, color: "bg-success" }
                  ].map((task, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${task.color}`} />
                        <span className="text-sm font-medium">{task.category}</span>
                      </div>
                      <span className="text-sm font-medium">{task.count}</span>
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