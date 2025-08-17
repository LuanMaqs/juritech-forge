import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import InputMask from "react-input-mask";
import api from "../api/axios";
import axios from "axios";

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [oab, setOab] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nome || !cpf || !email || !password) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    const formattedOAB = oab.toUpperCase().replace(/[^0-9A-Z/]/g, ''); // mantém números, letras e '/'
    if (formattedOAB && !/^\d{5}\/[A-Z]{2}$/.test(formattedOAB)) {
      setError('OAB inválida. Formato esperado: 12345/SP');
    return;
}

    try {
      await api.post('/users/register', {
        name: nome,
        cpf,
        oab: formattedOAB,
        email,
        password,
      });

      setSuccess('Usuário cadastrado com sucesso!');
      setNome('');
      setCpf('');
      setOab('');
      setEmail('');
      setPassword('');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao cadastrar usuário');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Cadastro</CardTitle>
            <CardDescription>Crie sua conta para acessar a plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="cpf">CPF</Label>
                <InputMask
                  mask="999.999.999-99"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                >
                  {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                    <Input
                      {...inputProps}
                      id="cpf"
                      type="text"
                      placeholder="000.000.000-00"
                      required
                      autoComplete="off"
                    />
                  )}
                </InputMask>
              </div>

              <div className="space-y-1">
                <Label htmlFor="oab">OAB</Label>
                <Input
                  id="oab"
                  type="text"
                  placeholder="UF000000"
                  value={oab}
                  onChange={(e) => setOab(e.target.value.toUpperCase())}
                  autoComplete="off"
                  maxLength={8}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {success && <p className="text-green-500 text-sm text-center">{success}</p>}

              <Button type="submit" className="w-full">Cadastrar</Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-3">
            <div className="text-sm text-muted-foreground">Já possui uma conta?</div>
            <Button asChild variant="outline" className="w-full">
              <Link to="/login">Ir para login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;
