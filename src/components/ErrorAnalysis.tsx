import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, Users, TrendingUp, Eye } from "lucide-react";
import { ErrorStudentDetailModal } from "./ErrorStudentDetailModal";

interface CommonError {
  id: string;
  tag: string;
  count: number;
  percentage: number;
  severity: "high" | "medium" | "low";
  example: string;
  affectedStudents: string[];
  questionIds: string[];
}

interface ErrorAnalysisProps {
  errors: CommonError[];
  totalStudents?: number;
  onErrorClick?: (error: CommonError) => void;
}

export function ErrorAnalysis({ errors, totalStudents, onErrorClick }: ErrorAnalysisProps) {
  const [selectedError, setSelectedError] = useState<CommonError | null>(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  const handleViewStudents = (error: CommonError) => {
    setSelectedError(error);
    setIsStudentModalOpen(true);
  };
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "success";
      default: return "default";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return AlertTriangle;
      case "medium": return TrendingUp;
      case "low": return Eye;
      default: return Eye;
    }
  };

  const sortedErrors = [...errors].sort((a, b) => b.count - a.count);

  return (
    <Card className="p-6 shadow-md">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center tracking-tight">
            <AlertTriangle className="w-5 h-5 mr-3 text-primary" />
            Lỗi sai phổ biến
          </h3>
          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-tighter bg-primary/5 border-primary/20 text-primary">
            {errors.length} Logic Blockers Found
          </Badge>
        </div>
        
        <div className="space-y-3">
          {sortedErrors.map((error) => {
            const SeverityIcon = getSeverityIcon(error.severity);
            return (
              <div 
                key={error.id}
                className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => onErrorClick?.(error)}
              >
                <div className="flex items-start space-x-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    getSeverityColor(error.severity) === "danger" && "bg-danger-light text-danger",
                    getSeverityColor(error.severity) === "warning" && "bg-warning-light text-warning",
                    getSeverityColor(error.severity) === "success" && "bg-success-light text-success"
                  )}>
                    <SeverityIcon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-card-foreground">
                        {error.tag}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={cn(
                          "text-[10px] uppercase font-bold px-2 py-0 h-5 flex items-center gap-1",
                          getSeverityColor(error.severity) === "danger" && "border-danger/30 text-danger bg-danger/5",
                          getSeverityColor(error.severity) === "warning" && "border-warning/30 text-warning bg-warning/5",
                          getSeverityColor(error.severity) === "success" && "border-success/30 text-success bg-success/5"
                        )}>
                          <SeverityIcon className="w-3 h-3" />
                          <span className="hidden sm:inline">
                            {error.severity === "high" ? "Nghiêm trọng" : 
                             error.severity === "medium" ? "Trung bình" : "Nhẹ"}
                          </span>
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{error.count} học sinh ({error.percentage}%)</span>
                      </div>
                      <div>
                        Câu: {error.questionIds.join(", ")}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground italic">
                      Ví dụ: "{error.example}"
                    </p>
                    
                    <div className="space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewStudents(error);
                        }}
                        className="text-xs text-primary hover:text-primary-dark"
                      >
                        <Users className="w-3 h-3 mr-1" />
                        Xem chi tiết học sinh
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onErrorClick?.(error);
                        }}
                        className="text-xs text-primary hover:text-primary-dark"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {errors.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Không phát hiện lỗi sai phổ biến. Lớp học đang làm bài rất tốt!</p>
          </div>
        )}
      </div>

      <ErrorStudentDetailModal
        error={selectedError}
        isOpen={isStudentModalOpen}
        onClose={() => {
          setIsStudentModalOpen(false);
          setSelectedError(null);
        }}
      />
    </Card>
  );
}