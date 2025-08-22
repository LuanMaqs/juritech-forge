import { useState } from "react";

export default function Formulario() {
    const [formData, setFormData] = useState({});
    const [tipoCliente, setTipoCliente] = useState("fisica");
    const [tipoDocumento, setTipoDocumento] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await fetch("https://n8n-n8n.rmjffu.easypanel.host/webhook-test/8c4e9ba6-7d2e-47cf-ac60-b493241d18f0", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          alert("Dados enviados com sucesso!");
        } catch (error) {
          console.error("Erro ao enviar:", error);
          alert("Erro ao enviar os dados.");
        }
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Formulário Jurídico</h1>

        {/* Dados do Advogado / Escritório */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Dados do Advogado / Escritório</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="adv_nome" onChange={handleChange} placeholder="Nome completo do advogado" className="p-2 border rounded-lg" />
            <input type="text" name="adv_oab" onChange={handleChange} placeholder="Número da OAB + Seção" className="p-2 border rounded-lg" />
            <input type="text" name="adv_endereco" onChange={handleChange} placeholder="Endereço profissional" className="p-2 border rounded-lg col-span-2" />
            <input type="email" name="adv_email" onChange={handleChange} placeholder="E-mail" className="p-2 border rounded-lg" />
            <input type="tel" name="adv_telefone" onChange={handleChange} placeholder="Telefone de contato" className="p-2 border rounded-lg" />
            <input type="text" name="adv_razao_social" onChange={handleChange} placeholder="Razão social do escritório (se aplicável)" className="p-2 border rounded-lg col-span-2" />
            <input type="text" name="adv_cnpj" onChange={handleChange} placeholder="CNPJ (se pessoa jurídica)" className="p-2 border rounded-lg" />
          </div>
        </section>

        {/* Dados do Cliente */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Dados do Cliente</h2>

          {/* Escolha do tipo de cliente */}
          <div className="mb-4 flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="tipoCliente"
                value="fisica"
                checked={tipoCliente === "fisica"}
                onChange={(e) => {
                    setTipoCliente("fisica");
                    setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
              Pessoa Física
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="tipoCliente"
                value="juridica"
                checked={tipoCliente === "juridica"}
                onChange={(e) => {
                    setTipoCliente("juridica");
                    setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
              />
              Pessoa Jurídica
            </label>
          </div>

          {tipoCliente === "fisica" && (
            <div>
              <h3 className="text-lg font-medium mt-4 mb-2">Pessoa Física</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="cliente_pf_nome" onChange={handleChange} placeholder="Nome completo" className="p-2 border rounded-lg" />
                <input type="text" name="cliente_pf_nacionalidade" onChange={handleChange} placeholder="Nacionalidade" className="p-2 border rounded-lg" />
                <input type="text" name="cliente_pf_estado_civil" onChange={handleChange} placeholder="Estado civil" className="p-2 border rounded-lg" />
                <input type="text" name="cliente_pf_profissao" onChange={handleChange} placeholder="Profissão" className="p-2 border rounded-lg" />
                <input type="text" name="cliente_pf_rg" onChange={handleChange} placeholder="RG" className="p-2 border rounded-lg" />
                <input type="text" name="cliente_pf_cpf" onChange={handleChange} placeholder="CPF" className="p-2 border rounded-lg" />
                <input type="text" name="cliente_pf_endereco" onChange={handleChange} placeholder="Endereço completo" className="p-2 border rounded-lg col-span-2" />
                <input type="email" name="cliente_pf_email" onChange={handleChange} placeholder="E-mail" className="p-2 border rounded-lg" />
                <input type="tel" name="cliente_pf_telefone" onChange={handleChange} placeholder="Telefone" className="p-2 border rounded-lg" />
              </div>
            </div>
          )}

          {tipoCliente === "juridica" && (
            <div>
              <h3 className="text-lg font-medium mt-6 mb-2">Pessoa Jurídica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="cliente_pj_razao_social" onChange={handleChange} placeholder="Razão social" className="p-2 border rounded-lg" />
                <input type="text" name="cliente_pj_cnpj" onChange={handleChange} placeholder="CNPJ" className="p-2 border rounded-lg" />
                <input type="text" name="cliente_pj_endereco" onChange={handleChange} placeholder="Endereço da sede" className="p-2 border rounded-lg col-span-2" />
                <input type="text" name="cliente_pj_representante_nome" onChange={handleChange} placeholder="Nome do representante legal" className="p-2 border rounded-lg" />
                <input type="text" name="cliente_pj_representante_cargo" onChange={handleChange} placeholder="Cargo do representante legal" className="p-2 border rounded-lg" />
                <input type="text" name="cliente_pj_representante_cpf" onChange={handleChange} placeholder="CPF do representante legal" className="p-2 border rounded-lg" />
                <input type="text" name="cliente_pj_representante_rg" onChange={handleChange} placeholder="RG do representante legal" className="p-2 border rounded-lg" />
                <input type="email" name="cliente_pj_email" onChange={handleChange} placeholder="E-mail" className="p-2 border rounded-lg" />
                <input type="tel" name="cliente_pj_telefone" onChange={handleChange} placeholder="Telefone" className="p-2 border rounded-lg" />
              </div>
            </div>
          )}
        </section>
      
        {/* Dados Específicos por Tipo de Documento */}
        <section>
          <h2 className="text-xl font-semibold mb-4">3. Dados Específicos por Tipo de Documento</h2>
      
          {/* Seleção do tipo de documento */}
          <select
            className="p-2 border rounded-lg mb-4 w-full"
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
          >
            <option value="">Selecione o tipo de documento</option>
            <option value="contratos">Contratos</option>
            <option value="peticoes">Petições / Peças Processuais</option>
            <option value="societarios">Societários / Empresariais</option>
            <option value="trabalhista">Trabalhista</option>
            <option value="bancaria">Bancária / Financeira</option>
            <option value="administrativos">Administrativos / de Comunicação</option>
          </select>
      
          {tipoDocumento === "contratos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="doc_contrato_tipo" onChange={handleChange} placeholder="Tipo de contrato" className="p-2 border rounded-lg" />
              <input type="text" name="doc_contrato_partes" onChange={handleChange} placeholder="Partes contratantes" className="p-2 border rounded-lg col-span-2" />
              <input type="text" name="doc_contrato_objeto" onChange={handleChange} placeholder="Objeto" className="p-2 border rounded-lg col-span-2" />
              <input type="text" name="doc_contrato_prazo" onChange={handleChange} placeholder="Prazo de vigência" className="p-2 border rounded-lg" />
              <input type="text" name="doc_contrato_valor" onChange={handleChange} placeholder="Valor e forma de pagamento" className="p-2 border rounded-lg" />
              <input type="text" name="doc_contrato_multas" onChange={handleChange} placeholder="Multas e penalidades" className="p-2 border rounded-lg col-span-2" />
              <input type="text" name="doc_contrato_foro" onChange={handleChange} placeholder="Foro eleito" className="p-2 border rounded-lg" />
              <input type="text" name="doc_contrato_testemunhas" onChange={handleChange} placeholder="Testemunhas" className="p-2 border rounded-lg col-span-2" />
            </div>
          )}

          {tipoDocumento === "peticoes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="doc_peticao_tipo_acao" onChange={handleChange} placeholder="Tipo de ação" className="p-2 border rounded-lg" />
              <input type="text" name="doc_peticao_partes" onChange={handleChange} placeholder="Partes do processo" className="p-2 border rounded-lg col-span-2" />
              <textarea name="doc_peticao_fatos" onChange={handleChange} placeholder="Fatos" className="p-2 border rounded-lg col-span-2"></textarea>
              <textarea name="doc_peticao_fundamentos" onChange={handleChange} placeholder="Fundamentos jurídicos" className="p-2 border rounded-lg col-span-2"></textarea>
              <textarea name="doc_peticao_pedidos" onChange={handleChange} placeholder="Pedidos" className="p-2 border rounded-lg col-span-2"></textarea>
              <input type="text" name="doc_peticao_numero_processo" onChange={handleChange} placeholder="Número do processo" className="p-2 border rounded-lg" />
              <input type="text" name="doc_peticao_vara_comarca" onChange={handleChange} placeholder="Vara e comarca" className="p-2 border rounded-lg" />
            </div>
          )}

          {tipoDocumento === "societarios" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="doc_societario_nome_empresa" onChange={handleChange} placeholder="Nome da empresa" className="p-2 border rounded-lg" />
              <input type="text" name="doc_societario_cnpj" onChange={handleChange} placeholder="CNPJ" className="p-2 border rounded-lg" />
              <input type="text" name="doc_societario_endereco" onChange={handleChange} placeholder="Endereço da sede" className="p-2 border rounded-lg col-span-2" />
              <textarea name="doc_societario_dados_socios" onChange={handleChange} placeholder="Dados dos sócios" className="p-2 border rounded-lg col-span-2"></textarea>
              <input type="text" name="doc_societario_participacao" onChange={handleChange} placeholder="Percentual de participação" className="p-2 border rounded-lg" />
              <input type="text" name="doc_societario_capital" onChange={handleChange} placeholder="Capital social" className="p-2 border rounded-lg" />
              <input type="text" name="doc_societario_data_local" onChange={handleChange} placeholder="Data e local da assembleia" className="p-2 border rounded-lg col-span-2" />
            </div>
          )}

          {tipoDocumento === "trabalhista" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="doc_trabalhista_nome" onChange={handleChange} placeholder="Nome do empregado" className="p-2 border rounded-lg" />
              <input type="text" name="doc_trabalhista_cpf_rg" onChange={handleChange} placeholder="CPF e RG" className="p-2 border rounded-lg" />
              <input type="text" name="doc_trabalhista_cargo" onChange={handleChange} placeholder="Cargo / Função" className="p-2 border rounded-lg" />
              <input type="text" name="doc_trabalhista_salario" onChange={handleChange} placeholder="Salário" className="p-2 border rounded-lg" />
              <input type="text" name="doc_trabalhista_datas" onChange={handleChange} placeholder="Data de admissão e rescisão" className="p-2 border rounded-lg col-span-2" />
              <input type="text" name="doc_trabalhista_motivo" onChange={handleChange} placeholder="Motivo da rescisão" className="p-2 border rounded-lg col-span-2" />
              <input type="text" name="doc_trabalhista_verbas" onChange={handleChange} placeholder="Valores de verbas rescisórias" className="p-2 border rounded-lg col-span-2" />
              <input type="text" name="doc_trabalhista_penalidades" onChange={handleChange} placeholder="Penalidades" className="p-2 border rounded-lg col-span-2" />
            </div>
          )}

          {tipoDocumento === "bancaria" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="doc_bancaria_valor" onChange={handleChange} placeholder="Valor do contrato" className="p-2 border rounded-lg" />
              <input type="text" name="doc_bancaria_prazo" onChange={handleChange} placeholder="Prazo e forma de pagamento" className="p-2 border rounded-lg" />
              <input type="text" name="doc_bancaria_garantias" onChange={handleChange} placeholder="Garantias" className="p-2 border rounded-lg" />
              <input type="text" name="doc_bancaria_garantidor" onChange={handleChange} placeholder="Dados do garantidor" className="p-2 border rounded-lg col-span-2" />
              <input type="text" name="doc_bancaria_juros" onChange={handleChange} placeholder="Juros, encargos e multas" className="p-2 border rounded-lg col-span-2" />
            </div>
          )}

          {tipoDocumento === "administrativos" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="doc_admin_notificante" onChange={handleChange} placeholder="Nome e dados do notificante" className="p-2 border rounded-lg col-span-2" />
              <input type="text" name="doc_admin_notificado" onChange={handleChange} placeholder="Nome e dados do notificado" className="p-2 border rounded-lg col-span-2" />
              <input type="text" name="doc_admin_objeto" onChange={handleChange} placeholder="Objeto da notificação" className="p-2 border rounded-lg col-span-2" />
              <input type="text" name="doc_admin_prazo" onChange={handleChange} placeholder="Prazo para resposta/cumprimento" className="p-2 border rounded-lg col-span-2" />
              <textarea name="doc_admin_declaracoes" onChange={handleChange} placeholder="Declarações específicas" className="p-2 border rounded-lg col-span-2"></textarea>
            </div>
          )}
        </section>

      <div className="mt-8 flex justify-center">
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded-xl shadow group-hover:shadow-soft transition-elegant">
          Enviar
        </button>
      </div>
    </form>
  );
}
