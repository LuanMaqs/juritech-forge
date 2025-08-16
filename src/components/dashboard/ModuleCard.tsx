import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  features: string[];
}

export function ModuleCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  gradient,
  features 
}: ModuleCardProps) {
  return (
    <Card className="group relative overflow-hidden gradient-card shadow-card hover:shadow-elegant transition-elegant border-0">
      {/* Gradient background overlay */}
      <div className={cn("absolute inset-0 opacity-5 group-hover:opacity-10 transition-elegant", gradient)} />
      
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className={cn("p-3 rounded-lg", gradient)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
              {feature}
            </li>
          ))}
        </ul>
        
        <Button asChild className="w-full group-hover:shadow-soft transition-elegant">
          <Link to={href}>
            Acessar Módulo
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}