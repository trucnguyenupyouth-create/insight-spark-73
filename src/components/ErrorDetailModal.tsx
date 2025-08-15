import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, Users, FileText, Eye } from "lucide-react";

interface CommonError {
  id: string;
  tag: string;
  count: number;
  percentage: number;
  severity: "high" | "medium" | "low";
  example: string;
  affectedStudents: string[];
  questionIds: number[];
}

interface ErrorDetailModalProps {
  error: CommonError | null;
  isOpen: boolean;
  onClose: () => void;
  onAction?: (actionType: string, error: CommonError) => void;
}

// Mock detailed error data
const mockErrorDetails = {
  "error_1": {
    fullDescription: "Học sinh không biết cách tách nhân tử từ biểu thức hoặc tách sai biến trong phương trình.",
    commonMistakes: [
      "Nhầm chân kế với đối, đặt sai đơn vị",
      "Nhầm chân kê với đối, đặt sai đơn vị", 
      "Nhầm chân kê với đối, đặt sai đơn vị"
    ],
    affectedStudents: [
      { id: "hs001", name: "Nguyễn Văn An", group: "Giỏi", score: 8.5, errors: ["Câu 2"] },
      { id: "hs002", name: "Trần Thị Bình", group: "Yếu", score: 4.5, errors: ["Câu 2", "Câu 7"] },
      { id: "hs003", name: "Lê Văn Cường", group: "TB", score: 6.2, errors: ["Câu 7"] },
      { id: "hs004", name: "Phạm Thị Dung", group: "Khá", score: 7.1, errors: ["Câu 2"] },
      { id: "hs005", name: "Hoàng Văn E", group: "Yếu", score: 2.7, errors: ["Câu 2", "Câu 7"] },
      { id: "hs006", name: "Vũ Thị Giang", group: "TB", score: 5.8, errors: ["Câu 7"] }
    ],
    relatedTopics: ["Phân tích đa thức", "Phương trình bậc hai"],
    suggestedActions: [
      {
        type: "review_concept",
        title: "Giảng lại khái niệm cơ bản",
        description: "Dành 15 phút đầu tiết để ôn lại cách tách nhân tử"
      },
      {
        type: "practice_exercises", 
        title: "Bài tập luyện tập",
        description: "Giao 5 bài tập tương tự cho các em có lỗi này"
      },
      {
        type: "group_support",
        title: "Hỗ trợ theo nhóm",
        description: "Tạo nhóm hỗ trợ giữa học sinh giỏi và yếu"
      }
    ]
  }
};

export function ErrorDetailModal({ error, isOpen, onClose, onAction }: ErrorDetailModalProps) {
  if (!error) return null;

  const errorDetails = mockErrorDetails["error_1"];

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

                  <div>
                    <h4 className="font-medium text-sm mb-2">Ví dụ (giả lập)</h4>
                    <div className="bg-muted/50 p-3 rounded text-sm">
                      <p className="font-medium mb-1">VD: nhầm chân kể với đối, đặt sai đơn vị...</p>
                      <p className="text-muted-foreground">Học sinh thường viết: sin30° = √3/2 thay vì cos30° = √3/2</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Các lỗi phổ biến khác</h4>
                    <div className="space-y-2">
                      {errorDetails.commonMistakes.map((mistake, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm">
                          <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{mistake}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Affected Students */}
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Học sinh bị ảnh hưởng ({errorDetails.affectedStudents.length})
                </h3>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {errorDetails.affectedStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-2 rounded border border-border hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className={getGroupColor(student.group)}>
                              {student.group}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Điểm: {student.score}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          {student.errors.join(", ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-3 text-center">
                  <div className="text-lg font-bold text-danger">4</div>
                  <div className="text-xs text-muted-foreground">Nhóm Yếu</div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-lg font-bold text-warning">2</div>
                  <div className="text-xs text-muted-foreground">Nhóm Khác</div>
                </Card>
              </div>
            </div>
          </div>

          {/* Action Suggestions */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Đề xuất hành động khắc phục</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {errorDetails.suggestedActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAction(action.type)}
                  className="p-4 h-auto flex-col items-start text-left space-y-2"
                >
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}