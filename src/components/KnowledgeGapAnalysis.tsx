import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Brain, Users, FileText } from "lucide-react";
import { KnowledgeGapDetailModal } from "./KnowledgeGapDetailModal";
import { KnowledgeGapStudentModal } from "./KnowledgeGapStudentModal";

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

export function KnowledgeGapAnalysis({ topics = mockTopics }: KnowledgeGapAnalysisProps) {
  const [selectedTopic, setSelectedTopic] = useState<KnowledgeTopic | null>(null);
  const [showStudentGaps, setShowStudentGaps] = useState(false);
  const [showKnowledgeDetails, setShowKnowledgeDetails] = useState(false);

  const getMasteryColor = (rate: number) => {
    if (rate >= 70) return "success";
    if (rate >= 50) return "warning"; 
    return "danger";
  };

  const handleStudentGapsClick = (topic: KnowledgeTopic) => {
    setSelectedTopic(topic);
    setShowStudentGaps(true);
  };

  const handleKnowledgeDetailsClick = (topic: KnowledgeTopic) => {
    setSelectedTopic(topic);
    setShowKnowledgeDetails(true);
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
                    onClick={() => handleKnowledgeDetailsClick(topic)}
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

      {/* Knowledge Gap Student Modal */}
      <KnowledgeGapStudentModal
        topic={selectedTopic}
        isOpen={showStudentGaps}
        onClose={() => setShowStudentGaps(false)}
      />

      {/* Knowledge Gap Details Modal */}
      <KnowledgeGapDetailModal
        topic={selectedTopic}
        isOpen={showKnowledgeDetails}
        onClose={() => setShowKnowledgeDetails(false)}
      />
    </>
  );
}