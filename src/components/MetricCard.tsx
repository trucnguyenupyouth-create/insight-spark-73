import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue,
  variant = "default",
  className 
}: MetricCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-gradient-to-br from-success-light/50 to-card";
      case "warning":
        return "border-warning/20 bg-gradient-to-br from-warning-light/50 to-card";
      case "danger":
        return "border-danger/20 bg-gradient-to-br from-danger-light/50 to-card";
      default:
        return "border-border bg-gradient-card";
    }
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-danger";
    return "text-muted-foreground";
  };

  return (
    <Card className={cn(
      "p-6 shadow-md hover:shadow-lg transition-all duration-200",
      getVariantStyles(),
      className
    )}>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </p>
        <p className="text-3xl font-bold text-card-foreground">
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
        {trend && trendValue && (
          <div className={cn("flex items-center text-sm font-medium", getTrendColor())}>
            <span className="mr-1">
              {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
            </span>
            {trendValue}
          </div>
        )}
      </div>
    </Card>
  );
}