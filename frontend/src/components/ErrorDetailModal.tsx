import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, Users, FileText, Eye } from "lucide-react";
import { errorDetailMap } from "@/data/exam177DeepData";

interface CommonError {
  id: string;
  tag: string;
  count: number;
  percentage: number;
  severity: "high" | "medium" | "low";
  example: string;
  affectedStudents: string[];
  questionIds: (number | string)[];
}

interface ErrorDetailModalProps {
  error: CommonError | null;
  isOpen: boolean;
  onClose: () => void;
  onAction?: (actionType: string, error: CommonError) => void;
}

export function ErrorDetailModal({ error, isOpen, onClose, onAction }: ErrorDetailModalProps) {
  if (!error) return null;

  // Look up deep data from analytics JSON using the error's ERR_ id
  const errorDetails = (errorDetailMap as any)[error.id];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "success";
      default: return "default";
    }
  };

  const getGroupColor = (group: string) => {
    switch (group) {
      case "Giỏi": return "text-success border-success";
      case "Khá": return "text-primary border-primary";
      case "TB": return "text-warning border-warning";
      case "Yếu": return "text-danger border-danger";
      default: return "text-muted-foreground border-border";
    }
  };

  const handleAction = (actionType: string) => {
    onAction?.(actionType, error);
    onClose();
  };

  // Compute group counts from affected students
  const yeuCount = errorDetails?.affectedStudents?.filter((s: any) => s.group === "Yếu").length ?? 0;
  const otherCount = (errorDetails?.affectedStudents?.length ?? 0) - yeuCount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-danger" />
            Error Taxonomy — {error.tag}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Stats */}
          <div className="bg-primary/10 rounded-lg p-4">
            <div className="text-3xl font-bold text-primary mb-2">{error.count}</div>
            <p className="text-muted-foreground">
              học sinh ({error.percentage}%) đã mắc lỗi này trong bài kiểm tra gần đây
            </p>
          </div>

          {/* Error Details & Affected Students */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Error Analysis */}
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Lỗi phổ biến & khắc phục
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Tag lỗi</h4>
                    <Badge variant="outline" className={cn(
                      "font-medium",
                      getSeverityColor(error.severity) === "danger" && "border-danger text-danger",
                      getSeverityColor(error.severity) === "warning" && "border-warning text-warning", 
                      getSeverityColor(error.severity) === "success" && "border-success text-success"
                    )}>
                      {error.tag}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Lượt</h4>
                    <p className="text-2xl font-bold">{error.count}</p>
                  </div>

                  {errorDetails && (
                    <>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Phân tích gốc rễ</h4>
                        <div className="bg-muted/50 p-3 rounded text-sm space-y-1">
                          {errorDetails.fullDescription.split('\n').map((line: string, i: number) => (
                            <p key={i} className={i === 0 ? "font-medium" : "text-muted-foreground"}>{line}</p>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">Ví dụ sai cụ thể</h4>
                        <div className="space-y-2">
                          {errorDetails.commonMistakes.map((mistake: string, index: number) => (
                            <div key={index} className="flex items-start space-x-2 text-sm">
                              <div className="w-1 h-1 rounded-full bg-danger mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{mistake}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>

            {/* Right: Affected Students */}
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Học sinh bị ảnh hưởng ({errorDetails?.affectedStudents?.length ?? error.affectedStudents.length})
                </h3>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {(errorDetails?.affectedStudents ?? error.affectedStudents.map((name: string) => ({ id: "", name, group: "TB", score: 0, errors: [] }))).map((student: any, idx: number) => (
                    <div key={student.id || idx} className="flex items-center justify-between p-2 rounded border border-border hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className={getGroupColor(student.group)}>
                              {student.group}
                            </Badge>
                            {student.score != null && (
                              <span className="text-xs text-muted-foreground">
                                Điểm: {student.score}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          {student.errors?.join(", ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-3 text-center">
                  <div className="text-lg font-bold text-danger">{yeuCount}</div>
                  <div className="text-xs text-muted-foreground">Nhóm Yếu</div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-lg font-bold text-warning">{otherCount}</div>
                  <div className="text-xs text-muted-foreground">Nhóm Khác</div>
                </Card>
              </div>
            </div>
          </div>

          {/* Action Suggestions */}
          {errorDetails && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Đề xuất hành động khắc phục</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {errorDetails.suggestedActions.map((action: any, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleAction(action.type)}
                    className="p-5 h-auto flex-col items-start text-left space-y-2 border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all group relative overflow-hidden shrink-0"
                  >
                    <div className="font-bold text-foreground group-hover:text-primary transition-colors">{action.title}</div>
                    <div className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3 whitespace-normal">
                      {action.description}
                    </div>
                  </Button>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <Button 
                  onClick={() => handleAction("create_comprehensive_action")}
                  className="w-full"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Tạo hành động toàn diện cho {error.count} học sinh
                </Button>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}