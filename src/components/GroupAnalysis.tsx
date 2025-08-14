import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Users, TrendingDown, BookOpen, AlertTriangle } from "lucide-react";

interface StudentGroup {
  id: string;
  name: string;
  level: "Giỏi" | "Khá" | "TB" | "Yếu";
  count: number;
  percentage: number;
  averageScore: number;
  commonErrors: string[];
  knowledgeGaps: string[];
  riskLevel: "low" | "medium" | "high";
}

interface GroupAnalysisProps {
  groups: StudentGroup[];
  totalStudents: number;
  onGroupClick?: (group: StudentGroup) => void;
}

export function GroupAnalysis({ groups, totalStudents, onGroupClick }: GroupAnalysisProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Giỏi": return "success";
      case "Khá": return "primary";
      case "TB": return "warning";
      case "Yếu": return "danger";
      default: return "default";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-danger";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case "high": return "Cần can thiệp ngay";
      case "medium": return "Cần theo dõi";
      case "low": return "Ổn định";
      default: return "";
    }
  };

  return (
    <Card className="p-6 shadow-md">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary" />
            Phân hóa học sinh
          </h3>
          <Badge variant="outline" className="text-muted-foreground">
            {totalStudents} học sinh
          </Badge>
        </div>

        {/* Overall distribution */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Phân bố tổng quan</div>
          <div className="flex space-x-1 h-3 rounded-full overflow-hidden">
            {groups.map((group) => (
              <div
                key={group.id}
                className={cn(
                  "transition-all",
                  getLevelColor(group.level) === "success" && "bg-success",
                  getLevelColor(group.level) === "primary" && "bg-primary",
                  getLevelColor(group.level) === "warning" && "bg-warning",
                  getLevelColor(group.level) === "danger" && "bg-danger"
                )}
                style={{ width: `${group.percentage}%` }}
                title={`${group.level}: ${group.count} học sinh (${group.percentage}%)`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {groups.map((group) => (
              <span key={group.id}>
                {group.level}: {group.percentage}%
              </span>
            ))}
          </div>
        </div>

        {/* Group details */}
        <div className="space-y-3">
          {groups.map((group) => (
            <div
              key={group.id}
              className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => onGroupClick?.(group)}
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        getLevelColor(group.level) === "success" && "border-success text-success",
                        getLevelColor(group.level) === "primary" && "border-primary text-primary",
                        getLevelColor(group.level) === "warning" && "border-warning text-warning",
                        getLevelColor(group.level) === "danger" && "border-danger text-danger"
                      )}
                    >
                      {group.level}
                    </Badge>
                    <span className="font-medium">{group.count} học sinh</span>
                    <span className="text-sm text-muted-foreground">
                      (Điểm TB: {group.averageScore})
                    </span>
                  </div>
                  <div className={cn("text-sm font-medium", getRiskColor(group.riskLevel))}>
                    {getRiskLabel(group.riskLevel)}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Tỷ lệ trong lớp</span>
                    <span>{group.percentage}%</span>
                  </div>
                  <Progress 
                    value={group.percentage} 
                    className="h-2"
                  />
                </div>

                {/* Issues */}
                {(group.commonErrors.length > 0 || group.knowledgeGaps.length > 0) && (
                  <div className="space-y-2">
                    {group.commonErrors.length > 0 && (
                      <div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Lỗi sai thường gặp</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {group.commonErrors.slice(0, 2).map((error, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {error}
                            </Badge>
                          ))}
                          {group.commonErrors.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{group.commonErrors.length - 2} khác
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {group.knowledgeGaps.length > 0 && (
                      <div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                          <BookOpen className="w-4 h-4" />
                          <span>Lỗ hổng kiến thức</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {group.knowledgeGaps.slice(0, 2).map((gap, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {gap}
                            </Badge>
                          ))}
                          {group.knowledgeGaps.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{group.knowledgeGaps.length - 2} khác
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Xem chi tiết nhóm {group.level}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {groups.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingDown className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Chưa có dữ liệu phân nhóm học sinh</p>
          </div>
        )}
      </div>
    </Card>
  );
}