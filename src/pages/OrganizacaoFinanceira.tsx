import { useState, useEffect } from "react";
import { PiggyBank, TrendingUp, DollarSign, CreditCard, Settings, Plus, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/StatsCard";

export default function OrganizacaoFinanceira() {
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({
    client: "",
    type: "",
    amount: "",
    status: "pendente",
    date: "",
  });

  useEffect(() => {
    const storedTypes = localStorage.getItem("transactionTypes");
    const storedTransactions = localStorage.getItem("recentTransactions");

    setTransactionTypes(storedTypes ? JSON.parse(storedTypes) : ["Honorário", "Contrato", "Consulta", "Assessoria"]);
    setRecentTransactions(storedTransactions ? JSON.parse(storedTransactions) : []);
  }, []);

  const saveTransactionTypes = (types: string[]) => {
    setTransactionTypes(types);
    localStorage.setItem("transactionTypes", JSON.stringify(types));
  };

  const saveRecentTransactions = (txs: any[]) => {
    setRecentTransactions(txs);
    localStorage.setItem("recentTransactions", JSON.stringify(txs));
  };

  const openModal = (content: string) => setModalContent(content);
  const closeModal = () => {
    setFormData({ client: "", type: transactionTypes[0] || "", amount: "", status: "pendente", date: "" });
    setModalContent(null);
  };

  const addTransaction = () => {
    saveRecentTransactions([...recentTransactions, formData]);
    setFormData({ client: "", type: transactionTypes[0] || "", amount: "", status: "pendente", date: "" });
    closeModal();
  };

  const addTransactionType = (type: string) => {
    if (type && !transactionTypes.includes(type)) {
      const newTypes = [...transactionTypes, type];
      saveTransactionTypes(newTypes);
      setFormData({ ...formData, type });
    }
  };

  const financialStats = [
    { title: "Receita Mensal", value: "R$ 45.280", description: "Este mês", icon: DollarSign, trend: "up" as const, trendValue: "12%" },
    { title: "Contas a Receber", value: "R$ 23.150", description: "Pendentes", icon: TrendingUp, trend: "neutral" as const },
    { title: "Despesas", value: "R$ 8.940", description: "Este mês", icon: CreditCard, trend: "down" as const, trendValue: "5%" },
    { title: "Margem de Lucro", value: "78.2%", description: "Este mês", icon: PiggyBank, trend: "up" as const, trendValue: "3%" }
  ];

  const upcomingPayments = [
    { description: "Aluguel do escritório", amount: "R$ 4.500", due: "25/01", priority: "high" },
    { description: "Licenças de software", amount: "R$ 890", due: "28/01", priority: "medium" },
    { description: "Material de escritório", amount: "R$ 320", due: "30/01", priority: "low" },
  ];

  const renderModalContent = () => {
    if (!modalContent) return null;

    if (["Nova Transação", "Lançar Receita", "Registrar Despesa"].includes(modalContent)) {
      return (
        <div className="space-y-2">
          <input
            className="border rounded p-2 w-full"
            placeholder="Cliente"
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          />
          <div className="flex space-x-2">
            <select
              className="border rounded p-2 w-full"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              {transactionTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
            </select>
            <input id="newTypeInput" className="border rounded p-2 w-full" placeholder="Novo Tipo" />
            <Button onClick={() => {
              const input = document.getElementById("newTypeInput") as HTMLInputElement;
              addTransactionType(input.value.trim());
              input.value = "";
            }}>Criar Tipo</Button>
          </div>
          <input
            className="border rounded p-2 w-full"
            placeholder="Valor"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
          <input
            className="border rounded p-2 w-full"
            placeholder="Data (DD/MM)"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <select
            className="border rounded p-2 w-full"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="pago">Pago</option>
            <option value="pendente">Pendente</option>
            <option value="vencido">Vencido</option>
          </select>
          <Button onClick={addTransaction} className="mt-2 w-full">Adicionar</Button>
        </div>
      );
    }

    if (modalContent === "Configurações") return <p>Aqui você pode ajustar todas as configurações do sistema.</p>;
    if (modalContent === "Gerar Relatório") return <p>Opções para gerar relatórios detalhados.</p>;
    if (modalContent === "Fluxo de Caixa") return <p>Visualização completa do fluxo de caixa.</p>;

    return null;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary"><PiggyBank className="h-6 w-6 text-white" /></div>
              Organização Financeira
            </h1>
            <p className="text-muted-foreground mt-2">Controle completo das finanças do escritório</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => openModal("Configurações")}><Settings className="h-4 w-4 mr-2" />Configurações</Button>
            <Button size="sm" onClick={() => openModal("Nova Transação")}><Plus className="h-4 w-4 mr-2" />Nova Transação</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {financialStats.map((stat, index) => <StatsCard key={index} {...stat} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader><CardTitle>Transações Recentes</CardTitle><CardDescription>Últimas movimentações</CardDescription></CardHeader>
            <CardContent>
              {transactionTypes.map((type, idx) => (
                <div key={idx} className="mb-4">
                  <h3 className="font-semibold mb-2">{type}</h3>
                  <div className="space-y-2">
                    {recentTransactions.filter(tx => tx.type === type).map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><DollarSign className="h-5 w-5 text-primary" /></div>
                          <div><h3 className="font-medium">{transaction.client}</h3><p className="text-sm text-muted-foreground">{transaction.date}</p></div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold">{transaction.amount}</span>
                          <Badge variant={transaction.status === "pago" ? "default" : transaction.status === "pendente" ? "secondary" : "destructive"}>
                            {transaction.status === "pago" ? "Pago" : transaction.status === "pendente" ? "Pendente" : "Vencido"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader><CardTitle>Ações Rápidas</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => openModal("Lançar Receita")}><Plus className="h-4 w-4 mr-2" />Lançar Receita</Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => openModal("Registrar Despesa")}><CreditCard className="h-4 w-4 mr-2" />Registrar Despesa</Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => openModal("Gerar Relatório")}><FileText className="h-4 w-4 mr-2" />Gerar Relatório</Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => openModal("Fluxo de Caixa")}><TrendingUp className="h-4 w-4 mr-2" />Fluxo de Caixa</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">{modalContent}</h2>
            <div className="mb-4">{renderModalContent()}</div>
            <div className="text-right"><Button onClick={closeModal}>Fechar</Button></div>
          </div>
        </div>
      )}
    </div>
  );
}
