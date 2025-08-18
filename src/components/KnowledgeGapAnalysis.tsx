import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Brain, Users, FileText, TrendingDown, AlertTriangle } from "lucide-react";

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

interface KnowledgeGapAnalysisProps {
  topics: KnowledgeTopic[];
}

// Mock data for demonstration
const mockTopics: KnowledgeTopic[] = [
  {
    id: "topic_1",
    name: "Định nghĩa sin/cos/tan",
    masteryRate: 72,
    questions: ["Câu 1", "Câu 3", "Câu 7"],
    studentsWithGaps: [
      {
        id: "hs001",
        name: "Nguyễn Văn An",
        deficitPercentage: 85,
        questionsCorrect: ["Câu 1"],
        questionsIncorrect: ["Câu 3", "Câu 7"],
        examples: ["\\sin 30° = \\frac{\\sqrt{3}}{2} (sai, đúng là \\frac{1}{2})", "\\cos 60° = \\frac{1}{3} (sai, đúng là \\frac{1}{2})"],
        group: "Yếu"
      },
      {
        id: "hs002", 
        name: "Trần Thị Bình",
        deficitPercentage: 67,
        questionsCorrect: ["Câu 1", "Câu 3"],
        questionsIncorrect: ["Câu 7"],
        examples: ["\\cos 45° = 1 (sai, đúng là \\frac{\\sqrt{2}}{2})"],
        group: "TB"
      }
    ]
  },
  {
    id: "topic_2",
    name: "Tỉ số cạnh đối/cạnh kề/huyền",
    masteryRate: 48.5,
    questions: ["Câu 2", "Câu 4", "Câu 5"],
    studentsWithGaps: [
      {
        id: "hs003",
        name: "Lê Văn Cường", 
        deficitPercentage: 90,
        questionsCorrect: ["Câu 2"],
        questionsIncorrect: ["Câu 4", "Câu 5"],
        examples: ["Nhầm cạnh kề với cạnh đối trong tam giác vuông", "\\sin \\alpha = \\frac{\\text{cạnh kề}}{\\text{huyền}} (sai, đúng là \\frac{\\text{cạnh đối}}{\\text{huyền}})"],
        group: "Yếu"
      },
      {
        id: "hs004",
        name: "Phạm Thị Dung", 
        deficitPercentage: 73,
        questionsCorrect: ["Câu 2", "Câu 4"],
        questionsIncorrect: ["Câu 5"],
        examples: ["\\tan \\alpha = \\frac{\\text{cạnh đối}}{\\text{cạnh kề}} nhưng tính ngược"],
        group: "TB"
      },
      {
        id: "hs005",
        name: "Hoàng Văn E", 
        deficitPercentage: 82,
        questionsCorrect: [],
        questionsIncorrect: ["Câu 2", "Câu 4", "Câu 5"],
        examples: ["Không phân biệt được cạnh đối và cạnh kề", "Sử dụng sai công thức tỉ số lượng giác"],
        group: "Yếu"
      }
    ]
  },
  {
    id: "topic_3",
    name: "Tìm cạnh bằng sin/cos/tan",
    masteryRate: 35,
    questions: ["Câu 6", "Câu 8"],
    studentsWithGaps: [
      {
        id: "hs006",
        name: "Vũ Thị Giang",
        deficitPercentage: 95,
        questionsCorrect: [],
        questionsIncorrect: ["Câu 6", "Câu 8"],
        examples: ["a = b \\cdot \\sin(30°) nhưng quên tính \\sin(30°) = 0.5", "Không áp dụng được công thức vào bài toán cụ thể"],
        group: "Yếu"
      },
      {
        id: "hs007",
        name: "Đỗ Văn H",
        deficitPercentage: 88,
        questionsCorrect: [],
        questionsIncorrect: ["Câu 6", "Câu 8"],
        examples: ["BC = AB \\cdot \\cos(\\alpha) nhưng sử dụng sai góc", "Nhầm lẫn giữa sin và cos trong công thức"],
        group: "Yếu"
      }
    ]
  },
  {
    id: "topic_4", 
    name: "Tìm góc bằng arctrig",
    masteryRate: 28,
    questions: ["Câu 9", "Câu 10"],
    studentsWithGaps: [
      {
        id: "hs008",
        name: "Mai Văn K",
        deficitPercentage: 100,
        questionsCorrect: [],
        questionsIncorrect: ["Câu 9", "Câu 10"],
        examples: ["\\alpha = \\arcsin(0.5) = 60° (sai, đúng là 30°)", "Không hiểu khái niệm hàm lượng giác ngược"],
        group: "Yếu"
      },
      {
        id: "hs009",
        name: "Lý Thị L",
        deficitPercentage: 95,
        questionsCorrect: [],
        questionsIncorrect: ["Câu 9", "Câu 10"],
        examples: ["\\beta = \\arccos(\\frac{1}{2}) = 45° (sai, đúng là 60°)", "Nhầm lẫn giữa các giá trị lượng giác đặc biệt"],
        group: "TB"
      }
    ]
  },
  {
    id: "topic_5",
    name: "Bài toán vận dụng (ứng dụng)",
    masteryRate: 15,
    questions: ["Câu 11", "Câu 12"],
    studentsWithGaps: [
      {
        id: "hs010",
        name: "Trương Văn M",
        deficitPercentage: 100,
        questionsCorrect: [],
        questionsIncorrect: ["Câu 11", "Câu 12"],
        examples: ["Chiều cao tòa nhà = khoảng cách × \\tan(\\text{góc}) nhưng không xác định được góc nào", "Không biết chuyển đổi bài toán thực tế sang tam giác vuông"],
        group: "Yếu"
      }
    ]
  }
];

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
  ]
};

