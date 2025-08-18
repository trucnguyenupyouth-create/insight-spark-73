import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AlertTriangle, Users, FileText, MessageSquare, TrendingDown } from "lucide-react";

interface KnowledgeTopic {
  id: string;
  name: string;
  masteryRate: number;
  questions: string[];
  studentsWithGaps: StudentGap[];
}

interface StudentGap {
  id: string;
  name: string;
  deficitPercentage: number;
  questionsCorrect: string[];
  questionsIncorrect: string[];
  examples: string[];
  group: "Giỏi" | "Khá" | "TB" | "Yếu";
}

interface KnowledgeGapStudentModalProps {
  topic: KnowledgeTopic | null;
  isOpen: boolean;
  onClose: () => void;
}

export function KnowledgeGapStudentModal({ topic, isOpen, onClose }: KnowledgeGapStudentModalProps) {
  if (!topic) return null;

  const getSeverityLevel = (deficit: number) => {
    if (deficit >= 80) return { label: "Nghiêm trọng", color: "text-danger border-danger bg-danger/10" };
    if (deficit >= 60) return { label: "Cần luyện tập", color: "text-warning border-warning bg-warning/10" };
    return { label: "Cần nhắc nhở", color: "text-primary border-primary bg-primary/10" };
  };

  const getGroupColor = (group: string) => {
    switch (group) {
      case "Giỏi": return "text-success border-success bg-success/10";
      case "Khá": return "text-primary border-primary bg-primary/10";
      case "TB": return "text-warning border-warning bg-warning/10";
      case "Yếu": return "text-danger border-danger bg-danger/10";
      default: return "text-muted-foreground border-border bg-muted/10";
    }
  };

  // Sort students by deficit percentage (highest first)
  const sortedStudents = [...topic.studentsWithGaps].sort((a, b) => b.deficitPercentage - a.deficitPercentage);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <TrendingDown className="w-6 h-6 mr-3 text-danger" />
            Học sinh hổng kiến thức: {topic.name}
          </DialogTitle>
          <div className="text-sm text-muted-foreground mt-2">
            Xếp hạng dựa trên tổng số % thiếu kiến thức (nghiêm trọng → nhẹ)
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Topic Overview */}
          <Card className="p-5 border-l-4 border-l-danger">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">{topic.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="font-medium">Độ nắm vững chung:</span>
                  <span className={cn(
                    "font-bold",
                    topic.masteryRate >= 70 && "text-success",
                    topic.masteryRate >= 50 && topic.masteryRate < 70 && "text-warning",
                    topic.masteryRate < 50 && "text-danger"
                  )}>
                    {topic.masteryRate}%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-danger mb-1">
                  {topic.studentsWithGaps.length}
                </div>
                <p className="text-sm font-medium text-muted-foreground">học sinh hổng</p>
              </div>
            </div>
          </Card>

          {/* Students with Knowledge Gaps */}
          <div className="space-y-5">
            <h3 className="font-bold text-lg flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Danh sách học sinh ({sortedStudents.length} em)
            </h3>
            
            {sortedStudents.map((student, index) => {
              const severity = getSeverityLevel(student.deficitPercentage);
              return (
                <Card key={student.id} className="p-6 border-l-4 border-l-danger">
                  <div className="space-y-5">
                    {/* Student header with ranking */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center">
                            <span className="font-bold text-danger">#{index + 1}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-bold text-lg text-foreground">{student.name}</h4>
                            <Badge variant="outline" className={getGroupColor(student.group)}>
                              Nhóm {student.group}
                            </Badge>
                          </div>
                          <Badge className={cn("font-medium", severity.color)}>
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {severity.label}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-danger mb-1">
                          {student.deficitPercentage}%
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">thiếu kiến thức</p>
                      </div>
                    </div>

                    {/* Deficit progress bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-muted-foreground">Mức độ thiếu kiến thức</span>
                        <span className="text-danger font-bold">{student.deficitPercentage}%</span>
                      </div>
                      <Progress 
                        value={student.deficitPercentage}
                        className="h-3 bg-muted [&>div]:bg-danger"
                      />
                    </div>

                    {/* Questions breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-3">
                        <p className="font-bold text-sm text-success flex items-center">
                          <span className="w-3 h-3 bg-success rounded-full mr-2"></span>
                          Câu làm đúng ({student.questionsCorrect.length} câu):
                        </p>
                        <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                          {student.questionsCorrect.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {student.questionsCorrect.map((question, idx) => (
                                <Badge key={idx} variant="outline" className="text-success border-success bg-success/10">
                                  {question}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">Không có câu nào</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="font-bold text-sm text-danger flex items-center">
                          <span className="w-3 h-3 bg-danger rounded-full mr-2"></span>
                          Câu làm sai ({student.questionsIncorrect.length} câu):
                        </p>
                        <div className="bg-danger/10 p-3 rounded-lg border border-danger/20">
                          {student.questionsIncorrect.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {student.questionsIncorrect.map((question, idx) => (
                                <Badge key={idx} variant="outline" className="text-danger border-danger bg-danger/10">
                                  {question}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">Không có câu nào</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Knowledge gap examples */}
                    <div className="space-y-3">
                      <p className="font-bold text-sm flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        Ví dụ thiếu kiến thức (LaTeX):
                      </p>
                      <div className="space-y-2">
                        {student.examples.map((example, idx) => (
                          <div key={idx} className="bg-accent/30 p-3 rounded-lg border-l-4 border-l-warning">
                            <div className="font-mono text-sm text-foreground">
                              {example}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-3 pt-3 border-t border-border/30">
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Tạo hành động cá nhân
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Summary Statistics */}
          <Card className="p-5">
            <h3 className="font-bold text-lg mb-4">Thống kê tổng quan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-danger">
                  {sortedStudents.filter(s => s.deficitPercentage >= 80).length}
                </div>
                <div className="text-sm text-muted-foreground">Nghiêm trọng (≥80%)</div>
                <div className="text-xs text-danger">Cần hỗ trợ đặc biệt</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-warning">
                  {sortedStudents.filter(s => s.deficitPercentage >= 60 && s.deficitPercentage < 80).length}
                </div>
                <div className="text-sm text-muted-foreground">Cần luyện tập (60-80%)</div>
                <div className="text-xs text-warning">Bài tập bổ sung</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {sortedStudents.filter(s => s.deficitPercentage < 60).length}
                </div>
                <div className="text-sm text-muted-foreground">Cần nhắc nhở (&lt;60%)</div>
                <div className="text-xs text-primary">Theo dõi thêm</div>
              </div>
            </div>

            {/* Overall Action Button */}
            <div className="mt-6 pt-4 border-t border-border">
              <Button className="w-full" size="lg">
                <Users className="w-4 h-4 mr-2" />
                Tạo kế hoạch hỗ trợ toàn diện cho {topic.studentsWithGaps.length} học sinh
              </Button>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}