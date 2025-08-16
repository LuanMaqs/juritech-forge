import { MessageSquare, Bot, Settings, BarChart3, Users, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { useEffect, useState } from "react";

const chatbotStats = [
  {
    title: "Conversas Hoje",
    value: "847",
    description: "Interações ativas",
    icon: MessageSquare,
    trend: "up" as const,
    trendValue: "23%"
  },
  {
    title: "Taxa de Resolução",
    value: "89.2%",
    description: "Casos resolvidos",
    icon: Bot,
    trend: "up" as const,
    trendValue: "5%"
  },
  {
    title: "Tempo Médio",
    value: "1.8min",
    description: "Resposta do bot",
    icon: Clock,
    trend: "down" as const,
    trendValue: "12%"
  },
  {
    title: "Usuários Únicos",
    value: "324",
    description: "Este mês",
    icon: Users,
    trend: "up" as const,
    trendValue: "18%"
  }
];

export default function Chatbot() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              Chatbot Jurídico
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie seu assistente virtual inteligente para consultas legais
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Relatórios
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {chatbotStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Preview */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle>Preview do Chatbot</CardTitle>
              <CardDescription>
                Visualize como os clientes interagem com seu assistente virtual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-6 h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 inline-block">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Interface do Chatbot</h3>
                  <p className="text-muted-foreground text-sm">
                    Interface interativa será implementada aqui
                  </p>
                  <Button>Testar Chatbot</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurar Respostas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bot className="h-4 w-4 mr-2" />
                  Treinar IA
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Base de Conhecimento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics Avançado
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "14:23", action: "Nova conversa iniciada", user: "Cliente #1247" },
                    { time: "14:18", action: "Caso resolvido automaticamente", user: "Cliente #1246" },
                    { time: "14:12", action: "Encaminhado para advogado", user: "Cliente #1245" },
                    { time: "14:05", action: "Consulta sobre direito trabalhista", user: "Cliente #1244" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-muted-foreground">{activity.user} • {activity.time}</p>
                      </div>
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