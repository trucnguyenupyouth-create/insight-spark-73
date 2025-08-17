import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Brain, Users, FileText, TrendingDown } from "lucide-react";

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
        examples: ["sin30° = \\frac{\\sqrt{3}}{2} (sai, đúng là \\frac{1}{2})", "cos60° = \\frac{1}{3} (sai, đúng là \\frac{1}{2})"],
        group: "Yếu"
      },
      {
        id: "hs002", 
        name: "Trần Thị Bình",
        deficitPercentage: 67,
        questionsCorrect: ["Câu 1", "Câu 3"],
        questionsIncorrect: ["Câu 7"],
        examples: ["cos45° = 1 (sai, đúng là \\frac{\\sqrt{2}}{2})"],
        group: "TB"
      }
    ]
  },
  {
    id: "topic_2",
    name: "Tỉ số cạnh đối/cạnh kề/huyền",
    masteryRate: 58.5,
    questions: ["Câu 2", "Câu 4", "Câu 5"],
    studentsWithGaps: [
      {
        id: "hs003",
        name: "Lê Văn Cường", 
        deficitPercentage: 75,
        questionsCorrect: ["Câu 2"],
        questionsIncorrect: ["Câu 4", "Câu 5"],
        examples: ["Nhầm cạnh kề với cạnh đối trong tam giác vuông", "sin\\alpha = \\frac{cạnh kề}{huyền} (sai, đúng là \\frac{cạnh đối}{huyền})"],
        group: "Yếu"
      },
      {
        id: "hs004",
        name: "Phạm Thị Dung", 
        deficitPercentage: 60,
        questionsCorrect: ["Câu 2", "Câu 4"],
        questionsIncorrect: ["Câu 5"],
        examples: ["tan\\alpha = \\frac{cạnh đối}{cạnh kề} nhưng tính ngược"],
        group: "TB"
      }
    ]
  },
  {
    id: "topic_3",
    name: "Tìm cạnh bằng sin/cos/tan",
    masteryRate: 45,
    questions: ["Câu 6", "Câu 8"],
    studentsWithGaps: [
      {
        id: "hs005",
        name: "Hoàng Văn E",
        deficitPercentage: 80,
        questionsCorrect: [],
        questionsIncorrect: ["Câu 6", "Câu 8"],
        examples: ["a = b \\cdot sin(30°) nhưng quên tính sin(30°) = 0.5"],
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
        id: "hs006",
        name: "Vũ Thị Giang",
        deficitPercentage: 90,
        questionsCorrect: [],
        questionsIncorrect: ["Câu 9", "Câu 10"],
        examples: ["\\alpha = arcsin(0.5) = 60° (sai, đúng là 30°)"],
        group: "Yếu"
      }
    ]
  },
  {
    id: "topic_5",
    name: "Bài toán vận dụng (ứng dụng)",
    masteryRate: 22,
    questions: ["Câu 11", "Câu 12"],
    studentsWithGaps: [
      {
        id: "hs007",
        name: "Đỗ Văn H",
        deficitPercentage: 95,
        questionsCorrect: [],
        questionsIncorrect: ["Câu 11", "Câu 12"],
        examples: ["Chiều cao tòa nhà = khoảng cách × tan(góc) nhưng không xác định được góc nào"],
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
      knowledgeExample: "Tính sin30°, cos60°, tan45° - Các giá trị lượng giác đặc biệt"
    },
    {
      questionNumber: "Câu 3", 
      correctRate: 65,
      studentsIncorrect: ["Nguyễn Văn An", "Lê Văn Cường", "Phạm Thị Dung"],
      knowledgeExample: "So sánh các giá trị lượng giác: sin30° < cos30° hay ngược lại?"
    },
    {
      questionNumber: "Câu 7",
      correctRate: 45,
      studentsIncorrect: ["Nguyễn Văn An", "Trần Thị Bình", "Hoàng Văn E", "Vũ Thị Giang"],
      knowledgeExample: "Ứng dụng định nghĩa trong bài toán thực tế - tính chiều cao cột cờ"
    }
  ],
  "topic_2": [
    {
      questionNumber: "Câu 2",
      correctRate: 75,
      studentsIncorrect: ["Lê Văn Cường", "Vũ Thị Giang"],
      knowledgeExample: "Xác định cạnh đối, cạnh kề trong tam giác vuông"
    },
    {
      questionNumber: "Câu 4",
      correctRate: 50,
      studentsIncorrect: ["Lê Văn Cường", "Phạm Thị Dung", "Hoàng Văn E"],
      knowledgeExample: "Tỉ số lượng giác của góc nhọn trong tam giác vuông"
    },
    {
      questionNumber: "Câu 5",
      correctRate: 40,
      studentsIncorrect: ["Lê Văn Cường", "Phạm Thị Dung", "Vũ Thị Giang", "Đỗ Văn H"],
      knowledgeExample: "Áp dụng tỉ số lượng giác để tính độ dài cạnh"
    }
  ],
  "topic_3": [
    {
      questionNumber: "Câu 6",
      correctRate: 55,
      studentsIncorrect: ["Hoàng Văn E", "Vũ Thị Giang", "Đỗ Văn H"],
      knowledgeExample: "Tìm cạnh trong tam giác vuông khi biết một góc và một cạnh"
    },
    {
      questionNumber: "Câu 8",
      correctRate: 35,
      studentsIncorrect: ["Hoàng Văn E", "Vũ Thị Giang", "Đỗ Văn H", "Nguyễn Văn An"],
      knowledgeExample: "Sử dụng sin, cos, tan để giải bài toán hình học"
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

  const getDeficitColor = (deficit: number) => {
    if (deficit >= 70) return "text-danger";
    if (deficit >= 50) return "text-warning";
    return "text-success";
  };

  const handleTopicClick = (topic: KnowledgeTopic) => {
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
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Tỷ lệ nắm vững theo chủ đề</h3>
          </div>
          
          <div className="space-y-4">
            {topics.map((topic) => (
              <div key={topic.id} className="space-y-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-semibold text-base">{topic.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Các câu xuất hiện: {topic.questions.join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "font-bold text-lg",
                      getMasteryColor(topic.masteryRate) === "success" && "text-success",
                      getMasteryColor(topic.masteryRate) === "warning" && "text-warning",
                      getMasteryColor(topic.masteryRate) === "danger" && "text-danger"
                    )}>
                      {topic.masteryRate}%
                    </p>
                    <p className="text-xs text-muted-foreground">Độ nắm vững</p>
                  </div>
                </div>
                
                <Progress 
                  value={topic.masteryRate} 
                  className={cn(
                    "h-3",
                    getMasteryColor(topic.masteryRate) === "success" && "[&>div]:bg-success",
                    getMasteryColor(topic.masteryRate) === "warning" && "[&>div]:bg-warning", 
                    getMasteryColor(topic.masteryRate) === "danger" && "[&>div]:bg-danger"
                  )}
                />
                
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuestionDetailsClick(topic)}
                    className="text-xs flex-1 sm:flex-initial"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Xem chi tiết hổng kiến thức
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm" 
                    onClick={() => handleTopicClick(topic)}
                    className="text-xs flex-1 sm:flex-initial"
                    disabled={topic.studentsWithGaps.length === 0}
                  >
                    <Users className="w-3 h-3 mr-1" />
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-danger" />
              Học sinh hổng kiến thức: {selectedTopic?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {selectedTopic?.studentsWithGaps
              .sort((a, b) => b.deficitPercentage - a.deficitPercentage)
              .map((student) => (
                <Card key={student.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <Badge variant="outline" className={cn(
                          student.group === "Giỏi" && "border-success text-success",
                          student.group === "Khá" && "border-primary text-primary", 
                          student.group === "TB" && "border-warning text-warning",
                          student.group === "Yếu" && "border-danger text-danger"
                        )}>
                          {student.group}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className={cn("font-bold", getDeficitColor(student.deficitPercentage))}>
                          {student.deficitPercentage}% thiếu kiến thức
                        </p>
                      </div>
                    </div>

                    <Progress 
                      value={student.deficitPercentage}
                      className="h-2 [&>div]:bg-danger"
                    />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium mb-1">Câu làm đúng:</p>
                        <p className="text-success">{student.questionsCorrect.join(", ") || "Không có"}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Câu làm sai:</p>
                        <p className="text-danger">{student.questionsIncorrect.join(", ") || "Không có"}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-sm mb-1">Ví dụ thiếu kiến thức:</p>
                      <div className="bg-muted/50 p-3 rounded text-sm">
                        {student.examples.join("; ")}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline" 
                        size="sm"
                        onClick={() => handleQuestionDetailsClick(selectedTopic!)}
                      >
                        Xem chi tiết hổng kiến thức
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            
            {selectedTopic?.studentsWithGaps.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Không có học sinh nào thiếu kiến thức này</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Question Details Modal */}
      <Dialog open={showQuestionDetails} onOpenChange={setShowQuestionDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              Chi tiết câu hỏi: {selectedTopic?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {mockQuestionDetails[selectedTopic?.id || ""]?.map((question) => (
              <Card key={question.questionNumber} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{question.questionNumber}</h4>
                    <p className="text-sm font-medium text-primary">
                      {question.correctRate}% làm đúng
                    </p>
                  </div>

                  <Progress 
                    value={question.correctRate}
                    className="h-2 [&>div]:bg-success"
                  />

                  <div>
                    <p className="font-medium text-sm mb-1">Học sinh làm sai:</p>
                    <p className="text-danger text-sm">{question.studentsIncorrect.join(", ")}</p>
                  </div>

                  <div>
                    <p className="font-medium text-sm mb-1">Ví dụ thiếu kiến thức:</p>
                    <div className="bg-muted/50 p-3 rounded text-sm">
                      {question.knowledgeExample}
                    </div>
                  </div>
                </div>
              </Card>
            )) || (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Không có dữ liệu chi tiết cho chủ đề này</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}