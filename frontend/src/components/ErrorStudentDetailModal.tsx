import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, FileText, MessageSquare } from "lucide-react";
import { errorDetailMap } from "@/data/exam177DeepData";

interface ErrorStudent {
  id: string;
  name: string;
  errorCount: number;
  questions: string[];
  errorExamples: string[];
  feedback: string[];
  group: "Giỏi" | "Khá" | "TB" | "Yếu";
  score?: number;
}

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

interface ErrorStudentDetailModalProps {
  error: CommonError | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ErrorStudentDetailModal({ error, isOpen, onClose }: ErrorStudentDetailModalProps) {
  if (!error) return null;

  // Look up deep data from analytics JSON using the error's id (e.g., ERR_002)
  const errorDetails = (errorDetailMap as any)[error.id];
  
  // Transform affectedStudents from analytics into ErrorStudent interface
  const studentErrors: ErrorStudent[] = errorDetails?.affectedStudents?.map((s: any) => ({
    id: s.id,
    name: s.name,
    errorCount: s.errors?.length || 1,
    questions: error.questionIds,
    errorExamples: errorDetails.commonMistakes || [error.example],
    feedback: errorDetails.suggestedActions?.map((a: any) => a.title) || ["Cần ôn tập lại kiến thức liên quan"],
    group: s.group,
    score: s.score
  })) || [];

  const getTagVariant = (errorCount: number) => {
    if (errorCount > 3) return "Nghiêm trọng";
    if (errorCount > 2) return "Cần luyện tập"; 
    return "Cần nhắc nhở";
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Nghiêm trọng": return "border-danger text-danger";
      case "Cần luyện tập": return "border-warning text-warning";
      case "Cần nhắc nhở": return "border-primary text-primary";
      default: return "border-muted text-muted-foreground";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-danger" />
            Chi tiết học sinh mắc lỗi: {error.tag}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Stats */}
          <div className="bg-primary/10 rounded-lg p-4">
            <div className="text-3xl font-bold text-primary mb-2">{error.count}</div>
            <p className="text-muted-foreground">
              học sinh ({error.percentage}%) đã mắc lỗi này trong Exam 177
            </p>
          </div>

          {/* Student List */}
          <div className="space-y-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Danh sách học sinh ({studentErrors.length})
            </h3>
            
            <div className="space-y-4">
              {studentErrors
                .sort((a, b) => b.errorCount - a.errorCount)
                .map((student) => {
                  const tag = getTagVariant(student.errorCount);
                  return (
                    <Card key={student.id} className="p-4">
                      <div className="space-y-4">
                        {/* Student Header */}
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-medium text-lg">{student.name}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className={getTagColor(tag)}>
                                {tag}
                              </Badge>
                              <Badge variant="outline" className={getGroupColor(student.group)}>
                                {student.group}
                              </Badge>
                              {student.score !== undefined && (
                                <span className="text-xs text-muted-foreground font-medium">
                                  Điểm: {student.score}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-danger">{student.errorCount}</div>
                            <div className="text-xs text-muted-foreground">lần mắc lỗi</div>
                          </div>
                        </div>

                        {/* Error Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-sm mb-2">Các câu mắc lỗi:</h5>
                            <p className="text-sm text-muted-foreground">
                              {student.questions.join(", ")}
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-sm mb-2">Ví dụ lỗi cụ thể:</h5>
                            <div className="space-y-1">
                              {student.errorExamples.slice(0, 2).map((example, index) => (
                                <div key={index} className="text-xs bg-muted/50 p-2 rounded">
                                  {example}
                                </div>
                              ))}
                              {student.errorExamples.length > 2 && (
                                <p className="text-xs text-muted-foreground">
                                  +{student.errorExamples.length - 2} lỗi khác...
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Feedback */}
                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Gợi ý can thiệp:
                          </h5>
                          <div className="bg-accent/30 p-3 rounded-lg">
                            <ul className="text-sm space-y-1">
                              {student.feedback.map((feedback, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                  <span>{feedback}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="w-full">
                            Tạo hành động cá nhân cho {student.name}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>

          {/* Summary Actions */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Hành động tổng thể</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <div className="font-medium">Nghiêm trọng ({studentErrors.filter(s => s.errorCount > 3).length})</div>
                <div className="text-xs text-muted-foreground">Cần hỗ trợ đặc biệt</div>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <div className="font-medium">Cần luyện tập ({studentErrors.filter(s => s.errorCount > 2 && s.errorCount <= 3).length})</div>
                <div className="text-xs text-muted-foreground">Bài tập bổ sung</div>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <div className="font-medium">Cần nhắc nhở ({studentErrors.filter(s => s.errorCount <= 2).length})</div>
                <div className="text-xs text-muted-foreground">Nhắc nhở và theo dõi</div>
              </Button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <Button className="w-full">
                Tạo kế hoạch hỗ trợ toàn diện cho {error.count} học sinh
              </Button>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}