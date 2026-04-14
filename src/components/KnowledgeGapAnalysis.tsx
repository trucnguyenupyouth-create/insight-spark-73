import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Brain, Users, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { KnowledgeGapDetailModal } from "./KnowledgeGapDetailModal";
import { KnowledgeGapStudentModal } from "./KnowledgeGapStudentModal";
import { realTopics } from "@/data/exam177Topics";

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
  topics?: KnowledgeTopic[];
}

export function KnowledgeGapAnalysis({ topics = realTopics }: KnowledgeGapAnalysisProps) {
  const [selectedTopic, setSelectedTopic] = useState<KnowledgeTopic | null>(null);
  const [showStudentGaps, setShowStudentGaps] = useState(false);
  const [showKnowledgeDetails, setShowKnowledgeDetails] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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

  // Sort by mastery rate to show critical gaps first
  const sortedTopics = [...topics].sort((a, b) => a.masteryRate - b.masteryRate);
  const displayedTopics = isExpanded ? sortedTopics : sortedTopics.slice(0, 3);

  return (
    <>
      <Card className="p-6 shadow-md border-none bg-white">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <Brain className="w-6 h-6 text-primary animate-pulse" />
              <h3 className="text-xl font-bold tracking-tight">PHÂN TÍCH CHI TIẾT / Step Analysis</h3>
            </div>
            <Badge variant="outline" className="text-[10px] font-black uppercase bg-secondary text-muted-foreground border-none">
              {topics.length} Logic Blocks
            </Badge>
          </div>
          
          <div className="space-y-6">
            {displayedTopics.map((topic) => (
              <div key={topic.id} className="space-y-4 p-5 rounded-2xl border border-border/50 hover:border-primary/20 transition-all bg-secondary/20 group">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-base text-foreground mb-1 group-hover:text-primary transition-colors">{topic.name}</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span className="font-medium">Phạm vi:</span>
                        <span className="text-foreground/70">{topic.questions.map(q => `Câu ${q}`).join(", ")}</span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className={cn(
                        "text-2xl font-black tabular-nums tracking-tighter",
                        getMasteryColor(topic.masteryRate) === "success" && "text-success",
                        getMasteryColor(topic.masteryRate) === "warning" && "text-warning",
                        getMasteryColor(topic.masteryRate) === "danger" && "text-danger"
                      )}>
                        {topic.masteryRate}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                      <span className="text-muted-foreground">Độ thấu hiểu</span>
                      <span className={cn(
                        getMasteryColor(topic.masteryRate) === "success" && "text-success",
                        getMasteryColor(topic.masteryRate) === "warning" && "text-warning", 
                        getMasteryColor(topic.masteryRate) === "danger" && "text-danger"
                      )}>
                        {topic.masteryRate >= 70 ? "Tốt" : topic.masteryRate >= 50 ? "Trung bình" : "Cần hỗ trợ"}
                      </span>
                    </div>
                    <Progress 
                      value={topic.masteryRate} 
                      className={cn(
                        "h-2 bg-white rounded-full",
                        getMasteryColor(topic.masteryRate) === "success" && "[&>div]:bg-success",
                        getMasteryColor(topic.masteryRate) === "warning" && "[&>div]:bg-warning", 
                        getMasteryColor(topic.masteryRate) === "danger" && "[&>div]:bg-danger"
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/50">
                  <Button
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleKnowledgeDetailsClick(topic)}
                    className="text-[11px] font-bold h-8 bg-white/50 hover:bg-white text-foreground shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                    Chi tiết hổng
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm" 
                    onClick={() => handleStudentGapsClick(topic)}
                    className="text-[11px] font-bold h-8 bg-white/50 hover:bg-white text-foreground shadow-sm"
                    disabled={topic.studentsWithGaps.length === 0}
                  >
                    <Users className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                    {topic.studentsWithGaps.length} Học sinh hổng
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {topics.length > 3 && (
            <Button 
              variant="outline" 
              className="w-full font-bold text-xs h-11 border-dashed border-border hover:border-primary hover:text-primary transition-all rounded-xl"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <><ChevronUp className="w-4 h-4 mr-2" /> Thu gọn phân tích</>
              ) : (
                <><ChevronDown className="w-4 h-4 mr-2" /> Xem thêm {topics.length - 3} khối logic khác</>
              )}
            </Button>
          )}
        </div>
      </Card>

      <KnowledgeGapStudentModal
        topic={selectedTopic}
        isOpen={showStudentGaps}
        onClose={() => setShowStudentGaps(false)}
      />

      <KnowledgeGapDetailModal
        topic={selectedTopic}
        isOpen={showKnowledgeDetails}
        onClose={() => setShowKnowledgeDetails(false)}
      />
    </>
  );
}