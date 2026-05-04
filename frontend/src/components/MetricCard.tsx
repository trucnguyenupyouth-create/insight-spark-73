import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  variant = "default",
  className 
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up": return <TrendingUp className="w-3 h-3" />;
      case "down": return <TrendingDown className="w-3 h-3" />;
      default: return <Minus className="w-3 h-3" />;
    }
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-success bg-success/10 border-success/20";
    if (trend === "down") return "text-danger bg-danger/10 border-danger/20";
    return "text-muted-foreground bg-muted/50 border-border";
  };

  const getValueColor = () => {
    switch (variant) {
      case "success": return "text-success";
      case "danger": return "text-danger";
      case "warning": return "text-warning";
      default: return "text-primary";
    }
  };

  return (
    <Card className={cn(
      "p-6 h-full transition-all duration-300 border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 bg-white relative overflow-hidden group",
      className
    )}>
      {/* Visual Accent */}
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full transition-all duration-300 opacity-0 group-hover:opacity-100",
        variant === "success" ? "bg-success" : variant === "danger" ? "bg-danger" : "bg-primary"
      )} />
      
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            {title}
          </p>
          {trend && (
            <div className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border", getTrendColor())}>
              {getTrendIcon()}
              {trend.toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="flex flex-col">
          <p className={cn("text-3xl font-black tracking-tighter transition-colors duration-300", getValueColor())}>
            {value}
          </p>
          {subtitle && (
            <p className="text-[11px] font-medium text-muted-foreground mt-1 min-h-[1rem]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}