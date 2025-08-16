import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Cadastro = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                <Input id="nome" type="text" placeholder="Seu nome completo" required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" type="text" placeholder="000.000.000-00" required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="oab">OAB</Label>
                <Input id="oab" type="text" placeholder="UF000000" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seuemail@exemplo.com" required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="********" required />
              </div>

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
