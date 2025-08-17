import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Login = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Acesse sua conta para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seuemail@exemplo.com" required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="********" required />
              </div>

              <Button type="submit" className="w-full">Entrar</Button>
              <Button asChild variant="secondary" className="w-full">
                <Link to="/dashboard">Entrar como admin</Link>
              </Button>

              <div className="flex items-center justify-end">
                <a href="#" className="text-sm text-primary hover:underline">Esqueceu a senha?</a>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-3">
            <div className="text-sm text-muted-foreground">Não tem uma conta?</div>
            <Button asChild variant="outline" className="w-full">
              <Link to="/cadastro">Cadastre-se</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
