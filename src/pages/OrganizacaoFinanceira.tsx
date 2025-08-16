import { PiggyBank, TrendingUp, DollarSign, CreditCard, Settings, Plus, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/StatsCard";

const financialStats = [
  {
    title: "Receita Mensal",
    value: "R$ 45.280",
    description: "Este mês",
    icon: DollarSign,
    trend: "up" as const,
    trendValue: "12%"
  },
  {
    title: "Contas a Receber",
    value: "R$ 23.150",
    description: "Pendentes",
    icon: TrendingUp,
    trend: "neutral" as const
  },
  {
    title: "Despesas",
    value: "R$ 8.940",
    description: "Este mês",
    icon: CreditCard,
    trend: "down" as const,
    trendValue: "5%"
  },
  {
    title: "Margem de Lucro",
    value: "78.2%",
    description: "Este mês",
    icon: PiggyBank,
    trend: "up" as const,
    trendValue: "3%"
  }
];

const recentTransactions = [
  { client: "Empresa ABC Ltda", type: "Honorário", amount: "R$ 3.500", status: "pago", date: "15/01" },
  { client: "João Silva", type: "Consulta", amount: "R$ 450", status: "pendente", date: "14/01" },
  { client: "Maria Santos", type: "Contrato", amount: "R$ 1.200", status: "pago", date: "13/01" },
  { client: "Tech Corp", type: "Assessoria", amount: "R$ 5.800", status: "vencido", date: "10/01" },
];

const upcomingPayments = [
  { description: "Aluguel do escritório", amount: "R$ 4.500", due: "25/01", priority: "high" },
  { description: "Licenças de software", amount: "R$ 890", due: "28/01", priority: "medium" },
  { description: "Material de escritório", amount: "R$ 320", due: "30/01", priority: "low" },
];

export default function OrganizacaoFinanceira() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary">
                <PiggyBank className="h-6 w-6 text-white" />
              </div>
              Organização Financeira
            </h1>
            <p className="text-muted-foreground mt-2">
              Controle completo das finanças do escritório
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nova Transação
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {financialStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
              <CardDescription>
                Últimas movimentações financeiras do escritório
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{transaction.client}</h3>
                        <p className="text-sm text-muted-foreground">{transaction.type} • {transaction.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold">{transaction.amount}</span>
                      <Badge 
                        variant={
                          transaction.status === "pago" ? "default" : 
                          transaction.status === "pendente" ? "secondary" : 
                          "destructive"
                        }
                      >
                        {transaction.status === "pago" ? "Pago" : 
                         transaction.status === "pendente" ? "Pendente" : "Vencido"}
                      </Badge>
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
                  Lançar Receita
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Registrar Despesa
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Gerar Relatório
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Fluxo de Caixa
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Payments */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Próximos Pagamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingPayments.map((payment, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        payment.priority === "high" ? "bg-destructive" :
                        payment.priority === "medium" ? "bg-warning" :
                        "bg-success"
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{payment.description}</p>
                        <p className="text-muted-foreground text-xs">
                          {payment.amount} • Vence em {payment.due}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Resumo Financeiro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Receitas</span>
                    <span className="text-sm font-medium text-success">R$ 45.280</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Despesas</span>
                    <span className="text-sm font-medium text-destructive">R$ 8.940</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Lucro Líquido</span>
                      <span className="font-semibold text-primary">R$ 36.340</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}