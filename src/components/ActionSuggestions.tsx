import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AlertTriangle, BookOpen, Users, TrendingUp } from "lucide-react";

interface Suggestion {
  id: string;
  type: "urgent" | "important" | "improvement";
  title: string;
  description: string;
  action: string;
  icon: "alert" | "book" | "users" | "trend";
}

interface ActionSuggestionsProps {
  suggestions: Suggestion[];
  onActionClick?: (suggestion: Suggestion) => void;
}

export function ActionSuggestions({ suggestions, onActionClick }: ActionSuggestionsProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "urgent": return "danger";
      case "important": return "warning";
      case "improvement": return "success";
      default: return "default";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "urgent": return "Khẩn cấp";
      case "important": return "Quan trọng";
      case "improvement": return "Cải thiện";
      default: return "";
    }
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "alert": return AlertTriangle;
      case "book": return BookOpen;
      case "users": return Users;
      case "trend": return TrendingUp;
      default: return BookOpen;
    }
  };

  return (
    <Card className="p-6 shadow-md">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Gợi ý hành động</h3>
        
        <div className="space-y-4">
          {suggestions.map((suggestion) => {
            const IconComponent = getIcon(suggestion.icon);
            return (
              <div 
                key={suggestion.id}
                className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    getTypeColor(suggestion.type) === "danger" && "bg-danger-light text-danger",
                    getTypeColor(suggestion.type) === "warning" && "bg-warning-light text-warning",
                    getTypeColor(suggestion.type) === "success" && "bg-success-light text-success"
                  )}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={cn(
                        "text-xs",
                        getTypeColor(suggestion.type) === "danger" && "border-danger text-danger",
                        getTypeColor(suggestion.type) === "warning" && "border-warning text-warning",
                        getTypeColor(suggestion.type) === "success" && "border-success text-success"
                      )}>
                        {getTypeLabel(suggestion.type)}
                      </Badge>
                    </div>
                    
                    <h4 className="font-medium text-card-foreground">
                      {suggestion.title}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground">
                      {suggestion.description}
                    </p>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => onActionClick?.(suggestion)}
                    >
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {suggestions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Không có gợi ý hành động nào. Lớp học đang hoạt động tốt!</p>
          </div>
        )}
      </div>
    </Card>
  );
}