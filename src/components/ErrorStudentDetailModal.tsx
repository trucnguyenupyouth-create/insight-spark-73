import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, FileText, MessageSquare } from "lucide-react";

interface ErrorStudent {
  id: string;
  name: string;
  errorCount: number;
  questions: string[];
  errorExamples: string[];
  feedback: string[];
  group: "Giỏi" | "Khá" | "TB" | "Yếu";
}

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

interface ErrorStudentDetailModalProps {
  error: CommonError | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock detailed student error data
const mockStudentErrors: { [key: string]: ErrorStudent[] } = {
  "error_1": [
    {
      id: "hs001",
      name: "Nguyễn Văn An",
      errorCount: 4,
      questions: ["Câu 2", "Câu 5", "Câu 8", "Câu 10"],
      errorExamples: [
        "sin30° = √3/2 (sai, đúng là 1/2)",
        "cos45° = 1 (sai, đúng là √2/2)",
        "Nhầm cạnh kề với cạnh đối",
        "Quên quy tắc dấu trong góc phần tư thứ hai"
      ],
      feedback: [
        "Em cần ôn lại bảng giá trị lượng giác cơ bản",
        "Luyện tập thêm bài tập nhận biết cạnh trong tam giác vuông",
        "Học thuộc quy tắc dấu của các hàm số lượng giác"
      ],
      group: "Yếu"
    },
    {
      id: "hs002", 
      name: "Trần Thị Bình",
      errorCount: 2,
      questions: ["Câu 3", "Câu 7"],
      errorExamples: [
        "tan60° = √3/2 (sai, đúng là √3)",
        "Áp dụng sai công thức tính cạnh"
      ],
      feedback: [
        "Cần ghi nhớ chính xác các giá trị đặc biệt",
        "Luyện tập thêm các dạng bài ứng dụng"
      ],
      group: "TB"
    },
    {
      id: "hs003",
      name: "Lê Văn Cường", 
      errorCount: 3,
      questions: ["Câu 2", "Câu 4", "Câu 9"],
      errorExamples: [
        "Nhầm định nghĩa sin với cos",
        "Tính sai góc với arcsin",
        "Đơn vị góc không đúng (độ/radian)"
      ],
      feedback: [
        "Ôn lại định nghĩa các tỉ số lượng giác",
        "Chú ý đơn vị góc khi tính toán",
        "Luyện tập thêm bài tập tìm góc"
      ],
      group: "TB"
    },
    {
      id: "hs004",
      name: "Phạm Thị Dung",
      errorCount: 1,
      questions: ["Câu 6"],
      errorExamples: [
        "Làm tròn kết quả không chính xác"
      ],
      feedback: [
        "Chú ý quy tắc làm tròn số thập phân"
      ],
      group: "Khá"
    },
    {
      id: "hs005",
      name: "Hoàng Văn E",
      errorCount: 5,
      questions: ["Câu 1", "Câu 3", "Câu 5", "Câu 8", "Câu 11"],
      errorExamples: [
        "Không nhớ công thức cơ bản",
        "Tính toán sai các phép tính cơ bản", 
        "Nhầm lẫn giữa các hàm số lượng giác",
        "Không hiểu đề bài",
        "Không biết cách vẽ hình minh họa"
      ],
      feedback: [
        "Cần ôn lại toàn bộ kiến thức lượng giác cơ bản",
        "Luyện tập thêm các phép tính số học",
        "Học cách phân tích đề bài",
        "Rèn luyện kỹ năng vẽ hình minh họa"
      ],
      group: "Yếu"
    },
    {
      id: "hs006",
      name: "Vũ Thị Giang",
      errorCount: 2,
      questions: ["Câu 4", "Câu 12"],
      errorExamples: [
        "Áp dụng sai định lý cosin",
        "Bài toán thực tế thiết lập sai mối quan hệ"
      ],
      feedback: [
        "Ôn lại định lý cosin và cách áp dụng",
        "Luyện tập thêm dạng bài toán thực tế"
      ],
      group: "TB"
    }
  ]
};

export function ErrorStudentDetailModal({ error, isOpen, onClose }: ErrorStudentDetailModalProps) {
  if (!error) return null;

  const studentErrors = mockStudentErrors[error.id] || [];

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
              học sinh ({error.percentage}%) đã mắc lỗi này
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
                            Feedback hiện tại:
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