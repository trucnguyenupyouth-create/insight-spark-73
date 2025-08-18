import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Brain, FileText, Users, AlertTriangle } from "lucide-react";

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

interface QuestionDetail {
  questionNumber: string;
  correctRate: number;
  studentsIncorrect: string[];
  knowledgeExample: string;
}

interface KnowledgeGapDetailModalProps {
  topic: KnowledgeTopic | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock question details for different topics
const mockQuestionDetails: { [key: string]: QuestionDetail[] } = {
  "topic_1": [
    {
      questionNumber: "Câu 1",
      correctRate: 85,
      studentsIncorrect: ["Nguyễn Văn An", "Hoàng Văn E"],
      knowledgeExample: "Tính \\sin 30°, \\cos 60°, \\tan 45° - Các giá trị lượng giác đặc biệt cơ bản"
    },
    {
      questionNumber: "Câu 3", 
      correctRate: 65,
      studentsIncorrect: ["Nguyễn Văn An", "Lê Văn Cường", "Phạm Thị Dung"],
      knowledgeExample: "So sánh các giá trị lượng giác: \\sin 30° < \\cos 30° hay ngược lại?"
    },
    {
      questionNumber: "Câu 7",
      correctRate: 45,
      studentsIncorrect: ["Nguyễn Văn An", "Trần Thị Bình", "Hoàng Văn E", "Vũ Thị Giang"],
      knowledgeExample: "Ứng dụng định nghĩa trong bài toán thực tế - tính chiều cao cột cờ biết khoảng cách và góc nhìn"
    }
  ],
  "topic_2": [
    {
      questionNumber: "Câu 2",
      correctRate: 75,
      studentsIncorrect: ["Lê Văn Cường", "Vũ Thị Giang", "Hoàng Văn E"],
      knowledgeExample: "Xác định cạnh đối, cạnh kề trong tam giác vuông ABC vuông tại C với góc \\alpha"
    },
    {
      questionNumber: "Câu 4",
      correctRate: 40,
      studentsIncorrect: ["Lê Văn Cường", "Phạm Thị Dung", "Hoàng Văn E", "Đỗ Văn H"],
      knowledgeExample: "Tỉ số lượng giác của góc nhọn: \\sin \\alpha = \\frac{\\text{đối}}{\\text{huyền}}, \\cos \\alpha = \\frac{\\text{kề}}{\\text{huyền}}"
    },
    {
      questionNumber: "Câu 5",
      correctRate: 30,
      studentsIncorrect: ["Lê Văn Cường", "Phạm Thị Dung", "Hoàng Văn E", "Vũ Thị Giang", "Đỗ Văn H"],
      knowledgeExample: "Áp dụng tỉ số lượng giác để tính độ dài cạnh trong tam giác vuông"
    }
  ],
  "topic_3": [
    {
      questionNumber: "Câu 6",
      correctRate: 45,
      studentsIncorrect: ["Vũ Thị Giang", "Đỗ Văn H", "Mai Văn K"],
      knowledgeExample: "Tìm cạnh trong tam giác vuông: AB = \\frac{BC}{\\sin \\alpha} khi biết BC và góc \\alpha"
    },
    {
      questionNumber: "Câu 8",
      correctRate: 25,
      studentsIncorrect: ["Vũ Thị Giang", "Đỗ Văn H", "Mai Văn K", "Trương Văn M"],
      knowledgeExample: "Sử dụng sin, cos, tan để giải bài toán hình học: tính AC khi biết AB = 10cm và góc ABC = 60°"
    }
  ],
  "topic_4": [
    {
      questionNumber: "Câu 9",
      correctRate: 35,
      studentsIncorrect: ["Mai Văn K", "Lý Thị L", "Trương Văn M"],
      knowledgeExample: "Tìm góc bằng hàm ngược: \\alpha = \\arcsin(0.5) = 30°, \\beta = \\arccos(0.5) = 60°"
    },
    {
      questionNumber: "Câu 10",
      correctRate: 20,
      studentsIncorrect: ["Mai Văn K", "Lý Thị L", "Trương Văn M", "Hoàng Văn E"],
      knowledgeExample: "Ứng dụng hàm lượng giác ngược: tìm góc nâng khi biết chiều cao và khoảng cách"
    }
  ],
  "topic_5": [
    {
      questionNumber: "Câu 11",
      correctRate: 20,
      studentsIncorrect: ["Trương Văn M", "Mai Văn K", "Hoàng Văn E"],
      knowledgeExample: "Bài toán thực tế: Chiều cao tòa nhà = khoảng cách × \\tan(\\text{góc nâng})"
    },
    {
      questionNumber: "Câu 12",
      correctRate: 10,
      studentsIncorrect: ["Trương Văn M", "Vũ Thị Giang", "Lý Thị L"],
      knowledgeExample: "Ứng dụng tổng hợp: Tính khoảng cách từ điểm A đến điểm B không thể đo trực tiếp"
    }
  ]
};

export function KnowledgeGapDetailModal({ topic, isOpen, onClose }: KnowledgeGapDetailModalProps) {
  if (!topic) return null;

  const questionDetails = mockQuestionDetails[topic.id] || [];

  const getCorrectRateColor = (rate: number) => {
    if (rate >= 70) return "success";
    if (rate >= 50) return "warning";
    return "danger";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Brain className="w-6 h-6 mr-3 text-primary" />
            Chi tiết hổng kiến thức: {topic.name}
          </DialogTitle>
          <div className="text-sm text-muted-foreground mt-2">
            Phân tích từng câu hỏi và học sinh chưa nắm vững kiến thức này
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Topic Overview */}
          <Card className="p-5 border-l-4 border-l-primary">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">{topic.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="font-medium">Các câu xuất hiện:</span>
                  <span className="text-foreground font-medium">{topic.questions.join(", ")}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={cn(
                  "text-3xl font-bold mb-1",
                  topic.masteryRate >= 70 && "text-success",
                  topic.masteryRate >= 50 && topic.masteryRate < 70 && "text-warning",
                  topic.masteryRate < 50 && "text-danger"
                )}>
                  {topic.masteryRate}%
                </div>
                <p className="text-sm font-medium text-muted-foreground">Độ nắm vững</p>
              </div>
            </div>
          </Card>

          {/* Question Analysis */}
          <div className="space-y-5">
            <h3 className="font-bold text-lg flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Phân tích từng câu hỏi ({questionDetails.length} câu)
            </h3>
            
            {questionDetails.map((question, index) => {
              const correctRateColor = getCorrectRateColor(question.correctRate);
              return (
                <Card key={index} className="p-5 space-y-4">
                  {/* Question Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-foreground mb-2">
                        {question.questionNumber}
                      </h4>
                      <div className="text-sm text-muted-foreground">
                        <strong>Nội dung kiến thức:</strong> {question.knowledgeExample}
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div className={cn(
                        "text-2xl font-bold mb-1",
                        correctRateColor === "success" && "text-success",
                        correctRateColor === "warning" && "text-warning",
                        correctRateColor === "danger" && "text-danger"
                      )}>
                        {question.correctRate}%
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">đúng</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">Tỉ lệ làm đúng</span>
                      <span className={cn(
                        "font-bold",
                        correctRateColor === "success" && "text-success",
                        correctRateColor === "warning" && "text-warning",
                        correctRateColor === "danger" && "text-danger"
                      )}>
                        {question.correctRate}%
                      </span>
                    </div>
                    <Progress 
                      value={question.correctRate}
                      className={cn(
                        "h-3 bg-muted",
                        correctRateColor === "success" && "[&>div]:bg-success",
                        correctRateColor === "warning" && "[&>div]:bg-warning",
                        correctRateColor === "danger" && "[&>div]:bg-danger"
                      )}
                    />
                  </div>

                  {/* Students who got it wrong */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-sm flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Học sinh làm sai ({question.studentsIncorrect.length} em):
                      </h5>
                      <Badge variant="outline" className="text-danger border-danger bg-danger/10">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Cần hỗ trợ
                      </Badge>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex flex-wrap gap-2">
                        {question.studentsIncorrect.map((studentName, idx) => (
                          <Badge key={idx} variant="outline" className="text-danger border-danger/50">
                            {studentName}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Knowledge Example */}
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Ví dụ thiếu kiến thức (LaTeX):</h5>
                    <div className="bg-accent/30 p-4 rounded-lg font-mono text-sm border-l-4 border-l-warning">
                      {question.knowledgeExample}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Summary Statistics */}
          <Card className="p-5">
            <h3 className="font-bold text-lg mb-4">Tổng quan kiến thức hổng</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-danger">
                  {questionDetails.filter(q => q.correctRate < 50).length}
                </div>
                <div className="text-sm text-muted-foreground">Câu khó (&lt;50%)</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-warning">
                  {questionDetails.filter(q => q.correctRate >= 50 && q.correctRate < 70).length}
                </div>
                <div className="text-sm text-muted-foreground">Câu trung bình (50-70%)</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-success">
                  {questionDetails.filter(q => q.correctRate >= 70).length}
                </div>
                <div className="text-sm text-muted-foreground">Câu dễ (&gt;70%)</div>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}