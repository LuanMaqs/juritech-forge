import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend = "neutral",
  trendValue 
}: StatsCardProps) {
  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground"
  };

  return (
    <Card className="shadow-card hover:shadow-soft transition-smooth">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">{description}</p>
              {trendValue && (
                <span className={cn("text-sm font-medium", trendColors[trend])}>
                  {trend === "up" ? "+" : trend === "down" ? "-" : ""}{trendValue}
                </span>
              )}
            </div>
          </div>
          <div className="p-3 bg-accent rounded-lg">
            <Icon className="h-6 w-6 text-accent-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}