export function KnowledgeGapAnalysis({ topics = mockTopics }: KnowledgeGapAnalysisProps) {
  const [selectedTopic, setSelectedTopic] = useState<KnowledgeTopic | null>(null);
  const [showStudentGaps, setShowStudentGaps] = useState(false);
  const [showQuestionDetails, setShowQuestionDetails] = useState(false);

  const getMasteryColor = (rate: number) => {
    if (rate >= 70) return "success";
    if (rate >= 50) return "warning"; 
    return "danger";
  };

  const getSeverityLevel = (deficit: number) => {
    if (deficit >= 80) return { label: "Nghiêm trọng", color: "text-danger border-danger bg-danger/10" };
    if (deficit >= 60) return { label: "Cần luyện tập", color: "text-warning border-warning bg-warning/10" };
    return { label: "Cần nhắc nhở", color: "text-primary border-primary bg-primary/10" };
  };

  const handleStudentGapsClick = (topic: KnowledgeTopic) => {
    setSelectedTopic(topic);
    setShowStudentGaps(true);
  };

  const handleQuestionDetailsClick = (topic: KnowledgeTopic) => {
    setSelectedTopic(topic);
    setShowQuestionDetails(true);
  };

  return (
    <>
      <Card className="p-6 shadow-md">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Thống kê kiến thức hổng</h3>
          </div>
          
          <div className="space-y-8">
            {topics.map((topic) => (
              <div key={topic.id} className="space-y-5 p-6 rounded-lg border border-border/50 hover:border-border transition-colors bg-card/50">
                {/* Knowledge mastery header */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-foreground mb-2">{topic.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span className="font-medium">Các câu xuất hiện:</span>
                        <span className="text-foreground font-medium">{topic.questions.join(", ")}</span>
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div className={cn(
                        "text-3xl font-bold mb-1",
                        getMasteryColor(topic.masteryRate) === "success" && "text-success",
                        getMasteryColor(topic.masteryRate) === "warning" && "text-warning",
                        getMasteryColor(topic.masteryRate) === "danger" && "text-danger"
                      )}>
                        {topic.masteryRate}%
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">Độ nắm vững</p>
                    </div>
                  </div>
                  
                  {/* Progress bar with better styling */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">Mức độ nắm vững kiến thức</span>
                      <span className={cn(
                        "font-bold",
                        getMasteryColor(topic.masteryRate) === "success" && "text-success",
                        getMasteryColor(topic.masteryRate) === "warning" && "text-warning",
                        getMasteryColor(topic.masteryRate) === "danger" && "text-danger"
                      )}>
                        {topic.masteryRate}%
                      </span>
                    </div>
                    <Progress 
                      value={topic.masteryRate} 
                      className={cn(
                        "h-4 bg-muted",
                        getMasteryColor(topic.masteryRate) === "success" && "[&>div]:bg-success",
                        getMasteryColor(topic.masteryRate) === "warning" && "[&>div]:bg-warning", 
                        getMasteryColor(topic.masteryRate) === "danger" && "[&>div]:bg-danger"
                      )}
                    />
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 pt-3 border-t border-border/30">
                  <Button
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuestionDetailsClick(topic)}
                    className="text-sm font-medium hover:bg-primary/10 hover:border-primary/20"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Xem chi tiết hổng kiến thức
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm" 
                    onClick={() => handleStudentGapsClick(topic)}
                    className="text-sm font-medium hover:bg-primary/10 hover:border-primary/20"
                    disabled={topic.studentsWithGaps.length === 0}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Xem các học sinh hổng kiến thức ({topic.studentsWithGaps.length})
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Student Knowledge Gaps Modal */}
      <Dialog open={showStudentGaps} onOpenChange={setShowStudentGaps}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <TrendingDown className="w-6 h-6 mr-3 text-danger" />
              Học sinh hổng kiến thức: {selectedTopic?.name}
            </DialogTitle>
            <div className="text-sm text-muted-foreground mt-2">
              Xếp hạng dựa trên tổng số % thiếu kiến thức (nghiêm trọng → nhẹ)
            </div>
          </DialogHeader>

          <div className="space-y-5">
            {selectedTopic?.studentsWithGaps
              .sort((a, b) => b.deficitPercentage - a.deficitPercentage)
              .map((student, index) => {
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
                              <Badge variant="outline" className={cn(
                                "font-medium",
                                student.group === "Giỏi" && "border-success text-success bg-success/10",
                                student.group === "Khá" && "border-primary text-primary bg-primary/10", 
                                student.group === "TB" && "border-warning text-warning bg-warning/10",
                                student.group === "Yếu" && "border-danger text-danger bg-danger/10"
                              )}>
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
                          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                            <div className="text-sm font-medium text-success">
                              {student.questionsCorrect.length > 0 
                                ? student.questionsCorrect.join(", ")
                                : "Không có câu nào"
                              }
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <p className="font-bold text-sm text-danger flex items-center">
                            <span className="w-3 h-3 bg-danger rounded-full mr-2"></span>
                            Câu làm sai ({student.questionsIncorrect.length} câu):
                          </p>
                          <div className="p-4 bg-danger/5 border border-danger/20 rounded-lg">
                            <div className="text-sm font-medium text-danger">
                              {student.questionsIncorrect.length > 0 
                                ? student.questionsIncorrect.join(", ")
                                : "Không có câu nào"
                              }
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Knowledge gap examples */}
                      <div className="space-y-3">
                        <p className="font-bold text-sm text-foreground flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          Ví dụ thiếu kiến thức (LaTeX):
                        </p>
                        <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                          {student.examples.map((example, exampleIndex) => (
                            <div key={exampleIndex} className="p-3 bg-background border border-border rounded-md">
                              <code className="text-sm font-mono text-foreground break-all">
                                {example}
                              </code>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex space-x-3 pt-3 border-t border-border/30">
                        <Button
                          variant="outline" 
                          size="sm"
                          onClick={() => handleQuestionDetailsClick(selectedTopic!)}
                          className="font-medium hover:bg-primary/10"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Xem chi tiết hổng kiến thức
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            
            {selectedTopic?.studentsWithGaps.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <Brain className="w-20 h-20 mx-auto mb-4 opacity-30" />
                <p className="text-xl font-medium mb-2">Không có học sinh nào thiếu kiến thức này</p>
                <p className="text-sm">Tất cả học sinh đều nắm vững kiến thức cơ bản</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Question Details Modal */}
      <Dialog open={showQuestionDetails} onOpenChange={setShowQuestionDetails}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <FileText className="w-6 h-6 mr-3 text-primary" />
              Chi tiết hổng kiến thức: {selectedTopic?.name}
            </DialogTitle>
            <div className="text-sm text-muted-foreground mt-2">
              Danh sách các câu hỏi có kiến thức này và tình trạng làm bài của học sinh
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {mockQuestionDetails[selectedTopic?.id || ""]?.map((question) => (
              <Card key={question.questionNumber} className="p-6 border-l-4 border-l-primary">
                <div className="space-y-5">
                  {/* Question header */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-foreground">{question.questionNumber}</h4>
                        <p className="text-sm text-muted-foreground">Câu hỏi kiểm tra kiến thức</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "text-3xl font-bold mb-1",
                        question.correctRate >= 70 ? "text-success" : 
                        question.correctRate >= 50 ? "text-warning" : "text-danger"
                      )}>
                        {question.correctRate}%
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">làm đúng</p>
                    </div>
                  </div>

                  {/* Correct rate progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">Tỷ lệ làm đúng</span>
                      <span className={cn(
                        "font-bold",
                        question.correctRate >= 70 ? "text-success" : 
                        question.correctRate >= 50 ? "text-warning" : "text-danger"
                      )}>
                        {question.correctRate}%
                      </span>
                    </div>
                    <Progress 
                      value={question.correctRate}
                      className={cn(
                        "h-4 bg-muted",
                        question.correctRate >= 70 ? "[&>div]:bg-success" : 
                        question.correctRate >= 50 ? "[&>div]:bg-warning" : "[&>div]:bg-danger"
                      )}
                    />
                  </div>

                  {/* Students who got it wrong */}
                  <div className="space-y-3">
                    <p className="font-bold text-sm text-danger flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Học sinh làm sai ({question.studentsIncorrect.length} học sinh):
                    </p>
                    <div className="p-4 bg-danger/5 border border-danger/20 rounded-lg">
                      <div className="flex flex-wrap gap-2">
                        {question.studentsIncorrect.map((studentName, index) => (
                          <Badge key={index} variant="outline" className="border-danger/30 text-danger bg-danger/5">
                            {studentName}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Knowledge gap examples */}
                  <div className="space-y-3">
                    <p className="font-bold text-sm text-foreground flex items-center">
                      <Brain className="w-4 h-4 mr-2" />
                      Ví dụ thiếu kiến thức (LaTeX):
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="p-3 bg-background border border-border rounded-md">
                        <code className="text-sm font-mono text-foreground break-all">
                          {question.knowledgeExample}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )) || (
              <div className="text-center py-16 text-muted-foreground">
                <FileText className="w-20 h-20 mx-auto mb-4 opacity-30" />
                <p className="text-xl font-medium mb-2">Không có dữ liệu chi tiết cho chủ đề này</p>
                <p className="text-sm">Dữ liệu phân tích sẽ được cập nhật sau khi có đủ bài làm</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}